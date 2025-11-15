import { createContext, useContext, useState } from "react";

const AssistantContext = createContext();

export const AssistantProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I'm your AI assistant 🤖\nHow can I help you today?" }
  ]);

  const sendMessage = async (text, aiCallback) => {
    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);

    const reply = await aiCallback(newMessages);
    setMessages(prev => [...prev, { role: "assistant", content: reply }]);
  };

  return (
    <AssistantContext.Provider value={{ isOpen, setIsOpen, messages, sendMessage }}>
      {children}
    </AssistantContext.Provider>
  );
};

export const useAssistant = () => useContext(AssistantContext);
