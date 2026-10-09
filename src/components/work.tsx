"use client";

import { AnimatePresence, motion, useMotionTemplate, useMotionValue } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useState, type PointerEvent } from "react";
import { projects, type Project } from "@/data/portfolio";
import { ProductPreview } from "./product-preview";
import { Reveal, SectionHeading } from "./reveal";
import { useUI } from "./ui-provider";

const filters: { id: string; label: string; test: (p: Project) => boolean }[] = [
  { id: "all", label: "All work", test: () => true },
  { id: "extension", label: "Browser extensions", test: (p) => p.category === "extension" },
  { id: "frontend", label: "Frontend", test: (p) => p.track === "frontend" },
  { id: "backend", label: "Backend", test: (p) => p.track === "backend" },
];

function ProjectCard({ project, large }: { project: Project; large: boolean }) {
  const { openProject } = useUI();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const glow = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, ${project.accent}22, transparent 65%)`;

  function onMove(e: PointerEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  return (
    <button
      onPointerMove={onMove}
      onClick={() => openProject(project.slug)}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-ink-900 text-left transition-colors duration-300 hover:border-white/15"
      aria-label={`Open case study: ${project.company}`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glow }}
      />

      <div className={`relative overflow-hidden px-5 pt-5 ${large ? "sm:px-7 sm:pt-7" : ""}`}>
        <div className="relative overflow-hidden rounded-t-xl border border-b-0 border-white/10 bg-ink-800 transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
          <div className="flex items-center gap-1 border-b border-white/5 px-3 py-2">
            <span className="size-1.5 rounded-full bg-white/20" />
            <span className="size-1.5 rounded-full bg-white/20" />
            <span className="size-1.5 rounded-full bg-white/20" />
          </div>
          <div className={`pointer-events-none ${large ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
            <ProductPreview kind={project.preview} accent={project.accent} />
          </div>
        </div>
      </div>

      <div className={`relative flex flex-1 flex-col border-t border-white/[0.07] p-5 ${large ? "sm:p-7" : ""}`}>
        <div className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-white/40">
          <span className="size-1.5 rounded-full" style={{ background: project.accent }} />
          {project.period}
          <span className="text-white/20">/</span>
          {project.role}
        </div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className={`font-semibold tracking-tight text-white ${large ? "text-2xl sm:text-3xl" : "text-xl"}`}>
              {project.company}
            </h3>
            <p className="mt-1.5 text-white/50">{project.tagline}</p>
          </div>
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all duration-300 group-hover:border-transparent group-hover:text-black group-hover:[background:var(--card-accent)]"
            style={{ ["--card-accent" as string]: project.accent }}
          >
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
          </span>
        </div>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.slice(0, large ? 5 : 3).map((t) => (
            <span key={t} className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs text-white/55">
              {t}
            </span>
          ))}
          {project.tech.length > (large ? 5 : 3) && (
            <span className="px-1.5 py-1 text-xs text-white/35">+{project.tech.length - (large ? 5 : 3)}</span>
          )}
        </div>
      </div>
    </button>
  );
}

export function Work() {
  const [filter, setFilter] = useState("all");
  const active = filters.find((f) => f.id === filter)!;
  const list = projects.filter(active.test);

  return (
    <section id="work" className="relative scroll-mt-24 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Selected work"
          title="Products I've shipped,"
          accent="end to end."
          description="Seven products across SaaS, browser extensions and fintech. Click any card for the full case study."
        />

        <Reveal className="mb-10 flex gap-2 overflow-x-auto scrollbar-none">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`relative shrink-0 rounded-full px-4 py-2 text-sm transition-colors ${
                filter === f.id ? "text-black" : "text-white/55 hover:text-white"
              }`}
            >
              {filter === f.id && (
                <motion.span
                  layoutId="work-filter"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              <span className="relative">
                {f.label}
                <span className={`ml-1.5 text-xs ${filter === f.id ? "text-black/50" : "text-white/30"}`}>
                  {projects.filter(f.test).length}
                </span>
              </span>
            </button>
          ))}
        </Reveal>

        <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          <AnimatePresence mode="popLayout">
            {list.map((project) => {
              const large = !!project.featured;
              return (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className={large ? "lg:col-span-3" : "lg:col-span-2"}
                >
                  <ProjectCard project={project} large={large} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
