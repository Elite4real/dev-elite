"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(()=>setMounted(true),[]);
  if (!mounted) return null;

  const active = (resolvedTheme ?? theme) === "dark";
  return (
    <button
      aria-label="Toggle theme"
      onClick={()=>setTheme(active ? "light" : "dark")}
      className="btn btn-ghost rounded-xl"
    >
      {active ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
