"use client";
import Reveal from "./Reveal";
import { motion } from "framer-motion";

type Role = {
  company: string;
  title: string;
  period: string;
  location?: string;
  points: string[];
  stack?: string[];
};

const roles: Role[] = [
  {
    company: "Freelance / Contract",
    title: "Full-stack Engineer",
    period: "2022 — Present",
    location: "Remote • Global",
    stack: ["Laravel", "Next.js", "Expo", "MySQL", "Tailwind"],
    points: [
      "Built Laravel + Next.js APIs and dashboards",
      "Shipped React Native (Expo) apps",
      "Scaled apps to thousands of users",
    ],
  },
  {
    company: "Startup Projects",
    title: "Lead Frontend",
    period: "2020 — 2022",
    location: "Hybrid",
    stack: ["React", "SSR/ISR", "Design Systems", "A/B Testing"],
    points: [
      "Design systems & component libraries",
      "SSR/ISR with Next.js",
      "A/B testing & performance tuning",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="container-narrow">
      <Reveal><h2 className="section-title">Experience</h2></Reveal>
      <Reveal delay={0.05}>
        <p className="section-sub">Selected roles, stack, and measurable impact.</p>
      </Reveal>

      {/* Timeline */}
      <div className="relative mt-10">
        {/* vertical line */}
        <div
          aria-hidden
          className="absolute left-4 top-0 bottom-0 w-px bg-neutral-200/90 dark:bg-neutral-800/80"
        />
        <div className="space-y-6">
          {roles.map((r, i) => (
            <Reveal key={r.company} delay={i * 0.06}>
              <motion.div layout className="relative pl-10">
                {/* gradient node */}
                <span
                  aria-hidden
                  className="absolute left-3 top-6 h-3.5 w-3.5 rounded-full"
                  style={{ background: "linear-gradient(90deg,#6C63FF,#E879F9)" }}
                />
                <article className="card p-5 card-hover">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="font-semibold">
                      {r.title} <span className="text-neutral-500 dark:text-neutral-400">· {r.company}</span>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                      {r.period}
                    </span>
                  </div>

                  {(r.location || (r.stack && r.stack.length)) && (
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {r.location && (
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">{r.location}</span>
                      )}
                      {r.stack?.length ? (
                        <span className="mx-2 h-3 w-px bg-neutral-200 dark:bg-neutral-800" />
                      ) : null}
                      <div className="flex flex-wrap gap-2">
                        {r.stack?.map((s) => (
                          <span key={s} className="badge">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <ul className="mt-4 space-y-2 text-neutral-700 dark:text-neutral-300">
                    {r.points.map((p) => (
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
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Optional CTA */}
      <div className="text-center mt-8">
        <a href="/Solomon-Elijah-Sunday-CV.pdf" className="btn btn-primary rounded-xl">
          Download CV
        </a>
      </div>
    </section>
  );
}
