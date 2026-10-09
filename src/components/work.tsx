"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { projects, type Project } from "@/data/portfolio";
import { ProductPreview } from "./product-preview";
import { Reveal, SectionHeading } from "./reveal";
import { ScaledFrame } from "./scaled-frame";
import { useMediaQuery } from "./use-media-query";
import { useUI } from "./ui-provider";

const featured = projects.filter((p) => p.featured);
const more = projects.filter((p) => !p.featured);

function Preview({ project, ratio }: { project: Project; ratio: number }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-ink-800 shadow-2xl shadow-black/40">
      <div className="flex items-center gap-1 border-b border-white/5 px-3 py-2">
        <span className="size-1.5 rounded-full bg-white/20" />
        <span className="size-1.5 rounded-full bg-white/20" />
        <span className="size-1.5 rounded-full bg-white/20" />
      </div>
      <ScaledFrame ratio={ratio} className="pointer-events-none">
        <ProductPreview kind={project.preview} accent={project.accent} />
      </ScaledFrame>
    </div>
  );
}

function StackCard({
  project,
  index,
  progress,
  stacked,
}: {
  project: Project;
  index: number;
  progress: MotionValue<number>;
  stacked: boolean;
}) {
  const { openProject } = useUI();
  const total = featured.length;
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - 1 - index) * 0.035]);
  const dim = useTransform(progress, [index / total, (index + 1) / total], [0, index === total - 1 ? 0 : 0.35]);

  return (
    <div
      className={stacked ? "sticky" : undefined}
      style={stacked ? { top: `calc(5.5rem + ${index * 14}px)` } : undefined}
    >
      <motion.article
        style={stacked ? { scale } : undefined}
        onClick={() => openProject(project.slug)}
        className="surface group relative grid cursor-pointer origin-top overflow-hidden lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
      >
        {stacked && (
          <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 z-10 bg-black" />
        )}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 size-80 rounded-full opacity-20 blur-3xl"
          style={{ background: project.accent }}
        />

        <div className="relative p-4 sm:p-6 lg:p-8">
          <div className="transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:rotate-[-0.6deg]">
            <Preview project={project} ratio={16 / 10} />
          </div>
        </div>

        <div className="relative flex flex-col border-t border-white/[0.07] p-5 sm:p-7 lg:border-l lg:border-t-0 lg:p-8">
          <div className="flex items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-wider text-white/40">
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full" style={{ background: project.accent }} />
              {project.period}
            </span>
            <span>
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
          <h3 className="mt-4 text-[clamp(1.5rem,3.5vw,2.25rem)] font-semibold leading-tight tracking-tight text-white">
            {project.company}
          </h3>
          <p className="mt-1 font-serif text-lg italic sm:text-xl" style={{ color: project.accent }}>
            {project.tagline}
          </p>
          <p className="mt-4 line-clamp-4 text-pretty text-sm leading-relaxed text-white/55 sm:text-base">
            {project.challenge}
          </p>

          <dl className="mt-6 grid grid-cols-3 gap-2">
            {project.metrics.map((m) => (
              <div key={m.label} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-2.5 sm:p-3">
                <dt className="sr-only">{m.label}</dt>
                <dd className="text-base font-semibold text-white sm:text-xl">{m.value}</dd>
                <dd className="mt-0.5 text-[11px] leading-snug text-white/45">{m.label}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6">
            <div className="hidden flex-wrap gap-1.5 sm:flex">
              {project.tech.slice(0, 4).map((t) => (
                <span key={t} className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs text-white/55">
                  {t}
                </span>
              ))}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                openProject(project.slug);
              }}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-black transition-transform active:scale-[0.97] sm:w-auto"
              style={{ background: project.accent }}
            >
              View case study
              <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
            </button>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

function CompactCard({ project, index }: { project: Project; index: number }) {
  const { openProject } = useUI();
  return (
    <Reveal delay={index * 0.06} className="h-full">
      <button
        onClick={() => openProject(project.slug)}
        className="surface group relative flex h-full w-full flex-col overflow-hidden text-left transition-colors hover:border-white/15 active:scale-[0.985]"
        aria-label={`Open case study: ${project.company}`}
      >
        <div className="relative px-4 pt-4 sm:px-5 sm:pt-5">
          <div className="transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
            <Preview project={project} ratio={16 / 9} />
          </div>
        </div>
        <div className="relative flex flex-1 flex-col p-4 sm:p-5">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-white/40">
            <span className="size-1.5 rounded-full" style={{ background: project.accent }} />
            {project.period}
          </div>
          <div className="mt-2 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-white">{project.company}</h3>
              <p className="mt-1 text-sm text-white/50">{project.tagline}</p>
            </div>
            <span
              className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all duration-300 group-hover:border-transparent group-hover:text-black group-hover:[background:var(--card-accent)]"
              style={{ ["--card-accent" as string]: project.accent }}
            >
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
            </span>
          </div>
        </div>
      </button>
    </Reveal>
  );
}

export function Work() {
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ["start start", "end end"] });
  const stacked = useMediaQuery("(min-width: 1024px) and (min-height: 680px)");

  return (
    <section id="work" className="section-pad relative border-t border-white/5">
      <div className="container-x">
        <SectionHeading
          index="02"
          eyebrow="Selected work"
          title="Products I've shipped,"
          accent="end to end."
          description="Four flagship products, from multi-tenant SaaS to inbox add-ins. Tap any card for the full case study."
          className="mb-0"
        />

        <div ref={stackRef} className="mt-10 space-y-6 sm:mt-14 sm:space-y-8">
          {featured.map((p, i) => (
            <StackCard key={p.slug} project={p} index={i} progress={scrollYProgress} stacked={stacked} />
          ))}
        </div>

        <Reveal className="mb-6 mt-20 flex items-end justify-between gap-4 sm:mt-28">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/40">Earlier work</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Backend foundations <span className="font-serif font-normal italic text-white/55">that shaped me.</span>
            </h3>
          </div>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {more.map((p, i) => (
            <CompactCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
