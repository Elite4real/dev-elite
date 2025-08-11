"use client";
import Image from "next/image";
import Reveal from "./Reveal";

const highlights = [
  { label: "Experience", value: "5+ yrs" },
  { label: "Projects shipped", value: "40+" },
  { label: "Clients", value: "15+" },
];

const toolbelt = [
  "Laravel", "PHP 8+", "MySQL",
  "Next.js", "React 18", "Tailwind",
  "Expo / React Native", "Zustand", "CI/CD",
];

export default function About() {
  return (
    <section id="about" className="container-narrow">
      <Reveal>
        <h2 className="section-title">About me</h2>
      </Reveal>

      <Reveal delay={0.05}>
        <p className="section-sub">
          Full-stack developer crafting fast, accessible web & mobile products with{" "}
          <span className="font-semibold">Laravel</span>,{" "}
          <span className="font-semibold">Next.js</span>, and{" "}
          <span className="font-semibold">Expo</span>. I value clean code,
          performance, and thoughtful motion that supports usability.
        </p>
      </Reveal>

      <div className="mt-10 grid md:grid-cols-[260px_1fr] gap-6 items-start">
        {/* Left column — profile card */}
        <Reveal>
          <aside className="card p-4 ring-gradient rounded-2xl relative overflow-hidden">
            {/* Soft top glow */}
            <div
              className="pointer-events-none absolute inset-x-0 -top-16 h-32 opacity-40"
              style={{ background: "radial-gradient(500px 120px at 50% 100%, #E879F9, transparent 70%)" }}
            />
            <div className="relative">
              <div className="h-28 w-28 mx-auto rounded-full ring-gradient" />
              <Image
                src="/img/elite2.jpg"
                alt="Portrait"
                width={110}
                height={110}
                className="rounded-full mx-auto -mt-[106px]"
                priority
              />
            </div>

            <div className="text-center mt-4">
              <div className="text-lg font-semibold">Solomon Elijah Sunday</div>
              <div className="text-sm text-neutral-500 dark:text-neutral-400">Full-stack Developer · Auchi, Edo State, NG</div>
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <a
                href="#contact"
                className="btn btn-primary rounded-xl"
                aria-label="Open contact form"
              >
                Contact me
              </a>
              <a
                href="/Solomon-Elijah-Sunday-CV.pdf"
                className="btn btn-ghost rounded-xl bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
                aria-label="Download CV"
              >
                Download CV
              </a>
            </div>

            <div className="mt-5 h-px bg-neutral-200/80 dark:bg-neutral-800/70" />

            {/* Social */}
            <div className="mt-4">
              <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-2 text-center">Social</div>
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  { k: "X", href: "#" },
                  { k: "GitHub", href: "#" },
                  { k: "LinkedIn", href: "#" },
                  { k: "Dribbble", href: "#" },
                ].map(({ k, href }) => (
                  <a
                    key={k}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="badge hover:bg-neutral-200 dark:hover:bg-neutral-700"
                    aria-label={`Open ${k} profile`}
                  >
                    {k}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </Reveal>

        {/* Right column — bio, highlights, toolbelt */}
        <div className="grid gap-6">
          {/* Short narrative */}
          <Reveal>
            <article className="card p-5">
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                I design APIs, dashboards, and mobile apps end-to-end—planning data models, building
                robust Laravel backends, and delivering polished Next.js & Expo frontends. I optimize
                for performance (SSR/ISR, caching, bundle trimming), accessibility, and a clean
                developer experience so teams can move faster with confidence.
              </p>
            </article>
          </Reveal>

          {/* Metrics */}
          <Reveal delay={0.05}>
            <div className="grid sm:grid-cols-3 gap-4">
              {highlights.map((s) => (
                <article key={s.label} className="card p-5 card-hover relative overflow-hidden">
                  <div className="absolute inset-x-0 -top-1 h-1 bg-gradient-to-r from-[#6C63FF] via-[#E879F9] to-[#14B8A6] opacity-70" />
                  <div className="text-sm text-neutral-500">{s.label}</div>
                  <div className="mt-1 text-xl font-semibold">{s.value}</div>
                </article>
              ))}
            </div>
          </Reveal>

          {/* Toolbelt chips */}
          <Reveal delay={0.08}>
            <article className="card p-5">
              <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">Toolbelt</div>
              <div className="flex flex-wrap gap-2">
                {toolbelt.map((t) => (
                  <span key={t} className="badge">{t}</span>
                ))}
              </div>
            </article>
          </Reveal>

          {/* Credibility bullets */}
          <Reveal delay={0.1}>
            <article className="card p-5">
              <ul className="space-y-2 text-neutral-700 dark:text-neutral-300">
                {[
                  "Architected Laravel + Next.js platforms with role-based access and audit trails.",
                  "Delivered Expo apps with smooth navigation, offline-first data, and OTA updates.",
                  "Shipped modern design systems with Tailwind and consistent component APIs.",
                ].map((p) => (
                  <li key={p} className="flex gap-2">
                    <span
                      className="mt-2 inline-block h-1.5 w-1.5 rounded-full"
                      style={{ background: "linear-gradient(90deg,#6C63FF,#E879F9)" }}
                    />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
