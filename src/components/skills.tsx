"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  Database,
  FlaskConical,
  LayoutDashboard,
  MousePointerClick,
  Puzzle,
  Server,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { integrationLogos, projects, projectsUsing, skillGroups } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./reveal";
import { useUI } from "./ui-provider";

const ease = [0.22, 1, 0.36, 1] as const;

const icons: Record<string, LucideIcon> = {
  frontend: LayoutDashboard,
  extensions: Puzzle,
  backend: Server,
  architecture: Workflow,
  data: Database,
  quality: FlaskConical,
  tools: Wrench,
};

function ExplorerResult({ skill }: { skill: string }) {
  const { openProject } = useUI();
  const used = useMemo(() => projectsUsing(skill), [skill]);

  return (
    <motion.div
      key={skill}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.3, ease }}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">Where I&apos;ve shipped</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{skill}</p>
      <p className="mt-1 text-sm text-white/50">
        {used.length > 0
          ? `Shipped in ${used.length} of ${projects.length} case studies.`
          : "Part of my everyday toolkit — not tied to a specific case study here."}
      </p>
      {used.length > 0 && (
        <ul className="mt-5 space-y-2">
          {used.map((p) => (
            <li key={p.slug}>
              <button
                onClick={() => openProject(p.slug)}
                className="group flex min-h-14 w-full items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 text-left transition-colors hover:border-white/20 hover:bg-white/[0.04]"
              >
                <span className="size-2 shrink-0 rounded-full" style={{ background: p.accent }} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-white">{p.company}</span>
                  <span className="block truncate text-xs text-white/45">
                    {p.role} · {p.period}
                  </span>
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-white/40 transition-transform group-hover:rotate-45 group-hover:text-white" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

export function Skills() {
  const [selected, setSelected] = useState<string>("Chrome MV2 / MV3");
  const counts = useMemo(
    () => Object.fromEntries(skillGroups.flatMap((g) => g.items).map((s) => [s, projectsUsing(s).length])),
    [],
  );
  const half = Math.ceil(integrationLogos.length / 2);
  const rows = [integrationLogos.slice(0, half), integrationLogos.slice(half)];

  return (
    <section id="skills" className="section-pad relative border-t border-white/5">
      <div className="container-x">
        <SectionHeading
          index="03"
          eyebrow="Toolkit"
          title="A full-stack toolkit,"
          accent="sharpened on real products."
          description="Tap any technology to see exactly which products I shipped it in."
        />

        <div className="grid gap-4 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-6">
          <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
            {skillGroups.map((g, i) => {
              const Icon = icons[g.id];
              const highlight = g.id === "extensions";
              const hasSelected = g.items.includes(selected);
              return (
                <Reveal
                  key={g.id}
                  delay={(i % 2) * 0.06}
                  className={`surface relative overflow-hidden p-5 sm:p-6 ${highlight ? "md:col-span-2 border-accent/25!" : ""} ${
                    g.id === "tools" ? "md:col-span-2" : ""
                  }`}
                >
                  {highlight && (
                    <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-accent/15 blur-3xl" />
                  )}
                  <div className="relative flex items-center gap-3">
                    <span
                      className={`flex size-10 shrink-0 items-center justify-center rounded-xl border ${
                        highlight ? "border-accent/30 bg-accent text-black" : "border-white/10 bg-white/5 text-white"
                      }`}
                    >
                      <Icon className="size-[18px]" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-white">{g.title}</h3>
                      <p className="text-sm text-white/45">{g.blurb}</p>
                    </div>
                  </div>
                  {highlight && (
                    <p className="relative mt-4 font-serif text-xl italic leading-snug text-white/80 sm:text-2xl">
                      “My specialty — shipping inside Chrome, Gmail, Thunderbird & Outlook.”
                    </p>
                  )}
                  <div className="relative mt-5 flex flex-wrap gap-1.5">
                    {g.items.map((item) => {
                      const active = selected === item;
                      return (
                        <button
                          key={item}
                          onClick={() => setSelected(item)}
                          aria-pressed={active}
                          className={`inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3 text-xs transition-colors sm:text-sm ${
                            active
                              ? "border-accent bg-accent text-black"
                              : "border-white/[0.08] bg-white/[0.03] text-white/70 hover:border-accent/40 hover:text-white"
                          }`}
                        >
                          {item}
                          {counts[item] > 0 && (
                            <span
                              className={`rounded-full px-1.5 font-mono text-[10px] ${
                                active ? "bg-black/15 text-black/70" : "bg-white/10 text-white/50"
                              }`}
                            >
                              {counts[item]}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <AnimatePresence initial={false}>
                    {hasSelected && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease }}
                        className="relative overflow-hidden lg:hidden"
                      >
                        <div className="mt-5 border-t border-white/[0.07] pt-5">
                          <AnimatePresence mode="wait">
                            <ExplorerResult key={selected} skill={selected} />
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              );
            })}
          </div>

          <div className="hidden lg:block">
            <Reveal className="surface sticky top-28 p-7">
              <p className="mb-6 flex items-center gap-2 text-sm text-white/40">
                <MousePointerClick className="size-4" /> Stack explorer
              </p>
              <AnimatePresence mode="wait">
                <ExplorerResult key={selected} skill={selected} />
              </AnimatePresence>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="mt-16 sm:mt-24">
        <Reveal className="container-x mb-6 sm:mb-8">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/40">
            Integrated with the tools businesses run on
          </p>
        </Reveal>
        <div className="mask-fade-x space-y-3 overflow-hidden">
          {rows.map((row, r) => (
            <div key={r} className="flex">
              <div
                className={`flex shrink-0 gap-3 pr-3 ${r === 0 ? "animate-marquee" : "animate-marquee-reverse"} hover:[animation-play-state:paused]`}
              >
                {[...row, ...row].map((name, i) => (
                  <span
                    key={`${name}-${i}`}
                    aria-hidden={i >= row.length}
                    className="whitespace-nowrap rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2 text-xs text-white/60 sm:px-5 sm:py-2.5 sm:text-sm"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
