"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { useUI } from "./ui-provider";

export function Toast() {
  const { toast } = useUI();
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-28 z-[70] md:bottom-6 flex justify-center px-4" aria-live="polite">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-ink-800 px-4 py-2.5 text-sm text-white shadow-2xl"
          >
            <span className="flex size-5 items-center justify-center rounded-full bg-accent text-black">
              <Check className="size-3" />
            </span>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
