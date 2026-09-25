// Generates the preview image shown when the site link is shared
// on WhatsApp, LinkedIn, X, etc. (light aurora + glass card, same look as the site)
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

export const alt = "Pon Sanmuga Vishal G — Aspiring Software Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const photo = await readFile(join(process.cwd(), "assets/og-photo.png"), "base64");
const photoSrc = `data:image/png;base64,${photo}`;

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          color: "#0B1020",
          backgroundColor: "#F5F7FF",
          backgroundImage:
            "radial-gradient(circle at 12% 18%, rgba(165,180,252,0.9), rgba(245,247,255,0) 45%), radial-gradient(circle at 88% 12%, rgba(196,181,253,0.9), rgba(245,247,255,0) 45%), radial-gradient(circle at 70% 95%, rgba(165,243,252,0.85), rgba(245,247,255,0) 45%)",
        }}
      >
        {/* glass card */}
        <div
          style={{
            position: "absolute",
            left: 60,
            top: 70,
            width: 680,
            height: 490,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 56px",
            borderRadius: 36,
            background: "linear-gradient(135deg, rgba(255,255,255,0.78), rgba(255,255,255,0.5))",
            border: "2px solid rgba(255,255,255,0.95)",
            boxShadow: "0 24px 64px -20px rgba(60,70,180,0.35)",
          }}
        >
          <div style={{ display: "flex", fontSize: 20, letterSpacing: 6, color: "#4F46E5", textTransform: "uppercase" }}>
            Portfolio
          </div>
          <div style={{ display: "flex", fontSize: 54, fontWeight: 700, lineHeight: 1.05, marginTop: 16, letterSpacing: -1.2 }}>
            {site.name}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#4A5372", marginTop: 16 }}>
            {site.role} · ECE Student
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 36 }}>
            {site.heroChips.map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  fontSize: 21,
                  padding: "9px 20px",
                  borderRadius: 999,
                  color: "#0B1020",
                  background: "rgba(255,255,255,0.8)",
                  border: "1px solid rgba(11,16,32,0.1)",
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* photo on a gradient orb */}
        <div
          style={{
            position: "absolute",
            right: 40,
            bottom: 0,
            width: 400,
            height: 360,
            borderRadius: "200px 200px 0 0",
            backgroundImage: "linear-gradient(160deg, #A5B4FC, #C4B5FD 55%, #A5F3FC)",
            border: "2px solid rgba(255,255,255,0.9)",
            borderBottom: "none",
          }}
        />
        <img src={photoSrc} width={460} height={446} style={{ position: "absolute", right: 10, bottom: 0 }} />
      </div>
    ),
    { ...size }
  );
}
