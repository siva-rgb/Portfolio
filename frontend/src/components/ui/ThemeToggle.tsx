import { Moon, Sun } from "lucide-react";

import { useTheme } from "../../context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      className="glass inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-slate-200 transition hover:border-accent-cyan/40 hover:text-white dark:text-slate-200"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="h-4 w-4 text-amber-300" /> : <Moon className="h-4 w-4 text-violet-600" />}
      <span className="hidden sm:inline">{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
}
