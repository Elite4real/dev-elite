"use client";
import Image from "next/image";
import Reveal from "./Reveal";
import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Project = {
  title: string;
  category: "app" | "website";
  tag: string;
  img: string;
  href?: string;
};

const projects: Project[] = [
  { title: "E-commerce App",     category: "app",     tag: "React Native · Expo", img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800" },
  { title: "Finance Dashboard",  category: "website", tag: "Next.js · Charts",   img: "https://images.unsplash.com/photo-1551281044-8c5e0460d2f9?q=80&w=800" },
  { title: "Wellness Landing",   category: "website", tag: "Marketing · UI/UX",  img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800" },
  { title: "Travel Planner",     category: "app",     tag: "RN · Offline-first", img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800" },
  { title: "Crypto Tracker",     category: "app",     tag: "Expo · Zustand",     img: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=800" },
  { title: "Bill Payment SaaS",  category: "website", tag: "Laravel API · Next", img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=800" },
];

const FILTERS = ["all", "apps", "websites"] as const;
type Filter = typeof FILTERS[number];

export default function Work() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return projects;
    if (filter === "apps") return projects.filter(p => p.category === "app");
    return projects.filter(p => p.category === "website");
  }, [filter]);

  return (
    <section id="work" className="container-narrow">
      <Reveal><h2 className="section-title">My latest work</h2></Reveal>
      <Reveal delay={0.05}>
        <p className="section-sub">Full-stack builds across mobile apps and web dashboards.</p>
      </Reveal>

      {/* Segmented control */}
      <Reveal delay={0.08}>
        <div className="mt-6 flex items-center justify-center">
          <div className="inline-flex rounded-full p-1 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            {FILTERS.map((f) => {
              const active = f === filter;
              const label = f === "all" ? "All" : f === "apps" ? "Apps" : "Websites";
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition
                    ${active
                      ? "text-white shadow-sm"
                      : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200/70 dark:hover:bg-neutral-800/70"
                    }`}
                  style={active ? { background: "linear-gradient(90deg,#6C63FF,#E879F9)" } : {}}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* Grid */}
      <div className="mt-10 grid md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <motion.article
              layout
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: i * 0.04 }}
              className="card overflow-hidden group relative"
            >
              {/* Top gradient accent */}
              <div className="absolute inset-x-0 -top-1 h-1 bg-gradient-to-r from-[#6C63FF] via-[#E879F9] to-[#14B8A6] opacity-70" />

              {/* Media */}
              <div className="relative aspect-[16/10]">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    {p.tag} · {p.category === "app" ? "App" : "Website"}
                  </p>
                </div>
                <a
                  href={p.href || "#"}
                  className="btn btn-ghost rounded-xl"
                  aria-label={`Open case study for ${p.title}`}
                >
                  Case study
                </a>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {/* Show all button (keeps a gradient look) */}
      <div className="text-center mt-6">
        <button
          onClick={() => setFilter("all")}
          className="btn rounded-xl text-white"
          style={{ background: "linear-gradient(90deg,#6C63FF,#E879F9)" }}
        >
          Show all
        </button>
      </div>
    </section>
  );
}
