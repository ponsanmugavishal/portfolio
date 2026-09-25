"use client";

import { motion, useScroll, useSpring } from "motion/react";

// 2px blue → violet reading-progress bar at the very top of the page.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX, background: "linear-gradient(90deg, var(--btn-from), var(--btn-to))" }}
      className="fixed inset-x-0 top-0 z-[90] h-[2px] origin-left"
    />
  );
}
