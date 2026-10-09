"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { ArrowUpRight, Check, ChevronDown, Download, GraduationCap, Languages } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { chapters, profile, projects, type Project, type Track } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./reveal";
import { useUI } from "./ui-provider";

const ease = [0.22, 1, 0.36, 1] as const;
const VISIBLE_HIGHLIGHTS = 2;

const filters: { id: "all" | Track; label: string }[] = [
  { id: "all", label: "All roles" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
];

const bySlug = new Map(projects.map((p) => [p.slug, p]));

function RoleCard({ project, current }: { project: Project; current: boolean }) {
  const { openProject } = useUI();
  const [open, setOpen] = useState(false);
  const extra = project.highlights.length - VISIBLE_HIGHLIGHTS;
  const shown = open ? project.highlights : project.highlights.slice(0, VISIBLE_HIGHLIGHTS);

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease }}
      className="relative pl-9 sm:pl-12"
    >
      <span
        aria-hidden
        className="absolute left-[5px] top-7 size-3.5 rounded-full border-[3px] border-background sm:left-[11px]"
        style={{ background: project.accent, boxShadow: `0 0 0 4px ${project.accent}22` }}
      />
      <article className="surface group relative overflow-hidden p-5 transition-colors hover:border-white/15 sm:p-7">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20"
          style={{ background: project.accent }}
        />
        <div className="relative flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs text-white/45">{project.period}</span>
          <span
            className="rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider"
            style={{ background: `${project.accent}18`, color: project.accent }}
          >
            {project.track}
          </span>
          {current && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
              <span className="size-1.5 animate-pulse rounded-full bg-accent" /> Current
            </span>
          )}
        </div>

        <h3 className="relative mt-3 text-xl font-semibold tracking-tight text-white sm:text-2xl">{project.role}</h3>
        <p className="relative font-serif text-lg italic sm:text-xl" style={{ color: project.accent }}>
          @ {project.company}
        </p>
        <p className="relative mt-3 text-pretty text-sm leading-relaxed text-white/60 sm:text-base">{project.summary}</p>

        <ul className="relative mt-4 space-y-2.5">
          <AnimatePresence initial={false}>
            {shown.map((h) => (
              <motion.li
                key={h}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease }}
                className="flex gap-3 overflow-hidden text-sm text-white/75 sm:text-[15px]"
              >
                <span
                  className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-black"
                  style={{ background: project.accent }}
                >
                  <Check className="size-3" />
                </span>
                <span className="leading-relaxed">{h}</span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        {extra > 0 && (
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="relative mt-3 inline-flex min-h-9 items-center gap-1.5 text-sm text-white/45 transition-colors hover:text-white"
          >
            {open ? "Show less" : `Show ${extra} more`}
            <ChevronDown className={`size-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
          </button>
        )}

        <div className="relative mt-5 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs text-white/60"
            >
              {t}
            </span>
          ))}
        </div>

        <button
          onClick={() => openProject(project.slug)}
          className="relative mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-4 text-sm font-medium text-white transition-colors hover:border-white/40 hover:bg-white/5 active:scale-[0.97]"
        >
          Read the case study
          <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
        </button>
      </article>
    </motion.li>
  );
}

export function Experience() {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const [activeChapter, setActiveChapter] = useState(chapters[0].id);
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 75%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  const groups = chapters
    .map((c) => ({
      ...c,
      roles: c.slugs.map((s) => bySlug.get(s)!).filter((p) => filter === "all" || p.track === filter),
    }))
    .filter((c) => c.roles.length > 0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveChapter(entry.target.getAttribute("data-chapter")!);
        }
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    timelineRef.current?.querySelectorAll("[data-chapter]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [filter]);

  return (
    <section id="experience" className="section-pad relative border-t border-white/5">
      <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            index="01"
            eyebrow="Experience"
            title="Seven products, six+ years,"
            accent="from WordPress to Frontend Lead."
            description="Straight from my resume — every role, what I owned, and the stack I shipped it with."
            className="mb-8"
          />

          <Reveal className="flex w-full gap-1 rounded-full border border-white/10 bg-white/[0.02] p-1 sm:w-auto sm:inline-flex">
            {filters.map((f) => {
              const count = f.id === "all" ? projects.length : projects.filter((p) => p.track === f.id).length;
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  aria-pressed={active}
                  className={`relative min-h-10 flex-1 rounded-full px-4 text-sm transition-colors sm:flex-none ${
                    active ? "text-black" : "text-white/55 hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="exp-filter"
                      className="absolute inset-0 rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className="relative">
                    {f.label} <span className={active ? "text-black/50" : "text-white/30"}>{count}</span>
                  </span>
                </button>
              );
            })}
          </Reveal>

          <Reveal delay={0.1} className="mt-8 hidden space-y-1 lg:block">
            {groups.map((c) => {
              const active = activeChapter === c.id;
              return (
                <a
                  key={c.id}
                  href={`#chapter-${c.id}`}
                  className={`group flex items-center gap-4 rounded-2xl px-4 py-3 transition-colors ${
                    active ? "bg-white/[0.05]" : "hover:bg-white/[0.03]"
                  }`}
                >
                  <span
                    className={`h-px transition-all duration-500 ${active ? "w-10 bg-accent" : "w-5 bg-white/20"}`}
                  />
                  <span className="min-w-0">
                    <span className={`block font-mono text-[11px] ${active ? "text-accent" : "text-white/35"}`}>
                      {c.years}
                    </span>
                    <span className={`block font-medium ${active ? "text-white" : "text-white/50"}`}>{c.title}</span>
                  </span>
                  <span className="ml-auto font-mono text-xs text-white/30">{c.roles.length}</span>
                </a>
              );
            })}
          </Reveal>

          <Reveal delay={0.15} className="mt-8 hidden lg:block">
            <a
              href={profile.resume}
              download
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-black transition-colors hover:bg-accent"
            >
              <Download className="size-4" /> Download full resume
            </a>
          </Reveal>
        </div>

        <div ref={timelineRef} className="relative min-w-0">
          <div aria-hidden className="absolute bottom-0 left-[11px] top-2 w-px bg-white/10 sm:left-[17px]">
            <motion.div className="h-full w-full origin-top bg-linear-to-b from-accent via-accent to-accent/0" style={{ scaleY: fill }} />
          </div>

          <div className="space-y-12 sm:space-y-16">
            {groups.map((c) => (
              <div key={c.id} id={`chapter-${c.id}`} data-chapter={c.id} className="scroll-mt-28">
                <Reveal className="relative pl-9 sm:pl-12">
                  <span
                    aria-hidden
                    className="absolute left-0 top-1 flex size-6 items-center justify-center rounded-full border border-white/15 bg-background sm:left-1.5"
                  >
                    <span className="size-1.5 rounded-full bg-white/50" />
                  </span>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{c.years}</p>
                  <h3 className="mt-1.5 text-2xl font-semibold tracking-tight text-white">{c.title}</h3>
                  <p className="mt-2 max-w-xl text-pretty text-sm leading-relaxed text-white/50 sm:text-base">{c.body}</p>
                </Reveal>
                <motion.ol layout className="mt-6 space-y-4 sm:space-y-5">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {c.roles.map((p) => (
                      <RoleCard key={p.slug} project={p} current={p.slug === profile.current.slug} />
                    ))}
                  </AnimatePresence>
                </motion.ol>
              </div>
            ))}

            <div className="grid gap-4 pl-9 sm:grid-cols-2 sm:pl-12">
              <Reveal className="surface flex items-start gap-4 p-5 sm:p-6">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white">
                  <GraduationCap className="size-[18px]" />
                </span>
                <div className="min-w-0">
                  <div className="font-medium text-white">
                    {profile.education.degree} · {profile.education.school}
                  </div>
                  <div className="mt-0.5 text-sm text-white/45">
                    {profile.education.college} · {profile.education.year} · {profile.education.score}
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.06} className="surface flex items-start gap-4 p-5 sm:p-6">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white">
                  <Languages className="size-[18px]" />
                </span>
                <div className="min-w-0">
                  <div className="font-medium text-white">Languages</div>
                  <div className="mt-0.5 text-sm text-white/45">{profile.languages.join(" · ")}</div>
                </div>
              </Reveal>
            </div>

            <div className="pl-9 sm:pl-12 lg:hidden">
              <a
                href={profile.resume}
                download
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-black transition-colors hover:bg-accent sm:inline-flex sm:w-auto"
              >
                <Download className="size-4" /> Download full resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
