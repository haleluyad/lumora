
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-10 w-36 rounded-lg border" aria-hidden="true" />
    );
  }

  return (
    <label className="flex items-center gap-2">
      <span className="sr-only">Choose color theme</span>
      <select
        value={theme ?? "system"}
        onChange={(event) => setTheme(event.target.value)}
        aria-label="Choose color theme"
        className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
    </label>
  );
}
