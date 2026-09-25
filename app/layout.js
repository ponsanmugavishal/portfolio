import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/lib/site";
import Providers from "@/components/Providers";
import GlassDefs from "@/components/GlassDefs";
import Aurora from "@/components/Aurora";
import { themeColors } from "@/lib/theme";
import "./globals.css";

const bricolage = localFont({
  src: "./fonts/BricolageGrotesque.woff2",
  variable: "--font-bricolage",
  weight: "200 800",
  display: "swap",
});
const inter = localFont({
  src: "./fonts/Inter.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});
const jetbrains = localFont({
  src: "./fonts/JetBrainsMono.woff2",
  variable: "--font-jetbrains",
  weight: "100 800",
  display: "swap",
  preload: false, // only used for small labels, so it doesn't need to block the first paint
});

const description =
  "Portfolio of Pon Sanmuga Vishal G — ECE student and aspiring software developer building with Python, Java, MySQL and LLM APIs.";

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description,
  keywords: [
    "Pon Sanmuga Vishal G",
    "Vishal portfolio",
    "software developer",
    "ECE student",
    "M. Kumarasamy College of Engineering",
    "Python",
    "Java",
    "internship",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    type: "website",
    url: site.url,
    title: `${site.name} — ${site.role}`,
    description,
    siteName: site.name,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: themeColors.light,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${inter.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body>
        <a
          href="#main"
          className="glass-pill fixed left-4 top-4 z-[100] -translate-y-24 px-5 py-3 text-sm font-medium text-fg focus:translate-y-0"
        >
          Skip to content
        </a>
        <GlassDefs />
        <Aurora />
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
