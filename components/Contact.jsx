"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, CircleAlert, Copy, Download, LoaderCircle, Mail, MapPin, Phone, Send, X } from "lucide-react";
import { site } from "@/lib/site";
import { ease } from "@/lib/motion";
import Glass from "./Glass";
import { Reveal, SectionHeading } from "./ui";

const MAX = 2000;
const EMPTY = { name: "", email: "", subject: "", message: "", company: "" };

function validateForm(form) {
  const e = {};
  if (form.name.trim().length < 2) e.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) e.email = "Please enter a valid email.";
  if (form.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
  return e;
}

// Input with a label that floats up when focused or filled.
function Field({ label, name, type = "text", textarea = false, value, onChange, error, hint, ...rest }) {
  const Comp = textarea ? "textarea" : "input";
  const id = `contact-${name}`;
  const describedBy = [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(" ") || undefined;
  return (
    <div>
      <div className="relative">
        <Comp
          id={id}
          name={name}
          type={textarea ? undefined : type}
          value={value}
          onChange={onChange}
          placeholder=" "
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={`field peer ${error ? "field-error" : ""} ${textarea ? "min-h-[170px] resize-y pt-8" : ""}`}
          {...rest}
        />
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-4 top-[1.1rem] origin-left text-[16px] text-muted transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
        >
          {label}
        </label>
      </div>
      <div className="mt-1.5 flex items-start justify-between gap-3 text-sm">
        {error ? (
          <p id={`${id}-error`} className="flex items-center gap-1.5 text-danger">
            <CircleAlert size={14} aria-hidden /> {error}
          </p>
        ) : (
          <span />
        )}
        {hint && (
          <p id={`${id}-hint`} className="shrink-0 font-mono text-xs text-faint">
            {hint}
          </p>
        )}
      </div>
    </div>
  );
}

function Toast({ toast, onClose }) {
  const ok = toast.type === "success";
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.96 }}
      transition={{ duration: 0.35, ease }}
      className="glass-strong pointer-events-auto flex max-w-md items-start gap-3 !rounded-[20px] p-4 pr-3"
    >
      <span
        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${
          ok ? "bg-success/15 text-success" : "bg-danger/15 text-danger"
        }`}
      >
        {ok ? <Check size={16} aria-hidden /> : <CircleAlert size={16} aria-hidden />}
      </span>
      <p className="flex-1 pt-1 text-[15px] leading-snug text-fg">{toast.text}</p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss message"
        className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted transition hover:text-fg"
      >
        <X size={16} aria-hidden />
      </button>
    </motion.div>
  );
}

function InfoCard({ icon: Icon, label, children, href }) {
  const body = (
    <>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent/10 text-accent">
        <Icon size={19} aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block text-xs text-muted">{label}</span>
        <span className="block break-words text-fg">{children}</span>
      </span>
    </>
  );
  return href ? (
    <Glass as="a" interactive href={href} className="flex items-center gap-4 !rounded-[20px] p-5">
      {body}
    </Glass>
  ) : (
    <Glass className="flex items-center gap-4 !rounded-[20px] p-5">{body}</Glass>
  );
}

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [tried, setTried] = useState(false); // after the first submit, validate while typing
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState(null); // { type: "success" | "error", text }
  const [copied, setCopied] = useState(false);
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // Toasts close themselves after a few seconds
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), toast.type === "success" ? 6000 : 9000);
    return () => clearTimeout(t);
  }, [toast]);

  const update = (e) => {
    const next = { ...form, [e.target.name]: e.target.value };
    setForm(next);
    if (tried) setErrors(validateForm(next));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (sending) return;
    setTried(true);
    const found = validateForm(form);
    setErrors(found);
    if (Object.keys(found).length) {
      e.currentTarget.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }
    setSending(true);
    setToast(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, elapsed: Date.now() - startedAt.current }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setToast({ type: "success", text: "Thanks! Your message was sent — I'll get back to you soon." });
      setForm(EMPTY);
      setTried(false);
    } catch (err) {
      setToast({
        type: "error",
        text: `${err.message || "Couldn't send right now."} You can also email me directly.`,
      });
    } finally {
      setSending(false);
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
    <section id="contact" className="section-y relative overflow-x-clip">
      <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        {/* Left: heading + contact details */}
        <div className="min-w-0">
          <SectionHeading
            index="06"
            kicker="Contact"
            title={
              <>
                Let&apos;s <span className="text-gradient">talk</span>
              </>
            }
          >
            Have an internship, a project or just a question? Send a message — it comes straight to my inbox.
          </SectionHeading>

          <div className="space-y-3">
            <Reveal>
              <Glass className="flex items-center justify-between gap-3 !rounded-[20px] p-5">
                <a href={`mailto:${site.email}`} className="flex min-w-0 items-center gap-4 rounded-xl">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent/10 text-accent">
                    <Mail size={19} aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-muted">Email</span>
                    <span className="block truncate text-fg">{site.email}</span>
                  </span>
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="glass-pill inline-flex h-10 shrink-0 items-center gap-1.5 px-3.5 text-sm text-fg"
                  aria-label={copied ? "Email address copied" : "Copy email address"}
                >
                  {copied ? <Check size={15} className="text-success" aria-hidden /> : <Copy size={15} aria-hidden />}
                  <span aria-hidden>{copied ? "Copied" : "Copy"}</span>
                </button>
                <span className="sr-only" aria-live="polite">
                  {copied ? "Email address copied to clipboard" : ""}
                </span>
              </Glass>
            </Reveal>
            <Reveal delay={0.05}>
              <InfoCard icon={Phone} label="Phone" href={site.phoneHref}>
                {site.phone}
              </InfoCard>
            </Reveal>
            <Reveal delay={0.1}>
              <InfoCard icon={MapPin} label="Location">
                {site.location}
              </InfoCard>
            </Reveal>
            <Reveal delay={0.15}>
              <motion.a
                href={site.resume}
                download
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
                className="btn-gradient group flex items-center justify-between rounded-[20px] p-5 font-medium"
              >
                <span>
                  <span className="block text-xs font-normal opacity-85">Resume · PDF</span>
                  <span className="block text-lg">Download my resume</span>
                </span>
                <span className="grid h-11 w-11 place-items-center rounded-full bg-white/15 transition group-hover:translate-y-0.5">
                  <Download size={19} aria-hidden />
                </span>
              </motion.a>
            </Reveal>
          </div>
        </div>

        {/* Right: form */}
        <Reveal delay={0.1} className="min-w-0 lg:pt-4">
          <form onSubmit={submit} noValidate className="glass relative space-y-4 p-6 sm:p-8" aria-label="Contact form">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Your name" name="name" value={form.name} onChange={update} error={errors.name} autoComplete="name" maxLength={80} />
              <Field label="Your email" name="email" type="email" value={form.email} onChange={update} error={errors.email} autoComplete="email" maxLength={120} />
            </div>
            <Field label="Subject (optional)" name="subject" value={form.subject} onChange={update} maxLength={120} />
            <Field
              label="Message"
              name="message"
              textarea
              value={form.message}
              onChange={update}
              error={errors.message}
              maxLength={MAX}
              hint={`${form.message.length}/${MAX}`}
            />

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

            <motion.button
              type="submit"
              disabled={sending}
              whileHover={sending ? undefined : { y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="btn-gradient group inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-4 font-medium disabled:cursor-wait disabled:opacity-80 sm:w-auto"
            >
              {sending ? (
                <>
                  <LoaderCircle size={18} className="animate-spin" aria-hidden /> Sending…
                </>
              ) : (
                <>
                  Send message
                  <Send size={17} aria-hidden className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </>
              )}
            </motion.button>
          </form>
        </Reveal>
      </div>

      {/* Toasts (live regions stay mounted so screen readers announce new messages) */}
      <div className="pointer-events-none fixed inset-x-0 bottom-5 z-[60] flex justify-center px-4 sm:bottom-7">
        <div role="status" aria-live="polite">
          <AnimatePresence>
            {toast?.type === "success" && <Toast key="ok" toast={toast} onClose={() => setToast(null)} />}
          </AnimatePresence>
        </div>
        <div role="alert">
          <AnimatePresence>
            {toast?.type === "error" && <Toast key="err" toast={toast} onClose={() => setToast(null)} />}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
