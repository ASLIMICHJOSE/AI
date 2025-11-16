import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("ur-theme");
    return saved || "light";
  });

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark", "sepia");
    document.documentElement.classList.add(theme);
    localStorage.setItem("ur-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
