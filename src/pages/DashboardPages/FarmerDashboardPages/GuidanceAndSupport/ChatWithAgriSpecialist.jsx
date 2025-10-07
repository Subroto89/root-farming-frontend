import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
   Send,
   Phone,
   Video,
   MoveVertical as MoreVertical,
   ArrowLeft,
   User,
   Clock,
   CheckCheck,
} from "lucide-react";
import { io } from "socket.io-client";
import toast from "react-hot-toast";

// Mock data for specialists
const mockSpecialists = [
   {
      id: "spec1",
      name: "Dr. Sarah Johnson",
      specialty: "Crop Disease Expert",
      avatar:
         "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      status: "online",
      lastSeen: new Date(),
      rating: 4.9,
      experience: "15 years",
   },
   {
      id: "spec2",
      name: "Dr. Michael Chen",
      specialty: "Soil & Nutrition Specialist",
      avatar:
         "https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      status: "online",
      lastSeen: new Date(),
      rating: 4.8,
      experience: "12 years",
   },
   {
      id: "spec3",
      name: "Dr. Emily Rodriguez",
      specialty: "Organic Farming Consultant",
      avatar:
         "https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      status: "away",
      lastSeen: new Date(Date.now() - 300000),
      rating: 4.9,
      experience: "18 years",
   },
   {
      id: "spec4",
      name: "Dr. James Wilson",
      specialty: "Pest Control Expert",
      avatar:
         "https://images.pexels.com/photos/6749774/pexels-photo-6749774.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      status: "offline",
      lastSeen: new Date(Date.now() - 3600000),
      rating: 4.7,
      experience: "10 years",
   },
];

// Mock messages
const mockMessages = {
   spec1: [
      {
         id: 1,
         senderId: "spec1",
         senderType: "specialist",
         message:
            "Hello! I see you have some questions about crop diseases. How can I help you today?",
         timestamp: new Date(Date.now() - 3600000),
         status: "read",
      },
      {
         id: 2,
         senderId: "farmer1",
         senderType: "farmer",
         message:
            "Hi Dr. Johnson! I'm noticing some yellow spots on my tomato leaves. Could this be a disease?",
         timestamp: new Date(Date.now() - 3500000),
         status: "read",
      },
      {
         id: 3,
         senderId: "spec1",
         senderType: "specialist",
         message:
            "Yellow spots on tomato leaves could indicate several issues. Can you send me a photo of the affected leaves?",
         timestamp: new Date(Date.now() - 3400000),
         status: "read",
      },
   ],
   spec2: [
      {
         id: 4,
         senderId: "spec2",
         senderType: "specialist",
         message:
            "Good morning! I'm here to help with any soil and nutrition questions you might have.",
         timestamp: new Date(Date.now() - 7200000),
         status: "read",
      },
   ],
};
const ChatWithAgriSpecialist = () => {
   const [selectedSpecialist, setSelectedSpecialist] = useState(null);
   const [messages, setMessages] = useState({});
   const [newMessage, setNewMessage] = useState("");
   const [socket, setSocket] = useState(null);
   const [typingUsers, setTypingUsers] = useState({});
   const [isTyping, setIsTyping] = useState(false);
   const messagesEndRef = useRef(null);
   const typingTimeoutRef = useRef(null);

   // Initialize socket connection
   useEffect(() => {
      const newSocket = io("http://localhost:3000", {
         query: { userId: "farmer1", userType: "farmer" },
      });

      newSocket.on("connect", () => {
         console.log("Connected to server");
         toast.success("Connected to chat server");
      });

      newSocket.on("message", (message) => {
         setMessages((prev) => ({
            ...prev,
            [message.specialistId]: [
               ...(prev[message.specialistId] || []),
               message,
            ],
         }));
      });

      newSocket.on("typing", ({ userId, isTyping: typing }) => {
         setTypingUsers((prev) => ({
            ...prev,
            [userId]: typing,
         }));
      });

      setSocket(newSocket);
      setMessages(mockMessages);

      return () => {
         newSocket.close();
      };
   }, []);

   // Scroll to bottom when new messages arrive
   useEffect(() => {
      scrollToBottom();
   }, [messages, selectedSpecialist]);

   const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
   };

   const handleSendMessage = () => {
      if (!newMessage.trim() || !selectedSpecialist) return;

      const message = {
         id: Date.now(),
         senderId: "farmer1",
         senderType: "farmer",
         message: newMessage,
         timestamp: new Date(),
         status: "sent",
         specialistId: selectedSpecialist.id,
      };

      setMessages((prev) => ({
         ...prev,
         [selectedSpecialist.id]: [
            ...(prev[selectedSpecialist.id] || []),
            message,
         ],
      }));

      if (socket) {
         socket.emit("message", {
            ...message,
            recipientId: selectedSpecialist.id,
         });
      }

      setNewMessage("");
      handleStopTyping();
   };

   const handleTyping = (value) => {
      setNewMessage(value);

      if (!isTyping && selectedSpecialist) {
         setIsTyping(true);
         socket?.emit("typing", {
            recipientId: selectedSpecialist.id,
            isTyping: true,
         });
      }

      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
         handleStopTyping();
      }, 1000);
   };

   const handleStopTyping = () => {
      if (isTyping && selectedSpecialist) {
         setIsTyping(false);
         socket?.emit("typing", {
            recipientId: selectedSpecialist.id,
            isTyping: false,
         });
      }
   };

   const getStatusColor = (status) => {
      switch (status) {
         case "online":
            return "bg-green-500";
         case "away":
            return "bg-yellow-500";
         default:
            return "bg-gray-400";
      }
   };

   const formatTime = (date) => {
      return new Date(date).toLocaleTimeString([], {
         hour: "2-digit",
         minute: "2-digit",
      });
   };

   const formatLastSeen = (date) => {
      const now = new Date();
      const diff = now - new Date(date);
      const minutes = Math.floor(diff / 60000);
      const hours = Math.floor(diff / 3600000);

      if (minutes < 1) return "Just now";
      if (minutes < 60) return `${minutes}m ago`;
      if (hours < 24) return `${hours}h ago`;
      return new Date(date).toLocaleDateString();
   };

   return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
         <div className="container mx-auto px-4 py-8">
            {/* Header */}
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

            {/* Main Chat Interface */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden h-[700px] flex">
               {/* Left Sidebar - Specialists List */}
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
                                    className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(
                                       specialist.status
                                    )}`}
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
                                       Last seen{" "}
                                       {formatLastSeen(specialist.lastSeen)}
                                    </span>
                                 )}
                              </div>
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </div>

               {/* Right Side - Chat Window */}
               <div className="flex-1 flex flex-col">
                  {selectedSpecialist ? (
                     <>
                        {/* Chat Header */}
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
                                       className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(
                                          selectedSpecialist.status
                                       )}`}
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

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                           {(messages[selectedSpecialist.id] || []).map(
                              (message) => (
                                 <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${
                                       message.senderType === "farmer"
                                          ? "justify-end"
                                          : "justify-start"
                                    }`}
                                 >
                                    <div
                                       className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                          message.senderType === "farmer"
                                             ? "bg-green-500 text-white"
                                             : "bg-gray-100 text-gray-800"
                                       }`}
                                    >
                                       <p className="text-sm">
                                          {message.message}
                                       </p>
                                       <div
                                          className={`flex items-center gap-1 mt-1 ${
                                             message.senderType === "farmer"
                                                ? "justify-end"
                                                : "justify-start"
                                          }`}
                                       >
                                          <span
                                             className={`text-xs ${
                                                message.senderType === "farmer"
                                                   ? "text-green-100"
                                                   : "text-gray-500"
                                             }`}
                                          >
                                             {formatTime(message.timestamp)}
                                          </span>
                                          {message.senderType === "farmer" && (
                                             <CheckCheck
                                                size={12}
                                                className="text-green-100"
                                             />
                                          )}
                                       </div>
                                    </div>
                                 </motion.div>
                              )
                           )}

                           {/* Typing Indicator */}
                           {typingUsers[selectedSpecialist.id] && (
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

                        {/* Message Input */}
                        <div className="p-4 border-t border-gray-200 bg-gray-50">
                           <div className="flex items-center gap-3">
                              <input
                                 type="text"
                                 value={newMessage}
                                 onChange={(e) => handleTyping(e.target.value)}
                                 onKeyPress={(e) =>
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
                                 <Send size={18} />
                                 Send
                              </motion.button>
                           </div>
                        </div>
                     </>
                  ) : (
                     /* No Specialist Selected */
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
