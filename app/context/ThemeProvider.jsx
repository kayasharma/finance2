"use client";
import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  const [colorScheme, setColorScheme] = useState(() => {
    if (typeof window === "undefined") return "blue";
    const saved = localStorage.getItem("colorScheme");
    return saved || "blue";
  });

  const [isThemeSidebarOpen, setIsThemeSidebarOpen] = useState(false);

  const toggleThemeSidebar = () => {
    console.log(
      "toggleThemeSidebar called, current state:",
      isThemeSidebarOpen
    );
    setIsThemeSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
    localStorage.setItem("colorScheme", colorScheme);
  }, [theme, colorScheme]);
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("colorScheme", colorScheme);
  }, [colorScheme]);
  const colorSchemes = {
    blue: {
      primary: "#3B82F6", // Tailwind blue-500
      chartColors: ["#60A5FA", "#93C5FD", "#BFDBFE", "#DBEAFE", "#EFF6FF"],
    },
    green: {
      primary: "#22C55E",
      chartColors: ["#34D399", "#6EE7B7", "#A7F3D0", "#D1FAE5", "#ECFDF5"],
    },
    purple: {
      primary: "#8B5CF6",
      chartColors: ["#A78BFA", "#C4B5FD", "#DDD6FE", "#EDE9FE", "#F5F3FF"],
    },
    orange: {
      primary: "#F97316",
      chartColors: ["#F97316", "#FB923C", "#FDBA74", "#FED7AA", "#FFEDD5"],
    },
    teal: {
      primary: "#14B8A6",
      chartColors: ["#2DD4BF", "#5EEAD4", "#99F6E4", "#CCFBF1", "#F0FDFA"],
    },
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        colorScheme,
        setTheme,
        setColorScheme,
        colorSchemes,
        isThemeSidebarOpen,
        toggleThemeSidebar,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
