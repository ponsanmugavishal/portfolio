// POST /api/contact — receives the contact form and emails it to you via Resend.
//
// Needs these environment variables (set them in Vercel → Settings → Environment Variables):
//   RESEND_API_KEY    your Resend API key
//   CONTACT_TO_EMAIL  where messages go (must be your Resend sign-up email
//                     until you verify your own domain in Resend)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Simple in-memory rate limit: max 5 messages per IP every 10 minutes (per server instance).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const json = (body, status = 200) => Response.json(body, { status });

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  const name = String(body?.name ?? "").trim().slice(0, 80);
  const email = String(body?.email ?? "").trim().slice(0, 120);
  const subject = String(body?.subject ?? "").trim().slice(0, 120);
  const message = String(body?.message ?? "").trim().slice(0, 2000);
  const honeypot = String(body?.company ?? "");
  const elapsed = Number(body?.elapsed ?? 0);

  // Bots: fill the hidden field or submit instantly. Pretend success so they move on.
  if (honeypot || elapsed < 2500) return json({ ok: true });

  if (name.length < 2) return json({ error: "Please enter your name." }, 400);
  if (!EMAIL_RE.test(email)) return json({ error: "Please enter a valid email." }, 400);
  if (message.length < 10) return json({ error: "Message should be at least 10 characters." }, 400);

  const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) return json({ error: "Too many messages. Please try again in a few minutes." }, 429);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "ponsanmugavishalgowri@gmail.com";
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return json({ error: "The contact form isn't set up yet." }, 503);
  }

  const title = subject || "New message from your portfolio";
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:24px;border:1px solid #eee;border-radius:12px">
      <p style="margin:0 0 4px;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px">Portfolio contact form</p>
      <h2 style="margin:0 0 16px;color:#111">${escapeHtml(title)}</h2>
      <p style="margin:0 0 4px"><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p style="margin:0 0 16px"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
      <div style="white-space:pre-wrap;line-height:1.6;color:#222;background:#fafafa;padding:16px;border-radius:8px">${escapeHtml(message)}</div>
      <p style="margin:16px 0 0;color:#888;font-size:12px">Hit reply to answer ${escapeHtml(name)} directly.</p>
    </div>`;
  const text = `${title}\n\nName: ${name}\nEmail: ${email}\n\n${message}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: `Portfolio: ${title} — from ${name}`,
        html,
        text,
      }),
    });
    if (!res.ok) {
      console.error("Resend error", res.status, await res.text());
      return json({ error: "Couldn't send your message right now." }, 502);
    }
    return json({ ok: true });
  } catch (err) {
    console.error("Resend request failed", err);
    return json({ error: "Couldn't send your message right now." }, 502);
  }
}

export function GET() {
  return json({ error: "Method not allowed" }, 405);
}
