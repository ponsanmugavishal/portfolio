"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import {
  Code2, Terminal, BriefcaseBusiness, Mail, Dumbbell, Headphones, BookOpen,
} from "lucide-react";

export const icons = {
  code: Code2,
  terminal: Terminal,
  briefcase: BriefcaseBusiness,
  mail: Mail,
  dumbbell: Dumbbell,
  headphones: Headphones,
  book: BookOpen,
};

// Fades + lifts its children into view when scrolled to.
export function Reveal({ children, delay = 0, y = 28, className = "", as = "div" }) {
  const Comp = motion[as] ?? motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  );
}

export function SectionHeading({ index, kicker, title, children }) {
  return (
    <div className="mb-12 md:mb-16">
      <Reveal>
        <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-accent">
          <span className="text-faint">{index}</span>
          <span className="h-px w-10 bg-accent/60" />
          {kicker}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl md:text-6xl">
          {title}
        </h2>
      </Reveal>
      {children && (
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{children}</p>
        </Reveal>
      )}
    </div>
  );
}

// Button/link that is gently pulled toward the cursor.
export function Magnetic({ children, className = "", strength = 0.3, ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.2 });

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={reset}
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
