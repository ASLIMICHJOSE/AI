import React, { useState } from 'react';
import ToolCard from '../ui/ToolCard';

const HighlightTool = () => {
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleHighlight = async () => {
    setLoading(true);
    // Highlighting logic will be implemented here
    setLoading(false);
  };

  return (
    <ToolCard title="Highlight Key Points" icon="✨">
      <button onClick={handleHighlight} disabled={loading}>
        {loading ? 'Processing...' : 'Highlight Points'}
      </button>
      {highlights.length > 0 && (
        <ul className="highlights-list">
          {highlights.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      )}
    </ToolCard>
  );
};

export default HighlightTool;
