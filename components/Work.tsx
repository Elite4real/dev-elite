"use client";
import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Category = "app" | "website";
type Project = {
  title: string;
  category: Category;
  tag: string;
  img: string;       // url or /public path (we default to /web/)
  story: string;
  demo: string;      // external demo link
  caseStudy?: string;// internal page e.g. /work/slug (can contain spaces; we sanitize)
};

const projects: Project[] = [
  {
    title: "Fabrico Manufacturing",
    category: "website",
    tag: "Next.js · TypeScript",
    img: "web/Fabrico.png", // file at /public/web/Fabrico.png
    story: "Fabrico — Smart Manufacturing. Plan, track, and optimize production with reliability.",
    demo: "https://fabrico-manufacturing.vercel.app/",
    caseStudy: "/work/Manufacturing website",
  },
   {
    title: "Blinq Pay",
    category: "app",
    tag: "Larvel API . React native · Zustand",
    img: "web/blinq-pay.jpg",
    story: "Fintech Bill Payment App, Airtime, data, cable, eletricity bill, etc",
    demo: "#",
    caseStudy: "/work/BlinqPay",
  },
  {
    title: "realvillax",
    category: "website",
    tag: "Laravel · Blade",
    img: "web/realvillax.png",
    story: "Full real estate platform with listings, search filters, and agent workflows.",
    demo: "https://realvillax.org/",
    caseStudy: "/work/Real estate",
  },
  {
    title: "Airdrop Empire",
    category: "app",
    tag: "Larvel API . React native · Zustand",
    img: "web/airdropempire.jpg",
    story: "Airdrop hunt App",
    demo: "#",
    caseStudy: "/work/airdrop-empire",
  },
  
  {
    title: "transwidelogistics",
    category: "website",
    tag: "Laravel API · Blade",
    img: "web/transwidelogistics.png",
    story: "Modern logistics site: services, quotes, shipment tracking, and CMS-driven pages.",
    demo: "https://transwidelogistics.com/",
    caseStudy: "/work/logistics website",
  },
  {
    title: "maga dispatch",
    category: "app",
    tag: "Laravel API. React native",
    img: "web/magadispatch.png",
    story: "Logistic Company App",
    demo: "#",
    caseStudy: "/work/magadispatch",
  },
];

const FILTERS = ["all", "apps", "websites"] as const;
type Filter = (typeof FILTERS)[number];

/* ---------- helpers ---------- */
function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
/** Clean + slug caseStudy path; spaces → dashes */
function normalizeCaseStudy(cs: string | undefined, fallbackTitle: string) {
  if (!cs) return `/work/${slugify(fallbackTitle)}`;
  const only = cs.replace(/^\/+/, "").replace(/^work\/+/i, "");
  return `/work/${slugify(only)}`;
}
/** Use /public/web as the default root for local images */
function normalizeImg(src: string) {
  if (/^https?:\/\//i.test(src)) return src;               // remote
  if (src.startsWith("/")) return src.startsWith("/web/") ? src : `/web/${src.replace(/^\//, "")}`;
  return src.startsWith("web/") ? `/${src}` : `/web/${src}`; // relative → /web/...
}
function normalizeImg2(src: string) {
  if (/^https?:\/\//i.test(src)) return src;               // remote
  if (src.startsWith("/")) return src.startsWith("/web/") ? src : `/web/${src.replace(/^\//, "")}`;
  return src.startsWith("web/") ? `/${src}` : `/web/${src}`; // relative → /web/...
}
/** Basic image check */
function isImageLike(src: string) {
  return /^https?:\/\/.+\.(png|jpe?g|webp|avif)(\?.*)?$/i.test(src) || src.startsWith("/");
}

export default function Work() {
  const [filter, setFilter] = useState<Filter>("all");

  const counts = useMemo(() => {
    const apps = projects.filter((p) => p.category === "app").length;
    const sites = projects.length - apps;
    return { all: projects.length, apps, websites: sites };
  }, []);

  const filtered = useMemo(() => {
    if (filter === "all") return projects;
    if (filter === "apps") return projects.filter((p) => p.category === "app");
    return projects.filter((p) => p.category === "website");
  }, [filter]);

  return (
    <section id="work" className="container-narrow">
      <Reveal><h2 className="section-title">My Recent Projects</h2></Reveal>
      <Reveal delay={0.05}>
        <p className="section-sub">Live demos and brief stories from recent builds.</p>
      </Reveal>

      {/* segmented control with counts */}
      <Reveal delay={0.08}>
        <div className="mt-6 flex items-center justify-center">
          <div className="inline-flex rounded-full p-1 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            {FILTERS.map((f) => {
              const active = f === filter;
              const label = f === "all" ? "All" : f === "apps" ? "Apps" : "Websites";
              const count = counts[f as keyof typeof counts];
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition data-[active=true]:text-white data-[active=true]:shadow-sm
                    ${active ? "" : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200/70 dark:hover:bg-neutral-800/70"}`}
                  data-active={active}
                  style={active ? { background: "linear-gradient(90deg,#6C63FF,#E879F9)" } : undefined}
                >
                  {label} <span className="opacity-60">· {count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* grid */}
      <div className="mt-10 grid md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => {
            const caseHref = normalizeCaseStudy(p.caseStudy, p.title);
            const img = normalizeImg(p.img);
            const canImage = isImageLike(img);

            return (
              <motion.article
                layout
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: "easeOut", delay: i * 0.04 }}
                className="card overflow-hidden group relative focus-within:ring-2 focus-within:ring-black/10"
              >
                {/* accent bar */}
                <div className="absolute inset-x-0 -top-1 h-1 bg-gradient-to-r from-[#6C63FF] via-[#E879F9] to-[#14B8A6] opacity-70" />

                {/* media */}
                <div className="relative aspect-[16/10]">
                  {canImage ? (
                    <Image
                      src={img}
                      alt={p.title}
                      fill
                      className="object-cover transition group-hover:scale-[1.02]"
                      sizes="(min-width: 1024px) 560px, 100vw"
                      priority={i < 2}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[var(--ink-100)] text-neutral-500 text-sm">
                      <span className="truncate px-4">{p.title}</span>
                    </div>
                  )}

                  {/* hover/focus story overlay */}
                  <div className="pointer-events-none absolute inset-0 hidden md:flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/30 to-transparent p-5 text-white
                                  opacity-0 transition duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
                    <div className="text-sm/5 font-semibold">{p.title}</div>
                    <p className="mt-1 text-[12px] text-white/85 line-clamp-2">{p.story}</p>
                  </div>

                  {/* demo chip */}
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-3 top-3 inline-flex items-center rounded-lg bg-white/90 px-2.5 py-1.5 text-[12px] font-medium text-black/80 shadow hover:bg-white"
                    title="Open live demo"
                    aria-label={`Open live demo for ${p.title}`}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" className="-ml-0.5 mr-1" aria-hidden="true">
                      <path d="M14 3h7v7M10 14L21 3M21 10v11H3V3h11" stroke="currentColor" strokeWidth="1.8" fill="none" />
                    </svg>
                    Demo
                  </a>
                </div>

                {/* footer */}
                <div className="p-5 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    {/* category chip */}
                    <div className="mb-1">
                      <span className="inline-flex items-center rounded-full bg-[var(--ink-100)] px-2 py-0.5 text-[10px] font-medium text-black/70">
                        {p.category === "app" ? "App" : "Website"}
                      </span>
                    </div>
                    <h3 className="font-semibold">{p.title}</h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{p.tag}</p>
                    <p className="mt-2 text-[12px] text-neutral-600 dark:text-neutral-300 line-clamp-2">{p.story}</p>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-2 sm:flex-row">
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost rounded-xl border border-black/10 hover:border-black/15"
                      aria-label={`Open live demo for ${p.title}`}
                      title="Open live demo"
                    >
                      Demo
                    </a>
                    <Link
                      href={caseHref}
                      className="btn btn-ghost rounded-xl"
                      aria-label={`Open case study for ${p.title}`}
                      title="Read case study"
                    >
                      Case study
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>

      {/* show all */}
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
