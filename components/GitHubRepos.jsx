"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Clock, GitFork, Star, FolderGit2, RefreshCw } from "lucide-react";
import { site } from "@/lib/site";
import { SectionHeading, Reveal } from "./ui";

const langColors = {
  Java: "#e76f00",
  Python: "#3572a5",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#663399",
  "Jupyter Notebook": "#da5b0b",
  "C++": "#f34b7d",
  C: "#555555",
};

export default function GitHubRepos({ repos }) {
  const profile = `https://github.com/${site.githubUsername}`;

  return (
    <section id="github" className="relative mx-auto max-w-6xl px-5 py-28 md:py-36">
      <SectionHeading index="04" kicker="Live from GitHub" title={<>Latest <span className="text-gradient">code</span></>}>
        This section pulls my public repositories straight from GitHub and refreshes every hour.
      </SectionHeading>

      {repos.length === 0 ? (
        <Reveal>
          <a href={profile} target="_blank" rel="noreferrer" className="card group flex items-center justify-between p-8 transition hover:border-line-strong">
            <span className="flex items-center gap-4">
              <FolderGit2 className="text-accent" />
              <span>
                <span className="block font-display text-xl font-semibold">See my repositories on GitHub</span>
                <span className="text-sm text-muted">github.com/{site.githubUsername}</span>
              </span>
            </span>
            <ArrowUpRight className="text-muted transition group-hover:text-accent" />
          </a>
        </Reveal>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((r, i) => (
            <motion.a
              key={r.id}
              href={r.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px 0px" }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="card group relative flex h-full flex-col overflow-hidden p-6"
            >
              <div aria-hidden className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/0 blur-3xl transition-colors duration-500 group-hover:bg-accent/20" />
              <div className="flex items-start justify-between gap-4">
                <FolderGit2 size={22} className="text-accent" />
                <ArrowUpRight size={18} className="text-faint transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
              </div>
              <h3 className="mt-5 break-words font-display text-lg font-semibold text-fg">{r.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {r.description || "No description yet — open it on GitHub to see the code."}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-faint">
                {r.language && (
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: langColors[r.language] || "#a3a1b2" }} />
                    {r.language}
                  </span>
                )}
                <span className="flex items-center gap-1"><Star size={13} /> {r.stars}</span>
                <span className="flex items-center gap-1"><GitFork size={13} /> {r.forks}</span>
                <span className="flex items-center gap-1"><Clock size={13} /> {r.updated}</span>
              </div>
            </motion.a>
          ))}
        </div>
      )}

      <Reveal delay={0.1}>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-sm text-muted">
          <span className="flex items-center gap-2">
            <RefreshCw size={14} className="text-accent" /> Synced automatically with GitHub
          </span>
          <a href={profile} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1.5 font-medium text-fg hover:text-accent">
            View full GitHub profile
            <ArrowUpRight size={16} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
