import React, { useState } from "react";

export default function ToolsDropdown({ onSelect }) {
  const [open, setOpen] = useState(false);

  const tools = [
    { label: "📝 Summarize Page", command: "summarize this page" },
    { label: "🌎 Translate", command: "translate hello to tamil" },
    { label: "✨ Highlight", command: "highlight important points" },
    { label: "🌙 Dark Mode", command: "switch to dark mode" },
    { label: "☀️ Light Mode", command: "switch to light mode" },
    { label: "📜 Sepia Mode", command: "switch to sepia mode" },
    { label: "🔊 Read Text", command: "read this: Hello friend" },
    { label: "🗑 Clear Chat", command: "clear chat" },
  ];

  return (
    <div className="relative mb-2">
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-gray-200 dark:bg-gray-700 p-2 rounded-md font-semibold flex justify-between items-center"
      >
        Tools ⚡
        <span>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="absolute z-20 w-full mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-300 dark:border-gray-600">
          {tools.map((tool, index) => (
            <button
              key={index}
              onClick={() => {
                onSelect(tool.command);
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {tool.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
