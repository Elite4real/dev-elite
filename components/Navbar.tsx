"use client";
import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const links = ["Home","About","Skills","Experience","Work","Contact"];
  return (
    <header className="sticky top-0 z-40 bg-white/70 dark:bg-neutral-950/70 backdrop-blur border-b border-neutral-200/70 dark:border-neutral-800/70">
      <div className="container-narrow flex h-14 items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
        Dev<span className="text-[#6C63FF]">Elite</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm">
          {links.map((l)=>(
            <a key={l} href={`#${l.toLowerCase()}`} className="text-neutral-700 dark:text-neutral-300 hover:text-[#6C63FF]">
              {l}
            </a>
          ))}
          <ThemeToggle />
          <a href="#contact" className="btn btn-primary">Hire me</a>
        </nav>

        <button onClick={()=>setOpen(v=>!v)} className="md:hidden p-2 rounded-xl btn-ghost" aria-label="Menu">
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-neutral-200 dark:border-neutral-800">
          <div className="container-narrow py-3 flex flex-col gap-3 text-sm">
            {links.map((id)=>(
              <a key={id} onClick={()=>setOpen(false)} href={`#${id.toLowerCase()}`} className="py-1">
                {id}
              </a>
            ))}
            <ThemeToggle />
            <a onClick={()=>setOpen(false)} href="#contact" className="btn btn-primary mt-2 w-fit">Hire me</a>
          </div>
        </div>
      )}
    </header>
  );
}
