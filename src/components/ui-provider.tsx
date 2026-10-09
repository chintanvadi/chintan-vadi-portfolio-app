"use client";

import { MotionConfig } from "motion/react";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

interface UIState {
  paletteOpen: boolean;
  setPaletteOpen: (open: boolean) => void;
  activeProject: string | null;
  openProject: (slug: string) => void;
  closeProject: () => void;
  toast: string | null;
  showToast: (message: string) => void;
}

const UIContext = createContext<UIState | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const openProject = useCallback((slug: string) => {
    setPaletteOpen(false);
    setActiveProject(slug);
  }, []);

  const closeProject = useCallback(() => setActiveProject(null), []);

  const showToast = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast((current) => (current === message ? null : current)), 2200);
  }, []);

  const value = useMemo(
    () => ({ paletteOpen, setPaletteOpen, activeProject, openProject, closeProject, toast, showToast }),
    [paletteOpen, activeProject, openProject, closeProject, toast, showToast],
  );

  return (
    <UIContext.Provider value={value}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}
