"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Copy, CornerDownLeft, Download, Hash, Search, type LucideIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type ComponentType, type SVGProps } from "react";
import { profile, projects, sections } from "@/data/portfolio";
import { GitHubIcon, LinkedInIcon } from "./icons";
import { useUI } from "./ui-provider";

interface Action {
  id: string;
  group: string;
  label: string;
  hint?: string;
  icon: LucideIcon | ComponentType<SVGProps<SVGSVGElement>>;
  accent?: string;
  run: () => void;
}

export function CommandPalette() {
  const { paletteOpen, setPaletteOpen } = useUI();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen(!paletteOpen);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paletteOpen, setPaletteOpen]);

  return <AnimatePresence>{paletteOpen && <PaletteDialog />}</AnimatePresence>;
}

function PaletteDialog() {
  const { setPaletteOpen, openProject, showToast } = useUI();
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const actions = useMemo<Action[]>(() => {
    const close = () => setPaletteOpen(false);
    const go = (id: string) => () => {
      close();
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };
    return [
      ...sections.map((s) => ({ id: `nav-${s.id}`, group: "Navigate", label: s.label, icon: Hash, run: go(s.id) })),
      ...projects.map((p) => ({
        id: `project-${p.slug}`,
        group: "Case studies",
        label: p.company,
        hint: p.period,
        icon: ArrowRight,
        accent: p.accent,
        run: () => openProject(p.slug),
      })),
      {
        id: "copy-email",
        group: "Connect",
        label: "Copy email address",
        hint: profile.email,
        icon: Copy,
        run: () => {
          navigator.clipboard?.writeText(profile.email);
          close();
          showToast("Email copied to clipboard");
        },
      },
      {
        id: "linkedin",
        group: "Connect",
        label: "Open LinkedIn",
        icon: LinkedInIcon,
        run: () => {
          window.open(profile.linkedin, "_blank", "noopener");
          close();
        },
      },
      {
        id: "github",
        group: "Connect",
        label: "Open GitHub",
        icon: GitHubIcon,
        run: () => {
          window.open(profile.github, "_blank", "noopener");
          close();
        },
      },
      {
        id: "resume",
        group: "Connect",
        label: "Download CV",
        icon: Download,
        run: () => {
          const a = document.createElement("a");
          a.href = profile.resume;
          a.download = "";
          a.click();
          close();
        },
      },
    ];
  }, [openProject, setPaletteOpen, showToast]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) => `${a.label} ${a.group} ${a.hint ?? ""}`.toLowerCase().includes(q));
  }, [actions, query]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${cursor}"]`)?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  function onInputKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => (c + 1) % Math.max(filtered.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => (c - 1 + filtered.length) % Math.max(filtered.length, 1));
    } else if (e.key === "Enter") {
      filtered[cursor]?.run();
    } else if (e.key === "Escape") {
      setPaletteOpen(false);
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-start justify-center px-3 pt-[10vh] sm:px-4 sm:pt-[12vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setPaletteOpen(false)} />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        initial={{ opacity: 0, y: -12, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.98 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-ink-900/95 shadow-2xl shadow-black/60 backdrop-blur-xl"
      >
        <div className="flex items-center gap-3 border-b border-white/5 px-4">
          <Search className="size-4 text-white/40" />
          <input
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCursor(0);
            }}
            onKeyDown={onInputKey}
            placeholder="Jump to a section, case study or contact…"
            className="h-14 flex-1 bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none"
            aria-label="Search commands"
          />
          <kbd className="rounded border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-white/40">ESC</kbd>
        </div>
        <div ref={listRef} className="max-h-[50vh] overflow-y-auto p-2">
          {filtered.length === 0 && (
            <p className="px-3 py-8 text-center text-sm text-white/40">No results for “{query}”</p>
          )}
          {filtered.map((action, i) => {
            const showGroup = action.group !== filtered[i - 1]?.group;
            const Icon = action.icon;
            return (
              <div key={action.id}>
                {showGroup && (
                  <div className="px-3 pb-1.5 pt-3 font-mono text-[10px] uppercase tracking-widest text-white/30">
                    {action.group}
                  </div>
                )}
                <button
                  data-index={i}
                  onMouseMove={() => setCursor(i)}
                  onClick={action.run}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                    i === cursor ? "bg-white/[0.07] text-white" : "text-white/65"
                  }`}
                >
                  <span
                    className="flex size-7 items-center justify-center rounded-md border border-white/10 bg-white/5"
                    style={action.accent ? { color: action.accent } : undefined}
                  >
                    <Icon className="size-3.5" />
                  </span>
                  <span className="flex-1">{action.label}</span>
                  {action.hint && <span className="text-xs text-white/35">{action.hint}</span>}
                  {i === cursor && <CornerDownLeft className="size-3.5 text-white/40" />}
                </button>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-4 border-t border-white/5 px-4 py-2.5 text-[11px] text-white/35">
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span className="ml-auto">{profile.name}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
