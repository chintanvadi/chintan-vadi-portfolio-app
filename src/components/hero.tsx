"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { ArrowDown, ArrowUpRight, Clock, Copy, Download, Globe2, MapPin } from "lucide-react";
import { useEffect, useState, type PointerEvent, type ReactNode } from "react";
import { profile, projects } from "@/data/portfolio";
import { BrowserMock } from "./browser-mock";
import { useLocalTime } from "./local-time";
import { Stats } from "./stats";
import { useModKey } from "./use-mod-key";
import { useUI } from "./ui-provider";

const rotating = ["browser extensions", "SaaS dashboards", "API integrations", "inbox add-ins"];
const ease = [0.22, 1, 0.36, 1] as const;
const current = projects.find((p) => p.slug === profile.current.slug)!;

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setI((v) => (v + 1) % rotating.length), 2600);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span className="relative inline-grid align-bottom">
      <span className="sr-only">{rotating.join(", ")}</span>
      {rotating.map((word, idx) => (
        <motion.span
          key={word}
          aria-hidden
          className="col-start-1 row-start-1 whitespace-nowrap font-serif font-normal italic text-accent"
          initial={false}
          animate={{
            opacity: idx === i ? 1 : 0,
            y: idx === i ? 0 : idx < i ? "-0.4em" : "0.4em",
            filter: idx === i ? "blur(0px)" : "blur(8px)",
          }}
          transition={{ duration: 0.6, ease }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

function Card({
  children,
  className = "",
  delay = 0,
  onPointerMove,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  onPointerMove?: (e: PointerEvent<HTMLDivElement>) => void;
}) {
  return (
    <motion.div
      onPointerMove={onPointerMove}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease }}
      className={`surface relative overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
}

function NowCard() {
  const { openProject } = useUI();
  return (
    <Card delay={0.3} className="flex flex-col p-5 sm:p-6">
      <div
        className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full opacity-25 blur-3xl"
        style={{ background: current.accent }}
      />
      <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-accent" />
          <span className="relative inline-flex size-2 rounded-full bg-accent" />
        </span>
        Now
      </p>
      <p className="relative mt-4 text-lg font-semibold leading-snug text-white">{profile.current.role}</p>
      <p className="relative font-serif text-xl italic" style={{ color: current.accent }}>
        @ {profile.current.company}
      </p>
      <p className="relative mt-2 text-sm text-white/50">{current.tagline}</p>
      <button
        onClick={() => openProject(current.slug)}
        className="group relative mt-5 inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-white/15 px-4 text-sm text-white transition-colors hover:border-white/40 hover:bg-white/5 active:scale-[0.97]"
      >
        Case study
        <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
      </button>
    </Card>
  );
}

function TimeCard() {
  const time = useLocalTime();
  const awake = time ? time.hour >= 9 && time.hour < 21 : null;
  return (
    <Card delay={0.38} className="flex flex-col p-5 sm:p-6">
      <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
        <Clock className="size-3.5" /> Local time
      </p>
      <p className="mt-4 whitespace-nowrap text-[clamp(1.75rem,4vw,2.25rem)] font-semibold leading-none tracking-tight text-white tabular-nums">
        {time?.label ?? "--:--"}
      </p>
      <p className="mt-2 text-sm text-white/50">
        {awake === null ? "IST · UTC+5:30" : awake ? "Working hours in India" : "Off-hours in India — I'll reply soon"}
      </p>
      <div className="mt-auto space-y-1.5 pt-5 text-sm text-white/55">
        <p className="flex items-center gap-2">
          <MapPin className="size-3.5 text-white/35" /> {profile.location}
        </p>
        <p className="flex items-center gap-2">
          <Globe2 className="size-3.5 text-white/35" /> Remote-friendly worldwide
        </p>
      </div>
    </Card>
  );
}

export function Hero() {
  const { setPaletteOpen, showToast } = useUI();
  const mod = useModKey();
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${x}px ${y}px, rgb(200 255 61 / 0.08), transparent 70%)`;

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      showToast("Email copied to clipboard");
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  return (
    <section id="top" className="relative isolate overflow-hidden pb-16 pt-24 sm:pb-20 sm:pt-28 lg:pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-grid mask-radial absolute inset-0 opacity-70" />
        <div className="absolute -left-[10%] -top-[20%] h-[60vmax] w-[60vmax] animate-aurora rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute -right-[15%] top-[10%] h-[50vmax] w-[50vmax] animate-aurora rounded-full bg-sky-400/[0.07] blur-[120px] [animation-delay:-6s]" />
        <div className="absolute bottom-[-20%] left-[30%] h-[40vmax] w-[40vmax] animate-aurora rounded-full bg-fuchsia-400/[0.05] blur-[120px] [animation-delay:-12s]" />
      </div>

      <div className="container-x">
        <div className="grid gap-3 sm:gap-4 lg:grid-cols-12">
          <Card
            onPointerMove={handleMove}
            className="bg-noise @container flex flex-col justify-between p-6 sm:p-8 lg:col-span-6 lg:row-span-2 lg:p-10 xl:col-span-7"
          >
            <motion.div className="pointer-events-none absolute inset-0" style={{ background: spotlight }} />

            <div className="relative">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-2 pr-4 text-xs text-white/70">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-accent" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent" />
                </span>
                Open to new roles & freelance projects
              </div>

              <h1 className="mt-6 text-[clamp(2.1rem,11cqw,4.75rem)] font-semibold leading-[1.04] tracking-tight text-white sm:mt-8">
                <span className="block">I design & build</span>
                <span className="block">
                  <RotatingWord />
                </span>
                <span className="text-gradient block text-balance">people use every day.</span>
              </h1>

              <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/55 sm:mt-6 sm:text-lg">
                I&apos;m <span className="text-white">{profile.name}</span> — a Full Stack Developer & Frontend Lead
                with 6+ years shipping React, TypeScript, Laravel and Node.js products, from Chrome extensions on the
                Web Store to multi-tenant SaaS in production.
              </p>
            </div>

            <div className="relative mt-8 sm:mt-10">
              <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
                <a
                  href="#work"
                  className="group col-span-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-black transition-transform hover:scale-[1.03] active:scale-[0.97] sm:col-span-1"
                >
                  Explore my work
                  <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
                </a>
                <a
                  href={profile.resume}
                  download
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-5 text-sm font-medium text-white transition-colors hover:border-white/40 hover:bg-white/5 active:scale-[0.97]"
                >
                  <Download className="size-4" />
                  Resume
                </a>
                <button
                  onClick={copyEmail}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-5 text-sm font-medium text-white transition-colors hover:border-white/40 hover:bg-white/5 active:scale-[0.97]"
                >
                  <Copy className="size-4" />
                  Copy email
                </button>
              </div>
              <button
                onClick={() => setPaletteOpen(true)}
                className="mt-5 hidden items-center gap-2 text-sm text-white/40 transition-colors hover:text-white lg:inline-flex"
              >
                Short on time? Press
                <kbd className="rounded-md border border-white/15 bg-white/5 px-1.5 py-0.5 font-mono text-[11px] text-white/70">
                  {mod} K
                </kbd>
                to jump anywhere
              </button>
            </div>
          </Card>

          <Card delay={0.15} className="p-3 pb-10 sm:p-5 sm:pb-12 lg:col-span-6 xl:col-span-5">
            <BrowserMock />
          </Card>

          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:col-span-6 xl:col-span-5">
            <NowCard />
            <TimeCard />
          </div>
        </div>

        <div className="mt-3 sm:mt-4">
          <Stats />
        </div>
      </div>
    </section>
  );
}
