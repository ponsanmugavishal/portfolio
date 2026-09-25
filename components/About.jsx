"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Sparkles } from "lucide-react";
import { about } from "@/lib/site";
import { icons, Reveal, SectionHeading } from "./ui";

// Each word lights up as the paragraph scrolls through the viewport.
function ScrollText({ text }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className="flex flex-wrap font-display text-2xl font-medium leading-snug tracking-tight sm:text-3xl md:text-[2.1rem]">
      {words.map((w, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return <Word key={i} progress={scrollYProgress} range={[start, end]}>{w}</Word>;
      })}
    </p>
  );
}

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <span className="relative mr-[0.28em] mt-1">
      <motion.span style={{ opacity }} className="text-cream">{children}</motion.span>
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-5 py-28 md:py-36">
      <SectionHeading index="01" kicker="About me" title={<>A little about <span className="text-gradient">who I am</span></>} />

      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.35fr_1fr]">
        <div>
          <ScrollText text={about.intro} />
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{about.body}</p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10">
              <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-faint">
                <Sparkles size={14} className="text-accent" /> Strengths
              </p>
              <ul className="flex flex-wrap gap-2.5">
                {about.strengths.map((s) => (
                  <li key={s} className="rounded-full border border-line bg-white/[0.03] px-4 py-2 text-sm text-cream transition hover:border-accent/50 hover:text-accent">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {about.facts.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.07}>
                <div className="card group h-full p-5 transition hover:-translate-y-1 hover:border-line-strong">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">{f.label}</p>
                  <p className="mt-2 text-[15px] font-medium leading-snug text-cream">{f.value}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="card relative overflow-hidden p-6">
              <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/15 blur-3xl" />
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">Outside of code</p>
              <ul className="mt-4 space-y-3">
                {about.hobbies.map((h) => {
                  const Icon = icons[h.icon];
                  return (
                    <li key={h.label} className="flex items-center gap-3 text-cream">
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 text-accent">
                        <Icon size={17} />
                      </span>
                      {h.label}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
