"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  SiLaravel,
  SiNextdotjs,
  SiReact,
  SiExpo,
  SiTailwindcss,
  SiMysql,
} from "react-icons/si";
import { useEffect, useRef, useState } from "react";

type Floater = {
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  alt: string;
  color?: string;
  x: number; // % from left
  y: number; // % from top
  dur?: number;
  rev?: boolean;
};

const FLOATERS: Floater[] = [
  { Icon: SiLaravel,     alt: "Laravel",  color: "#FF2D20", x: 6,  y: 18, dur: 4.2 },
  { Icon: SiNextdotjs,   alt: "Next.js",  x: 88, y: 20, dur: 4.8, rev: true },
  { Icon: SiReact,       alt: "React",    color: "#61DAFB", x: 12, y: 82, dur: 5.0 },
  { Icon: SiExpo,        alt: "Expo",     x: 86, y: 78, dur: 4.4, rev: true },
  { Icon: SiTailwindcss, alt: "Tailwind", color: "#38BDF8", x: 48, y: 8,  dur: 5.2 },
  { Icon: SiMysql,       alt: "MySQL",    color: "#00618A", x: 50, y: 86, dur: 5.4, rev: true },
];

function useScrollFloaters(threshold = 80) {
  const [show, setShow] = useState(true);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        const top = window.scrollY || document.documentElement.scrollTop;
        setShow(top < threshold);
        if (raf.current) cancelAnimationFrame(raf.current);
        raf.current = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener("scroll", onScroll);
    };
  }, [threshold]);

  return show;
}

function FloatingIcon({ Icon, alt, color, x, y, dur = 5, rev }: Floater) {
  const reduceMotion = useReducedMotion();

  const anim = reduceMotion
    ? { y: 0, rotate: 0, scale: 1 }
    : { y: [0, rev ? -8 : 8, 0], rotate: [0, rev ? -1.5 : 1.5, 0], scale: [1, 1.02, 1] };

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: dur, repeat: Infinity, ease: "easeInOut" };

  return (
    <motion.div
      className="pointer-events-none absolute flex items-center justify-center rounded-2xl ring-gradient backdrop-blur
                 shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                 bg-white/70 dark:bg-neutral-900/60
                 h-10 w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12 xl:h-14 xl:w-14
                 opacity-70 sm:opacity-80 lg:opacity-100"
      style={{ top: `${y}%`, left: `${x}%` }}
      animate={anim}
      transition={transition}
      aria-label={alt}
      title={alt}
    >
      <Icon
        className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-neutral-900 dark:text-white"
        style={color ? { color } : undefined}
      />
    </motion.div>
  );
}


export default function Hero() {
  const floatersVisible = useScrollFloaters(80);
  const reduceMotion = useReducedMotion();

  return (
    <section id="home" className="container-narrow pt-12 relative">
 
     

      <div className="card relative overflow-hidden">
      
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-35 sm:opacity-40"
          style={{
            background:
              "radial-gradient(900px 240px at 15% -10%, rgba(108,99,255,.18), transparent 60%)," +
              "radial-gradient(800px 220px at 85% -10%, rgba(232,121,249,.16), transparent 60%)," +
              "radial-gradient(700px 220px at 50% -10%, rgba(20,184,166,.14), transparent 60%)",
          }}
        />

        {/* floaters container — auto hide/show on scroll */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            opacity: floatersVisible || reduceMotion ? 1 : 0,
            filter: floatersVisible || reduceMotion ? "blur(0px)" : "blur(2px)",
          }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          {FLOATERS.map((f) => (
            <FloatingIcon key={f.alt} {...f} />
          ))}
        </motion.div>

        {/* content */}
        <div className="relative p-6 sm:p-8 md:p-12 flex flex-col items-center text-center gap-5">
          {/* top accent */}
          <div className="absolute inset-x-0 -top-1 h-1 bg-gradient-to-r from-[#6C63FF] via-[#E879F9] to-[#14B8A6] opacity-70" />

          {/* avatar */}
          <div className="relative">
            <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full ring-gradient" />
            <Image
              src="/img/elite1.jpg"
              alt="Solomon Elijah Sunday — profile"
              width={100}
              height={100}
              className="rounded-full absolute inset-0 m-auto object-cover"
              priority
              sizes="(max-width: 640px) 80px, 100px"
            />
          </div>

          {/* availability chip */}
          <div className="badge bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Open to work
          </div>

          {/* headline */}
          <h1
            className="text-[1.35rem] leading-tight sm:text-2xl md:text-2xl font-semibold tracking-tight max-w-3xl
                       bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                       bg-clip-text text-transparent drop-shadow-[0_1px_0_rgba(255,255,255,0.6)] dark:drop-shadow-[0_1px_0_rgba(0,0,0,0.6)]"
          >
            Full‑stack developer building fast, delightful products with Laravel, Next.js & Expo.
          </h1>

          <p className="text-[0.95rem] sm:text-base md:text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl">
            I ship production‑ready web and mobile experiences — clean code, strong DX, and measurable business impact.
          </p>

          {/* tech icon row (icon pills) */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {[
              { Icon: SiLaravel,     label: "Laravel",  color: "#FF2D20" },
              { Icon: SiNextdotjs,   label: "Next.js" },
              { Icon: SiReact,       label: "React",    color: "#61DAFB" },
              { Icon: SiExpo,        label: "Expo" },
              { Icon: SiTailwindcss, label: "Tailwind", color: "#38BDF8" },
              { Icon: SiMysql,       label: "MySQL",    color: "#00618A" },
            ].map(({ Icon, label, color }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-xl px-3 py-2
                           bg-white/80 dark:bg-neutral-900/70
                           border border-neutral-200/70 dark:border-neutral-800/70
                           shadow-[0_6px_20px_rgba(0,0,0,.06)]"
                title={label}
              >
                <Icon
                  className="h-5 w-5 text-neutral-900 dark:text-white"
                  style={color ? { color } : undefined}
                />
                <span className="text-sm text-neutral-700 dark:text-neutral-300">{label}</span>
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mt-2">
            <a href="#contact" className="btn btn-primary rounded-xl">Let’s work</a>
            <a
              href="#work"
              className="btn btn-ghost rounded-xl border border-neutral-200 dark:border-neutral-700"
            >
              View portfolio
            </a>
          </div>

          {/* quick stats */}
          <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
            {[
              { k: "Experience", v: "5+ yrs" },
              { k: "Projects", v: "40+" },
              { k: "Clients", v: "15+" },
            ].map(({ k, v }) => (
              <div key={k} className="text-neutral-700 dark:text-neutral-300">
                <div className="font-medium">{v}</div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">{k}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
