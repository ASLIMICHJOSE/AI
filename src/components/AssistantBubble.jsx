import { motion } from "framer-motion";
import { useAssistant } from "../context/AssistantContext";
import { FaRobot } from "react-icons/fa";

export default function AssistantBubble() {
  const { setIsOpen } = useAssistant();

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="fixed bottom-6 right-6 bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center cursor-pointer shadow-xl hover:bg-blue-500"
      onClick={() => setIsOpen(true)}
    >
      <FaRobot className="text-white text-3xl" />
    </motion.div>
  );
}
