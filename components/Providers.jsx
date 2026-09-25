"use client";

import { MotionConfig } from "motion/react";
import ScrollProgress from "./ScrollProgress";
import CursorGlow from "./CursorGlow";

// Respects the visitor's "reduce motion" setting and adds global effects.
export default function Providers({ children }) {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <CursorGlow />
      {children}
    </MotionConfig>
  );
}
