import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[100svh] place-items-center px-5 text-center">
      <div>
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight">This page doesn&apos;t exist</h1>
        <p className="mt-4 text-muted">The link may be broken or the page was moved.</p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-cream px-6 py-3 font-medium text-ink transition hover:bg-accent">
          Back to home
        </Link>
      </div>
    </main>
  );
}
