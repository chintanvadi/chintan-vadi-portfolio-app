"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Briefcase, Command, LayoutGrid, Layers, Mail, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { profile, sections } from "@/data/portfolio";
import { useModKey } from "./use-mod-key";
import { useUI } from "./ui-provider";

const dock = [
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "work", label: "Work", icon: LayoutGrid },
  { id: "skills", label: "Skills", icon: Layers },
  { id: "contact", label: "Contact", icon: Mail },
];

export function Nav() {
  const { setPaletteOpen, activeProject } = useUI();
  const mod = useModKey();
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      setPastHero(window.scrollY > window.innerHeight * 0.6);
    };
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

  const dockActive = active === "process" ? "skills" : active;

  return (
    <>
      <motion.div className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-accent" style={{ scaleX: progress }} />
      <header className="fixed inset-x-0 top-3 z-40 flex justify-center px-3 sm:top-4 sm:px-4">
        <nav
          className={`flex w-full max-w-4xl items-center justify-between gap-2 rounded-full border p-1.5 transition-all duration-500 sm:p-2 ${
            scrolled
              ? "border-white/10 bg-ink-900/75 shadow-2xl shadow-black/40 backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
          aria-label="Primary"
        >
          <a href="#top" className="group flex items-center gap-2.5 rounded-full py-0.5 pl-0.5 pr-3">
            <span className="flex size-8 items-center justify-center rounded-full bg-accent text-xs font-bold text-black transition-transform group-hover:rotate-[-8deg]">
              CV
            </span>
            <span className="text-sm font-medium text-white md:hidden lg:block">{profile.name}</span>
          </a>

          <ul className="hidden items-center md:flex">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`relative block rounded-full px-3.5 py-2 text-sm transition-colors lg:px-4 ${
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
              className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/60 transition-colors hover:border-white/25 hover:text-white md:flex"
              aria-label="Open command palette"
            >
              <Command className="size-3.5" />
              <span className="font-mono">{mod} K</span>
            </button>
            <a
              href="#contact"
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-accent active:scale-95"
            >
              Let&apos;s talk
            </a>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {pastHero && !activeProject && (
          <motion.nav
            aria-label="Quick navigation"
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-[max(env(safe-area-inset-bottom),12px)] md:hidden"
          >
            <div className="flex w-full max-w-md items-stretch gap-1 rounded-2xl border border-white/10 bg-ink-900/85 p-1.5 shadow-2xl shadow-black/60 backdrop-blur-xl">
              {dock.map(({ id, label, icon: Icon }) => {
                const isActive = dockActive === id;
                return (
                  <a
                    key={id}
                    href={`#${id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`relative flex flex-1 flex-col items-center justify-center gap-1 rounded-xl py-2 text-[10px] font-medium transition-colors active:scale-95 ${
                      isActive ? "text-white" : "text-white/45"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="dock-pill"
                        className="absolute inset-0 rounded-xl bg-white/10"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    <Icon className={`relative size-[18px] ${isActive ? "text-accent" : ""}`} />
                    <span className="relative">{label}</span>
                  </a>
                );
              })}
              <button
                onClick={() => setPaletteOpen(true)}
                className="flex flex-1 flex-col items-center justify-center gap-1 rounded-xl bg-accent py-2 text-[10px] font-semibold text-black active:scale-95"
                aria-label="Open quick menu"
              >
                <Search className="size-[18px]" />
                Menu
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
