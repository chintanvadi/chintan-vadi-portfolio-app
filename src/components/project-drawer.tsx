"use client";

import { AnimatePresence, motion, useDragControls, type PanInfo } from "motion/react";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { useEffect, useRef, type PointerEvent } from "react";
import { projects } from "@/data/portfolio";
import { ProductPreview } from "./product-preview";
import { ScaledFrame } from "./scaled-frame";
import { useMediaQuery } from "./use-media-query";
import { useUI } from "./ui-provider";

export function ProjectDrawer() {
  const { activeProject, openProject, closeProject } = useUI();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const dragControls = useDragControls();
  const index = projects.findIndex((p) => p.slug === activeProject);
  const project = index >= 0 ? projects[index] : null;
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    scrollRef.current?.scrollTo({ top: 0 });
    closeRef.current?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeProject();
      if (e.key === "ArrowRight") openProject(projects[(index + 1) % projects.length].slug);
      if (e.key === "ArrowLeft") openProject(projects[(index - 1 + projects.length) % projects.length].slug);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [project, index, closeProject, openProject]);

  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  function startDrag(e: PointerEvent) {
    if (isMobile) dragControls.start(e);
  }

  function onDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.y > 120 || info.velocity.y > 600) closeProject();
  }

  const hidden = isMobile ? { y: "100%" } : { x: "100%" };
  const shown = isMobile ? { y: 0 } : { x: 0 };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[55]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeProject} />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            initial={hidden}
            animate={shown}
            exit={hidden}
            transition={{ type: "spring", stiffness: 280, damping: 32 }}
            drag={isMobile ? "y" : false}
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.7 }}
            onDragEnd={onDragEnd}
            className="absolute inset-x-0 bottom-0 top-[5vh] flex flex-col overflow-hidden rounded-t-[28px] border-t border-white/10 bg-ink-900 md:inset-y-0 md:left-auto md:right-0 md:top-0 md:w-full md:max-w-3xl md:rounded-none md:border-l md:border-t-0"
          >
            <div onPointerDown={startDrag} className="touch-none select-none md:touch-auto">
              <div className="flex justify-center pb-1 pt-3 md:hidden">
                <span className="h-1.5 w-11 rounded-full bg-white/20" />
              </div>
              <div className="flex items-center justify-between border-b border-white/5 px-5 py-3 sm:px-6 md:py-4">
                <div className="flex items-center gap-2 font-mono text-xs text-white/40">
                  <span className="size-2 rounded-full" style={{ background: project.accent }} />
                  Case study {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </div>
                <button
                  ref={closeRef}
                  onClick={closeProject}
                  onPointerDown={(e) => e.stopPropagation()}
                  className="flex size-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-white/30 hover:text-white active:scale-90"
                  aria-label="Close case study"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain">
              <AnimatePresence mode="wait">
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="px-5 pb-10 pt-6 sm:px-10 sm:pb-12 sm:pt-8"
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] sm:text-xs" style={{ color: project.accent }}>
                    {project.role} · {project.period}
                  </p>
                  <h2 id="drawer-title" className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                    {project.company}
                  </h2>
                  <p className="mt-2 font-serif text-xl italic text-white/60 sm:mt-3 sm:text-2xl">{project.tagline}</p>

                  <div
                    className="relative mt-6 overflow-hidden rounded-2xl border border-white/10 bg-ink-800 p-1 sm:mt-8"
                    style={{ boxShadow: `0 30px 80px -30px ${project.accent}55` }}
                  >
                    <div className="overflow-hidden rounded-xl bg-ink-900">
                      <ScaledFrame ratio={16 / 10}>
                        <ProductPreview kind={project.preview} accent={project.accent} />
                      </ScaledFrame>
                    </div>
                  </div>
                  <p className="mt-3 text-center text-xs text-white/30">Illustrative interface recreation</p>

                  <div className="mt-8 grid grid-cols-3 gap-2 sm:mt-10 sm:gap-3">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-3 sm:p-4">
                        <div className="text-lg font-semibold text-white sm:text-3xl">{m.value}</div>
                        <div className="mt-1 text-[11px] leading-snug text-white/45 sm:text-xs">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 sm:mt-12">
                    <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">The challenge</h3>
                    <p className="mt-3 text-base leading-relaxed text-white/75 sm:text-lg">{project.challenge}</p>
                  </div>

                  <div className="mt-10">
                    <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">What I delivered</h3>
                    <ul className="mt-4 space-y-3">
                      {project.highlights.map((h) => (
                        <li key={h} className="flex gap-3 text-sm text-white/70 sm:text-base">
                          <span
                            className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-black"
                            style={{ background: project.accent }}
                          >
                            <Check className="size-3" />
                          </span>
                          <span className="leading-relaxed">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-10 grid gap-8 sm:grid-cols-2">
                    <div>
                      <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">Stack</h3>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-sm text-white/70"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    {project.integrations.length > 0 && (
                      <div>
                        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">Integrations</h3>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {project.integrations.map((t) => (
                            <span
                              key={t}
                              className="rounded-full px-3 py-1 text-sm"
                              style={{ background: `${project.accent}14`, color: project.accent }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-2 border-t border-white/5 pb-[env(safe-area-inset-bottom)]">
              <button
                onClick={() => openProject(prev.slug)}
                className="group flex min-w-0 items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-white/[0.03] active:bg-white/[0.05] sm:px-6"
              >
                <ArrowLeft className="size-4 shrink-0 text-white/40 transition-transform group-hover:-translate-x-1" />
                <span className="min-w-0">
                  <span className="block text-[11px] text-white/35">Previous</span>
                  <span className="block truncate text-sm text-white">{prev.company}</span>
                </span>
              </button>
              <button
                onClick={() => openProject(next.slug)}
                className="group flex min-w-0 items-center justify-end gap-3 border-l border-white/5 px-5 py-4 text-right transition-colors hover:bg-white/[0.03] active:bg-white/[0.05] sm:px-6"
              >
                <span className="min-w-0">
                  <span className="block text-[11px] text-white/35">Next</span>
                  <span className="block truncate text-sm text-white">{next.company}</span>
                </span>
                <ArrowRight className="size-4 shrink-0 text-white/40 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
