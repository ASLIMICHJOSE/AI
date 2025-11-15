import React, { useState } from 'react';
import ToolCard from '../ui/ToolCard';

const TranslateTool = () => {
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [translation, setTranslation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    setLoading(true);
    // Translation logic will be implemented here
    setLoading(false);
  };

  return (
    <ToolCard title="Translate Text" icon="🌐">
      <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="it">Italian</option>
      </select>
      <button onClick={handleTranslate} disabled={loading}>
        {loading ? 'Translating...' : 'Translate'}
      </button>
      {translation && <div className="translation-result">{translation}</div>}
    </ToolCard>
  );
};

export default TranslateTool;
