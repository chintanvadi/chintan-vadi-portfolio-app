import { profile } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 pb-28 pt-8 text-sm text-white/35 sm:flex-row sm:px-6 md:pb-8">
        <span>
          © {profile.name}. Designed & engineered with Next.js.
        </span>
        <a href="#top" className="transition-colors hover:text-white">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
