"use client";

import { useEffect } from "react";
import { MotionConfig } from "motion/react";
import { ThemeProvider, useTheme } from "next-themes";
import { themeColors } from "@/lib/theme";
import SmoothScroll from "./SmoothScroll";
import ScrollProgress from "./ScrollProgress";
import CursorGlow from "./CursorGlow";
import BackToTop from "./BackToTop";

// Keeps the browser UI colour (mobile address bar) in step with the theme.
function ThemeColorSync() {
  const { resolvedTheme } = useTheme();
  useEffect(() => {
    if (!resolvedTheme) return;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", themeColors[resolvedTheme]);
  }, [resolvedTheme]);
  return null;
}

// Theme (light by default), smooth scrolling, reduced-motion support and global effects.
export default function Providers({ children }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      <ThemeColorSync />
      <MotionConfig reducedMotion="user">
        <SmoothScroll>
          <ScrollProgress />
          <CursorGlow />
          {children}
          <BackToTop />
        </SmoothScroll>
      </MotionConfig>
    </ThemeProvider>
  );
}
