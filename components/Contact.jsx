"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, CircleAlert, Copy, Download, LoaderCircle, Mail, MapPin, Phone, Send } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal, SectionHeading } from "./ui";

const MAX = 2000;

function Field({ label, name, type = "text", textarea = false, value, onChange, error, ...rest }) {
  const Comp = textarea ? "textarea" : "input";
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-muted">{label}</span>
      <Comp
        name={name}
        type={textarea ? undefined : type}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        className={`w-full rounded-xl border bg-ink/60 px-4 py-3.5 text-cream outline-none transition placeholder:text-faint focus:border-accent/70 focus:bg-ink focus:ring-4 focus:ring-accent/10 ${
          error ? "border-red-400/70" : "border-line"
        } ${textarea ? "min-h-[150px] resize-y" : ""}`}
        {...rest}
      />
      {error && <span className="mt-1.5 block text-xs text-red-300">{error}</span>}
    </label>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", company: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [serverMsg, setServerMsg] = useState("");
  const [copied, setCopied] = useState(false);
  const startedAt = useRef(0);

  useEffect(() => { startedAt.current = Date.now(); }, []);

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) e.email = "Please enter a valid email.";
    if (form.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (status === "sending" || !validate()) return;
    setStatus("sending");
    setServerMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, elapsed: Date.now() - startedAt.current }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "", company: "" });
    } catch (err) {
      setStatus("error");
      setServerMsg(err.message);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <section id="contact" className="relative overflow-hidden py-28 md:py-36">
      <div aria-hidden className="absolute left-1/2 top-40 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]" />
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading index="06" kicker="Contact" title={<>Let's <span className="text-gradient">talk</span></>}>
          Have an internship, a project or just a question? Send a message — it comes straight to my inbox.
        </SectionHeading>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* contact details */}
          <div className="min-w-0 space-y-4">
            <Reveal>
              <div className="card flex items-center justify-between gap-4 p-5">
                <a href={`mailto:${site.email}`} className="flex min-w-0 items-center gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent"><Mail size={19} /></span>
                  <span className="min-w-0">
                    <span className="block text-xs text-faint">Email</span>
                    <span className="block truncate text-cream">{site.email}</span>
                  </span>
                </a>
                <button
                  onClick={copyEmail}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-muted transition hover:border-accent/60 hover:text-accent"
                  aria-label="Copy email address"
                >
                  {copied ? <Check size={16} className="text-accent" /> : <Copy size={16} />}
                </button>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <a href={site.phoneHref} className="card flex items-center gap-4 p-5 transition hover:border-line-strong">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent"><Phone size={19} /></span>
                <span>
                  <span className="block text-xs text-faint">Phone</span>
                  <span className="block text-cream">{site.phone}</span>
                </span>
              </a>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="card flex items-center gap-4 p-5">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent"><MapPin size={19} /></span>
                <span>
                  <span className="block text-xs text-faint">Location</span>
                  <span className="block break-words text-cream">{site.location}</span>
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.18}>
              <a
                href={site.resume}
                download
                className="group flex items-center justify-between rounded-3xl bg-gradient-to-r from-accent to-accent-2 p-5 font-medium text-ink transition hover:brightness-110"
              >
                <span>
                  <span className="block text-xs font-normal opacity-70">Resume · PDF</span>
                  <span className="block text-lg">Download my resume</span>
                </span>
                <span className="grid h-11 w-11 place-items-center rounded-full bg-ink/10 transition group-hover:translate-y-0.5">
                  <Download size={19} />
                </span>
              </a>
            </Reveal>
          </div>

          {/* form */}
          <Reveal delay={0.1} className="min-w-0">
            <form onSubmit={submit} noValidate className="card relative space-y-5 p-6 md:p-8">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Your name" name="name" value={form.name} onChange={update} error={errors.name} autoComplete="name" placeholder="Your full name" />
                <Field label="Your email" name="email" type="email" value={form.email} onChange={update} error={errors.email} autoComplete="email" placeholder="you@example.com" />
              </div>
              <Field label="Subject (optional)" name="subject" value={form.subject} onChange={update} placeholder="Internship opportunity" maxLength={120} />
              <div>
                <Field label="Message" name="message" textarea value={form.message} onChange={update} error={errors.message} maxLength={MAX} placeholder="Tell me a bit about it…" />
                <p className="mt-1.5 text-right font-mono text-[11px] text-faint">{form.message.length}/{MAX}</p>
              </div>

              {/* Honeypot: hidden from people, bots fill it in */}
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={update}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />

              <button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-cream px-6 py-4 font-medium text-ink transition hover:bg-accent disabled:cursor-wait disabled:opacity-70 sm:w-auto"
              >
                {status === "sending" ? (
                  <><LoaderCircle size={18} className="animate-spin" /> Sending…</>
                ) : (
                  <>Send message <Send size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></>
                )}
              </button>

              <AnimatePresence>
                {status === "sent" && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-2 rounded-xl bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300"
                    role="status"
                  >
                    <Check size={16} /> Thanks! Your message was sent — I'll get back to you soon.
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-2 rounded-xl bg-red-400/10 px-4 py-3 text-sm text-red-300"
                    role="alert"
                  >
                    <CircleAlert size={16} /> {serverMsg || "Couldn't send right now."} You can also email me directly.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
