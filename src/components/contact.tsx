"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Check, Copy, Download, Mail, Send } from "lucide-react";
import { useState } from "react";
import { profile } from "@/data/portfolio";
import { GitHubIcon, LinkedInIcon } from "./icons";
import { LocalTime } from "./local-time";
import { Reveal } from "./reveal";
import { useUI } from "./ui-provider";

const needs = [
  "Full-time role",
  "Freelance project",
  "Browser extension",
  "SaaS dashboard",
  "API integrations",
  "Frontend leadership",
];
const timelines = ["ASAP", "In 1–3 months", "Just exploring"];

const links = [
  { label: "LinkedIn", href: profile.linkedin, icon: LinkedInIcon },
  { label: "GitHub", href: profile.github, icon: GitHubIcon },
];

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex min-h-10 items-center gap-1.5 rounded-full border px-4 text-sm transition-colors active:scale-[0.97] ${
        active
          ? "border-accent bg-accent text-black"
          : "border-white/10 bg-white/[0.03] text-white/65 hover:border-white/25 hover:text-white"
      }`}
    >
      {active && <Check className="size-3.5" />}
      {children}
    </button>
  );
}

export function Contact() {
  const { showToast } = useUI();
  const [copied, setCopied] = useState(false);
  const [picked, setPicked] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  const subject = picked.length ? `${picked.join(" + ")} — let's talk` : "Hello Chintan — let's talk";
  const body = [
    `Hi ${profile.firstName},`,
    "",
    picked.length ? `I'm reaching out about: ${picked.join(", ")}.` : "I'd love to chat about working together.",
    timeline ? `Timeline: ${timeline}.` : null,
    note.trim() ? `\n${note.trim()}` : null,
    "",
    name.trim() ? `— ${name.trim()}` : null,
  ]
    .filter((l) => l !== null)
    .join("\n");
  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  function toggle(need: string) {
    setPicked((list) => (list.includes(need) ? list.filter((n) => n !== need) : [...list, need]));
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      showToast("Email copied to clipboard");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  return (
    <section id="contact" className="section-pad relative overflow-hidden border-t border-white/5">
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 -z-10 h-[420px] w-[min(900px,140vw)] -translate-x-1/2 translate-y-1/2 rounded-full bg-accent/15 blur-[140px]"
      />
      <div aria-hidden className="bg-grid mask-fade-b absolute inset-0 -z-10 rotate-180" />

      <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <Reveal className="lg:pt-4">
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-accent">
            <span className="text-white/30">05</span>
            <span className="h-px w-6 bg-white/15" />
            Contact
          </p>
          <h2 className="mt-5 text-balance text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-[1.02] tracking-tight text-white">
            Have a product <span className="font-serif font-normal italic text-white/70">that needs to ship?</span>
          </h2>
          <p className="mt-6 max-w-md text-pretty text-base text-white/55 sm:text-lg">
            I&apos;m open to frontend lead, full-stack and browser-extension roles — remote or in Ahmedabad. Build a
            quick brief, or reach me directly.
          </p>

          <button
            onClick={copyEmail}
            className="group mt-8 flex w-full min-w-0 items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-left transition-colors hover:border-white/30 sm:w-auto sm:justify-start"
            aria-label="Copy email address"
          >
            <Mail className="size-4 shrink-0 text-white/40" />
            <span className="min-w-0 truncate font-mono text-sm text-white/85">{profile.email}</span>
            {copied ? (
              <Check className="size-4 shrink-0 text-accent" />
            ) : (
              <Copy className="size-4 shrink-0 text-white/40 group-hover:text-white" />
            )}
          </button>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {links.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 px-4 text-sm text-white/65 transition-colors hover:border-white/30 hover:text-white"
              >
                <Icon className="size-4" />
                {label}
                <ArrowUpRight className="size-3.5 opacity-50 transition-transform group-hover:translate-x-0.5" />
              </a>
            ))}
            <a
              href={profile.resume}
              download
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 px-4 text-sm text-white/65 transition-colors hover:border-white/30 hover:text-white"
            >
              <Download className="size-4" />
              Resume
            </a>
          </div>

          <p className="mt-6 text-sm text-white/35">
            {profile.location} · <LocalTime /> local time
          </p>
        </Reveal>

        <Reveal delay={0.1} className="surface relative p-5 sm:p-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = mailto;
            }}
          >
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
              <h3 className="text-lg font-semibold text-white sm:text-xl">Build a 20-second brief</h3>
              <span className="font-mono text-[11px] uppercase tracking-wider text-white/35">No forms, just email</span>
            </div>

            <fieldset className="mt-6">
              <legend className="text-sm text-white/50">1 · What are you looking for?</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {needs.map((n) => (
                  <Chip key={n} active={picked.includes(n)} onClick={() => toggle(n)}>
                    {n}
                  </Chip>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-6">
              <legend className="text-sm text-white/50">2 · Timeline</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {timelines.map((t) => (
                  <Chip key={t} active={timeline === t} onClick={() => setTimeline(timeline === t ? null : t)}>
                    {t}
                  </Chip>
                ))}
              </div>
            </fieldset>

            <div className="mt-6 grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
              <label className="block">
                <span className="text-sm text-white/50">3 · Your name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  placeholder="Jane from Acme"
                  className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-base text-white placeholder:text-white/25 focus:border-accent/60 focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="text-sm text-white/50">A line about the project (optional)</span>
                <input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="We need an MV3 extension for…"
                  className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-base text-white placeholder:text-white/25 focus:border-accent/60 focus:outline-none"
                />
              </label>
            </div>

            <div className="mt-6 rounded-xl border border-dashed border-white/10 bg-black/20 p-4">
              <p className="font-mono text-[11px] uppercase tracking-wider text-white/35">Subject preview</p>
              <motion.p key={subject} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} className="mt-1 text-sm text-white/80">
                {subject}
              </motion.p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-accent px-7 text-base font-semibold text-black"
              >
                <Send className="size-4" />
                Send via email
              </motion.button>
              <p className="text-center text-xs text-white/35 sm:text-left">Opens your mail app with everything filled in.</p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
