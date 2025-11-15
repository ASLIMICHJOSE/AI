import React from 'react';
import ToolCard from '../ui/ToolCard';
import { useTheme } from '../../context/ThemeContext';

const ThemeTool = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <ToolCard title="Theme Switcher" icon="🎨">
      <div className="theme-options">
        <button onClick={toggleTheme}>
          Current Theme: {theme === 'light' ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </ToolCard>
  );
};

export default ThemeTool;
