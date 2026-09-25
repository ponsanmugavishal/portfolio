import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="relative z-10 grid min-h-[100svh] place-items-center px-5 py-16 outline-none">
      <div className="glass w-full max-w-lg p-8 text-center sm:p-12">
        <p className="text-gradient font-display text-7xl font-semibold tracking-tight sm:text-8xl">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
          This page doesn&apos;t exist
        </h1>
        <p className="mt-3 text-muted">The link may be broken or the page was moved.</p>
        <Link
          href="/"
          className="btn-gradient mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-medium transition hover:brightness-110"
        >
          <ArrowLeft size={17} aria-hidden /> Back to home
        </Link>
      </div>
    </main>
  );
}
