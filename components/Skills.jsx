"use client";

import { motion } from "motion/react";
import { skills } from "@/lib/site";
import { Reveal, SectionHeading } from "./ui";

function MarqueeRow({ items, reverse = false, outline = false }) {
  const doubled = [...items, ...items];
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div className={`flex shrink-0 items-center gap-10 pr-10 ${reverse ? "animate-marquee-reverse" : "animate-marquee"} hover:[animation-play-state:paused]`}>
        {doubled.map((s, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span className={`font-display text-5xl font-semibold tracking-tight md:text-7xl ${outline ? "text-outline" : "text-fg"}`}>
              {s}
            </span>
            <span className="text-3xl text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading index="02" kicker="Skills" title={<>Tools I <span className="text-gradient">work with</span></>}>
          The languages, databases and tools I use to build my projects.
        </SectionHeading>
      </div>

      <div className="space-y-6 py-4">
        <MarqueeRow items={skills.marquee} />
        <MarqueeRow items={[...skills.marquee].reverse()} reverse outline />
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-4 px-5 sm:grid-cols-2 lg:grid-cols-4">
        {skills.groups.map((g, i) => (
          <Reveal key={g.title} delay={i * 0.08}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="card group relative h-full overflow-hidden p-6"
            >
              <div aria-hidden className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent opacity-0 transition group-hover:opacity-100" />
              <p className="font-mono text-xs text-accent">0{i + 1}</p>
              <h3 className="mt-3 font-display text-xl font-semibold text-fg">{g.title}</h3>
              <ul className="mt-5 space-y-2.5">
                {g.items.map((it) => (
                  <li key={it} className="flex items-center gap-2.5 text-[15px] text-muted transition group-hover:text-fg">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
                    {it}
                  </li>
                ))}
              </ul>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
