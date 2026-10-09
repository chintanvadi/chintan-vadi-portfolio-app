import { workProcess } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./reveal";

export function Process() {
  return (
    <section id="process" className="relative scroll-mt-24 border-t border-white/5 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="How I work"
          title="Product thinking,"
          accent="engineering discipline."
          description="I care about the person on the other side of the screen as much as the code behind it."
        />
        <div className="grid gap-px overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.07] md:grid-cols-2 lg:grid-cols-4">
          {workProcess.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.08} className="group relative h-full bg-ink-900 p-8 transition-colors hover:bg-ink-800">
              <div className="font-mono text-sm text-white/30 transition-colors group-hover:text-accent">{p.step}</div>
              <div className="mt-10 h-px w-10 bg-white/15 transition-all duration-500 group-hover:w-20 group-hover:bg-accent" />
              <h3 className="mt-6 text-xl font-semibold text-white">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-white/50">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
