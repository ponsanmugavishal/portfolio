"use client";

import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/site";
import { visuals } from "./visuals/ProjectVisuals";
import { SectionHeading } from "./ui";

// 3D tilt that follows the mouse over the illustration
function TiltPanel({ children }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 15 });
  const sry = useSpring(ry, { stiffness: 150, damping: 15 });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 12);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 12);
  };
  const reset = () => { rx.set(0); ry.set(0); };
  return (
    <div className="[perspective:1000px]">
      <motion.div
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
        className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-page"
      >
        {children}
      </motion.div>
    </div>
  );
}

function ProjectCard({ project, index, total, progress }) {
  const Visual = visuals[project.visual];
  const targetScale = 1 - (total - index - 1) * 0.045;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  return (
    <div className="mb-8 md:sticky md:top-0 md:mb-0 md:flex md:h-screen md:items-center">
      <motion.article
        style={{ scale, top: `${index * 28}px` }}
        className="relative w-full origin-top rounded-[2rem] border border-line bg-surface-solid p-5 shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.8)] md:p-8"
      >
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1.05fr_1fr] md:gap-10">
          <TiltPanel>
            <Visual />
          </TiltPanel>

          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm text-accent">{String(index + 1).padStart(2, "0")}</span>
              <span className="h-px w-8 bg-line-strong" />
              <span className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted">
                {project.label}
              </span>
            </div>
            <h3 className="mt-4 font-display text-2xl font-semibold leading-tight tracking-tight text-fg md:text-[2rem]">
              {project.title}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{project.summary}</p>

            <ul className="mt-5 space-y-2.5">
              {project.points.map((pt) => (
                <li key={pt} className="flex gap-3 text-[15px] leading-relaxed text-fg/85">
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {pt}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              {project.tech.map((t) => (
                <span key={t} className="rounded-lg bg-white/[0.05] px-3 py-1.5 font-mono text-xs text-fg/80">
                  {t}
                </span>
              ))}
            </div>

            {project.links.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-4">
                {project.links.map((l) => (
                  <a
                    key={l.url}
                    href={l.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent"
                  >
                    {l.label}
                    <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-5 pt-28 md:pt-36">
      <SectionHeading index="03" kicker="Projects" title={<>Things I've <span className="text-gradient">built</span></>}>
        From an AI agent that uses tools to an Arduino switch that responds to sound — here's what I've been working on.
      </SectionHeading>

      <div ref={container} className="relative pb-10 md:pb-24">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} total={projects.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
