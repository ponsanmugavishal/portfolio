"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { GraduationCap } from "lucide-react";
import { education } from "@/lib/site";
import { SectionHeading } from "./ui";

export default function Education() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="education" className="relative mx-auto max-w-6xl overflow-x-clip px-5 py-28 md:py-36">
      <SectionHeading index="05" kicker="Education" title={<>Where I've <span className="text-gradient">studied</span></>} />

      <div ref={ref} className="relative ml-3 md:ml-0">
        {/* track + animated line */}
        <div className="absolute bottom-2 left-0 top-2 w-px bg-line md:left-1/2" />
        <motion.div
          style={{ scaleY: lineScale }}
          className="absolute bottom-2 left-0 top-2 w-px origin-top bg-gradient-to-b from-accent to-accent-2 md:left-1/2"
        />

        <ol className="space-y-10">
          {education.map((e, i) => {
            const right = i % 2 === 1;
            return (
              <li key={e.title} className="relative md:grid md:grid-cols-2 md:gap-16">
                <motion.span
                  initial={{ scale: 0.3, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px 0px" }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="absolute left-0 top-7 z-10 grid h-9 w-9 -translate-x-1/2 place-items-center rounded-full border border-accent/60 bg-ink text-accent md:left-1/2"
                >
                  <GraduationCap size={16} />
                </motion.span>

                <motion.div
                  initial={{ opacity: 0, x: right ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px 0px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className={`card ml-10 p-6 md:ml-0 ${right ? "md:col-start-2" : "md:col-start-1 md:text-right"}`}
                >
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{e.period}</p>
                  <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-cream md:text-2xl">{e.title}</h3>
                  <p className="mt-1.5 text-muted">{e.place}</p>
                  <p className={`mt-4 inline-flex rounded-full bg-white/[0.06] px-3 py-1 font-mono text-sm text-cream`}>
                    {e.score}
                  </p>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
