import React from "react";
import { useTheme } from "../../../hooks/useTheme";
import { useState } from "react";
import { URL } from "../../../constants";


const ChatBot = () => {
  const { theme } = useTheme();
  const [question, setQuestion] = useState("");

  // Theme Application ......................................................
  const themeBackground = theme === "dark" ? "bg-dark" : "bg-light";
  const themeForeground = theme === "dark" ? "fg-dark" : "fg-light";
  const themeFgOfFg = theme === "dark" ? "fg-of-fg-dark" : "fg-of-fg-light";

  let  payload ={
        "contents": [{
            "parts":[{"text": "Explain how AI works"}]
        }]
    }

  const handleQuestion = async () => {
    let response = await fetch(URL, {
        method: "post",
        body: JSON.stringify(payload)
    })
    
    response = response.json();
  }

  return (
    <div className={`${themeBackground} h-screen grid grid-cols-5`}>
      {/* Left Section */}
      <div className={`col-span-1 h-screen border-r border-gray-700`}></div>

      {/* Right Section */}
      <div className={`col-span-4 h-screen flex flex-col`}>
        {/* Display for Query And Reply */}
        <div className="h-120"></div>

        {/* Query Sending Section-The Input Field */}
        <div className="w-1/2 h-14 mx-auto rounded-4xl border border-gray-700 flex items-center">
          <input
            type="text"
            className="w-full mx-auto py-2 px-6 outline-none z-10"
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
          />

          <button onClick={handleQuestion} className="mr-5 cursor-pointer z-20">Ask</button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
