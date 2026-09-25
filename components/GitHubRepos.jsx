"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Clock, FolderGit2, GitFork, RefreshCw, Star } from "lucide-react";
import { site } from "@/lib/site";
import { duration, ease, viewport } from "@/lib/motion";
import Glass from "./Glass";
import { Reveal, SectionHeading } from "./ui";

// GitHub's own language colours (data, not theme), so the dots match what people know from GitHub.
const langColors = {
  Java: "#b07219",
  Python: "#3572a5",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#663399",
  "Jupyter Notebook": "#da5b0b",
  "C++": "#f34b7d",
  C: "#555555",
};

function RepoCard({ repo, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ delay: (index % 3) * 0.06, duration: duration.reveal, ease }}
      className="min-w-0"
    >
      <Glass
        as="a"
        interactive
        href={repo.url}
        target="_blank"
        rel="noreferrer"
        className="group flex h-full flex-col p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/10 text-accent">
            <FolderGit2 size={20} aria-hidden />
          </span>
          <ArrowUpRight
            size={18}
            aria-hidden
            className="text-faint transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
          />
        </div>
        <h3 className="mt-5 break-words font-display text-lg font-semibold text-fg">{repo.name}</h3>
        <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">
          {repo.description || "No description yet — open it on GitHub to see the code."}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-muted">
          {repo.language && (
            <span className="flex items-center gap-1.5">
              <span
                aria-hidden
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: langColors[repo.language] || "var(--faint)" }}
              />
              {repo.language}
            </span>
          )}
          <span className="flex items-center gap-1" aria-label={`${repo.stars} stars`}>
            <Star size={13} aria-hidden /> {repo.stars}
          </span>
          <span className="flex items-center gap-1" aria-label={`${repo.forks} forks`}>
            <GitFork size={13} aria-hidden /> {repo.forks}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={13} aria-hidden /> updated {repo.updated}
          </span>
        </div>
      </Glass>
    </motion.div>
  );
}

export default function GitHubRepos({ repos }) {
  const profile = `https://github.com/${site.githubUsername}`;

  return (
    <section id="github" className="section-y relative overflow-x-clip">
      <div className="container-page">
        <SectionHeading
          index="04"
          kicker="Live from GitHub"
          title={
            <>
              Latest <span className="text-gradient">code</span>
            </>
          }
        >
          This section pulls my public repositories straight from GitHub and refreshes every hour.
        </SectionHeading>

        {repos.length === 0 ? (
          <Reveal>
            <Glass
              as="a"
              interactive
              href={profile}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between gap-4 p-7 sm:p-8"
            >
              <span className="flex min-w-0 items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent/10 text-accent">
                  <FolderGit2 aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-xl font-semibold text-fg">See my repositories on GitHub</span>
                  <span className="block truncate text-sm text-muted">github.com/{site.githubUsername}</span>
                </span>
              </span>
              <ArrowUpRight aria-hidden className="shrink-0 text-muted transition group-hover:text-accent" />
            </Glass>
          </Reveal>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {repos.map((r, i) => (
              <RepoCard key={r.id} repo={r} index={i} />
            ))}
          </div>
        )}

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-sm text-muted">
            <span className="flex items-center gap-2">
              <RefreshCw size={14} className="text-accent" aria-hidden /> Synced hourly from GitHub
            </span>
            <Glass
              as="a"
              variant="pill"
              interactive
              href={profile}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-3 font-medium text-fg"
            >
              View GitHub profile
              <ArrowUpRight
                size={16}
                aria-hidden
                className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Glass>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
