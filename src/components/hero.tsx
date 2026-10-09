"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { ArrowDown, Download, MapPin } from "lucide-react";
import { useEffect, useState, type PointerEvent } from "react";
import { profile } from "@/data/portfolio";
import { BrowserMock } from "./browser-mock";
import { useModKey } from "./use-mod-key";
import { useUI } from "./ui-provider";

const rotating = ["browser extensions", "SaaS dashboards", "API integrations", "multi-tenant platforms"];

const ease = [0.22, 1, 0.36, 1] as const;

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setI((v) => (v + 1) % rotating.length), 2600);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span className="relative inline-grid align-bottom">
      {rotating.map((word, idx) => (
        <motion.span
          key={word}
          className="col-start-1 row-start-1 whitespace-nowrap font-serif font-normal italic text-accent"
          initial={false}
          animate={{ opacity: idx === i ? 1 : 0, y: idx === i ? 0 : idx < i ? -24 : 24, filter: idx === i ? "blur(0px)" : "blur(8px)" }}
          transition={{ duration: 0.6, ease }}
          aria-hidden={idx !== i}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const { setPaletteOpen } = useUI();
  const mod = useModKey();
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${x}px ${y}px, rgb(200 255 61 / 0.07), transparent 70%)`;

  function handleMove(e: PointerEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  return (
    <section
      id="top"
      onPointerMove={handleMove}
      className="bg-noise relative isolate overflow-hidden pb-24 pt-36 sm:pt-40 lg:pb-32"
    >
      <div className="bg-grid mask-fade-b absolute inset-0 -z-10" />
      <motion.div className="pointer-events-none absolute inset-0 -z-10" style={{ background: spotlight }} />
      <div className="absolute -top-40 left-1/2 -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-2 pr-4 text-xs text-white/70"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-accent" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            Open to new roles & freelance projects
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
            className="text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4.2rem]"
          >
            I design & build the{" "}
            <span className="block">
              <RotatingWord />
            </span>
            <span className="text-gradient">teams work inside every day.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-white/55"
          >
            I&apos;m <span className="text-white">{profile.name}</span> — a Full Stack Developer & Frontend Lead with 6+
            years shipping React, TypeScript, Laravel and Node.js products, from Chrome extensions on the Web Store to
            multi-tenant SaaS in production.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28, ease }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              Explore my work
              <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href={profile.resume}
              download
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:border-white/40 hover:bg-white/5"
            >
              <Download className="size-4" />
              Download CV
            </a>
            <button
              onClick={() => setPaletteOpen(true)}
              className="hidden items-center gap-2 px-3 py-3.5 text-sm text-white/45 transition-colors hover:text-white sm:inline-flex"
            >
              or press
              <kbd className="rounded-md border border-white/15 bg-white/5 px-1.5 py-0.5 font-mono text-[11px] text-white/70">
                {mod} K
              </kbd>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/40"
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5" /> {profile.location}
            </span>
            <span className="hidden h-3 w-px bg-white/15 sm:block" />
            <span>React · TypeScript · Laravel · Node.js</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.25, ease }}
        >
          <BrowserMock />
        </motion.div>
      </div>
    </section>
  );
}
