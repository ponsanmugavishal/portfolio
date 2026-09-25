"use client";

import { motion } from "motion/react";
import useGlassShine from "@/lib/useGlassShine";
import { hover, spring } from "@/lib/motion";

const variants = { card: "glass", strong: "glass-strong", pill: "glass-pill" };

// Liquid glass surface. `interactive` adds the cursor shine plus hover lift / press squish.
export default function Glass({
  as = "div",
  variant = "card",
  interactive = false,
  refract = false,
  className = "",
  onPointerMove,
  children,
  ...props
}) {
  const shine = useGlassShine();
  const classes = [variants[variant], interactive && "glass-interactive", refract && "glass-refract", className]
    .filter(Boolean)
    .join(" ");

  if (!interactive) {
    const Tag = as;
    return (
      <Tag className={classes} onPointerMove={onPointerMove} {...props}>
        {children}
      </Tag>
    );
  }

  const MotionTag = motion[as] ?? motion.div;
  return (
    <MotionTag
      className={classes}
      onPointerMove={(e) => {
        shine(e);
        onPointerMove?.(e);
      }}
      whileHover={{ y: hover.lift }}
      whileTap={{ scale: hover.press }}
      transition={spring}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
