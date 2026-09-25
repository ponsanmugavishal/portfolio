"use client";

import { skills } from "@/lib/site";
import Glass from "./Glass";
import { icons, Reveal, SectionHeading } from "./ui";

function MarqueeRow({ items, reverse = false, outline = false }) {
  const doubled = [...items, ...items];
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className={`flex shrink-0 items-center gap-8 pr-8 md:gap-12 md:pr-12 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        } hover:[animation-play-state:paused]`}
      >
        {doubled.map((s, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap md:gap-12">
            <span
              className={`font-display text-5xl font-semibold tracking-tight md:text-7xl ${
                outline ? "text-outline" : "text-fg"
              }`}
            >
              {s}
            </span>
            <span className="text-2xl text-accent md:text-3xl" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

// Bento spans for the four skill groups (desktop)
const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

export default function Skills() {
  return (
    <section id="skills" className="section-y relative overflow-x-clip">
      <div className="container-page">
        <SectionHeading
          index="02"
          kicker="Skills"
          title={
            <>
              Tools I <span className="text-gradient">work with</span>
            </>
          }
        >
          The languages, databases and tools I use to build my projects.
        </SectionHeading>
      </div>

      {/* Decorative: the same skills are listed in the cards below */}
      <div aria-hidden className="space-y-4 py-2 md:space-y-6">
        <MarqueeRow items={skills.marquee} />
        <MarqueeRow items={[...skills.marquee].reverse()} reverse outline />
      </div>

      <div className="container-page mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5 md:mt-20">
        {skills.groups.map((g, i) => {
          const Icon = icons[g.icon] ?? icons.code;
          return (
            <Reveal key={g.title} delay={i * 0.06} className={`min-w-0 ${spans[i % spans.length]}`}>
              <Glass interactive className="group h-full p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <span className="btn-gradient grid h-12 w-12 place-items-center rounded-2xl">
                    <Icon size={22} aria-hidden />
                  </span>
                  <span className="font-mono text-xs text-faint">0{i + 1}</span>
                </div>
                <h3 className="text-card mt-6 text-fg">{g.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <li key={it} className="chip">
                      {it}
                    </li>
                  ))}
                </ul>
              </Glass>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
