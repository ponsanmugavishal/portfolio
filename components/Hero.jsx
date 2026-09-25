"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform,
} from "motion/react";
import { ArrowRight, Download, GraduationCap, MapPin } from "lucide-react";
import { site, stats } from "@/lib/site";
import { ease } from "@/lib/motion";
import useIsDesktop from "@/lib/useIsDesktop";
import { icons, Magnetic, Reveal, StatusDot } from "./ui";

// Floating glass chips around the photo: position + parallax depth + float speed
const chipLayout = [
  { pos: "left-[-6%] top-[14%]", depth: 34, float: 5.5 },
  { pos: "right-[-8%] top-[30%]", depth: 48, float: 6.5 },
  { pos: "left-[-10%] top-[56%]", depth: 26, float: 7 },
  { pos: "right-[-6%] top-[70%]", depth: 42, float: 6 },
];

// The rotating last word. Its size is capped (.hero-rotating) so the longest phrase
// fits on one line, and invisible copies reserve its width — no layout jumps.
function RotatingWord({ words }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % words.length), 2600);
    return () => clearInterval(t);
  }, [words.length]);

  return (
    <span aria-hidden className="relative grid overflow-hidden whitespace-nowrap pb-[0.12em]">
      {words.map((w) => (
        <span key={w} className="invisible col-start-1 row-start-1">
          {w}
        </span>
      ))}
      <AnimatePresence initial={false}>
        <motion.span
          key={words[i]}
          initial={{ y: "105%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-105%" }}
          transition={{ duration: 0.6, ease }}
          className="text-gradient col-start-1 row-start-1 self-start"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Chip({ label, pos, depth, float, mx, my }) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return (
    <motion.div style={{ x, y }} className={`absolute z-20 ${pos}`}>
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: float, repeat: Infinity, ease: "easeInOut" }}
        className="glass-pill flex items-center gap-2 px-3 py-1.5 font-mono text-[11px] text-fg sm:px-4 sm:py-2 sm:text-xs"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
        {label}
      </motion.div>
    </motion.div>
  );
}

function PhotoStage({ mx, my, scrollYProgress }) {
  const desktop = useIsDesktop();
  const reduce = useReducedMotion();
  // Gentle scroll parallax: smaller on phones so the photo never slides into the stats strip
  const stageY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : desktop ? 110 : 24]);
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const orbX = useTransform(mx, (v) => v * 10);
  const orbY = useTransform(my, (v) => v * 10);
  const photoX = useTransform(mx, (v) => v * -14);
  const photoY = useTransform(my, (v) => v * -8);

  return (
    <motion.div
      style={{ y: stageY, scale: stageScale }}
      className="relative mx-auto mt-6 w-full max-w-[290px] sm:max-w-[360px] lg:mt-0 lg:max-w-[450px]"
    >
      <div className="enter-scale relative aspect-[900/873] w-full" style={{ "--d": "0.15s" }}>
        {/* Glass orb with an aurora inside */}
        <motion.div
          style={{ x: orbX, y: orbY }}
          className="glass glass-refract absolute inset-x-0 bottom-0 top-[28%] overflow-hidden rounded-[50%_50%_3rem_3rem/42%_42%_3rem_3rem]"
        >
          <div aria-hidden className="orb-fill absolute inset-0" />
        </motion.div>

        {/* Cut-out photo: clipped to the orb at the sides/bottom, head pops out of the top */}
        <motion.div
          style={{ x: photoX, y: photoY }}
          className="absolute inset-0 z-10 [clip-path:inset(-20%_0_0_0_round_0_0_3rem_3rem)]"
        >
          <Image
            src={site.photo}
            alt={`Portrait of ${site.name}`}
            fill
            preload
            sizes="(max-width: 640px) 290px, (max-width: 1024px) 360px, 450px"
            className="object-contain object-bottom"
          />
        </motion.div>

        {site.heroChips.map((label, i) => (
          <Chip key={label} label={label} {...chipLayout[i % chipLayout.length]} mx={mx} my={my} />
        ))}

        {/* Info cards */}
        <div
          className="glass enter-fade absolute bottom-[5%] left-[-8%] z-20 flex items-center gap-3 !rounded-[20px] p-2.5 pr-4 sm:left-[-14%] sm:p-3 sm:pr-5"
          style={{ "--d": "0.9s" }}
        >
          <span className="btn-gradient grid h-9 w-9 place-items-center rounded-xl sm:h-10 sm:w-10">
            <GraduationCap size={19} aria-hidden />
          </span>
          <span className="text-left leading-tight">
            <span className="block text-sm font-semibold text-fg">{site.degree}</span>
            <span className="mt-0.5 block text-xs text-muted">
              {site.collegeShort} · {site.batch}
            </span>
          </span>
        </div>
        <div
          className="glass-pill enter-fade absolute right-[-4%] top-[-2%] z-20 flex items-center gap-2 px-3.5 py-2 text-xs text-fg sm:right-[-10%]"
          style={{ "--d": "1s" }}
        >
          <MapPin size={14} className="text-accent" aria-hidden /> {site.city}
        </div>
      </div>
    </motion.div>
  );
}

function StatsStrip() {
  return (
    <div className="container-page relative z-10">
      <Reveal>
        <dl className="glass grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col-reverse gap-1 p-5 sm:p-7 ${i % 2 === 1 ? "border-l border-line" : ""} ${
                i >= 2 ? "border-t border-line md:border-t-0" : ""
              } ${i === 2 ? "md:border-l" : ""}`}
            >
              <dt className="text-sm text-muted">{s.label}</dt>
              <dd className="flex items-center gap-2.5 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
                {s.value}
                {s.live && <StatusDot size={9} />}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </div>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const mxRaw = useMotionValue(0);
  const myRaw = useMotionValue(0);
  const mx = useSpring(mxRaw, { stiffness: 60, damping: 18 });
  const my = useSpring(myRaw, { stiffness: 60, damping: 18 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const onMove = (e) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mxRaw.set((e.clientX - r.left) / r.width - 0.5);
    myRaw.set((e.clientY - r.top) / r.height - 0.5);
  };

  const socials = site.socials.filter((s) => s.url);

  return (
    <section id="top" className="relative overflow-x-clip pb-8">
      <div ref={ref} onPointerMove={onMove} className="relative flex min-h-[100svh] items-center pb-20 pt-28 lg:pb-16 lg:pt-24">
        <div className="container-page grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-8">
          {/* Text */}
          <motion.div style={{ y: textY, opacity: fade }} className="hero-text relative z-10 min-w-0">
            <div
              className="glass-pill enter-fade mb-6 inline-flex items-center gap-2.5 px-4 py-2 text-sm text-fg"
              style={{ "--d": "0s" }}
            >
              <StatusDot size={8} />
              {site.status}
            </div>

            <p className="text-label enter-fade mb-4 text-faint" style={{ "--d": "0.08s" }}>
              {site.name}
            </p>

            <h1 className="text-display text-fg">
              <span className="sr-only">
                Hi, I&apos;m {site.shortName}. I build {site.heroWords.join(" ")}
              </span>
              <span aria-hidden className="block">
                {["Hi, I'm Vishal.", "I build"].map((line, li) => (
                  <span key={line} className="block overflow-hidden pb-[0.06em]">
                    <span className="enter-rise block" style={{ "--d": `${0.12 + li * 0.1}s` }}>
                      {line}
                    </span>
                  </span>
                ))}
              </span>
              <span className="hero-rotating enter-fade block" style={{ "--d": "0.45s" }}>
                <RotatingWord words={site.heroWords} />
              </span>
            </h1>

            <p
              className="enter-lift mt-6 max-w-xl text-[17px] leading-relaxed text-muted sm:text-lg"
              style={{ "--d": "0.2s" }}
            >
              {site.heroIntro}
            </p>

            <div className="enter-fade mt-9 flex flex-wrap items-center gap-3" style={{ "--d": "0.65s" }}>
              <Magnetic
                href="#projects"
                className="btn-gradient group inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-medium"
              >
                View my work
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden />
              </Magnetic>
              <Magnetic
                href={site.resume}
                download
                className="glass-pill glass-interactive inline-flex items-center gap-2 px-6 py-3.5 font-medium text-fg"
              >
                <Download size={17} aria-hidden /> Download resume
              </Magnetic>
            </div>

            <ul className="enter-fade mt-8 flex items-center gap-3" style={{ "--d": "0.75s" }}>
              {socials.map((s) => {
                const Icon = icons[s.icon];
                const external = s.url.startsWith("http");
                return (
                  <li key={s.label}>
                    <a
                      href={s.url}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noreferrer" : undefined}
                      aria-label={s.label}
                      className="glass-pill group relative grid h-11 w-11 place-items-center text-muted transition hover:-translate-y-1 hover:text-accent"
                    >
                      <Icon size={18} aria-hidden />
                      <span className="pointer-events-none absolute -bottom-9 whitespace-nowrap rounded-lg bg-fg px-2 py-1 text-[11px] text-page opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                        {s.label}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          <PhotoStage mx={mx} my={my} scrollYProgress={scrollYProgress} />
        </div>

        {/* Scroll cue (desktop) */}
        <motion.a
          href="#about"
          style={{ opacity: fade }}
          aria-label="Scroll to About"
          className="text-label absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 !text-[11px] text-faint lg:flex"
        >
          Scroll
          <span aria-hidden className="relative h-10 w-px overflow-hidden bg-line-strong">
            <motion.span
              className="absolute left-0 top-0 h-4 w-px bg-gradient-to-b from-accent to-accent-2"
              animate={{ y: [-16, 40] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </motion.a>
      </div>

      <StatsStrip />
    </section>
  );
}
