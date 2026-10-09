"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { projects } from "@/data/portfolio";
import { ProductPreview } from "./product-preview";
import { useUI } from "./ui-provider";

export function ProjectDrawer() {
  const { activeProject, openProject, closeProject } = useUI();
  const index = projects.findIndex((p) => p.slug === activeProject);
  const project = index >= 0 ? projects[index] : null;
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    scrollRef.current?.scrollTo({ top: 0 });
    closeRef.current?.focus();

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

  return (
    <AnimatePresence>
      {project && (
        <motion.div className="fixed inset-0 z-[55]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeProject} />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 32 }}
            className="absolute inset-y-0 right-0 flex w-full max-w-3xl flex-col border-l border-white/10 bg-ink-900"
          >
            <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
              <div className="flex items-center gap-2 font-mono text-xs text-white/40">
                <span className="size-2 rounded-full" style={{ background: project.accent }} />
                Case study {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </div>
              <button
                ref={closeRef}
                onClick={closeProject}
                className="flex size-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-white/30 hover:text-white"
                aria-label="Close case study"
              >
                <X className="size-4" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="px-6 pb-12 pt-8 sm:px-10"
                >
                  <p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: project.accent }}>
                    {project.role} · {project.period}
                  </p>
                  <h2 id="drawer-title" className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                    {project.company}
                  </h2>
                  <p className="mt-3 font-serif text-2xl italic text-white/60">{project.tagline}</p>

                  <div
                    className="relative mt-8 overflow-hidden rounded-2xl border border-white/10 bg-ink-800 p-1"
                    style={{ boxShadow: `0 30px 80px -30px ${project.accent}55` }}
                  >
                    <div className="aspect-[16/10] overflow-hidden rounded-xl bg-ink-900">
                      <ProductPreview kind={project.preview} accent={project.accent} />
                    </div>
                  </div>
                  <p className="mt-3 text-center text-xs text-white/30">Illustrative interface recreation</p>

                  <div className="mt-10 grid grid-cols-3 gap-3">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
                        <div className="text-2xl font-semibold text-white sm:text-3xl">{m.value}</div>
                        <div className="mt-1 text-xs text-white/45">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12">
                    <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">The challenge</h3>
                    <p className="mt-3 text-lg leading-relaxed text-white/75">{project.challenge}</p>
                  </div>

                  <div className="mt-10">
                    <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">What I delivered</h3>
                    <ul className="mt-4 space-y-3">
                      {project.highlights.map((h) => (
                        <li key={h} className="flex gap-3 text-white/70">
                          <span
                            className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full text-black"
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
                          <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-sm text-white/70">
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

            <div className="grid grid-cols-2 border-t border-white/5">
              <button
                onClick={() => openProject(prev.slug)}
                className="group flex items-center gap-3 px-6 py-4 text-left transition-colors hover:bg-white/[0.03]"
              >
                <ArrowLeft className="size-4 text-white/40 transition-transform group-hover:-translate-x-1" />
                <span className="min-w-0">
                  <span className="block text-[11px] text-white/35">Previous</span>
                  <span className="block truncate text-sm text-white">{prev.company}</span>
                </span>
              </button>
              <button
                onClick={() => openProject(next.slug)}
                className="group flex items-center justify-end gap-3 border-l border-white/5 px-6 py-4 text-right transition-colors hover:bg-white/[0.03]"
              >
                <span className="min-w-0">
                  <span className="block text-[11px] text-white/35">Next</span>
                  <span className="block truncate text-sm text-white">{next.company}</span>
                </span>
                <ArrowRight className="size-4 text-white/40 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
