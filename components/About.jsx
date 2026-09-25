"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Download, Sparkles } from "lucide-react";
import { about, site } from "@/lib/site";
import { icons, Reveal, SectionHeading, StatusDot } from "./ui";

// Each word lights up as the paragraph scrolls through the viewport.
function ScrollText({ text }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");
  return (
    <p
      ref={ref}
      className="flex flex-wrap font-display text-[1.6rem] font-medium leading-snug tracking-tight sm:text-3xl lg:text-[2.1rem]"
    >
      {words.map((w, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {w}
          </Word>
        );
      })}
    </p>
  );
}

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative mr-[0.28em] mt-1">
      <motion.span style={{ opacity }} className="text-fg">
        {children}
      </motion.span>
    </span>
  );
}

// One bento tile: glass card that fades up into view.
function Tile({ className = "", delay = 0, children }) {
  return (
    <Reveal delay={delay} className={`min-w-0 ${className}`}>
      <div className="glass h-full p-6 sm:p-7">{children}</div>
    </Reveal>
  );
}

const factSpan = {
  College: "lg:col-span-6",
  Degree: "lg:col-span-3",
  "Based in": "lg:col-span-3",
  Languages: "lg:col-span-4",
};

export default function About() {
  const facts = about.facts;
  const languages = facts.find((f) => f.label === "Languages");
  const otherFacts = facts.filter((f) => f !== languages);

  return (
    <section id="about" className="section-y relative overflow-x-clip">
      <div className="container-page">
        <SectionHeading
          index="01"
          kicker="About me"
          title={
            <>
              A little about <span className="text-gradient">who I am</span>
            </>
          }
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          {/* Intro */}
          <Tile className="sm:col-span-2 lg:col-span-8 lg:row-span-2">
            <div className="flex h-full flex-col justify-between gap-8 sm:p-2">
              <ScrollText text={about.intro} />
              <p className="max-w-2xl text-[17px] leading-relaxed text-muted">{about.body}</p>
            </div>
          </Tile>

          {/* Currently */}
          <Tile className="lg:col-span-4" delay={0.06}>
            <p className="text-label text-faint">Currently</p>
            <p className="mt-4 flex items-center gap-3 font-display text-2xl font-semibold tracking-tight text-fg">
              <StatusDot /> {site.status}
            </p>
            <a
              href={site.resume}
              download
              className="btn-gradient mt-6 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition hover:brightness-110"
            >
              <Download size={16} aria-hidden /> Download resume
            </a>
          </Tile>

          {/* Strengths */}
          <Tile className="lg:col-span-4" delay={0.1}>
            <p className="text-label flex items-center gap-2 text-faint">
              <Sparkles size={14} className="text-accent" aria-hidden /> Strengths
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {about.strengths.map((s) => (
                <li key={s} className="chip">
                  {s}
                </li>
              ))}
            </ul>
          </Tile>

          {/* Facts */}
          {otherFacts.map((f, i) => (
            <Tile key={f.label} className={factSpan[f.label] ?? "lg:col-span-3"} delay={i * 0.05}>
              <p className="text-label text-faint">{f.label}</p>
              <p className="mt-3 text-lg font-medium leading-snug text-fg">{f.value}</p>
            </Tile>
          ))}

          <Tile className={factSpan.Languages} delay={0.05}>
            <p className="text-label text-faint">{languages.label}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {languages.value.split(",").map((l) => (
                <li key={l} className="rounded-full bg-accent/10 px-3.5 py-1.5 text-[15px] font-medium text-fg">
                  {l.trim()}
                </li>
              ))}
            </ul>
          </Tile>

          {/* Hobbies */}
          <Tile className="sm:col-span-2 lg:col-span-8" delay={0.1}>
            <p className="text-label text-faint">Outside of code</p>
            <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {about.hobbies.map((h) => {
                const Icon = icons[h.icon];
                return (
                  <li key={h.label} className="flex items-center gap-3 text-fg">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent/10 text-accent">
                      <Icon size={19} aria-hidden />
                    </span>
                    {h.label}
                  </li>
                );
              })}
            </ul>
          </Tile>
        </div>
      </div>
    </section>
  );
}
