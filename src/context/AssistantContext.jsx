import React, { createContext, useContext, useEffect, useState } from "react";

const AssistantContext = createContext();

export const AssistantProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  // messages: array of { role, content, isTyping?, time? }
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("ur-chat");
    return saved
      ? JSON.parse(saved)
      : [{ role: "assistant", content: "Hello! I'm your AI assistant 🤖 How can I help?" }];
  });

  useEffect(() => {
    localStorage.setItem("ur-chat", JSON.stringify(messages));
  }, [messages]);

  // sendMessage: userText (string), aiFn (function that returns string)
  const sendMessage = async (userText, aiFn) => {
    // Add user message
    setMessages(prev => [
      ...prev,
      { role: "user", content: userText, time: new Date().toISOString() },
    ]);

    // Add typing indicator
    setMessages(prev => [...prev, { role: "assistant", isTyping: true }]);

    // Prepare messages copy to send to AI
    const snapshot = await new Promise(resolve =>
      setTimeout(() => resolve(true), 0)
    ); // ensure state updates flush

    // Build messages for API: convert our state to model messages
    let current = JSON.parse(localStorage.getItem("ur-chat") || "[]");
    // append the last user message to current for the model
    const modelMessages = [
      ...current.map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.content })),
      { role: "user", content: userText }
    ];

    // Call the ai function
    let reply = "";
    try {
      reply = await aiFn(modelMessages);
    } catch (err) {
      console.error("aiFn error", err);
      reply = "Error: failed to get response from AI.";
    }

    // Remove typing and add reply
    setMessages(prev => {
      const filtered = prev.filter(m => !m.isTyping);
      return [
        ...filtered,
        { role: "assistant", content: reply, time: new Date().toISOString() },
      ];
    });
  };

  const clearChat = () => {
    setMessages([{ role: "assistant", content: "Hello! I'm your AI assistant 🤖" }]);
    localStorage.removeItem("ur-chat");
  };

  return (
    <AssistantContext.Provider value={{ isOpen, setIsOpen, messages, sendMessage, clearChat }}>
      {children}
    </AssistantContext.Provider>
  );
};

export const useAssistant = () => useContext(AssistantContext);
