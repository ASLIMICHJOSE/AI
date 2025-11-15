import AssistantBubble from "./components/AssistantBubble";
import AssistantPanel from "./components/AssistantPanel";
import { AssistantProvider } from "./context/AssistantContext";

function App() {
  return (
    <AssistantProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <AssistantBubble />
        <AssistantPanel />
      </div>
    </AssistantProvider>
  );
}

export default App;
