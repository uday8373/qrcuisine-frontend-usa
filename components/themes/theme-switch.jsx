"use client";

import React, { useState, useEffect } from "react";

import { Classic } from "@theme-toggles/react";
import "@theme-toggles/react/css/Classic.css";
import { useTheme } from "next-themes";

const ThemeToggle = ({ color }) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (resolvedTheme) {
      setDarkMode(resolvedTheme === "dark");
    }
  }, [resolvedTheme]);

  const toggleDarkMode = (toggled) => {
    setDarkMode(toggled);
    setTheme(toggled ? "dark" : "light");
  };

  return (
    <Classic
      toggled={isDarkMode}
      onToggle={toggleDarkMode}
      duration={750}
      style={{ fontSize: 30, color: color }}
    />
  );
};

export default ThemeToggle;
