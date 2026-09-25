"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform,
} from "motion/react";
import { ArrowRight, Download, GraduationCap, MapPin } from "lucide-react";
import { site } from "@/lib/site";
import { icons, Magnetic } from "./ui";

const words = ["AI workflows.", "web apps.", "Java backends.", "things that help people."];
const chips = [
  { label: "Python", pos: "left-[2%] top-[16%]", depth: 38, float: 5.5 },
  { label: "Java", pos: "right-[0%] top-[30%]", depth: 52, float: 6.5 },
  { label: "MySQL", pos: "left-[-4%] top-[56%]", depth: 28, float: 7 },
  { label: "LLM APIs", pos: "right-[4%] top-[68%]", depth: 44, float: 6 },
];

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % words.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-grid overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-gradient col-start-1 row-start-1 whitespace-nowrap pb-2"
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
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: float, repeat: Infinity, ease: "easeInOut" }}
        className="rounded-full border border-line-strong bg-page/70 px-4 py-2 font-mono text-xs text-fg shadow-xl shadow-black/40 backdrop-blur-md"
      >
        <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
        {label}
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const mxRaw = useMotionValue(0);
  const myRaw = useMotionValue(0);
  const mx = useSpring(mxRaw, { stiffness: 60, damping: 18 });
  const my = useSpring(myRaw, { stiffness: 60, damping: 18 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const photoX = useTransform(mx, (v) => v * -18);
  const photoMY = useTransform(my, (v) => v * -12);
  const ringX = useTransform(mx, (v) => v * 30);
  const ringY = useTransform(my, (v) => v * 30);

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mxRaw.set((e.clientX - r.left) / r.width - 0.5);
    myRaw.set((e.clientY - r.top) / r.height - 0.5);
  };

  const socials = site.socials.filter((s) => s.url);

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={onMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-32 md:pt-28"
    >
      {/* Background */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0" />
        <div className="animate-blob absolute -right-32 top-10 h-[520px] w-[520px] rounded-full bg-accent/25 blur-[120px]" />
        <div className="animate-blob absolute right-40 top-64 h-[360px] w-[360px] rounded-full bg-accent-2/15 blur-[110px] [animation-delay:-6s]" />
        <div className="animate-blob absolute -left-40 bottom-0 h-[460px] w-[460px] rounded-full bg-accent-2/25 blur-[130px] [animation-delay:-11s]" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-5 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
        {/* Text */}
        <motion.div style={{ y: textY, opacity: fade }} className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 text-xs text-muted backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping-soft absolute inline-flex h-full w-full rounded-full bg-accent" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {site.status}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-faint"
          >
            {site.name}
          </motion.p>

          <h1 className="font-display text-[2.6rem] font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.6rem]">
            {["Hi, I'm Vishal.", "I build"].map((line, li) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ delay: 0.2 + li * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
            <motion.span
              className="block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <RotatingWord />
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            ECE student at M. Kumarasamy College of Engineering, turning ideas into working software with
            Python, Java and MySQL — and currently looking for an internship.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Magnetic
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 font-medium text-white shadow-[0_10px_40px_-10px_rgba(255,106,61,0.7)] transition-colors hover:bg-accent-2"
            >
              View my work
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Magnetic>
            <Magnetic
              href={site.resume}
              download
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3.5 font-medium text-fg transition-colors hover:border-fg/40 hover:bg-white/5"
            >
              <Download size={17} /> Download resume
            </Magnetic>
          </motion.div>

          <motion.ul
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 1 } } }}
            className="mt-9 flex items-center gap-3"
          >
            {socials.map((s) => {
              const Icon = icons[s.icon];
              return (
                <motion.li key={s.label} variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
                  <a
                    href={s.url}
                    target={s.url.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    aria-label={s.label}
                    className="group relative grid h-11 w-11 place-items-center rounded-full border border-line text-muted transition hover:-translate-y-1 hover:border-accent/60 hover:text-accent"
                  >
                    <Icon size={18} />
                    <span className="pointer-events-none absolute -bottom-8 whitespace-nowrap rounded-md bg-page-2 px-2 py-1 text-[11px] text-fg opacity-0 transition group-hover:opacity-100">
                      {s.label}
                    </span>
                  </a>
                </motion.li>
              );
            })}
          </motion.ul>
        </motion.div>

        {/* Photo stage */}
        <motion.div style={{ y: photoY, scale: photoScale }} className="relative mx-auto w-full max-w-[420px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/5] w-full"
        >
          {/* glowing disc */}
          <motion.div
            style={{ x: ringX, y: ringY }}
            className="absolute inset-x-[6%] top-[8%] aspect-square rounded-full bg-gradient-to-br from-accent via-accent-2/80 to-accent-2 opacity-90 shadow-[0_0_120px_20px_rgba(255,106,61,0.25)]"
          />
          {/* rotating text ring */}
          <motion.div style={{ x: ringX, y: ringY }} className="absolute inset-x-[-2%] top-[0%] aspect-square">
            <svg viewBox="0 0 200 200" className="animate-spin-slow h-full w-full">
              <defs>
                <path id="ring" d="M100,100 m-88,0 a88,88 0 1,1 176,0 a88,88 0 1,1 -176,0" />
              </defs>
              <circle cx="100" cy="100" r="96" fill="none" stroke="rgba(243,240,232,0.14)" strokeDasharray="2 6" />
              <text className="fill-fg/50 font-mono" fontSize="7.2" letterSpacing="3.2">
                <textPath href="#ring">SOFTWARE DEVELOPER · ECE STUDENT · PYTHON · JAVA · MYSQL · </textPath>
              </text>
            </svg>
          </motion.div>

          {/* photo */}
          <motion.div style={{ x: photoX, y: photoMY }} className="absolute inset-x-0 bottom-0 top-[4%] z-10">
            <div className="relative h-full w-full [mask-image:linear-gradient(to_bottom,black_78%,transparent)]">
              <Image
                src={site.photo}
                alt={`Portrait of ${site.name}`}
                fill
                priority
                sizes="(max-width: 1024px) 80vw, 420px"
                className="object-contain object-bottom drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)]"
              />
            </div>
          </motion.div>

          {chips.map((c) => (
            <Chip key={c.label} {...c} mx={mx} my={my} />
          ))}

          {/* info cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="absolute -left-4 bottom-[9%] z-20 flex items-center gap-3 rounded-2xl border border-line-strong bg-page/75 p-3 pr-4 shadow-2xl shadow-black/50 backdrop-blur-md sm:-left-10"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent">
              <GraduationCap size={20} />
            </span>
            <span className="text-left">
              <span className="block text-sm font-semibold text-fg">B.E. ECE</span>
              <span className="block text-xs text-muted">MKCE · 2024–2028</span>
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.25, duration: 0.7 }}
            className="absolute -right-2 top-[6%] z-20 flex items-center gap-2 rounded-full border border-line-strong bg-page/75 px-3.5 py-2 text-xs text-fg shadow-xl shadow-black/40 backdrop-blur-md sm:-right-6"
          >
            <MapPin size={14} className="text-accent" /> Namakkal, Tamil Nadu
          </motion.div>
        </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#about"
        style={{ opacity: fade }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-faint md:flex"
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-line-strong">
          <motion.span
            className="absolute left-0 top-0 h-4 w-px bg-accent"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
