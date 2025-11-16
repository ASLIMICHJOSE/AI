import React, { useEffect, useRef, useState } from "react";
import { useAssistant } from "../context/AssistantContext.jsx";
import { groqChat } from "../aiConfig.js";
import { runTools } from "../tools/toolController.js";
import TypingAnimation from "./TypingAnimation.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import ToolsDropdown from "./ToolsDropdown.jsx";

export default function ChatWindow() {
  const { messages, sendMessage, clearChat } = useAssistant();
  const [input, setInput] = useState("");
  const chatRef = useRef(null);
  const [listening, setListening] = useState(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    // Auto-scroll
    const el = chatRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  // handle sending: detect tool commands first
  const handleSend = async (text) => {
    const userText = (text ?? input).trim();
    if (!userText) return;
    setInput("");

    // quick local commands
    if (userText.toLowerCase() === "clear chat") {
      clearChat();
      return;
    }

    // Check tool controller
    const toolResp = await runTools(userText, { setTheme });
    if (toolResp) {
      // if toolResp is function? We expect string; show as assistant reply
      await sendMessage(userText, async () => toolResp);
      return;
    }

    // otherwise normal AI chat
    await sendMessage(userText, async (modelMessages) => {
      // modelMessages is array -> call groqChat
      return await groqChat(modelMessages);
    });
  };

  // Voice input (browser SpeechRecognition)
  const startVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition API not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.onerror = (e) => {
      console.error("SpeechRecognition error", e);
      setListening(false);
    };

    recognition.start();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Quick action buttons */}
      
  <ToolsDropdown onSelect={(cmd) => handleSend(cmd)} />

      {/* Messages */}
      <div ref={chatRef} id="chat-container" className="flex-1 overflow-y-auto space-y-3 p-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex items-end gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {/* Avatar */}
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">🤖</div>
            )}

            <div className={`p-3 rounded-lg whitespace-pre-wrap max-w-[75%] ${msg.role === "assistant" ? "bg-blue-100 dark:bg-blue-800 text-black dark:text-white" : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"}`}>
              {msg.isTyping ? <TypingAnimation /> : msg.content}
              <div className="text-xs opacity-60 mt-1">{msg.time ? new Date(msg.time).toLocaleTimeString() : ""}</div>
            </div>

            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">👤</div>
            )}
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="mt-2">
        <div className="flex gap-2 items-center">
          <button className="bg-gray-200 dark:bg-gray-700 p-2 rounded-md" onClick={startVoiceInput} title="Voice input">
            {listening ? "🎤..." : "🎤"}
          </button>

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask or use tool commands..."
            className="flex-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-md outline-none text-black dark:text-white"
          />

          <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md text-white font-semibold" onClick={() => handleSend()}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
