// Generates the preview image shown when the site link is shared
// on WhatsApp, LinkedIn, X, etc.
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

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
          background: "#0b0b10",
          color: "#f3f0e8",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -80,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(255,106,61,0.55), rgba(107,63,160,0.25) 55%, rgba(11,11,16,0) 72%)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 0 0 80px", width: 720 }}>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 6, color: "#ff6a3d", textTransform: "uppercase" }}>
            Portfolio
          </div>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1.02, marginTop: 18 }}>Pon Sanmuga Vishal G</div>
          <div style={{ display: "flex", fontSize: 34, color: "#a3a1b2", marginTop: 22 }}>Aspiring Software Developer · ECE Student</div>
          <div style={{ display: "flex", gap: 14, marginTop: 40 }}>
            {["Python", "Java", "MySQL", "LLM APIs"].map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  fontSize: 22,
                  padding: "10px 20px",
                  borderRadius: 999,
                  border: "1px solid rgba(243,240,232,0.25)",
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
        <img src={photoSrc} width={500} height={485} style={{ position: "absolute", right: 20, bottom: 0 }} />
      </div>
    ),
    { ...size }
  );
}
