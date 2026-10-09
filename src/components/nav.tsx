"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { ArrowUpRight, Briefcase, Command, Download, LayoutGrid, Layers, Mail, Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { profile, sections } from "@/data/portfolio";
import { GitHubIcon, LinkedInIcon } from "./icons";
import { useModKey } from "./use-mod-key";
import { useUI } from "./ui-provider";

const dock = [
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "work", label: "Work", icon: LayoutGrid },
  { id: "skills", label: "Skills", icon: Layers },
  { id: "contact", label: "Contact", icon: Mail },
];

const ease = [0.22, 1, 0.36, 1] as const;

function MobileMenu({ active, onClose }: { active: string | null; onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[45] flex flex-col bg-background/95 px-5 pb-[max(env(safe-area-inset-bottom),24px)] pt-24 backdrop-blur-xl md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
    >
      <nav className="flex-1">
        <ul className="space-y-1">
          {sections.map((s, i) => (
            <motion.li
              key={s.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 + i * 0.05, ease }}
            >
              <a
                href={`#${s.id}`}
                onClick={onClose}
                className="flex items-baseline gap-4 border-b border-white/5 py-4"
              >
                <span className="font-mono text-xs text-white/30">{String(i + 1).padStart(2, "0")}</span>
                <span className={`text-3xl font-semibold tracking-tight ${active === s.id ? "text-accent" : "text-white"}`}>
                  {s.label}
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </nav>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35, ease }}
        className="space-y-3"
      >
        <a
          href="#contact"
          onClick={onClose}
          className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent text-base font-semibold text-black"
        >
          Let&apos;s talk <ArrowUpRight className="size-4" />
        </a>
        <div className="grid grid-cols-3 gap-2">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/10 text-sm text-white/70"
          >
            <LinkedInIcon className="size-4" /> LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/10 text-sm text-white/70"
          >
            <GitHubIcon className="size-4" /> GitHub
          </a>
          <a
            href={profile.resume}
            download
            className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/10 text-sm text-white/70"
          >
            <Download className="size-4" /> CV
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Nav() {
  const { setPaletteOpen, activeProject } = useUI();
  const mod = useModKey();
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      setPastHero(window.scrollY > window.innerHeight * 0.8);
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
  const solid = scrolled || menuOpen;

  return (
    <>
      <motion.div className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-accent" style={{ scaleX: progress }} />
      <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-4 sm:px-4">
        <nav
          className={`flex w-full max-w-4xl items-center justify-between gap-2 rounded-full border p-1.5 transition-all duration-500 sm:p-2 ${
            solid
              ? "border-white/10 bg-ink-900/75 shadow-2xl shadow-black/40 backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
          aria-label="Primary"
        >
          <a
            href="#top"
            onClick={() => setMenuOpen(false)}
            className="group flex items-center gap-2.5 rounded-full py-0.5 pl-0.5 pr-3"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-accent text-xs font-bold text-black transition-transform group-hover:rotate-[-8deg]">
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
              className="hidden rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-accent active:scale-95 sm:block"
            >
              Let&apos;s talk
            </a>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white active:scale-95 md:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>{menuOpen && <MobileMenu active={active} onClose={() => setMenuOpen(false)} />}</AnimatePresence>

      <AnimatePresence>
        {pastHero && !activeProject && !menuOpen && (
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
                    className={`relative flex min-h-12 flex-1 flex-col items-center justify-center gap-1 rounded-xl py-2 text-[10px] font-medium transition-colors active:scale-95 ${
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
                className="flex min-h-12 flex-1 flex-col items-center justify-center gap-1 rounded-xl bg-accent py-2 text-[10px] font-semibold text-black active:scale-95"
                aria-label="Search the site"
              >
                <Search className="size-[18px]" />
                Search
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
