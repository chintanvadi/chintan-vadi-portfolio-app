import { CommandPalette } from "@/components/command-palette";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Journey } from "@/components/journey";
import { Nav } from "@/components/nav";
import { Process } from "@/components/process";
import { ProjectDrawer } from "@/components/project-drawer";
import { Skills } from "@/components/skills";
import { Stats } from "@/components/stats";
import { Toast } from "@/components/toast";
import { UIProvider } from "@/components/ui-provider";
import { Work } from "@/components/work";

export default function Home() {
  return (
    <UIProvider>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Stats />
        <Work />
        <Journey />
        <Skills />
        <Process />
        <Contact />
      </main>
      <Footer />
      <ProjectDrawer />
      <CommandPalette />
      <Toast />
    </UIProvider>
  );
}
