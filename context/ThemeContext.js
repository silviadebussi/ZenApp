import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    async function loadTheme() {
      const t = await AsyncStorage.getItem("theme");
      if (t !== null) setDark(JSON.parse(t));
    }
    loadTheme();
  }, []);

  async function toggleTheme() {
    const newTheme = !dark;
    setDark(newTheme);
    await AsyncStorage.setItem("theme", JSON.stringify(newTheme));
  }

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
