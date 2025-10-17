// src/components/SpecialistChat.jsx
import React, {
   useState,
   useEffect,
   useRef,
   useContext,
   useCallback,
} from "react";
import { motion } from "framer-motion";
import {
   Send,
   User,
   CheckCheck,
   MoveVertical as MoreVertical,
} from "lucide-react";
import { io } from "socket.io-client";
import { AuthContext } from "../../../../contexts/AuthContext";
import toast from "react-hot-toast";

const CHAT_SERVER =
   import.meta.env.VITE_SERVER_API_KEY || "http://localhost:3001";

/**
 * SpecialistChat
 * - left column: conversations (other participant = farmer)
 * - right: messages for selected conversation
 *
 * Assumptions:
 * - GET /api/chat/conversations returns conversations where participants is an array of UIDs.
 * - GET /api/chat/conversations/:id/messages returns messages for that conversation.
 * - GET /users/:uid exists and returns basic user profile { uid, name, avatar, location, ... }
 * - Socket events used: "message", "message:ack", "typing", "message:read"
 */

const SpecialistChat = () => {
   const { user, getToken } = useContext(AuthContext);
   const [conversations, setConversations] = useState([]); // array of conv docs
   const [profiles, setProfiles] = useState({}); // uid -> profile
   const [selectedConv, setSelectedConv] = useState(null); // conversation object
   const [messages, setMessages] = useState({}); // conversationId -> [messages]
   const [newMessage, setNewMessage] = useState("");
   const [typingUsers, setTypingUsers] = useState({}); // conversationId -> boolean
   const socketRef = useRef(null);
   const messagesEndRef = useRef(null);
   const typingTimeoutRef = useRef(null);

   // helper: fetch with token
   const authFetch = useCallback(
      async (url, opts = {}) => {
         const token = await getToken();
         return fetch(url, {
            ...opts,
            headers: {
               ...(opts.headers || {}),
               Authorization: `Bearer ${token}`,
               "Content-Type": "application/json",
            },
         });
      },
      [getToken]
   );

   // init socket connection
   useEffect(() => {
      if (!user) return;
      let mounted = true;
      let socket;

      (async () => {
         const token = await getToken();
         if (!token) return;

         socket = io(CHAT_SERVER, {
            auth: { token },
            transports: ["websocket"],
         });

         socket.on("connect", () => {
            console.log("Specialist socket connected", socket.id);
            toast.success("Connected to chat server");
         });

         socket.on("message", (msg) => {
            // msg contains: _id, conversationId (string), senderUid, senderRole, text, createdAt, ...
            setMessages((prev) => {
               const key = msg.conversationId;
               const list = [...(prev[key] || []), msg];
               return { ...prev, [key]: list };
            });

            // if message belongs to a conversation not in list, optionally fetch convs
         });

         socket.on("message:ack", (ack) => {
            const { tempId, savedMessage } = ack || {};
            if (!savedMessage || !tempId) return;
            const convKey = savedMessage.conversationId;
            setMessages((prev) => {
               const list = (prev[convKey] || []).map((m) =>
                  m.tempId && m.tempId === tempId ? { ...savedMessage } : m
               );
               // ensure message present
               const exists = list.some(
                  (m) => String(m._id) === String(savedMessage._id)
               );
               if (!exists) list.push(savedMessage);
               return { ...prev, [convKey]: list };
            });
         });

         socket.on("typing", ({ conversationId, userId, isTyping }) => {
            setTypingUsers((prev) => ({ ...prev, [conversationId]: isTyping }));
         });

         socket.on(
            "message:read",
            ({ conversationId, messageIds, readerUid }) => {
               // update messages' status to 'read'
               setMessages((prev) => {
                  const list = (prev[conversationId] || []).map((m) =>
                     messageIds.includes(String(m._id))
                        ? { ...m, status: "read" }
                        : m
                  );
                  return { ...prev, [conversationId]: list };
               });
            }
         );

         socketRef.current = socket;
      })();

      return () => {
         mounted = false;
         if (socketRef.current) {
            socketRef.current.disconnect();
            socketRef.current = null;
         }
      };
   }, [user, getToken]);

   // load conversations (left column)
   useEffect(() => {
      if (!user) return;
      (async () => {
         try {
            const res = await authFetch(
               `${CHAT_SERVER}/api/chat/conversations`
            );
            if (!res.ok) throw new Error("Failed to fetch conversations");
            const convs = await res.json();
            setConversations(convs);

            // fetch other participants' profiles (farmers)
            const otherUids = new Set();
            convs.forEach((c) => {
               (c.participants || []).forEach((p) => {
                  if (p !== user.uid) otherUids.add(p);
               });
            });
            const missing = [...otherUids].filter((uid) => !profiles[uid]);
            await Promise.all(
               missing.map(async (uid) => {
                  try {
                     const r = await authFetch(`${CHAT_SERVER}/users/${uid}`);
                     if (!r.ok) return;
                     const profile = await r.json();
                     setProfiles((prev) => ({ ...prev, [uid]: profile }));
                  } catch (err) {
                     console.warn("Failed to fetch profile", uid, err);
                  }
               })
            );
         } catch (err) {
            console.error("load conversations error", err);
         }
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [user]);

   // when selecting conversation -> load messages and mark read
   useEffect(() => {
      if (!selectedConv || !user) return;
      (async () => {
         try {
            const convId = selectedConv._id;
            const res = await authFetch(
               `${CHAT_SERVER}/api/chat/conversations/${convId}/messages?limit=100`
            );
            if (!res.ok) throw new Error("Failed to load messages");
            const msgs = await res.json();
            setMessages((prev) => ({ ...prev, [convId]: msgs }));

            // mark visible messages as read (send markRead)
            const unreadIds = msgs
               .filter((m) => m.status !== "read" && m.senderUid !== user.uid)
               .map((m) => String(m._id));
            if (unreadIds.length > 0) {
               socketRef.current?.emit("markRead", {
                  conversationId: convId,
                  messageIds: unreadIds,
               });
            }
         } catch (err) {
            console.error("load messages error", err);
         }
      })();
   }, [selectedConv, user, authFetch]);

   // scroll to bottom when messages change
   useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
   }, [messages, selectedConv]);

   // send message
   const handleSendMessage = () => {
      if (!newMessage.trim() || !selectedConv || !socketRef.current) return;
      const convId = String(selectedConv._id);
      const recipientUid = (selectedConv.participants || []).find(
         (p) => p !== user.uid
      );
      const tempId = `temp-${Date.now()}`;

      const optimistic = {
         tempId,
         text: newMessage,
         senderUid: user.uid,
         senderRole: "specialist",
         createdAt: new Date().toISOString(),
         status: "sending",
         conversationId: convId,
      };

      setMessages((prev) => {
         const list = [...(prev[convId] || []), optimistic];
         return { ...prev, [convId]: list };
      });

      socketRef.current.emit("message", {
         tempId,
         conversationId: convId,
         recipientUid,
         text: newMessage.trim(),
         senderRole: "specialist",
      });

      setNewMessage("");
      // send typing false
      socketRef.current.emit("typing", {
         conversationId: convId,
         recipientUid,
         isTyping: false,
      });
   };

   // typing
   const handleTyping = (value) => {
      setNewMessage(value);
      if (!socketRef.current || !selectedConv) return;

      const convId = String(selectedConv._id);
      const recipientUid = (selectedConv.participants || []).find(
         (p) => p !== user.uid
      );

      socketRef.current.emit("typing", {
         conversationId: convId,
         recipientUid,
         isTyping: true,
      });

      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
         socketRef.current.emit("typing", {
            conversationId: convId,
            recipientUid,
            isTyping: false,
         });
      }, 900);
   };

   // helper render participant (other)
   const getOtherParticipantUid = (conv) => {
      const p = (conv.participants || []).find((pid) => pid !== user.uid);
      return p || null;
   };

   const getProfile = (uid) =>
      profiles[uid] || { uid, name: uid, avatar: "", location: "" };

   return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
         <div className="container mx-auto px-4 py-8">
            <motion.div
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               className="mb-8"
            >
               <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                     <User className="text-blue-600" size={32} />
                  </div>
                  Specialist Dashboard
               </h1>
               <p className="text-gray-600 text-lg">
                  Respond to farmers and manage conversations
               </p>
            </motion.div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden h-[700px] flex">
               {/* Left: conversations (farmers) */}
               <div className="w-1/3 border-r border-gray-200 flex flex-col">
                  <div className="p-4 border-b border-gray-200 bg-blue-50">
                     <h3 className="font-semibold text-gray-800">
                        Incoming Messages
                     </h3>
                     <p className="text-sm text-gray-600">
                        Farmers who contacted you
                     </p>
                  </div>

                  <div className="flex-1 overflow-y-auto">
                     {conversations.map((conv) => {
                        const otherUid = getOtherParticipantUid(conv);
                        const profile = getProfile(otherUid);
                        return (
                           <motion.div
                              key={String(conv._id)}
                              whileHover={{ backgroundColor: "#f8fafc" }}
                              onClick={() => setSelectedConv(conv)}
                              className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                                 selectedConv?._id === conv._id
                                    ? "bg-blue-50 border-l-4 border-l-blue-500"
                                    : ""
                              }`}
                           >
                              <div className="flex items-center gap-3">
                                 <div className="relative">
                                    <img
                                       src={
                                          profile.avatar ||
                                          "https://via.placeholder.com/150"
                                       }
                                       alt={profile.name || otherUid}
                                       className="w-12 h-12 rounded-full object-cover"
                                    />
                                 </div>
                                 <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                       <h4 className="font-semibold text-gray-800 truncate">
                                          {profile.name || otherUid}
                                       </h4>
                                       {conv.unreadCounts &&
                                          conv.unreadCounts[user.uid] > 0 && (
                                             <span className="bg-green-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                                                {conv.unreadCounts[user.uid]}
                                             </span>
                                          )}
                                    </div>
                                    <p className="text-sm text-green-600 truncate">
                                       {profile.location || ""}
                                    </p>
                                    <p className="text-xs text-gray-400 truncate mt-1">
                                       {conv.lastMessage || ""}
                                    </p>
                                 </div>
                              </div>
                           </motion.div>
                        );
                     })}
                  </div>
               </div>

               {/* Right: messages */}
               <div className="flex-1 flex flex-col">
                  {selectedConv ? (
                     <>
                        {/* Header */}
                        <div className="p-4 border-b border-gray-200 bg-green-50">
                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                 <div className="relative">
                                    <img
                                       src={
                                          getProfile(
                                             getOtherParticipantUid(
                                                selectedConv
                                             )
                                          ).avatar ||
                                          "https://via.placeholder.com/150"
                                       }
                                       alt=""
                                       className="w-10 h-10 rounded-full object-cover"
                                    />
                                 </div>
                                 <div>
                                    <h4 className="font-semibold text-gray-800">
                                       {getProfile(
                                          getOtherParticipantUid(selectedConv)
                                       ).name || "Farmer"}
                                    </h4>
                                    <p className="text-sm text-green-600">
                                       {getProfile(
                                          getOtherParticipantUid(selectedConv)
                                       ).location || ""}
                                    </p>
                                 </div>
                              </div>
                              <div className="flex items-center gap-2">
                                 <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                                 >
                                    <MoreVertical size={20} />
                                 </motion.button>
                              </div>
                           </div>
                        </div>

                        {/* messages area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                           {(messages[selectedConv._id] || []).map(
                              (message) => (
                                 <motion.div
                                    key={message._id || message.tempId}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${
                                       message.senderUid === user.uid
                                          ? "justify-end"
                                          : "justify-start"
                                    }`}
                                 >
                                    <div
                                       className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                          message.senderUid === user.uid
                                             ? "bg-blue-500 text-white"
                                             : "bg-gray-100 text-gray-800"
                                       }`}
                                    >
                                       <p className="text-sm">{message.text}</p>
                                       <div
                                          className={`flex items-center gap-1 mt-1 ${
                                             message.senderUid === user.uid
                                                ? "justify-end"
                                                : "justify-start"
                                          }`}
                                       >
                                          <span
                                             className={`text-xs ${
                                                message.senderUid === user.uid
                                                   ? "text-blue-100"
                                                   : "text-gray-500"
                                             }`}
                                          >
                                             {new Date(
                                                message.createdAt
                                             ).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                             })}
                                          </span>
                                          {message.senderUid === user.uid && (
                                             <CheckCheck
                                                size={12}
                                                className="text-blue-100"
                                             />
                                          )}
                                       </div>
                                    </div>
                                 </motion.div>
                              )
                           )}

                           {typingUsers[selectedConv._id] && (
                              <motion.div
                                 initial={{ opacity: 0, y: 10 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 className="flex justify-start"
                              >
                                 <div className="bg-gray-100 px-4 py-2 rounded-lg">
                                    <div className="flex items-center gap-1">
                                       <div className="flex gap-1">
                                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                          <div
                                             className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                             style={{ animationDelay: "0.1s" }}
                                          />
                                          <div
                                             className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                             style={{ animationDelay: "0.2s" }}
                                          />
                                       </div>
                                       <span className="text-xs text-gray-500 ml-2">
                                          typing...
                                       </span>
                                    </div>
                                 </div>
                              </motion.div>
                           )}

                           <div ref={messagesEndRef} />
                        </div>

                        {/* input */}
                        <div className="p-4 border-t border-gray-200 bg-gray-50">
                           <div className="flex items-center gap-3">
                              <input
                                 aria-label="Type your reply"
                                 type="text"
                                 value={newMessage}
                                 onChange={(e) => handleTyping(e.target.value)}
                                 onKeyDown={(e) =>
                                    e.key === "Enter" && handleSendMessage()
                                 }
                                 placeholder="Write a reply..."
                                 className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                              <motion.button
                                 whileHover={{ scale: 1.05 }}
                                 whileTap={{ scale: 0.95 }}
                                 onClick={handleSendMessage}
                                 disabled={!newMessage.trim()}
                                 className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                              >
                                 <Send size={18} /> Send
                              </motion.button>
                           </div>
                        </div>
                     </>
                  ) : (
                     <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                           <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                              <User size={40} className="text-gray-400" />
                           </div>
                           <h3 className="text-xl font-semibold text-gray-800 mb-2">
                              Select a Conversation
                           </h3>
                           <p className="text-gray-600">
                              Choose a farmer from the left to read and reply
                           </p>
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default SpecialistChat;
