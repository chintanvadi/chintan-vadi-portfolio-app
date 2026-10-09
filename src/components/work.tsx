"use client";

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, type PointerEvent } from "react";
import { projects, type Project } from "@/data/portfolio";
import { ProductPreview } from "./product-preview";
import { Reveal, SectionHeading } from "./reveal";
import { ScaledFrame } from "./scaled-frame";
import { useUI } from "./ui-provider";

const filters: { id: string; label: string; test: (p: Project) => boolean }[] = [
  { id: "all", label: "All work", test: () => true },
  { id: "extension", label: "Extensions", test: (p) => p.category === "extension" },
  { id: "frontend", label: "Frontend", test: (p) => p.track === "frontend" },
  { id: "backend", label: "Backend", test: (p) => p.track === "backend" },
];

function ProjectCard({ project, large }: { project: Project; large: boolean }) {
  const { openProject } = useUI();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const glow = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, ${project.accent}22, transparent 65%)`;
  const visibleTech = large ? 5 : 3;

  function onMove(e: PointerEvent<HTMLButtonElement>) {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  return (
    <button
      onPointerMove={onMove}
      onClick={() => openProject(project.slug)}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-ink-900 text-left transition-[border-color,transform] duration-300 hover:border-white/15 active:scale-[0.985]"
      aria-label={`Open case study: ${project.company}`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glow }}
      />
      <div
        className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full opacity-25 blur-3xl md:hidden"
        style={{ background: project.accent }}
      />

      <div className={`relative px-4 pt-4 sm:px-5 sm:pt-5 ${large ? "lg:px-7 lg:pt-7" : ""}`}>
        <div className="relative overflow-hidden rounded-t-xl border border-b-0 border-white/10 bg-ink-800 transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
          <div className="flex items-center gap-1 border-b border-white/5 px-3 py-2">
            <span className="size-1.5 rounded-full bg-white/20" />
            <span className="size-1.5 rounded-full bg-white/20" />
            <span className="size-1.5 rounded-full bg-white/20" />
          </div>
          <ScaledFrame ratio={large ? 16 / 9 : 16 / 10} className="pointer-events-none">
            <ProductPreview kind={project.preview} accent={project.accent} />
          </ScaledFrame>
        </div>
      </div>

      <div className={`relative flex flex-1 flex-col border-t border-white/[0.07] p-4 sm:p-5 ${large ? "lg:p-7" : ""}`}>
        <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-wider text-white/40 sm:text-[11px]">
          <span className="size-1.5 rounded-full" style={{ background: project.accent }} />
          {project.period}
          <span className="text-white/20">/</span>
          {project.role}
        </div>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3
              className={`font-semibold tracking-tight text-white ${large ? "text-xl sm:text-2xl lg:text-3xl" : "text-xl"}`}
            >
              {project.company}
            </h3>
            <p className="mt-1.5 text-sm text-white/50 sm:text-base">{project.tagline}</p>
          </div>
          <span
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all duration-300 group-hover:border-transparent group-hover:text-black group-hover:[background:var(--card-accent)]"
            style={{ ["--card-accent" as string]: project.accent }}
          >
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
          </span>
        </div>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {project.tech.slice(0, visibleTech).map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs text-white/55"
            >
              {t}
            </span>
          ))}
          {project.tech.length > visibleTech && (
            <span className="px-1.5 py-1 text-xs text-white/35">+{project.tech.length - visibleTech}</span>
          )}
        </div>
      </div>
    </button>
  );
}

export function Work() {
  const [filter, setFilter] = useState("all");
  const [slide, setSlide] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: scrollerRef });
  const active = filters.find((f) => f.id === filter)!;
  const list = projects.filter(active.test);

  useMotionValueEvent(scrollXProgress, "change", (v) => {
    setSlide(Math.round(v * Math.max(list.length - 1, 0)));
  });

  function selectFilter(id: string) {
    setFilter(id);
    setSlide(0);
    scrollerRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  }

  function step(delta: number) {
    const el = scrollerRef.current;
    const card = el?.querySelector<HTMLElement>("[data-card]");
    if (!el || !card) return;
    el.scrollBy({ left: delta * (card.offsetWidth + 16), behavior: "smooth" });
  }

  return (
    <section id="work" className="relative scroll-mt-20 py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Selected work"
          title="Products I've shipped,"
          accent="end to end."
          description="Seven products across SaaS, browser extensions and fintech. Tap any card for the full case study."
        />

        <Reveal className="-mx-5 mb-6 flex gap-2 overflow-x-auto px-5 scrollbar-none sm:mx-0 sm:mb-10 sm:px-0">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => selectFilter(f.id)}
              className={`relative shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
                filter === f.id
                  ? "border-transparent text-black"
                  : "border-white/10 text-white/55 hover:text-white sm:border-transparent"
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

        <div
          ref={scrollerRef}
          className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 scrollbar-none md:mx-0 md:grid md:snap-none md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-6"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((project) => {
              const large = !!project.featured;
              return (
                <motion.div
                  key={project.slug}
                  data-card
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className={`w-[84%] shrink-0 snap-start sm:w-[60%] md:w-auto ${large ? "lg:col-span-3" : "lg:col-span-2"}`}
                >
                  <ProjectCard project={project} large={large} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="mt-5 flex items-center gap-4 md:hidden">
          <div className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/10">
            <motion.div className="h-full origin-left bg-accent" style={{ scaleX: scrollXProgress }} />
          </div>
          <span className="font-mono text-xs tabular-nums text-white/40">
            {String(slide + 1).padStart(2, "0")} / {String(list.length).padStart(2, "0")}
          </span>
          <div className="flex gap-1.5">
            <button
              onClick={() => step(-1)}
              disabled={slide === 0}
              className="flex size-9 items-center justify-center rounded-full border border-white/10 text-white transition-opacity active:scale-90 disabled:opacity-30"
              aria-label="Previous project"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={() => step(1)}
              disabled={slide >= list.length - 1}
              className="flex size-9 items-center justify-center rounded-full border border-white/10 text-white transition-opacity active:scale-90 disabled:opacity-30"
              aria-label="Next project"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
