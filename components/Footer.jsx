"use client";

import { motion } from "motion/react";
import { ArrowUp } from "lucide-react";
import { site } from "@/lib/site";
import { ease, hover } from "@/lib/motion";
import { icons, StatusDot } from "./ui";
import ThemeToggle from "./ThemeToggle";

export default function Footer() {
  const socials = site.socials.filter((s) => s.url);
  return (
    <footer className="relative z-10 overflow-x-clip pt-24">
      <div className="container-page">
        <div className="glass flex flex-col gap-8 p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-label text-faint">Currently</p>
            <p className="mt-3 flex items-center gap-3 font-display text-2xl font-semibold tracking-tight text-fg">
              <StatusDot /> {site.status}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {socials.map((s) => {
              const Icon = icons[s.icon];
              const external = s.url.startsWith("http");
              return (
                <motion.a
                  key={s.label}
                  href={s.url}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  whileHover={{ y: hover.lift / 2 }}
                  whileTap={{ scale: hover.press }}
                  className="glass-pill inline-flex items-center gap-2 px-4 py-2.5 text-sm text-fg"
                >
                  <Icon size={16} className="text-accent" aria-hidden />
                  {s.label}
                </motion.a>
              );
            })}
            <ThemeToggle size={42} />
            <motion.a
              href="#top"
              aria-label="Back to top"
              whileHover={{ y: hover.lift / 2 }}
              whileTap={{ scale: hover.press }}
              className="btn-gradient grid h-[42px] w-[42px] place-items-center rounded-full"
            >
              <ArrowUp size={18} />
            </motion.a>
          </div>
        </div>

        {/* Big outlined name — SVG text always stretches to fit the width */}
        <motion.svg
          aria-hidden
          viewBox="0 0 1000 118"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -40px 0px" }}
          transition={{ duration: 1, ease }}
          className="mt-16 block w-full select-none"
        >
          {/* Outline drawn by a filter (grow the letters, cut out the original)
              so overlapping glyph parts in the variable font don't show inside letters. */}
          <defs>
            <filter id="name-outline" x="-2%" y="-10%" width="104%" height="120%">
              <feMorphology in="SourceAlpha" operator="dilate" radius="1.3" result="grown" />
              <feComposite in="grown" in2="SourceAlpha" operator="out" result="ring" />
              <feFlood style={{ floodColor: "var(--outline-stroke)" }} />
              <feComposite in2="ring" operator="in" />
            </filter>
          </defs>
          <text
            x="0"
            y="100"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            className="font-display"
            fontSize="118"
            fontWeight="700"
            fill="#000"
            filter="url(#name-outline)"
          >
            PON SANMUGA VISHAL
          </text>
        </motion.svg>

        <div className="flex flex-col items-center justify-between gap-2 border-t border-line py-8 text-sm text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <p>Built with Next.js · Hosted on Vercel</p>
        </div>
      </div>
    </footer>
  );
}
