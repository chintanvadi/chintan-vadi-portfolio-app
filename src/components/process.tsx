import { workProcess } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./reveal";

export function Process() {
  return (
    <section id="process" className="section-pad relative border-t border-white/5">
      <div className="container-x">
        <SectionHeading
          index="04"
          eyebrow="How I work"
          title="Product thinking,"
          accent="engineering discipline."
          description="I care about the person on the other side of the screen as much as the code behind it."
        />
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {workProcess.map((p, i) => (
            <Reveal
              key={p.step}
              delay={i * 0.08}
              className="surface group relative h-full overflow-hidden p-6 transition-colors hover:border-white/15 sm:p-7"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-3 -top-6 font-serif text-[7rem] italic leading-none text-white/[0.04] transition-colors duration-500 group-hover:text-accent/10"
              >
                {p.step}
              </span>
              <div className="relative font-mono text-sm text-accent">{p.step}</div>
              <div className="relative mt-8 h-px w-10 bg-white/15 transition-all duration-500 group-hover:w-20 group-hover:bg-accent" />
              <h3 className="relative mt-6 text-xl font-semibold text-white">{p.title}</h3>
              <p className="relative mt-3 text-pretty leading-relaxed text-white/50">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
