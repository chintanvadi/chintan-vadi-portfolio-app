"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { Database, FlaskConical, Languages, LayoutDashboard, Puzzle, Server, Workflow, GraduationCap, type LucideIcon } from "lucide-react";
import type { PointerEvent } from "react";
import { integrationLogos, profile, skillGroups } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./reveal";

const icons: Record<string, LucideIcon> = {
  frontend: LayoutDashboard,
  extensions: Puzzle,
  backend: Server,
  architecture: Workflow,
  data: Database,
  quality: FlaskConical,
};

const spans: Record<string, string> = {
  frontend: "lg:col-span-4",
  extensions: "lg:col-span-2 lg:row-span-2",
  backend: "lg:col-span-2",
  architecture: "lg:col-span-2",
  data: "lg:col-span-3",
  quality: "lg:col-span-3",
};

function SkillCard({ group, index }: { group: (typeof skillGroups)[number]; index: number }) {
  const Icon = icons[group.id];
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const bg = useMotionTemplate`radial-gradient(320px circle at ${x}px ${y}px, rgb(200 255 61 / 0.08), transparent 70%)`;
  const highlight = group.id === "extensions";

  function onMove(e: PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  }

  return (
    <Reveal delay={index * 0.06} className={`${spans[group.id]} h-full`}>
      <div
        onPointerMove={onMove}
        className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border p-7 transition-colors ${
          highlight ? "border-accent/25 bg-accent/[0.04]" : "border-white/[0.07] bg-ink-900 hover:border-white/15"
        }`}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
          style={{ background: bg }}
        />
        <div className="relative flex items-center gap-3">
          <span
            className={`flex size-10 items-center justify-center rounded-xl border ${
              highlight ? "border-accent/30 bg-accent text-black" : "border-white/10 bg-white/5 text-white"
            }`}
          >
            <Icon className="size-4.5" />
          </span>
          <h3 className="text-lg font-semibold text-white">{group.title}</h3>
        </div>
        <p className="relative mt-4 text-white/50">{group.blurb}</p>
        {highlight && (
          <p className="relative mt-4 font-serif text-3xl italic leading-tight text-white/80">
            “My specialty — shipping inside Chrome, Gmail, Thunderbird & Outlook.”
          </p>
        )}
        <div className="relative mt-auto flex flex-wrap gap-1.5 pt-6">
          {group.items.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-sm text-white/70 transition-colors hover:border-accent/40 hover:text-white"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export function Skills() {
  const half = Math.ceil(integrationLogos.length / 2);
  const rows = [integrationLogos.slice(0, half), integrationLogos.slice(half)];

  return (
    <section id="skills" className="relative scroll-mt-24 border-t border-white/5 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Toolkit"
          title="A full-stack toolkit,"
          accent="sharpened on real products."
          description="Comfortable across the stack — happiest where great UX meets tricky integration work."
        />

        <div className="grid auto-rows-fr gap-4 md:grid-cols-2 lg:grid-cols-6">
          {skillGroups.map((g, i) => (
            <SkillCard key={g.id} group={g} index={i} />
          ))}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Reveal className="flex items-center gap-4 rounded-3xl border border-white/[0.07] bg-ink-900 p-6">
            <span className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white">
              <GraduationCap className="size-4.5" />
            </span>
            <div>
              <div className="font-medium text-white">
                {profile.education.degree} · {profile.education.school}
              </div>
              <div className="text-sm text-white/45">
                {profile.education.college} · {profile.education.year} · {profile.education.score}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.06} className="flex items-center gap-4 rounded-3xl border border-white/[0.07] bg-ink-900 p-6">
            <span className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white">
              <Languages className="size-4.5" />
            </span>
            <div>
              <div className="font-medium text-white">Languages</div>
              <div className="text-sm text-white/45">{profile.languages.join(" · ")}</div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mt-24">
        <Reveal className="mx-auto mb-8 max-w-7xl px-6">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/40">
            Integrated with the tools businesses run on
          </p>
        </Reveal>
        <div className="mask-fade-x space-y-3 overflow-hidden">
          {rows.map((row, r) => (
            <div key={r} className="flex">
              <div className={`flex shrink-0 gap-3 pr-3 ${r === 0 ? "animate-marquee" : "animate-marquee-reverse"} hover:[animation-play-state:paused]`}>
                {[...row, ...row].map((name, i) => (
                  <span
                    key={`${name}-${i}`}
                    aria-hidden={i >= row.length}
                    className="whitespace-nowrap rounded-full border border-white/[0.08] bg-white/[0.02] px-5 py-2.5 text-sm text-white/60"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
