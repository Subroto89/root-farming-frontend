import React, { useState, useEffect } from "react";
import { useTheme } from "../../../hooks/useTheme";
import { useAuth } from "../../../hooks/useAuth";
import { URL } from "../../../constants";
import LoadingSpinner from "../../../components/LoadingSpinner";
import RFLogo from "../../../assets/Logo/Rootfarming.png";
import { v4 as uuidv4 } from 'uuid';

const ChatBot = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [question, setQuestion] = useState("");
  const [chatSessions, setChatSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedSessions = localStorage.getItem('chatSessions');
    const savedActiveId = localStorage.getItem('activeSessionId');

    if (savedSessions) {
      setChatSessions(JSON.parse(savedSessions));
      setActiveSessionId(savedActiveId ? JSON.parse(savedActiveId) : (JSON.parse(savedSessions)[0]?.id || null));
    } else {
      const newSessionId = uuidv4();
      const initialSessions = [
        {
          id: newSessionId,
          messages: [{ sender: "bot", text: "Hello! How can I help you today?" }],
          timestamp: new Date(),
        },
      ];
      setChatSessions(initialSessions);
      setActiveSessionId(newSessionId);
    }
  }, []);

  useEffect(() => {
    if (chatSessions.length > 0) {
      localStorage.setItem('chatSessions', JSON.stringify(chatSessions));
    }
    if (activeSessionId) {
      localStorage.setItem('activeSessionId', JSON.stringify(activeSessionId));
    }
  }, [chatSessions, activeSessionId]);

  const themeBackground = theme === "dark" ? "bg-gray-800" : "bg-gray-100";
   const themeForeground = theme === 'dark' ? "fg-dark" : "fg-light";
  const chatContainerBg = theme === "dark" ? "bg-gray-900" : "bg-white";
  const userFont = { fontFamily: "'Roboto', sans-serif" };
  const botFont = { fontFamily: "'Lora', serif" };

  const handleQuestion = async () => {
    if (!question.trim()) return;

    const userMessage = { sender: "user", text: question };

    const updatedSessions = chatSessions.map(session =>
      session.id === activeSessionId
        ? { ...session, messages: [...session.messages, userMessage], timestamp: new Date() }
        : session
    );
    setChatSessions(updatedSessions);

    setQuestion("");
    setLoading(true);
    setError(null);

    const payload = {
      contents: [{
        parts: [{ text: question }],
      }],
    };

    try {
      const response = await fetch(URL, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botResponse = { sender: "bot", text: data.candidates[0].content.parts[0].text };

      const finalSessions = updatedSessions.map(session =>
        session.id === activeSessionId
          ? { ...session, messages: [...session.messages, botResponse] }
          : session
      );
      setChatSessions(finalSessions);

    } catch (error) {
      setError("Failed to get a response. Please try again.");
      console.error("Error fetching bot response:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    const newSessionId = uuidv4();
    setChatSessions([
      ...chatSessions,
      {
        id: newSessionId,
        messages: [{ sender: "bot", text: "Hello! How can I help you today?" }],
        timestamp: new Date(),
      },
    ]);
    setActiveSessionId(newSessionId);
  };

  const handleDeleteSession = (sessionId) => {
    const filteredSessions = chatSessions.filter(session => session.id !== sessionId);
    setChatSessions(filteredSessions);
    if (activeSessionId === sessionId) {
      const newActiveId = filteredSessions.length > 0 ? filteredSessions[0].id : null;
      setActiveSessionId(newActiveId);
      if (!newActiveId) {
        localStorage.removeItem('activeSessionId');
        localStorage.removeItem('chatSessions');
      }
    }
  };

  const handleClearAllHistory = () => {
    if (window.confirm("Are you sure you want to delete all chat history?")) {
      setChatSessions([]);
      setActiveSessionId(null);
      localStorage.removeItem('chatSessions');
      localStorage.removeItem('activeSessionId');
    }
  };

  const BotAnswer = ({ text }) => {
    const parts = text.split(/(`+`+`+[\s\S]*?`+`+`+)/g);
    return (
      <ul className="list-disc list-inside">
        {parts.map((part, index) => {
          if (part.startsWith('```')) {
            const code = part.slice(3, -3);
            return (
              <pre key={index} className="bg-gray-700 text-white p-2 rounded-md my-2 overflow-x-auto">
                <code>{code}</code>
              </pre>
            );
          }
          return part.split('*').map((item, i) => (
            item.trim() && <li key={i} className="mb-2">{item.trim()}</li>
          ));
        })}
      </ul>
    );
  };

  const activeChat = chatSessions.find(session => session.id === activeSessionId);

  return (
    <div className={`${themeBackground} h-screen flex`}>
      {/* Left Section (Sidebar) */}
      <div className={`${themeBackground} w-1/5 h-screen border-r border-gray-700 p-4 flex flex-col`}>
        <h2 className="text-xl font-bold mb-4">Chat History</h2>
        <button 
          onClick={handleNewChat} 
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors mb-2"
        >
          New Chat
        </button>
        <button 
          onClick={handleClearAllHistory} 
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors mb-4"
        >
          Clear All History
        </button>
        <div className="flex-grow overflow-y-auto">
          {chatSessions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map(session => (
            <div key={session.id} className={`p-2 my-1 rounded-lg cursor-pointer flex justify-between items-center ${activeSessionId === session.id ? 'bg-transparent text-white' : 'hover:bg-gray-700'}`}>
              <span onClick={() => setActiveSessionId(session.id)} className="truncate flex-grow">
                {session.messages.find(m => m.sender === 'user')?.text || 'New Chat'}
              </span>
              <button onClick={() => handleDeleteSession(session.id)} className="ml-2 text-red-500 hover:text-red-400">X</button>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section (Chat Area) */}
      <div className={`w-4/5 h-screen flex flex-col ${themeBackground}`}>
        <div className="flex-grow p-6 overflow-auto">
          {activeChat && activeChat.messages.map((chat, index) => (
            <div key={index} className={`chat ${chat.sender === 'user' ? 'chat-end' : 'chat-start'}`}>
              <div className="chat-image avatar">
                <div className={`w-10 rounded-full ${chat.sender === 'bot' && 'bg-green-500 p-1'}`}>
                  <img alt={chat.sender} src={chat.sender === 'user' ? user?.photoURL : RFLogo} />
                </div>
              </div>
              <div className={`${themeForeground} p-2 rounded-lg`} style={chat.sender === 'user' ? userFont : botFont}>
                {chat.sender === 'bot' ? <BotAnswer text={chat.text} /> : chat.text}
              </div>
            </div>
          ))}
          {loading && <LoadingSpinner />}
          {error && <div className="text-red-500 p-4">{error}</div>}
        </div>

        <div className="p-4 border-t border-gray-700">
          <div className={`${themeForeground} w-full flex items-center bg-gray-200 dark:bg-gray-700 rounded-4xl px-4 py-3`}>
            <input
              type="text"
              className="flex-grow bg-transparent outline-none pl-4"
              onChange={(e) => setQuestion(e.target.value)}
              value={question}
              onKeyPress={(e) => e.key === 'Enter' && handleQuestion()}
              placeholder="Ask something..."
              disabled={!activeSessionId}
            />
            <button onClick={handleQuestion} className="ml-4 px-4 py-1 bg-blue-500 text-white rounded-4xl hover:bg-blue-600 transition-colors" disabled={!activeSessionId}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;