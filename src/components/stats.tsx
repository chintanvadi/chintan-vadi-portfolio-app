"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { stats } from "@/data/portfolio";
import { Reveal } from "./reveal";

function Counter({ to, suffix, from }: { to: number; suffix: string; from: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(from, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, from, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section aria-label="Highlights" className="border-y border-white/5 bg-white/[0.015]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 0.08}
            className={`px-6 py-10 sm:py-12 ${i % 2 === 1 ? "border-l border-white/5" : ""} ${
              i >= 2 ? "border-t border-white/5 lg:border-t-0" : ""
            } ${i === 2 ? "lg:border-l" : ""}`}
          >
            <div className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              <Counter to={s.value} suffix={s.suffix} from={s.value > 1000 ? s.value - 40 : 0} />
            </div>
            <p className="mt-2 text-sm text-white/45">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
