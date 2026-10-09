"use client";

import { motion } from "motion/react";
import { projects, profile } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./reveal";
import { useUI } from "./ui-provider";

const START = 2018;
const END = 2026;
const years = Array.from({ length: END - START + 1 }, (_, i) => START + i);
const span = years.length;

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

export function Journey() {
  const { openProject } = useUI();
  const sorted = [...projects].sort((a, b) => b.start - a.start);

  return (
    <section id="journey" className="relative scroll-mt-24 border-t border-white/5 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Journey"
          title="From WordPress to Frontend Lead,"
          accent="always moving closer to the user."
          description="From backend services to the interfaces people use every day. Hover a bar to see the role, click it to open the case study."
        />

        <Reveal className="hidden overflow-hidden rounded-3xl border border-white/[0.07] bg-ink-900 p-8 md:block">
          <div className="grid grid-cols-[200px_1fr] gap-6">
            <div />
            <div className="grid" style={{ gridTemplateColumns: `repeat(${span}, minmax(0, 1fr))` }}>
              {years.map((y) => (
                <div key={y} className="border-l border-white/5 pl-2 font-mono text-xs text-white/35">
                  {y}
                </div>
              ))}
            </div>
          </div>

          {lanes.map((lane) => (
            <div key={lane.id} className="mt-6">
              <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/30">{lane.label}</div>
              <div className="space-y-2.5">
                {projects
                  .filter((p) => p.track === lane.id)
                  .map((p, i) => {
                    const left = ((p.start - START) / span) * 100;
                    const width = ((p.end - p.start + 1) / span) * 100;
                    return (
                      <div key={p.slug} className="grid grid-cols-[200px_1fr] items-center gap-6">
                        <div className="truncate text-sm text-white/60">{p.company}</div>
                        <div className="relative h-11">
                          <div
                            className="absolute inset-0 grid"
                            style={{ gridTemplateColumns: `repeat(${span}, minmax(0, 1fr))` }}
                          >
                            {years.map((y) => (
                              <div key={y} className="border-l border-white/5" />
                            ))}
                          </div>
                          <motion.button
                            onClick={() => openProject(p.slug)}
                            initial={{ scaleX: 0, opacity: 0 }}
                            whileInView={{ scaleX: 1, opacity: 1 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                            className="group absolute inset-y-1 origin-left overflow-hidden rounded-xl border text-left"
                            style={{
                              left: `${left}%`,
                              width: `calc(${width}% - 6px)`,
                              borderColor: `${p.accent}55`,
                              background: `linear-gradient(90deg, ${p.accent}30, ${p.accent}10)`,
                            }}
                            aria-label={`${p.company}, ${p.role}, ${p.period}`}
                          >
                            <span
                              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                              style={{ background: `linear-gradient(90deg, ${p.accent}55, ${p.accent}22)` }}
                            />
                            <span className="relative flex h-full items-center gap-2 px-3">
                              <span className="size-1.5 shrink-0 rounded-full" style={{ background: p.accent }} />
                              <span className="truncate text-xs font-medium text-white">
                                <span className="group-hover:hidden">{p.period}</span>
                                <span className="hidden group-hover:inline">{p.role}</span>
                              </span>
                            </span>
                          </motion.button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}

          <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-5 text-xs text-white/35">
            <span>
              Education · {profile.education.degree}, {profile.education.school} · {profile.education.year}
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 animate-pulse rounded-full bg-accent" /> Currently: Frontend Lead
            </span>
          </div>
        </Reveal>

        <ol className="relative space-y-4 border-l border-white/10 pl-6 md:hidden">
          {sorted.map((p) => (
            <Reveal key={p.slug}>
              <li className="relative">
                <span
                  className="absolute -left-[29px] top-5 size-2.5 rounded-full ring-4 ring-background"
                  style={{ background: p.accent }}
                />
                <button
                  onClick={() => openProject(p.slug)}
                  className="w-full rounded-2xl border border-white/[0.07] bg-ink-900 p-4 text-left"
                >
                  <div className="font-mono text-[11px] text-white/40">{p.period}</div>
                  <div className="mt-1 font-semibold text-white">{p.company}</div>
                  <div className="text-sm text-white/50">{p.role}</div>
                </button>
              </li>
            </Reveal>
          ))}
        </ol>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {chapters.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08} className="rounded-3xl border border-white/[0.07] bg-ink-900 p-7">
              <div className="font-mono text-xs text-accent">{c.years}</div>
              <h3 className="mt-3 text-xl font-semibold text-white">{c.title}</h3>
              <p className="mt-2 leading-relaxed text-white/50">{c.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
