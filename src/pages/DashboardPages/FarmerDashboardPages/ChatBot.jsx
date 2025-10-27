import React, { useState } from "react";
import { useTheme } from "../../../hooks/useTheme";
import { URL } from "../../../constants";
import LoadingSpinner from "../../../components/LoadingSpinner";

const ChatBot = () => {
  const { theme } = useTheme();
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Theme Application
  const themeBackground = theme === "dark" ? "bg-dark" : "bg-light";

  const handleQuestion = async () => {
    if (!question.trim()) return;

    const newChatHistory = [...chatHistory, { sender: "user", text: question }];
    setChatHistory(newChatHistory);
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
      const botResponse = data.candidates[0].content.parts[0].text;

      setChatHistory([...newChatHistory, { sender: "bot", text: botResponse }]);
    } catch (error) {
      setError("Failed to get a response. Please try again.");
      console.error("Error fetching bot response:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${themeBackground} h-screen grid grid-cols-5`}>
      {/* Left Section */}
      <div className={`col-span-1 h-screen border-r border-gray-700`}></div>

      {/* Right Section */}
      <div className={`col-span-4 h-screen flex flex-col`}>
        {/* Display for Query And Reply */}
        <div className="flex-grow p-6 overflow-auto">
          {chatHistory.map((chat, index) => (
            <div key={index} className={`chat ${chat.sender === 'user' ? 'chat-end' : 'chat-start'}`}>
              <div className="chat-bubble">
                {chat.text}
              </div>
            </div>
          ))}
          {loading && <LoadingSpinner />}
          {error && <div className="text-red-500">{error}</div>}
        </div>

        {/* Query Sending Section-The Input Field */}
        <div className="w-1/2 h-14 mx-auto rounded-4xl border border-gray-700 flex items-center mb-4">
          <input
            type="text"
            className="w-full mx-auto py-2 px-6 outline-none z-10 bg-transparent"
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
            onKeyPress={(e) => e.key === 'Enter' && handleQuestion()}
            placeholder="Ask something..."
          />
          <button onClick={handleQuestion} className="mr-5 cursor-pointer z-20">
            Ask
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
