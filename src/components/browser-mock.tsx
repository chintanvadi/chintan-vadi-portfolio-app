"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, Lock, RotateCw } from "lucide-react";
import { useEffect, useState, type PointerEvent } from "react";
import { projects } from "@/data/portfolio";
import { ProductPreview } from "./product-preview";
import { useUI } from "./ui-provider";

const featured = projects.filter((p) => p.featured);
const CYCLE_MS = 4500;

export function BrowserMock() {
  const { openProject } = useUI();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const project = featured[index];

  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % featured.length), CYCLE_MS);
    return () => window.clearTimeout(id);
  }, [index, paused]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 18 });

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <div
      className="relative [perspective:1400px]"
      onPointerMove={handleMove}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => {
        setPaused(false);
        mx.set(0);
        my.set(0);
      }}
    >
      <div
        className="pointer-events-none absolute -inset-10 rounded-full opacity-40 blur-3xl transition-colors duration-700"
        style={{ background: `radial-gradient(closest-side, ${project.accent}55, transparent)` }}
      />
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink-900/90 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)] backdrop-blur"
      >
        <div className="flex items-center gap-3 border-b border-white/5 bg-white/[0.02] px-4 py-3">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </div>
          <RotateCw className="size-3 text-white/30" />
          <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-white/5 px-3 py-1 font-mono text-[10px] text-white/50">
            <Lock className="size-2.5 shrink-0" />
            <AnimatePresence mode="wait">
              <motion.span
                key={project.slug}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="truncate"
              >
                {project.company.toLowerCase().replace(/[^a-z]+/g, "-")}
                <span className="text-white/25"> / {project.tagline.toLowerCase()}</span>
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex border-b border-white/5" role="tablist" aria-label="Featured products">
          {featured.map((p, i) => (
            <button
              key={p.slug}
              role="tab"
              aria-selected={i === index}
              onClick={() => setIndex(i)}
              className={`relative flex-1 px-2 py-2 text-[10px] font-medium transition-colors sm:text-[11px] ${
                i === index ? "text-white" : "text-white/35 hover:text-white/70"
              }`}
            >
              <span className="truncate">{p.company.split(" /")[0]}</span>
              <span className="absolute inset-x-0 bottom-0 h-px bg-white/5">
                {i === index && (
                  <motion.span
                    key={`${p.slug}-${paused}`}
                    className="block h-px origin-left"
                    style={{ background: p.accent }}
                    initial={{ scaleX: paused ? 1 : 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: paused ? 0 : CYCLE_MS / 1000, ease: "linear" }}
                  />
                )}
              </span>
            </button>
          ))}
        </div>

        <div className="relative aspect-[16/10]">
          <AnimatePresence mode="wait">
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, scale: 0.98, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.01, filter: "blur(6px)" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <ProductPreview kind={project.preview} accent={project.accent} />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.button
        onClick={() => openProject(project.slug)}
        className="group absolute -bottom-5 left-6 flex items-center gap-2 rounded-full border border-white/10 bg-ink-800/95 py-2 pl-2 pr-4 text-xs text-white shadow-xl backdrop-blur transition-colors hover:border-white/25"
        whileHover={{ y: -2 }}
      >
        <span className="flex size-6 items-center justify-center rounded-full text-black" style={{ background: project.accent }}>
          <ArrowUpRight className="size-3.5 transition-transform group-hover:rotate-45" />
        </span>
        <span>
          <span className="text-white/50">{project.role.split(" (")[0]} · </span>
          {project.company}
        </span>
      </motion.button>
    </div>
  );
}
