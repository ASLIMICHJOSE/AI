import React, { useState } from 'react';
import ToolCard from '../ui/ToolCard';

const ScreenshotTool = () => {
  const [screenshot, setScreenshot] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScreenshot = async () => {
    setLoading(true);
    // Screenshot logic will be implemented here
    setLoading(false);
  };

  return (
    <ToolCard title="Take Screenshot" icon="📸">
      <button onClick={handleScreenshot} disabled={loading}>
        {loading ? 'Capturing...' : 'Capture Screenshot'}
      </button>
      {screenshot && (
        <img src={screenshot} alt="Screenshot" className="screenshot-preview" />
      )}
    </ToolCard>
  );
};

export default ScreenshotTool;
