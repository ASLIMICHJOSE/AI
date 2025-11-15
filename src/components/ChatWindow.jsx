import { useState } from "react";
import { useAssistant } from "../context/AssistantContext";
import { groqChat } from "../aiConfig";

export default function ChatWindow() {
  const { messages, sendMessage } = useAssistant();
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    await sendMessage(input, groqChat);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 p-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg whitespace-pre-wrap ${
              msg.role === "assistant"
                ? "bg-blue-100 dark:bg-blue-800 text-black dark:text-white self-start"
                : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white self-end"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="flex gap-2 mt-2">
        <input
          className="flex-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-md outline-none text-black dark:text-white"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md text-white font-semibold"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}
