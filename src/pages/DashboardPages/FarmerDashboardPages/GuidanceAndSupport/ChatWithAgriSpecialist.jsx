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
import { AuthContext } from "../../../../contexts/AuthContext";
import useChatSocket from "../../../../hooks/useChatSocket";

const CHAT_SERVER =
   import.meta.env.VITE_Server_API_KEY || "http://localhost:3001";

const ChatWithAgriSpecialist = () => {
   // --- Replace mockSpecialists/mockMessages with your real data or keep mocks
   const mockSpecialists = [
      /* same mockSpecialists you provided earlier (include uid as id values) */
      {
         id: "spec1",
         name: "Dr. Sarah Johnson",
         specialty: "Crop Disease Expert",
         avatar:
            "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg",
         status: "online",
         lastSeen: new Date(),
         rating: 4.9,
         experience: "15 years",
      },
      // ... other specialists
   ];

   const { user, getToken } = useContext(AuthContext);
   const [selectedSpecialist, setSelectedSpecialist] = useState(null);
   const [messages, setMessages] = useState({}); // keyed by conversationId OR specialistId
   const [newMessage, setNewMessage] = useState("");
   const [conversationMap, setConversationMap] = useState({}); // specialistId -> conversationId (if exists)
   const [typingUsers, setTypingUsers] = useState({});
   const messagesEndRef = useRef(null);

   // Helper: scroll
   const scrollToBottom = useCallback(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
   }, []);

   useEffect(() => {
      scrollToBottom();
   }, [messages, selectedSpecialist, scrollToBottom]);

   // --- Message handlers passed into hook
   const handleIncomingMessage = useCallback(
      (msg) => {
         // server sends message with conversationId (string), _id, senderUid, text, createdAt
         const convKey =
            msg.conversationId || msg.senderUid || selectedSpecialist?.id;
         setMessages((prev) => {
            const list = [...(prev[convKey] || []), msg];
            return { ...prev, [convKey]: list };
         });
      },
      [selectedSpecialist]
   );

   const handleMessageAck = useCallback(
      (ack) => {
         // ack: { tempId, savedMessage }
         const { tempId, savedMessage } = ack || {};
         if (!tempId || !savedMessage) return;

         const convKey = savedMessage.conversationId || selectedSpecialist?.id;
         setMessages((prev) => {
            const list = (prev[convKey] || []).map((m) =>
               m.tempId && m.tempId === tempId
                  ? { ...savedMessage, tempId: undefined }
                  : m
            );
            // ensure savedMessage included (if temp not found)
            const hasSaved = list.some(
               (m) => m._id && String(m._id) === String(savedMessage._id)
            );
            if (!hasSaved) list.push(savedMessage);
            return { ...prev, [convKey]: list };
         });

         // Save conversationId mapping if we created new conversation server-side
         if (savedMessage.conversationId && selectedSpecialist) {
            setConversationMap((prev) => ({
               ...prev,
               [selectedSpecialist.id]: savedMessage.conversationId,
            }));
         }
      },
      [selectedSpecialist]
   );

   const handleTypingPayload = useCallback((payload) => {
      // payload: { conversationId, userId, isTyping }
      const convKey = payload.conversationId || payload.userId;
      setTypingUsers((prev) => ({ ...prev, [convKey]: payload.isTyping }));
      // clear typing after a timeout if isTyping false will come from server; optional local debounce
   }, []);

   // --- initialize socket
   const socketRef = useChatSocket(
      handleIncomingMessage,
      handleMessageAck,
      handleTypingPayload
   );

   // --- Load conversationId if exists and message history when selecting specialist
   useEffect(() => {
      if (!selectedSpecialist || !user) return;

      (async () => {
         try {
            // 1) Get conversations for current user and see if one exists with this specialist
            const token = await getToken();
            const resConv = await fetch(
               `${CHAT_SERVER}/api/chat/conversations`,
               {
                  headers: { Authorization: `Bearer ${token}` },
               }
            );
            if (!resConv.ok) throw new Error("Failed to load conversations");
            const convList = await resConv.json();

            // server stores participants as array of UIDs; find a conversation with both participants
            const found = convList.find((c) =>
               (c.participants || []).includes(selectedSpecialist.id)
            );

            if (found) {
               setConversationMap((prev) => ({
                  ...prev,
                  [selectedSpecialist.id]: String(found._id),
               }));
               // fetch messages
               const msgsRes = await fetch(
                  `${CHAT_SERVER}/api/chat/conversations/${found._id}/messages?limit=50`,
                  {
                     headers: { Authorization: `Bearer ${token}` },
                  }
               );
               if (!msgsRes.ok) throw new Error("Failed to load messages");
               const msgs = await msgsRes.json();
               // key by conversationId
               setMessages((prev) => ({ ...prev, [String(found._id)]: msgs }));
            } else {
               // no conversation yet — keep messages keyed by specialist.id until server creates conv
               setMessages((prev) => ({
                  ...prev,
                  [selectedSpecialist.id]: [],
               }));
            }
         } catch (err) {
            console.error("Load conversation error:", err);
         }
      })();
   }, [selectedSpecialist, user, getToken]);

   // --- send message (optimistic)
   const handleSendMessage = async () => {
      if (!newMessage.trim() || !selectedSpecialist || !socketRef.current)
         return;

      const tempId = `temp-${Date.now()}`;
      const convId = conversationMap[selectedSpecialist.id]; // may be undefined

      // optimistic message object (status: sending)
      const optimisticMsg = {
         tempId,
         senderUid: user?.uid,
         senderRole: "farmer",
         text: newMessage,
         createdAt: new Date().toISOString(),
         status: "sending",
         conversationId: convId || selectedSpecialist.id, // use specialist.id as temp conv key until ack
      };

      // append locally
      setMessages((prev) => {
         const key = convId || selectedSpecialist.id;
         const list = [...(prev[key] || []), optimisticMsg];
         return { ...prev, [key]: list };
      });

      // emit over socket
      socketRef.current.emit("message", {
         tempId,
         conversationId: convId, // if undefined, server will create conversation
         recipientUid: selectedSpecialist.id,
         text: newMessage.trim(),
         senderRole: "farmer",
      });

      setNewMessage("");
      // stop typing
      socketRef.current.emit("typing", {
         conversationId: convId,
         recipientUid: selectedSpecialist.id,
         isTyping: false,
      });
   };

   // typing handler (debounced)
   const typingTimeoutRef = useRef(null);
   const handleTypingLocal = (value) => {
      setNewMessage(value);

      if (!socketRef.current || !selectedSpecialist) return;

      socketRef.current.emit("typing", {
         conversationId: conversationMap[selectedSpecialist.id],
         recipientUid: selectedSpecialist.id,
         isTyping: true,
      });

      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
         socketRef.current.emit("typing", {
            conversationId: conversationMap[selectedSpecialist.id],
            recipientUid: selectedSpecialist.id,
            isTyping: false,
         });
      }, 900);
   };

   // --- UI render (keeps most of your original component)
   return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
         <div className="container mx-auto px-4 py-8">
            <motion.div
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               className="mb-8"
            >
               <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                     <User className="text-green-600" size={32} />
                  </div>
                  Agriculture Specialist Chat
               </h1>
               <p className="text-gray-600 text-lg">
                  Connect with expert agriculture specialists for personalized
                  farming advice
               </p>
            </motion.div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden h-[700px] flex">
               <div className="w-1/3 border-r border-gray-200 flex flex-col">
                  <div className="p-4 border-b border-gray-200 bg-green-50">
                     <h3 className="font-semibold text-gray-800">
                        Available Specialists
                     </h3>
                     <p className="text-sm text-gray-600">
                        Choose a specialist to start chatting
                     </p>
                  </div>

                  <div className="flex-1 overflow-y-auto">
                     {mockSpecialists.map((specialist) => (
                        <motion.div
                           key={specialist.id}
                           whileHover={{ backgroundColor: "#f8fafc" }}
                           onClick={() => setSelectedSpecialist(specialist)}
                           className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                              selectedSpecialist?.id === specialist.id
                                 ? "bg-green-50 border-l-4 border-l-green-500"
                                 : ""
                           }`}
                        >
                           <div className="flex items-center gap-3">
                              <div className="relative">
                                 <img
                                    src={specialist.avatar}
                                    alt={specialist.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                 />
                                 <div
                                    className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                                       specialist.status === "online"
                                          ? "bg-green-500"
                                          : specialist.status === "away"
                                          ? "bg-yellow-500"
                                          : "bg-gray-400"
                                    }`}
                                 />
                              </div>
                              <div className="flex-1 min-w-0">
                                 <h4 className="font-semibold text-gray-800 truncate">
                                    {specialist.name}
                                 </h4>
                                 <p className="text-sm text-blue-600 truncate">
                                    {specialist.specialty}
                                 </p>
                                 <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs text-gray-500">
                                       {specialist.rating}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                       •
                                    </span>
                                    <span className="text-xs text-gray-500">
                                       {specialist.experience}
                                    </span>
                                 </div>
                                 {specialist.status === "online" ? (
                                    <span className="text-xs text-green-600">
                                       Online now
                                    </span>
                                 ) : (
                                    <span className="text-xs text-gray-500">
                                       Last seen
                                    </span>
                                 )}
                              </div>
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </div>

               <div className="flex-1 flex flex-col">
                  {selectedSpecialist ? (
                     <>
                        <div className="p-4 border-b border-gray-200 bg-blue-50">
                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                 <div className="relative">
                                    <img
                                       src={selectedSpecialist.avatar}
                                       alt={selectedSpecialist.name}
                                       className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div
                                       className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                                          selectedSpecialist.status === "online"
                                             ? "bg-green-500"
                                             : selectedSpecialist.status ===
                                               "away"
                                             ? "bg-yellow-500"
                                             : "bg-gray-400"
                                       }`}
                                    />
                                 </div>
                                 <div>
                                    <h4 className="font-semibold text-gray-800">
                                       {selectedSpecialist.name}
                                    </h4>
                                    <p className="text-sm text-blue-600">
                                       {selectedSpecialist.specialty}
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

                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                           {(
                              messages[
                                 conversationMap[selectedSpecialist.id] ||
                                    selectedSpecialist.id
                              ] || []
                           ).map((message) => (
                              <motion.div
                                 key={message._id || message.tempId}
                                 initial={{ opacity: 0, y: 20 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 className={`flex ${
                                    message.senderRole === "farmer"
                                       ? "justify-end"
                                       : "justify-start"
                                 }`}
                              >
                                 <div
                                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                       message.senderRole === "farmer"
                                          ? "bg-green-500 text-white"
                                          : "bg-gray-100 text-gray-800"
                                    }`}
                                 >
                                    <p className="text-sm">{message.text}</p>
                                    <div
                                       className={`flex items-center gap-1 mt-1 ${
                                          message.senderRole === "farmer"
                                             ? "justify-end"
                                             : "justify-start"
                                       }`}
                                    >
                                       <span
                                          className={`text-xs ${
                                             message.senderRole === "farmer"
                                                ? "text-green-100"
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
                                       {message.senderRole === "farmer" && (
                                          <CheckCheck
                                             size={12}
                                             className="text-green-100"
                                          />
                                       )}
                                    </div>
                                 </div>
                              </motion.div>
                           ))}

                           {typingUsers[
                              conversationMap[selectedSpecialist.id] ||
                                 selectedSpecialist.id
                           ] && (
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

                        <div className="p-4 border-t border-gray-200 bg-gray-50">
                           <div className="flex items-center gap-3">
                              <input
                                 aria-label="Type your message"
                                 type="text"
                                 value={newMessage}
                                 onChange={(e) =>
                                    handleTypingLocal(e.target.value)
                                 }
                                 onKeyDown={(e) =>
                                    e.key === "Enter" && handleSendMessage()
                                 }
                                 placeholder="Type your message..."
                                 className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              />
                              <motion.button
                                 whileHover={{ scale: 1.05 }}
                                 whileTap={{ scale: 0.95 }}
                                 onClick={handleSendMessage}
                                 disabled={!newMessage.trim()}
                                 className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
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
                              Select a Specialist
                           </h3>
                           <p className="text-gray-600">
                              Choose a specialist from the left to start
                              chatting
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

export default ChatWithAgriSpecialist;
