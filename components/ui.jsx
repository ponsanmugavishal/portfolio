"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import {
  BookOpen, BriefcaseBusiness, Code2, Database, Dumbbell, Headphones, Mail, Sparkles, Terminal, Wrench,
} from "lucide-react";
import { duration, ease, viewport } from "@/lib/motion";
import useGlassShine from "@/lib/useGlassShine";

// Icon names used in lib/site.js → lucide icons (generic icons only, no brand logos)
export const icons = {
  code: Code2,
  terminal: Terminal,
  briefcase: BriefcaseBusiness,
  mail: Mail,
  dumbbell: Dumbbell,
  headphones: Headphones,
  book: BookOpen,
  database: Database,
  sparkles: Sparkles,
  wrench: Wrench,
};

// Fades + lifts its children into view when scrolled to.
export function Reveal({ children, delay = 0, y = 28, className = "", as = "div", ...props }) {
  const Comp = motion[as] ?? motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: duration.reveal, delay, ease }}
      {...props}
    >
      {children}
    </Comp>
  );
}

export function SectionHeading({ index, kicker, title, children, center = false }) {
  return (
    <div className={`mb-12 md:mb-16 ${center ? "mx-auto text-center" : ""}`}>
      <Reveal>
        <p className={`text-label mb-5 flex items-center gap-3 text-accent ${center ? "justify-center" : ""}`}>
          <span className="text-faint">{index}</span>
          <span aria-hidden className="h-px w-10 bg-gradient-to-r from-accent to-accent-2" />
          {kicker}
        </p>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="text-section text-fg">{title}</h2>
      </Reveal>
      {children && (
        <Reveal delay={0.12}>
          <p className={`mt-5 max-w-2xl text-[17px] leading-relaxed text-muted md:text-lg ${center ? "mx-auto" : ""}`}>
            {children}
          </p>
        </Reveal>
      )}
    </div>
  );
}

// Link that is gently pulled toward the cursor (off for touch and reduced motion).
export function Magnetic({ children, className = "", strength = 0.3, ...props }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.2 });
  const shine = useGlassShine();

  const onMove = (e) => {
    shine(e);
    if (reduce || e.pointerType !== "mouse") return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      whileTap={{ scale: 0.97 }}
      className={className}
      {...props}
    >
      {children}
    </motion.a>
  );
}

// Softly pulsing accent dot used next to "Open to internships".
export function StatusDot({ size = 10 }) {
  return (
    <span className="relative inline-flex shrink-0" style={{ width: size, height: size }} aria-hidden>
      <span className="animate-ping-soft absolute inset-0 rounded-full bg-accent" />
      <span className="relative inline-flex h-full w-full rounded-full bg-accent" />
    </span>
  );
}
