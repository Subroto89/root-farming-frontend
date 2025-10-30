
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useProducts } from '../../allProductsApi/UseProducts';
import { Send as SendIcon, MessageCircle as ChatIcon, X as CloseIcon } from 'lucide-react';
import './CustomChatbot.css';

const getBotResponse = (userMessage, products) => {
    const lowerCaseMessage = userMessage.toLowerCase();

    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
      return "Hello there! How can I help you today?";
    }

    if (lowerCaseMessage.includes('help')) {
      return "I can help with product information. Try: 'list products', 'tell me about [name]', or 'do you have [name]?'";
    }

    if (lowerCaseMessage.includes('list') || lowerCaseMessage.includes('products')) {
      return products.length > 0
        ? "Here are some products: " + products.slice(0, 5).map(p => p.name).join(", ")
        : "I couldn't find any products at the moment.";
    }

    if (lowerCaseMessage.includes('about') || lowerCaseMessage.includes('price') || lowerCaseMessage.includes('stock') || lowerCaseMessage.includes('do you have')) {
      const foundProduct = products.find(p => lowerCaseMessage.includes((p.name || '').toLowerCase()));
      if (foundProduct) {
        const priceText = foundProduct.price != null ? foundProduct.price : 'N/A';
        const stockText = foundProduct.inStock != null ? (foundProduct.inStock ? 'in stock' : 'out of stock') : 'availability unknown';
        return `Found ${foundProduct.name}. Price: ${priceText}. Status: ${stockText}.`;
      } else {
        return "I couldn't find a product with that name. Ask me to 'list products' to see what's available.";
      }
    }

    if (lowerCaseMessage.includes('thanks') || lowerCaseMessage.includes('thank you')) {
      return "You're welcome! Anything else I can help with?";
    }

    if (lowerCaseMessage.includes('bye') || lowerCaseMessage.includes('goodbye')) {
      return "Goodbye! Have a great day!";
    }

    const foundProduct = products.find(p => lowerCaseMessage.includes((p.name || '').toLowerCase()));
    if (foundProduct) {
        const priceText = foundProduct.price != null ? foundProduct.price : 'N/A';
        const stockText = foundProduct.inStock != null ? (foundProduct.inStock ? 'in stock' : 'out of stock') : 'availability unknown';
        return `Found ${foundProduct.name}. Price: ${priceText}. Status: ${stockText}.`;
    }

    return "I'm not sure how to help with that. Type 'help' to see options.";
  };


const CustomChatbot = ({ defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { data: products = [], isLoading } = useProducts();
  const chatboxRef = useRef(null);

  useEffect(() => {
    if (!isLoading) {
      setMessages([{ text: "Welcome to RootFarming! Ask me about our products.", sender: 'bot' }]);
    }
  }, [isLoading]);

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { text: inputValue, sender: 'user' };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponseText = getBotResponse(userMessage.text, products || []);
      const botMessage = { text: botResponseText, sender: 'bot' };
      setMessages([...newMessages, botMessage]);
      setIsTyping(false);
    }, 600);
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div>
      {isOpen && (
        <div className={`chat-window ${isOpen ? 'open' : ''}`}>
          <div className="header">RootFarming Assistant</div>
          <div className="message-area" ref={chatboxRef}>
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender === 'bot' ? 'bot-message' : 'user-message'}`}>
                {msg.text}
              </div>
            ))}
            {isTyping && <div className="message bot-message">...</div>}
          </div>
          <form onSubmit={handleSendMessage} className="input-area">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="input"
              placeholder="Ask a question..."
            />
            <button type="submit" className="send-button">
                <SendIcon size={20} />
            </button>
          </form>
        </div>
      )}
      <button onClick={toggleChat} className="floating-button" aria-label={isOpen ? 'Close chatbot' : 'Open chatbot'}>
        {isOpen ? <CloseIcon size={28} /> : <ChatIcon size={28} />}
      </button>
    </div>,
    document.body
  );
};

export default CustomChatbot;
