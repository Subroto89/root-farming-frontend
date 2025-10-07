import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
   Send,
   Phone,
   Video,
   MoveVertical as MoreVertical,
   User,
   Clock,
   CheckCheck,
   Star,
} from "lucide-react";
import { io } from "socket.io-client";
import toast from "react-hot-toast";

// Mock data for farmers who have contacted the specialist
const mockFarmers = [
   {
      id: "farmer1",
      name: "John Smith",
      location: "Iowa, USA",
      avatar:
         "https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      status: "online",
      lastSeen: new Date(),
      farmType: "Corn & Soybean",
      lastMessage: "Thank you for the advice about soil testing!",
      unreadCount: 0,
   },
   {
      id: "farmer2",
      name: "Maria Garcia",
      location: "California, USA",
      avatar:
         "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      status: "online",
      lastSeen: new Date(),
      farmType: "Organic Vegetables",
      lastMessage: "I have some questions about pest control",
      unreadCount: 2,
   },
   {
      id: "farmer3",
      name: "David Johnson",
      location: "Texas, USA",
      avatar:
         "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      status: "away",
      lastSeen: new Date(Date.now() - 1800000),
      farmType: "Cattle Ranch",
      lastMessage: "When is the best time to plant winter wheat?",
      unreadCount: 1,
   },
   {
      id: "farmer4",
      name: "Sarah Wilson",
      location: "Nebraska, USA",
      avatar:
         "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      status: "offline",
      lastSeen: new Date(Date.now() - 7200000),
      farmType: "Wheat & Barley",
      lastMessage: "The fertilizer recommendations worked great!",
      unreadCount: 0,
   },
];

// Mock messages from specialist perspective
const mockMessages = {
   farmer1: [
      {
         id: 1,
         senderId: "spec1",
         senderType: "specialist",
         message:
            "Hello John! I see you have some questions about soil testing. How can I help you today?",
         timestamp: new Date(Date.now() - 3600000),
         status: "read",
      },
      {
         id: 2,
         senderId: "farmer1",
         senderType: "farmer",
         message:
            "Hi Dr. Johnson! I want to test my soil before planting season. What should I look for?",
         timestamp: new Date(Date.now() - 3500000),
         status: "read",
      },
      {
         id: 3,
         senderId: "spec1",
         senderType: "specialist",
         message:
            "Great question! You should test for pH levels, nitrogen, phosphorus, and potassium. I recommend testing every 2-3 years.",
         timestamp: new Date(Date.now() - 3400000),
         status: "read",
      },
      {
         id: 4,
         senderId: "farmer1",
         senderType: "farmer",
         message: "Thank you for the advice about soil testing!",
         timestamp: new Date(Date.now() - 300000),
         status: "read",
      },
   ],
   farmer2: [
      {
         id: 5,
         senderId: "farmer2",
         senderType: "farmer",
         message:
            "Hello! I need help with organic pest control methods for my vegetable farm.",
         timestamp: new Date(Date.now() - 1800000),
         status: "delivered",
      },
      {
         id: 6,
         senderId: "farmer2",
         senderType: "farmer",
         message: "I have some questions about pest control",
         timestamp: new Date(Date.now() - 600000),
         status: "delivered",
      },
   ],
};

const SpecialistChat = () => {
   const [selectedFarmer, setSelectedFarmer] = useState(null);
   const [messages, setMessages] = useState({});
   const [newMessage, setNewMessage] = useState("");
   const [socket, setSocket] = useState(null);
   const [typingUsers, setTypingUsers] = useState({});
   const [isTyping, setIsTyping] = useState(false);
   const messagesEndRef = useRef(null);
   const typingTimeoutRef = useRef(null);

   // Initialize socket connection
   useEffect(() => {
      const newSocket = io("http://localhost:3001", {
         query: { userId: "spec1", userType: "specialist" },
      });

      newSocket.on("connect", () => {
         console.log("Connected to server");
         toast.success("Connected to chat server");
      });

      newSocket.on("message", (message) => {
         setMessages((prev) => ({
            ...prev,
            [message.farmerId]: [...(prev[message.farmerId] || []), message],
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
   }, [messages, selectedFarmer]);

   const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
   };

   const handleSendMessage = () => {
      if (!newMessage.trim() || !selectedFarmer) return;

      const message = {
         id: Date.now(),
         senderId: "spec1",
         senderType: "specialist",
         message: newMessage,
         timestamp: new Date(),
         status: "sent",
         farmerId: selectedFarmer.id,
      };

      setMessages((prev) => ({
         ...prev,
         [selectedFarmer.id]: [...(prev[selectedFarmer.id] || []), message],
      }));

      if (socket) {
         socket.emit("message", {
            ...message,
            recipientId: selectedFarmer.id,
         });
      }

      setNewMessage("");
      handleStopTyping();
   };

   const handleTyping = (value) => {
      setNewMessage(value);

      if (!isTyping && selectedFarmer) {
         setIsTyping(true);
         socket?.emit("typing", {
            recipientId: selectedFarmer.id,
            isTyping: true,
         });
      }

      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
         handleStopTyping();
      }, 1000);
   };

   const handleStopTyping = () => {
      if (isTyping && selectedFarmer) {
         setIsTyping(false);
         socket?.emit("typing", {
            recipientId: selectedFarmer.id,
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
         <div className="container mx-auto px-4 py-8">
            {/* Header */}
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
                  Connect with farmers and provide expert agricultural guidance
               </p>
            </motion.div>

            {/* Main Chat Interface */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden h-[700px] flex">
               {/* Left Sidebar - Farmers List */}
               <div className="w-1/3 border-r border-gray-200 flex flex-col">
                  <div className="p-4 border-b border-gray-200 bg-blue-50">
                     <h3 className="font-semibold text-gray-800">
                        Your Farmers
                     </h3>
                     <p className="text-sm text-gray-600">
                        Farmers who have contacted you
                     </p>
                  </div>

                  <div className="flex-1 overflow-y-auto">
                     {mockFarmers.map((farmer) => (
                        <motion.div
                           key={farmer.id}
                           whileHover={{ backgroundColor: "#f8fafc" }}
                           onClick={() => setSelectedFarmer(farmer)}
                           className={`p-4 border-b border-gray-100 cursor-pointer transition-colors relative ${
                              selectedFarmer?.id === farmer.id
                                 ? "bg-blue-50 border-l-4 border-l-blue-500"
                                 : ""
                           }`}
                        >
                           <div className="flex items-center gap-3">
                              <div className="relative">
                                 <img
                                    src={farmer.avatar}
                                    alt={farmer.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                 />
                                 <div
                                    className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(
                                       farmer.status
                                    )}`}
                                 />
                              </div>
                              <div className="flex-1 min-w-0">
                                 <div className="flex items-center justify-between">
                                    <h4 className="font-semibold text-gray-800 truncate">
                                       {farmer.name}
                                    </h4>
                                    {farmer.unreadCount > 0 && (
                                       <span className="bg-green-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                                          {farmer.unreadCount}
                                       </span>
                                    )}
                                 </div>
                                 <p className="text-sm text-green-600 truncate">
                                    {farmer.farmType}
                                 </p>
                                 <p className="text-xs text-gray-500 truncate">
                                    {farmer.location}
                                 </p>
                                 <p className="text-xs text-gray-400 truncate mt-1">
                                    {farmer.lastMessage}
                                 </p>
                                 {farmer.status === "online" ? (
                                    <span className="text-xs text-green-600">
                                       Online now
                                    </span>
                                 ) : (
                                    <span className="text-xs text-gray-500">
                                       Last seen{" "}
                                       {formatLastSeen(farmer.lastSeen)}
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
                  {selectedFarmer ? (
                     <>
                        {/* Chat Header */}
                        <div className="p-4 border-b border-gray-200 bg-green-50">
                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                 <div className="relative">
                                    <img
                                       src={selectedFarmer.avatar}
                                       alt={selectedFarmer.name}
                                       className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div
                                       className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(
                                          selectedFarmer.status
                                       )}`}
                                    />
                                 </div>
                                 <div>
                                    <h4 className="font-semibold text-gray-800">
                                       {selectedFarmer.name}
                                    </h4>
                                    <p className="text-sm text-green-600">
                                       {selectedFarmer.farmType}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                       {selectedFarmer.location}
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
                           {(messages[selectedFarmer.id] || []).map(
                              (message) => (
                                 <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${
                                       message.senderType === "specialist"
                                          ? "justify-end"
                                          : "justify-start"
                                    }`}
                                 >
                                    <div
                                       className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                          message.senderType === "specialist"
                                             ? "bg-blue-500 text-white"
                                             : "bg-gray-100 text-gray-800"
                                       }`}
                                    >
                                       <p className="text-sm">
                                          {message.message}
                                       </p>
                                       <div
                                          className={`flex items-center gap-1 mt-1 ${
                                             message.senderType === "specialist"
                                                ? "justify-end"
                                                : "justify-start"
                                          }`}
                                       >
                                          <span
                                             className={`text-xs ${
                                                message.senderType ===
                                                "specialist"
                                                   ? "text-blue-100"
                                                   : "text-gray-500"
                                             }`}
                                          >
                                             {formatTime(message.timestamp)}
                                          </span>
                                          {message.senderType ===
                                             "specialist" && (
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

                           {/* Typing Indicator */}
                           {typingUsers[selectedFarmer.id] && (
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
                                 placeholder="Type your expert advice..."
                                 className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                              <motion.button
                                 whileHover={{ scale: 1.05 }}
                                 whileTap={{ scale: 0.95 }}
                                 onClick={handleSendMessage}
                                 disabled={!newMessage.trim()}
                                 className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                              >
                                 <Send size={18} />
                                 Send
                              </motion.button>
                           </div>
                        </div>
                     </>
                  ) : (
                     /* No Farmer Selected */
                     <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                           <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                              <User size={40} className="text-gray-400" />
                           </div>
                           <h3 className="text-xl font-semibold text-gray-800 mb-2">
                              Select a Farmer
                           </h3>
                           <p className="text-gray-600">
                              Choose a farmer from the left to start providing
                              guidance
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
