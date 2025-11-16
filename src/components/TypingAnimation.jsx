import React from "react";

export default function TypingAnimation() {
  return (
    <div className="flex gap-1 items-center">
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
    </div>
  );
}
