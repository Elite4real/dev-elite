"use client";
import { useState } from "react";
import Reveal from "./Reveal";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle"|"ok"|"error">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form as any).name.value.trim(),
      email: (form as any).email.value.trim(),
      subject: (form as any).subject.value.trim(),
      message: (form as any).message.value.trim(),
      honeypot: (form as any).company.value, // hidden field
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const j = await res.json();
      if (res.ok && j.ok) {
        setStatus("ok");
        setMsg("Thanks! I’ll get back to you shortly.");
        form.reset();
      } else {
        setStatus("error");
        setMsg(j?.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="container-narrow">
      <Reveal><h2 className="section-title">Get in touch</h2></Reveal>
      <Reveal delay={0.05}><p className="section-sub">Have a project in mind? Let’s talk.</p></Reveal>

      <Reveal delay={0.1}>
        <form onSubmit={onSubmit} className="card p-6 mt-8 relative overflow-hidden">
          {/* gradient glow */}
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{ background: "radial-gradient(700px 140px at 50% -15%, #E879F9, transparent 60%)" }}
          />
          <div className="relative grid md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-xs text-neutral-500 dark:text-neutral-400">Your name</label>
              <input id="name" name="name" required
                     className="border rounded-xl px-4 py-3 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 outline-none focus:ring-2 focus:ring-[#6C63FF]" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs text-neutral-500 dark:text-neutral-400">Email address</label>
              <input id="email" name="email" type="email" required
                     className="border rounded-xl px-4 py-3 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 outline-none focus:ring-2 focus:ring-[#6C63FF]" />
            </div>
          </div>

          <div className="relative mt-4">
            <label htmlFor="subject" className="text-xs text-neutral-500 dark:text-neutral-400">Subject</label>
            <input id="subject" name="subject"
                   className="w-full border rounded-xl px-4 py-3 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 outline-none focus:ring-2 focus:ring-[#6C63FF]" />
          </div>

          <div className="relative mt-4">
            <label htmlFor="message" className="text-xs text-neutral-500 dark:text-neutral-400">Message</label>
            <textarea id="message" name="message" rows={5} required
                      className="w-full border rounded-xl px-4 py-3 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 outline-none focus:ring-2 focus:ring-[#6C63FF]" />
          </div>

          {/* honeypot (bots fill it, humans don't see it) */}
          <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

          <div className="mt-5 flex items-center gap-3">
            <button disabled={loading}
              className="btn btn-primary rounded-xl inline-flex items-center gap-2">
              {loading && (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" d="M4 12a8 8 0 018-8v4" stroke="currentColor" strokeWidth="4"/>
                </svg>
              )}
              {loading ? "Sending..." : "Send message"}
            </button>

            {status !== "idle" && (
              <p
                role="status"
                className={`text-sm ${status === "ok" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
              >
                {msg}
              </p>
            )}
          </div>
        </form>
      </Reveal>
    </section>
  );
}
