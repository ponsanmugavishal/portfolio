"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { themeColors } from "@/lib/theme";
import { ease, hover } from "@/lib/motion";

// Round glass button that switches between the light and dark theme.
export default function ThemeToggle({ className = "", size = 40 }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  const toggle = () => {
    const next = isDark ? "light" : "dark";
    setTheme(next);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", themeColors[next]);
  };

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      whileHover={{ y: hover.lift / 2 }}
      whileTap={{ scale: hover.press }}
      style={{ width: size, height: size }}
      className={`glass-pill grid shrink-0 place-items-center text-fg ${className}`}
    >
      {/* Icon only after mount: the server can't know the saved theme */}
      <span className="relative grid h-[18px] w-[18px] place-items-center" aria-hidden>
        {mounted && (
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isDark ? "moon" : "sun"}
              initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
              transition={{ duration: 0.3, ease }}
              className="absolute inset-0 grid place-items-center"
            >
              {isDark ? <Moon size={18} /> : <Sun size={18} />}
            </motion.span>
          </AnimatePresence>
        )}
      </span>
    </motion.button>
  );
}
