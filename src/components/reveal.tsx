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
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
}) {
  return (
    <Reveal className="mb-10 max-w-3xl sm:mb-14">
      <p className="mb-3 font-mono text-xs uppercase sm:mb-4 tracking-[0.25em] text-accent">{eyebrow}</p>
      <h2 className="text-[2rem] font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
        {title}{" "}
        {accent && <span className="font-serif font-normal italic text-white/60">{accent}</span>}
      </h2>
      {description && <p className="mt-4 text-base leading-relaxed text-white/55 sm:mt-5 sm:text-lg">{description}</p>}
    </Reveal>
  );
}
