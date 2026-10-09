"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Check, Copy, Download, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";
import { GitHubIcon, LinkedInIcon } from "./icons";
import { Reveal } from "./reveal";
import { useUI } from "./ui-provider";

function LocalTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: profile.timezone,
      hour: "numeric",
      minute: "2-digit",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time ?? "--:--"}</span>;
}

const links = [
  { label: "LinkedIn", href: profile.linkedin, icon: LinkedInIcon },
  { label: "GitHub", href: profile.github, icon: GitHubIcon },
];

export function Contact() {
  const { showToast } = useUI();
  const [copied, setCopied] = useState(false);

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
    <section id="contact" className="relative scroll-mt-24 overflow-hidden border-t border-white/5 py-28 sm:py-40">
      <div className="absolute bottom-0 left-1/2 -z-10 h-[420px] w-[900px] -translate-x-1/2 translate-y-1/2 rounded-full bg-accent/15 blur-[140px]" />
      <div className="bg-grid mask-fade-b absolute inset-0 -z-10 rotate-180" />

      <div className="mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">Contact</p>
          <h2 className="mt-6 text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-7xl md:text-8xl">
            Have a product
            <br />
            <span className="font-serif font-normal italic text-white/70">that needs to ship?</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg text-white/55">
            I&apos;m open to frontend lead, full-stack and browser-extension roles — remote or in Ahmedabad. Tell me
            what you&apos;re building.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 flex flex-col items-center gap-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <motion.a
              href={`mailto:${profile.email}`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-4 text-base font-semibold text-black"
            >
              <Mail className="size-4.5" />
              Start a conversation
            </motion.a>
            <button
              onClick={copyEmail}
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.03] px-6 py-4 font-mono text-sm text-white/80 transition-colors hover:border-white/40"
              aria-label="Copy email address"
            >
              {profile.email}
              {copied ? <Check className="size-4 text-accent" /> : <Copy className="size-4 text-white/40 group-hover:text-white" />}
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {links.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white/55 transition-colors hover:bg-white/5 hover:text-white"
              >
                <Icon className="size-4" />
                {label}
                <ArrowUpRight className="size-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
              </a>
            ))}
            <a
              href={profile.resume}
              download
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white/55 transition-colors hover:bg-white/5 hover:text-white"
            >
              <Download className="size-4" />
              Resume
            </a>
          </div>

          <p className="mt-6 text-sm text-white/35">
            {profile.location} · <LocalTime /> local time
          </p>
        </Reveal>
      </div>
    </section>
  );
}
