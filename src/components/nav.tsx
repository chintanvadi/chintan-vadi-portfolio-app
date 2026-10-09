"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { Command, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { profile, sections } from "@/data/portfolio";
import { useModKey } from "./use-mod-key";
import { useUI } from "./ui-provider";

export function Nav() {
  const { setPaletteOpen } = useUI();
  const mod = useModKey();
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    const top = document.getElementById("top");
    if (top) observer.observe(top);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <motion.div className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-accent" style={{ scaleX: progress }} />
      <header className="fixed inset-x-0 top-4 z-40 flex justify-center px-4">
        <nav
          className={`flex w-full max-w-4xl items-center justify-between gap-2 rounded-full border py-2 pl-2 pr-2 transition-all duration-500 ${
            scrolled
              ? "border-white/10 bg-ink-900/75 shadow-2xl shadow-black/40 backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
          aria-label="Primary"
        >
          <a href="#top" className="group flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3">
            <span className="flex size-8 items-center justify-center rounded-full bg-accent text-xs font-bold text-black transition-transform group-hover:rotate-[-8deg]">
              CV
            </span>
            <span className="hidden text-sm font-medium text-white sm:block">{profile.name}</span>
          </a>

          <ul className="hidden items-center md:flex">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`relative block rounded-full px-4 py-2 text-sm transition-colors ${
                    active === s.id ? "text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  {active === s.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPaletteOpen(true)}
              className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/60 transition-colors hover:border-white/25 hover:text-white sm:flex"
              aria-label="Open command palette"
            >
              <Command className="size-3.5" />
              <span className="font-mono">{mod} K</span>
            </button>
            <a
              href="#contact"
              className="hidden rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-accent sm:block"
            >
              Let&apos;s talk
            </a>
            <button
              onClick={() => setPaletteOpen(true)}
              className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white sm:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-4" />
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}
