"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/site";
import useIsDesktop from "@/lib/useIsDesktop";
import { visuals } from "./visuals/ProjectVisuals";
import { SectionHeading } from "./ui";

// Illustration in an inner glass frame, with a 3D tilt that follows the mouse.
function TiltPanel({ children }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 15 });
  const sry = useSpring(ry, { stiffness: 150, damping: 15 });

  // Pause the SVG animations for visitors who prefer reduced motion
  useEffect(() => {
    const svg = ref.current?.querySelector("svg");
    if (!svg) return;
    if (reduce) svg.pauseAnimations?.();
    else svg.unpauseAnimations?.();
  }, [reduce]);

  const onMove = (e) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 12);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 12);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div className="[perspective:1000px]">
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
        className="glass rounded-[20px] p-2"
      >
        <div className="aspect-[4/3] overflow-hidden rounded-[14px] bg-[var(--viz-bg)]">{children}</div>
      </motion.div>
    </div>
  );
}

function ProjectCard({ project, index, total, progress, desktop }) {
  const reduce = useReducedMotion();
  const Visual = visuals[project.visual];
  const targetScale = 1 - (total - index - 1) * 0.045;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const stacked = desktop && !reduce;

  return (
    <div className="mb-6 lg:sticky lg:top-0 lg:mb-0 lg:flex lg:h-screen lg:items-center">
      <motion.article
        style={{ scale: stacked ? scale : 1, top: desktop ? `${index * 28}px` : 0 }}
        className="glass project-card relative w-full origin-top p-5 sm:p-7 lg:p-9"
      >
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
          <TiltPanel>
            <Visual />
          </TiltPanel>

          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm text-accent">{String(index + 1).padStart(2, "0")}</span>
              <span aria-hidden className="h-px w-8 bg-line-strong" />
              <span className="chip !py-1 font-mono !text-[11px] uppercase tracking-wider !text-muted">
                {project.label}
              </span>
            </div>
            <h3 className="text-card mt-4 text-fg lg:text-[2rem]">{project.title}</h3>
            <p className="mt-3 text-[16px] leading-relaxed text-muted">{project.summary}</p>

            <ul className="mt-5 space-y-2.5">
              {project.points.map((pt) => (
                <li key={pt} className="flex gap-3 text-[15px] leading-relaxed text-fg">
                  <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-accent to-accent-2" />
                  {pt}
                </li>
              ))}
            </ul>

            <ul className="mt-6 flex flex-wrap items-center gap-2" aria-label="Technologies">
              {project.tech.map((t) => (
                <li key={t} className="chip font-mono !text-xs">
                  {t}
                </li>
              ))}
            </ul>

            {project.links.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {project.links.map((l) => (
                  <a
                    key={l.url}
                    href={l.url}
                    target="_blank"
                    rel="noreferrer"
                    className="glass-pill group inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-accent"
                  >
                    {l.label}
                    <ArrowUpRight
                      size={16}
                      aria-hidden
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function Projects() {
  const container = useRef(null);
  const desktop = useIsDesktop();
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });

  return (
    <section id="projects" className="relative pt-[clamp(6rem,10vw,10rem)]">
      <div className="container-page">
        <SectionHeading
          index="03"
          kicker="Projects"
          title={
            <>
              Things I&apos;ve <span className="text-gradient">built</span>
            </>
          }
        >
          From an AI agent that uses tools to an Arduino switch that responds to sound — here&apos;s what I&apos;ve
          been working on.
        </SectionHeading>

        <div ref={container} className="relative pb-10 lg:pb-24">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={i}
              total={projects.length}
              progress={scrollYProgress}
              desktop={desktop}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
