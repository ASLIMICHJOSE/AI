import React from "react";
import { motion } from "framer-motion";
import { FaRobot } from "react-icons/fa";
import { useAssistant } from "../context/AssistantContext.jsx";

export default function AssistantBubble() {
  const { isOpen, setIsOpen } = useAssistant();

  // ❗ If panel is open → DO NOT show bubble
  if (isOpen) return null;

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="fixed bottom-6 right-6 bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center cursor-pointer shadow-xl hover:bg-blue-500 z-50"
      onClick={() => setIsOpen(true)}
      aria-label="Open assistant"
    >
      <FaRobot className="text-white text-3xl" />
    </motion.button>
  );
}
