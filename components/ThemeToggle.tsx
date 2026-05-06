"use client";

import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    // Check local storage or system preference on mount
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme as "light" | "dark");
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      setTheme("light");
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (theme === null) {
    return <div className={styles.toggleBtn} style={{ visibility: "hidden" }}></div>;
  }

  return (
    <button className={styles.toggleBtn} onClick={toggleTheme} aria-label="Toggle Dark Mode">
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
