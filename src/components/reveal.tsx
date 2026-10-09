"use client";

import { motion, type HTMLMotionProps } from "motion/react";

interface RevealProps extends HTMLMotionProps<"div"> {
  delay?: number;
  y?: number;
}

export function Reveal({ delay = 0, y = 24, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  index,
  className = "mb-10 sm:mb-14",
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  index?: string;
  className?: string;
}) {
  return (
    <Reveal className={`max-w-3xl ${className}`}>
      <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-accent">
        {index && <span className="text-white/30">{index}</span>}
        {index && <span className="h-px w-6 bg-white/15" />}
        {eyebrow}
      </p>
      <h2 className="text-balance text-[clamp(2rem,6vw,4rem)] font-semibold leading-[1.05] tracking-tight text-white">
        {title}{" "}
        {accent && <span className="font-serif font-normal italic text-white/60">{accent}</span>}
      </h2>
      {description && (
        <p className="mt-4 text-pretty text-base leading-relaxed text-white/55 sm:mt-5 sm:text-lg">{description}</p>
      )}
    </Reveal>
  );
}
