"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { stats } from "@/data/portfolio";
import { Reveal } from "./reveal";

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || reduce) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, to, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      {to}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" aria-label="Highlights">
      {stats.map((s, i) => (
        <Reveal key={s.label} delay={0.1 + i * 0.06} y={16} className="surface px-5 py-5 sm:px-6 sm:py-6">
          <div className="text-[clamp(1.75rem,5vw,2.75rem)] font-semibold leading-none tracking-tight text-white">
            <Counter to={s.value} suffix={s.suffix} />
          </div>
          <p className="mt-2 text-xs leading-snug text-white/45 sm:text-sm">{s.label}</p>
        </Reveal>
      ))}
    </div>
  );
}
