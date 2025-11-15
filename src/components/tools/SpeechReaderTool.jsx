import React, { useState } from 'react';
import ToolCard from '../ui/ToolCard';

const SpeechReaderTool = () => {
  const [isReading, setIsReading] = useState(false);
  const [selectedText, setSelectedText] = useState('');

  const handleSpeechRead = () => {
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
    } else {
      // Speech reading logic will be implemented here
      setIsReading(true);
    }
  };

  return (
    <ToolCard title="Speech Reader" icon="🔊">
      <button onClick={handleSpeechRead}>
        {isReading ? 'Stop Reading' : 'Read Aloud'}
      </button>
      {selectedText && <p className="selected-text">{selectedText}</p>}
    </ToolCard>
  );
};

export default SpeechReaderTool;
