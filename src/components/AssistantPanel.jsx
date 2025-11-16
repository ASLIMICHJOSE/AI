import React from "react";
import { motion } from "framer-motion";
import { FaTimes, FaPlus } from "react-icons/fa";
import { useAssistant } from "../context/AssistantContext.jsx";
import ChatWindow from "./ChatWindow.jsx";

export default function AssistantPanel() {
  const { isOpen, setIsOpen, clearChat } = useAssistant();
  if (!isOpen) return null;

  return (
    <motion.aside
      initial={{ x: 350 }}
      animate={{ x: 0 }}
      exit={{ x: 350 }}
      className="fixed top-0 right-0 w-96 h-full bg-white dark:bg-gray-900 shadow-2xl flex flex-col p-4 z-40"
    >
      <div className="flex items-center justify-between mb-3 gap-2">
        <div>
          <h2 className="text-lg font-bold dark:text-white">Your Assistant</h2>
          <p className="text-sm opacity-70">Chat-style tools & quick actions</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            title="New Chat"
            className="bg-green-600 text-white px-3 py-1 rounded-md text-sm flex items-center gap-2"
            onClick={() => {
              clearChat();
            }}
          >
            <FaPlus /> New
          </button>

          <FaTimes
            onClick={() => setIsOpen(false)}
            className="text-xl cursor-pointer dark:text-white hover:text-red-500"
          />
        </div>
      </div>

      <ChatWindow />
    </motion.aside>
  );
}
