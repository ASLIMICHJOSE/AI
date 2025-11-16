import React from "react";
import AssistantBubble from "./components/AssistantBubble.jsx";
import AssistantPanel from "./components/AssistantPanel.jsx";
import { AssistantProvider } from "./context/AssistantContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

export default function App() {
  return (
    <ThemeProvider>
      <AssistantProvider>
        <div className="min-h-screen">
          {/* Optionally your site content can be here */}
          <main className="p-6">
            <h1 className="text-3xl font-bold">ur-assistent</h1>
            <p className="mt-2">Open the assistant bubble at bottom-right.</p>
          </main>

          <AssistantBubble />
          <AssistantPanel />
        </div>
      </AssistantProvider>
    </ThemeProvider>
  );
}
