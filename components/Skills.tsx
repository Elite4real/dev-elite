"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

type Skill = { name: string; level: number };
type Stack = { group: "Backend" | "Frontend" | "Mobile" | "Platform & DevOps"; skills: Skill[] };

const stacks: Stack[] = [
  { group: "Backend", skills: [
    { name: "Laravel", level: 90 }, { name: "PHP 8+", level: 85 }, { name: "MySQL", level: 80 },
  ]},
  { group: "Frontend", skills: [
    { name: "Next.js", level: 90 }, { name: "React 18", level: 90 }, { name: "Tailwind", level: 85 },
  ]},
  { group: "Mobile", skills: [
    { name: "Expo / React Native", level: 88 }, { name: "Zustand", level: 80 }, { name: "Navigation", level: 82 },
  ]},
  { group: "Platform & DevOps", skills: [
    { name: "Vercel / Netlify", level: 90 }, { name: "Nginx", level: 70 }, { name: "CI/CD", level: 75 },
  ]},
];

const FILTERS = ["All", "Backend", "Frontend", "Mobile", "Platform"] as const;
type Filter = typeof FILTERS[number];
type ViewMode = "bars" | "grid";
type SortMode = "level" | "name";

function profLabel(level: number) {
  if (level >= 90) return "Expert";
  if (level >= 80) return "Advanced";
  if (level >= 65) return "Intermediate";
  return "Familiar";
}

export default function Skills() {
  const [filter, setFilter] = useState<Filter>("All");
  const [view, setView] = useState<ViewMode>("bars");
  const [sortBy, setSortBy] = useState<SortMode>("level");

  // Flatten skills for GRID view and for  "All" sorting
  const flatSkills = useMemo(
    () =>
      stacks.flatMap((s) =>
        s.skills.map((sk) => ({ ...sk, group: s.group }))
      ),
    []
  );

  const filteredStacks = useMemo(() => {
    if (filter === "All") return stacks;
    return stacks.filter((s) => s.group === filter);
  }, [filter]);

  const filteredFlat = useMemo(() => {
    const list = filter === "All" ? flatSkills : flatSkills.filter((s: any) => s.group === filter);
    if (sortBy === "name") return [...list].sort((a, b) => a.name.localeCompare(b.name));
    // sort by level desc, then name
    return [...list].sort((a, b) => (b.level - a.level) || a.name.localeCompare(b.name));
  }, [flatSkills, filter, sortBy]);

  return (
    <section id="skills" className="container-narrow">
      <Reveal><h2 className="section-title">Tech stack & skills</h2></Reveal>
      <Reveal delay={0.05}>
        <p className="section-sub">Tools I use daily to deliver reliable, scalable apps.</p>
      </Reveal>

      {/* Controls */}
      <Reveal delay={0.08}>
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Filter segmented control */}
          <div className="inline-flex rounded-full p-1 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            {FILTERS.map((f) => {
              const active = f === filter;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition
                    ${active ? "text-white shadow-sm" : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200/70 dark:hover:bg-neutral-800/70"}`}
                  style={active ? { background: "linear-gradient(90deg,#6C63FF,#E879F9)" } : {}}
                >
                  {f}
                </button>
              );
            })}
          </div>

          {/* View + Sort */}
          <div className="flex items-center gap-2">
            <div className="inline-flex rounded-full p-1 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              {(["bars", "grid"] as const).map((m) => {
                const active = view === m;
                return (
                  <button
                    key={m}
                    onClick={() => setView(m)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition
                      ${active ? "text-white shadow-sm" : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200/70 dark:hover:bg-neutral-800/70"}`}
                    style={active ? { background: "linear-gradient(90deg,#6C63FF,#E879F9)" } : {}}
                    aria-label={`View as ${m}`}
                  >
                    {m === "bars" ? "Bars" : "Grid"}
                  </button>
                );
              })}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortMode)}
              className="text-sm rounded-xl px-3 py-2 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 outline-none"
              title="Sort skills"
            >
              <option value="level">Sort: Level</option>
              <option value="name">Sort: Name</option>
            </select>
          </div>
        </div>
      </Reveal>

      {/* Content */}
      <div className="mt-10">
        {view === "bars" ? (
          /* Grouped BAR view */
          <div className="grid md:grid-cols-2 gap-5">
            {filteredStacks.map((s, i) => (
              <Reveal key={s.group} delay={i * 0.06}>
                <article className="card p-5 card-hover">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-semibold">{s.group}</h3>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">{s.skills.length} skills</span>
                  </div>

                  <div className="space-y-4">
                    {[...s.skills]
                      .sort((a, b) => (sortBy === "name" ? a.name.localeCompare(b.name) : b.level - a.level))
                      .map((sk) => (
                        <div key={sk.name}>
                          <div className="flex items-center justify-between gap-3 text-sm">
                            <span className="text-neutral-700 dark:text-neutral-300">{sk.name}</span>
                            <span className="text-neutral-500 dark:text-neutral-400">{sk.level}% · {profLabel(sk.level)}</span>
                          </div>
                          <div className="mt-2 h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${sk.level}%` }}
                              viewport={{ once: true, margin: "-80px" }}
                              transition={{ duration: 0.7, ease: "easeOut" }}
                              style={{ background: "linear-gradient(90deg,#6C63FF,#E879F9)" }}
                              aria-label={`${sk.name} proficiency ${sk.level}%`}
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          /* Flat GRID view */
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFlat.map((sk, i) => (
              <Reveal key={`${sk.group}-${sk.name}`} delay={i * 0.03}>
                <article className="card p-4 card-hover">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{sk.name}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                      {sk.group}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                    <span>{profLabel(sk.level)}</span>
                    <span>{sk.level}%</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${sk.level}%` }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      style={{ background: "linear-gradient(90deg,#6C63FF,#E879F9)" }}
                    />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {/* Subtle divider */}
      <div className="mt-8 hr" />
    </section>
  );
}
