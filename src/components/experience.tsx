"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, GraduationCap } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";
import { profile, projects, type Project } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./reveal";
import { useUI } from "./ui-provider";

const START = 2018;
const END = 2026;
const years = Array.from({ length: END - START + 1 }, (_, i) => START + i);
const span = years.length;
const ease = [0.22, 1, 0.36, 1] as const;

const roles = [...projects].sort((a, b) => b.start - a.start || b.end - a.end);
const latestSlug = roles[0].slug;

const lanes = [
  { id: "frontend", label: "Frontend & Extensions" },
  { id: "backend", label: "Backend" },
] as const;

const chapters = [
  {
    years: "2018 — 2021",
    title: "Backend foundations",
    body: "WordPress calculators, then Laravel ecosystems for blockchain fintech and agency operations — learning how data, money and permissions really flow.",
  },
  {
    years: "2021 — 2024",
    title: "Extension specialist",
    body: "Moved to where users actually work: Chrome, Gmail, Thunderbird and Outlook extensions that pull recruiting and invoicing workflows into the browser.",
  },
  {
    years: "2025 — Now",
    title: "Frontend leadership",
    body: "Leading the frontend of a multi-tenant SaaS platform — architecture, integrations, GDPR, testing and CI — while shipping MV3 tooling on the side.",
  },
];

function TrackBadge({ project }: { project: Project }) {
  return (
    <span
      className="rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider"
      style={{ background: `${project.accent}18`, color: project.accent }}
    >
      {project.track}
    </span>
  );
}

function RoleDetails({ project, compact = false }: { project: Project; compact?: boolean }) {
  const { openProject } = useUI();
  return (
    <div>
      <p className={`leading-relaxed text-white/60 ${compact ? "text-sm" : "text-base sm:text-lg"}`}>
        {project.summary}
      </p>

      <ul className={`space-y-3 ${compact ? "mt-4" : "mt-6"}`}>
        {project.highlights.map((h, i) => (
          <motion.li
            key={h}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.05 + i * 0.05, ease }}
            className={`flex gap-3 text-white/75 ${compact ? "text-sm" : "text-[15px]"}`}
          >
            <span
              className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-black"
              style={{ background: project.accent }}
            >
              <Check className="size-3" />
            </span>
            <span className="leading-relaxed">{h}</span>
          </motion.li>
        ))}
      </ul>

      <div className={`flex flex-wrap gap-1.5 ${compact ? "mt-5" : "mt-7"}`}>
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs text-white/60"
          >
            {t}
          </span>
        ))}
      </div>

      <button
        onClick={() => openProject(project.slug)}
        className="group mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/40 hover:bg-white/5 active:scale-[0.97]"
      >
        Read the case study
        <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
      </button>
    </div>
  );
}

function CareerChart({ selected, onSelect }: { selected: string; onSelect: (slug: string) => void }) {
  return (
    <Reveal className="mb-6 hidden overflow-hidden rounded-3xl border border-white/[0.07] bg-ink-900 p-8 lg:block">
      <div className="grid grid-cols-[200px_1fr] gap-6">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/30">Career timeline</div>
        <div className="grid" style={{ gridTemplateColumns: `repeat(${span}, minmax(0, 1fr))` }}>
          {years.map((y) => (
            <div key={y} className="border-l border-white/5 pl-2 font-mono text-xs text-white/35">
              {y}
            </div>
          ))}
        </div>
      </div>

      {lanes.map((lane) => (
        <div key={lane.id} className="mt-5">
          <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/30">{lane.label}</div>
          <div className="space-y-1.5">
            {projects
              .filter((p) => p.track === lane.id)
              .map((p, i) => {
                const left = ((p.start - START) / span) * 100;
                const width = ((p.end - p.start + 1) / span) * 100;
                const isSelected = p.slug === selected;
                return (
                  <div key={p.slug} className="grid grid-cols-[200px_1fr] items-center gap-6">
                    <button
                      onClick={() => onSelect(p.slug)}
                      className={`truncate text-left text-sm transition-colors ${
                        isSelected ? "text-white" : "text-white/50 hover:text-white"
                      }`}
                    >
                      {p.company}
                    </button>
                    <div className="relative h-9">
                      <div
                        className="absolute inset-0 grid"
                        style={{ gridTemplateColumns: `repeat(${span}, minmax(0, 1fr))` }}
                      >
                        {years.map((y) => (
                          <div key={y} className="border-l border-white/5" />
                        ))}
                      </div>
                      <motion.button
                        onClick={() => onSelect(p.slug)}
                        initial={{ scaleX: 0, opacity: 0 }}
                        whileInView={{ scaleX: 1, opacity: 1 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease }}
                        className="group absolute inset-y-1 origin-left overflow-hidden rounded-lg border text-left transition-shadow"
                        style={{
                          left: `${left}%`,
                          width: `calc(${width}% - 6px)`,
                          borderColor: isSelected ? p.accent : `${p.accent}55`,
                          background: `linear-gradient(90deg, ${p.accent}${isSelected ? "60" : "30"}, ${p.accent}10)`,
                          boxShadow: isSelected ? `0 0 24px -4px ${p.accent}80` : undefined,
                        }}
                        aria-label={`${p.company}, ${p.role}, ${p.period}`}
                        aria-pressed={isSelected}
                      >
                        <span className="relative flex h-full items-center gap-2 px-3">
                          <span className="size-1.5 shrink-0 rounded-full" style={{ background: p.accent }} />
                          <span className="truncate text-xs font-medium text-white">{p.period}</span>
                        </span>
                      </motion.button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </Reveal>
  );
}

export function Experience() {
  const [selected, setSelected] = useState(latestSlug);
  const [expanded, setExpanded] = useState<string | null>(latestSlug);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const index = roles.findIndex((p) => p.slug === selected);
  const current = roles[index];
  const next = roles[(index + 1) % roles.length];

  function onTabKey(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const delta = e.key === "ArrowDown" ? 1 : -1;
    const target = roles[(index + delta + roles.length) % roles.length];
    setSelected(target.slug);
    tabRefs.current[target.slug]?.focus();
  }

  return (
    <section id="experience" className="relative scroll-mt-20 border-t border-white/5 py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Experience"
          title="Seven products, six+ years,"
          accent="from WordPress to Frontend Lead."
          description="Every role I've held — what I owned, what I shipped and the stack I used to ship it."
        />

        <CareerChart selected={selected} onSelect={setSelected} />

        <Reveal className="hidden overflow-hidden rounded-3xl border border-white/[0.07] bg-ink-900 md:grid md:grid-cols-[260px_1fr] lg:grid-cols-[320px_1fr]">
          <div
            role="tablist"
            aria-label="Roles"
            aria-orientation="vertical"
            onKeyDown={onTabKey}
            className="border-r border-white/[0.07] p-3"
          >
            {roles.map((p) => {
              const isActive = p.slug === selected;
              return (
                <button
                  key={p.slug}
                  ref={(el) => {
                    tabRefs.current[p.slug] = el;
                  }}
                  role="tab"
                  id={`role-tab-${p.slug}`}
                  aria-selected={isActive}
                  aria-controls="role-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setSelected(p.slug)}
                  className="relative block w-full rounded-2xl px-4 py-3.5 text-left"
                >
                  {isActive && (
                    <motion.span
                      layoutId="role-tab"
                      className="absolute inset-0 rounded-2xl bg-white/[0.06]"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    >
                      <span className="absolute inset-y-3 left-0 w-0.5 rounded-full" style={{ background: p.accent }} />
                    </motion.span>
                  )}
                  <span className="relative block font-mono text-[11px] text-white/35">{p.period}</span>
                  <span
                    className={`relative mt-0.5 block truncate font-medium transition-colors ${
                      isActive ? "text-white" : "text-white/60"
                    }`}
                  >
                    {p.company}
                  </span>
                  <span className="relative block truncate text-xs text-white/40">{p.role}</span>
                </button>
              );
            })}
          </div>

          <div
            id="role-panel"
            role="tabpanel"
            aria-labelledby={`role-tab-${current.slug}`}
            className="relative min-h-[560px] overflow-hidden p-8 lg:p-10"
          >
            <div
              className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full opacity-20 blur-3xl transition-colors duration-700"
              style={{ background: current.accent }}
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={current.slug}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease }}
                className="relative"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-white/45">{current.period}</span>
                  <TrackBadge project={current} />
                  {current.slug === latestSlug && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
                      <span className="size-1.5 animate-pulse rounded-full bg-accent" /> Latest
                    </span>
                  )}
                </div>
                <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white lg:text-4xl">{current.role}</h3>
                <p className="mt-1 font-serif text-2xl italic" style={{ color: current.accent }}>
                  @ {current.company}
                </p>
                <div className="mt-6">
                  <RoleDetails project={current} />
                </div>
                <button
                  onClick={() => setSelected(next.slug)}
                  className="group mt-8 flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white"
                >
                  Next role: <span className="text-white/70 group-hover:text-white">{next.company}</span>
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        <ol className="space-y-3 md:hidden">
          {roles.map((p) => {
            const isOpen = expanded === p.slug;
            return (
              <li key={p.slug}>
                <Reveal y={16}>
                  <div
                    className={`relative overflow-hidden rounded-2xl border bg-ink-900 transition-colors ${
                      isOpen ? "border-white/15" : "border-white/[0.07]"
                    }`}
                  >
                    <span className="absolute inset-y-0 left-0 w-0.5" style={{ background: p.accent }} />
                    <button
                      onClick={() => setExpanded(isOpen ? null : p.slug)}
                      aria-expanded={isOpen}
                      aria-controls={`role-${p.slug}`}
                      className="flex w-full items-center gap-3 p-4 text-left active:bg-white/[0.03]"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-[11px] text-white/40">{p.period}</span>
                          <TrackBadge project={p} />
                          {p.slug === latestSlug && (
                            <span className="font-mono text-[10px] uppercase tracking-wider text-accent">● Latest</span>
                          )}
                        </div>
                        <div className="mt-1.5 font-semibold text-white">{p.company}</div>
                        <div className="text-sm text-white/50">{p.role}</div>
                      </div>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease }}
                        className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/60"
                      >
                        <ChevronDown className="size-4" />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`role-${p.slug}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-white/5 px-4 pb-5 pt-4">
                            <RoleDetails project={p} compact />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {chapters.map((c, i) => (
            <Reveal
              key={c.title}
              delay={i * 0.08}
              className="rounded-3xl border border-white/[0.07] bg-ink-900 p-6 lg:p-7"
            >
              <div className="font-mono text-xs text-accent">{c.years}</div>
              <h3 className="mt-3 text-xl font-semibold text-white">{c.title}</h3>
              <p className="mt-2 leading-relaxed text-white/50">{c.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-4 flex items-center gap-4 rounded-3xl border border-white/[0.07] bg-ink-900 p-5 sm:p-6">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white">
            <GraduationCap className="size-[18px]" />
          </span>
          <div className="min-w-0">
            <div className="font-medium text-white">
              {profile.education.degree} · {profile.education.school}
            </div>
            <div className="text-sm text-white/45">
              {profile.education.college} · {profile.education.year} · {profile.education.score}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
