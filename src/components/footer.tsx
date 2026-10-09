import { profile, sections } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="container-x flex flex-col gap-6 pb-28 pt-10 text-sm text-white/35 md:flex-row md:items-center md:justify-between md:pb-10">
        <div>
          <p className="font-medium text-white/70">{profile.name}</p>
          <p className="mt-1">{profile.title} · {profile.location}</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="transition-colors hover:text-white">
              {s.label}
            </a>
          ))}
          <a href="#top" className="transition-colors hover:text-white">
            Back to top ↑
          </a>
        </nav>
      </div>
    </footer>
  );
}
