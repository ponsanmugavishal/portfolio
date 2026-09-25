"use client";

import { motion } from "motion/react";
import { ArrowUp } from "lucide-react";
import { site } from "@/lib/site";
import { icons } from "./ui";

export default function Footer() {
  const socials = site.socials.filter((s) => s.url);
  return (
    <footer className="relative overflow-hidden border-t border-line pt-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-faint">Currently</p>
            <p className="mt-3 flex items-center gap-2.5 text-lg text-cream">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping-soft absolute inline-flex h-full w-full rounded-full bg-accent" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
              </span>
              {site.status}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {socials.map((s) => {
              const Icon = icons[s.icon];
              return (
                <a
                  key={s.label}
                  href={s.url}
                  target={s.url.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-line text-muted transition hover:-translate-y-1 hover:border-accent/60 hover:text-accent"
                >
                  <Icon size={18} />
                </a>
              );
            })}
            <motion.a
              href="#top"
              whileHover={{ y: -4 }}
              aria-label="Back to top"
              className="ml-2 grid h-11 w-11 place-items-center rounded-full bg-cream text-ink"
            >
              <ArrowUp size={18} />
            </motion.a>
          </div>
        </div>

        <motion.svg
          aria-hidden
          viewBox="0 0 1000 118"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 block w-full select-none"
        >
          <text
            x="0"
            y="100"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            className="font-display"
            fontSize="118"
            fontWeight="700"
            fill="none"
            stroke="rgba(243,240,232,0.28)"
            strokeWidth="1.2"
          >
            PON SANMUGA VISHAL
          </text>
        </motion.svg>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-line py-8 text-sm text-faint sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <p>Built with Next.js · Hosted on Vercel</p>
        </div>
      </div>
    </footer>
  );
}
