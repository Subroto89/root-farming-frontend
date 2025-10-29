
// import React, { useState, useEffect, useRef } from 'react';
// import { useProducts } from '../../allProductsApi/UseProducts';
// import { Send as SendIcon, MessageCircle as ChatIcon, X as CloseIcon } from 'lucide-react';
// import './CustomChatbot.css';

// const getBotResponse = (userMessage, products) => {
//     const lowerCaseMessage = userMessage.toLowerCase();
  
//     // Greetings
//     if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
//       return "Hello there! How can I help you today?";
//     }
  
//     // Help
//     if (lowerCaseMessage.includes('help')) {
//       return "I can help with product information. You can ask me things like: 'list all products', 'tell me about [product name]', or 'do you have [product name]?'";
//     }
  
//     // Product listing
//     if (lowerCaseMessage.includes('list') || lowerCaseMessage.includes('products')) {
//       return products.length > 0
//         ? "Here are some of our products: " + products.slice(0, 5).map(p => p.name).join(", ")
//         : "I couldn't find any products at the moment.";
//     }
  
//     // Product details
//     if (lowerCaseMessage.includes('about') || lowerCaseMessage.includes('price') || lowerCaseMessage.includes('stock') || lowerCaseMessage.includes('do you have')) {
//       const foundProduct = products.find(p => lowerCaseMessage.includes(p.name.toLowerCase()));
//       if (foundProduct) {
//         return `Found ${foundProduct.name}! It costs ${foundProduct.price}. It is currently ${foundProduct.inStock ? 'in stock' : 'out of stock'}.`;
//       } else {
//         return "I couldn't find a product with that name. Try asking me to 'list all products' to see what's available.";
//       }
//     }
  
//     // Thank you
//     if (lowerCaseMessage.includes('thanks') || lowerCaseMessage.includes('thank you')) {
//       return "You're welcome! Is there anything else I can help with?";
//     }
  
//     // Goodbye
//     if (lowerCaseMessage.includes('bye') || lowerCaseMessage.includes('goodbye')) {
//       return "Goodbye! Have a great day!";
//     }
  
//     // Fallback search
//     const foundProduct = products.find(p => lowerCaseMessage.includes(p.name.toLowerCase()));
//     if (foundProduct) {
//         return `Found ${foundProduct.name}! It costs ${foundProduct.price}. It is currently ${foundProduct.inStock ? 'in stock' : 'out of stock'}.`;
//     }
  
//     return "I'm not sure how to help with that. Try asking for 'help' to see what I can do.";
//   };


// // --- Main Component ---
// const CustomChatbot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [inputValue, setInputValue] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const { data: products, isLoading } = useProducts();
//   const chatboxRef = useRef(null);

//   // Add initial message when products load
//   useEffect(() => {
//     if (!isLoading && products) {
//       setMessages([{ text: "Welcome to RootFarming! Ask me about our products.", sender: 'bot' }]);
//     }
//   }, [isLoading, products]);

//   // Auto-scroll to bottom
//   useEffect(() => {
//     if (chatboxRef.current) {
//       chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
//     }
//   }, [messages, isTyping]);

//   const toggleChat = () => setIsOpen(!isOpen);

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (!inputValue.trim()) return;

//     const userMessage = { text: inputValue, sender: 'user' };
//     const newMessages = [...messages, userMessage];
//     setMessages(newMessages);
//     setInputValue('');
//     setIsTyping(true);

//     setTimeout(() => {
//       const botResponseText = getBotResponse(inputValue, products || []);
//       const botMessage = { text: botResponseText, sender: 'bot' };
//       setMessages([...newMessages, botMessage]);
//       setIsTyping(false);
//     }, 1000);
//   };

//   if (isLoading) {
//     return <button className="floating-button" disabled><ChatIcon size={28} /></button>;
//   }

//   return (
//     <div>
//       {isOpen && (
//         <div className={`chat-window ${isOpen ? 'open' : ''}`}>
//           <div className="header">RootFarming Assistant</div>
//           <div className="message-area" ref={chatboxRef}>
//             {messages.map((msg, index) => (
//               <div key={index} className={`message ${msg.sender === 'bot' ? 'bot-message' : 'user-message'}`}>
//                 {msg.text}
//               </div>
//             ))}
//             {isTyping && <div className="message bot-message">...</div>}
//           </div>
//           <form onSubmit={handleSendMessage} className="input-area">
//             <input
//               type="text"
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               className="input"
//               placeholder="Ask a question..."
//             />
//             <button type="submit" className="send-button">
//                 <SendIcon size={20} />
//             </button>
//           </form>
//         </div>
//       )}
//       <button onClick={toggleChat} className="floating-button">
//         {isOpen ? <CloseIcon size={28} /> : <ChatIcon size={28} />}
//       </button>
//     </div>
//   );
// };

// export default CustomChatbot;
