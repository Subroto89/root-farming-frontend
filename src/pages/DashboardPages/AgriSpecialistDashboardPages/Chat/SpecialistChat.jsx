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
import useChatSocket from "../../../../hooks/useChatSocket";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useTheme } from "../../../../hooks/useTheme";
import toast from "react-hot-toast";

const CHAT_SERVER =
   import.meta.env.VITE_Server_API_KEY || "http://localhost:3001";

/* SpecialistChat component (unchanged UI, fixed typing names) */
const SpecialistChat = () => {
   const { user, getToken } = useContext(AuthContext);
   const { theme } = useTheme();

   // Theme styles
   const themeBackgroundStyle = theme === "dark" ? "bg-dark" : "bg-light";
   const themeForegroundStyle = theme === "dark" ? "fg-dark" : "fg-light";
   const themeFgOfFgStyle =
      theme === "dark" ? "fg-of-fg-dark" : "fg-of-fg-light";
   const [conversations, setConversations] = useState([]); // array of conv docs
   const [profiles, setProfiles] = useState({}); // uid -> profile
   const [selectedConv, setSelectedConv] = useState(null); // conversation object
   const [messages, setMessages] = useState({}); // conversationId -> [messages]
   const [newMessage, setNewMessage] = useState("");
   const [typingUsers, setTypingUsers] = useState({}); // conversationId -> boolean
   const messagesEndRef = useRef(null);
   const typingTimeoutRef = useRef(null);

   // ---- SOCKET: handlers passed to the hook ----
   const handleIncoming = useCallback(
      (msg) => {
         const convKey = msg.conversationId;
         setMessages((prev) => {
            const list = [...(prev[convKey] || []), msg];
            return { ...prev, [convKey]: list };
         });

         const convExists = conversations.some(
            (c) => String(c._id) === String(convKey)
         );
         if (!convExists) {
            (async () => {
               try {
                  const token = await getToken();
                  const res = await fetch(
                     `${CHAT_SERVER}/api/chat/conversations`,
                     {
                        headers: { Authorization: `Bearer ${token}` },
                     }
                  );
                  if (res.ok) {
                     const convs = await res.json();
                     setConversations(convs);
                  }
               } catch (err) {
                  console.warn(
                     "Failed to refresh conversations after incoming message",
                     err
                  );
               }
            })();
         }
      },
      [conversations, getToken]
   );

   const handleAck = useCallback((ack) => {
      const { tempId, savedMessage } = ack || {};
      if (!savedMessage || !tempId) return;
      const convKey = savedMessage.conversationId;
      setMessages((prev) => {
         const list = (prev[convKey] || []).map((m) =>
            m.tempId && m.tempId === tempId ? { ...savedMessage } : m
         );
         const exists = list.some(
            (m) => String(m._id) === String(savedMessage._id)
         );
         if (!exists) list.push(savedMessage);
         return { ...prev, [convKey]: list };
      });
   }, []);

   // <-- Renamed incoming typing handler -->
   const handleTypingRemote = useCallback(
      ({ conversationId, userId, isTyping }) => {
         setTypingUsers((prev) => ({ ...prev, [conversationId]: isTyping }));
      },
      []
   );

   // <-- Renamed incoming "read" handler -->
   const handleRead = useCallback(
      ({ conversationId, messageIds, readerUid }) => {
         if (!conversationId || !Array.isArray(messageIds)) return;
         setMessages((prev) => {
            const list = (prev[conversationId] || []).map((m) =>
               messageIds.includes(String(m._id)) ? { ...m, status: "read" } : m
            );
            return { ...prev, [conversationId]: list };
         });
      },
      []
   );

   // use the shared hook — returns a ref
   const socketRef = useChatSocket(
      handleIncoming,
      handleAck,
      handleTypingRemote,
      handleRead
   );

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
            toast.error("Failed to load conversations");
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
   }, [selectedConv, user, authFetch, socketRef]);

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

   // <-- LOCAL typing handler (input onChange) - renamed so it doesn't clash with remote handler -->
   const handleTypingLocal = (value) => {
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
      <div className={`min-h-screen ${themeBackgroundStyle}`}>
         <div className="container mx-auto px-4 py-8">
            <motion.div
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               className="mb-8"
            >
               <h1
                  className={`text-4xl font-bold mb-2 flex items-center gap-3 ${
                     theme === "dark" ? "text-gray-50" : "text-gray-800"
                  }`}
               >
                  <div
                     className={`p-2 rounded-lg ${
                        theme === "dark" ? "bg-blue-900" : "bg-blue-100"
                     }`}
                  >
                     <User
                        className={`${
                           theme === "dark" ? "text-blue-300" : "text-blue-600"
                        }`}
                        size={32}
                     />
                  </div>
                  Specialist Dashboard
               </h1>
               <p
                  className={`text-lg ${
                     theme === "dark" ? "text-gray-100" : "text-gray-600"
                  }`}
               >
                  Respond to farmers and manage conversations
               </p>
            </motion.div>

            <div
               className={`${themeForegroundStyle} rounded-xl shadow-lg border overflow-hidden h-[700px] flex ${
                  theme === "dark" ? "border-gray-600" : "border-gray-200"
               }`}
            >
               {/* Left: conversations */}
               <div
                  className={`w-1/3 border-r flex flex-col ${
                     theme === "dark" ? "border-gray-600" : "border-gray-200"
                  }`}
               >
                  <div
                     className={`p-4 border-b ${
                        theme === "dark"
                           ? "bg-blue-900 border-gray-600"
                           : "bg-blue-50 border-gray-200"
                     }`}
                  >
                     <h3
                        className={`font-bold text-xl ${
                           theme === "dark" ? "text-gray-50" : "text-gray-800"
                        }`}
                     >
                        Chats
                     </h3>
                     <p
                        className={`text-sm ${
                           theme === "dark" ? "text-gray-100" : "text-gray-600"
                        }`}
                     >
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
                              whileHover={{
                                 backgroundColor:
                                    theme === "dark" ? "#374151" : "#f8fafc",
                              }}
                              onClick={() => setSelectedConv(conv)}
                              className={`p-4 border-b cursor-pointer transition-colors ${
                                 theme === "dark"
                                    ? "border-gray-600"
                                    : "border-gray-100"
                              } ${
                                 selectedConv?._id === conv._id
                                    ? theme === "dark"
                                       ? "bg-blue-900 border-l-4 border-l-blue-400"
                                       : "bg-blue-50 border-l-4 border-l-blue-500"
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
                                       <h4
                                          className={`font-semibold truncate ${
                                             theme === "dark"
                                                ? "text-gray-50"
                                                : "text-gray-800"
                                          }`}
                                       >
                                          {profile.name || otherUid}
                                       </h4>
                                       {conv.unreadCounts &&
                                          conv.unreadCounts[user.uid] > 0 && (
                                             <span className="bg-green-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                                                {conv.unreadCounts[user.uid]}
                                             </span>
                                          )}
                                    </div>
                                    <p
                                       className={`text-sm truncate ${
                                          theme === "dark"
                                             ? "text-green-400"
                                             : "text-green-600"
                                       }`}
                                    >
                                       {profile.location || ""}
                                    </p>
                                    <p
                                       className={`text-xs truncate mt-1 ${
                                          theme === "dark"
                                             ? "text-gray-400"
                                             : "text-gray-400"
                                       }`}
                                    >
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
                        <div
                           className={`p-4 border-b ${
                              theme === "dark"
                                 ? "bg-green-900 border-gray-600"
                                 : "bg-green-50 border-gray-200"
                           }`}
                        >
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
                                    <h4
                                       className={`font-semibold ${
                                          theme === "dark"
                                             ? "text-gray-50"
                                             : "text-gray-800"
                                       }`}
                                    >
                                       {getProfile(
                                          getOtherParticipantUid(selectedConv)
                                       ).name || "Farmer"}
                                    </h4>
                                    <p
                                       className={`text-sm ${
                                          theme === "dark"
                                             ? "text-green-400"
                                             : "text-green-600"
                                       }`}
                                    >
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
                                    className={`p-2 rounded-lg transition-colors ${
                                       theme === "dark"
                                          ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
                                          : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                                    }`}
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
                                             ? theme === "dark"
                                                ? "bg-blue-600 text-white"
                                                : "bg-blue-500 text-white"
                                             : theme === "dark"
                                             ? "bg-gray-700 text-gray-200"
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
                                                   ? theme === "dark"
                                                      ? "text-blue-200"
                                                      : "text-blue-100"
                                                   : theme === "dark"
                                                   ? "text-gray-400"
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
                                                className={
                                                   theme === "dark"
                                                      ? "text-blue-200"
                                                      : "text-blue-100"
                                                }
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
                                 <div
                                    className={`px-4 py-2 rounded-lg ${
                                       theme === "dark"
                                          ? "bg-gray-700"
                                          : "bg-gray-100"
                                    }`}
                                 >
                                    <div className="flex items-center gap-1">
                                       <div className="flex gap-1">
                                          <div
                                             className={`w-2 h-2 rounded-full animate-bounce ${
                                                theme === "dark"
                                                   ? "bg-gray-400"
                                                   : "bg-gray-400"
                                             }`}
                                          />
                                          <div
                                             className={`w-2 h-2 rounded-full animate-bounce ${
                                                theme === "dark"
                                                   ? "bg-gray-400"
                                                   : "bg-gray-400"
                                             }`}
                                             style={{ animationDelay: "0.1s" }}
                                          />
                                          <div
                                             className={`w-2 h-2 rounded-full animate-bounce ${
                                                theme === "dark"
                                                   ? "bg-gray-400"
                                                   : "bg-gray-400"
                                             }`}
                                             style={{ animationDelay: "0.2s" }}
                                          />
                                       </div>
                                       <span
                                          className={`text-xs ml-2 ${
                                             theme === "dark"
                                                ? "text-gray-400"
                                                : "text-gray-500"
                                          }`}
                                       >
                                          typing...
                                       </span>
                                    </div>
                                 </div>
                              </motion.div>
                           )}

                           <div ref={messagesEndRef} />
                        </div>

                        {/* input */}
                        <div
                           className={`p-4 border-t ${
                              theme === "dark"
                                 ? "bg-gray-800 border-gray-600"
                                 : "bg-gray-50 border-gray-200"
                           }`}
                        >
                           <div className="flex items-center gap-3">
                              <input
                                 aria-label="Type your reply"
                                 type="text"
                                 value={newMessage}
                                 onChange={(e) =>
                                    handleTypingLocal(e.target.value)
                                 }
                                 onKeyDown={(e) =>
                                    e.key === "Enter" && handleSendMessage()
                                 }
                                 placeholder="Write a reply..."
                                 className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    theme === "dark"
                                       ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400"
                                       : "bg-white border-gray-200 text-gray-700 placeholder-gray-500"
                                 }`}
                              />
                              <motion.button
                                 whileHover={{ scale: 1.05 }}
                                 whileTap={{ scale: 0.95 }}
                                 onClick={handleSendMessage}
                                 disabled={!newMessage.trim()}
                                 className={`px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 ${
                                    theme === "dark"
                                       ? "bg-blue-600 hover:bg-blue-700 text-white"
                                       : "bg-blue-500 hover:bg-blue-600 text-white"
                                 }`}
                              >
                                 <Send size={18} /> Send
                              </motion.button>
                           </div>
                        </div>
                     </>
                  ) : (
                     <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                           <div
                              className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${
                                 theme === "dark"
                                    ? "bg-gray-700"
                                    : "bg-gray-100"
                              }`}
                           >
                              <User
                                 size={40}
                                 className={
                                    theme === "dark"
                                       ? "text-gray-400"
                                       : "text-gray-400"
                                 }
                              />
                           </div>
                           <h3
                              className={`text-xl font-semibold mb-2 ${themeForegroundStyle}`}
                           >
                              Select a Conversation
                           </h3>
                           <p className={themeForegroundStyle}>
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
