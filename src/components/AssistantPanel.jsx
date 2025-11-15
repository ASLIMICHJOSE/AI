import { motion } from "framer-motion";
import { useAssistant } from "../context/AssistantContext";
import { FaTimes } from "react-icons/fa";
import ChatWindow from "./ChatWindow";

export default function AssistantPanel() {
  const { isOpen, setIsOpen } = useAssistant();
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ x: 300 }}
      animate={{ x: 0 }}
      className="fixed top-0 right-0 w-96 h-full bg-white dark:bg-gray-900 shadow-2xl flex flex-col p-4"
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold dark:text-white">
          Your Assistant
        </h1>
        <FaTimes
          onClick={() => setIsOpen(false)}
          className="text-2xl cursor-pointer dark:text-white hover:text-red-500"
        />
      </div>

      <ChatWindow />
    </motion.div>
  );
}
