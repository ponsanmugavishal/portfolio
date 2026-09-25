import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import GitHubRepos from "@/components/GitHubRepos";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";
import { getRepos, timeAgo } from "@/lib/github";
import { site } from "@/lib/site";

// Page is static, but re-generated at most once an hour so GitHub data stays fresh.
export const revalidate = 3600;

export default async function Home() {
  const repos = (await getRepos(site.githubUsername)).map((r) => ({ ...r, updated: timeAgo(r.updatedAt) }));

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    email: `mailto:${site.email}`,
    jobTitle: site.role,
    alumniOf: "M. Kumarasamy College of Engineering",
    address: { "@type": "PostalAddress", addressLocality: "Namakkal", addressRegion: "Tamil Nadu", addressCountry: "IN" },
    sameAs: site.socials.filter((s) => s.url.startsWith("http")).map((s) => s.url),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <Navbar />
      <main id="main" tabIndex={-1} className="relative z-10 outline-none">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <GitHubRepos repos={repos} />
        <Education />
        <Contact />
      </main>
      <Footer />
      <CommandPalette />
    </>
  );
}
