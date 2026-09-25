"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { GraduationCap } from "lucide-react";
import { education } from "@/lib/site";
import { duration, ease } from "@/lib/motion";
import { SectionHeading } from "./ui";

export default function Education() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="education" className="section-y relative overflow-x-clip">
      <div className="container-page">
        <SectionHeading
          index="05"
          kicker="Education"
          title={
            <>
              Where I&apos;ve <span className="text-gradient">studied</span>
            </>
          }
        />

        <div ref={ref} className="relative">
          {/* track + line that fills as you scroll (left on mobile, centre on desktop) */}
          <div aria-hidden className="absolute bottom-2 left-[22px] top-2 w-0.5 rounded-full bg-line-strong md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            aria-hidden
            style={{ scaleY: lineScale, background: "linear-gradient(180deg, var(--btn-from), var(--btn-to))" }}
            className="absolute bottom-2 left-[22px] top-2 w-0.5 origin-top rounded-full md:left-1/2 md:-translate-x-1/2"
          />

          <ol className="space-y-8 md:space-y-12">
            {education.map((e, i) => {
              const right = i % 2 === 1;
              return (
                <li key={e.title} className="relative pl-16 md:grid md:grid-cols-2 md:gap-20 md:pl-0">
                  <motion.span
                    initial={{ scale: 0.4, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px 0px" }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="glass-pill absolute left-[23px] top-6 z-10 grid h-11 w-11 -translate-x-1/2 place-items-center text-accent md:left-1/2"
                  >
                    <GraduationCap size={18} aria-hidden />
                  </motion.span>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px 0px" }}
                    transition={{ duration: duration.reveal, ease }}
                    className={`glass min-w-0 p-6 sm:p-7 ${right ? "md:col-start-2" : "md:col-start-1 md:text-right"}`}
                  >
                    <p className="text-label text-accent">{e.period}</p>
                    <h3 className="text-card mt-3 text-fg">{e.title}</h3>
                    <p className="mt-2 text-muted">{e.place}</p>
                    <p className="btn-gradient mt-5 inline-flex rounded-full px-3.5 py-1.5 font-mono text-sm">{e.score}</p>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
