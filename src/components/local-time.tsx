"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";

export function useLocalTime(withSeconds = false) {
  const [time, setTime] = useState<{ label: string; hour: number } | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: profile.timezone,
      hour: "numeric",
      minute: "2-digit",
      second: withSeconds ? "2-digit" : undefined,
    });
    const hourFmt = new Intl.DateTimeFormat("en-US", { timeZone: profile.timezone, hour: "numeric", hourCycle: "h23" });
    const tick = () => {
      const now = new Date();
      setTime({ label: fmt.format(now), hour: Number(hourFmt.format(now)) });
    };
    tick();
    const id = window.setInterval(tick, withSeconds ? 1000 : 30_000);
    return () => window.clearInterval(id);
  }, [withSeconds]);
  return time;
}

export function LocalTime() {
  const time = useLocalTime();
  return <span className="tabular-nums">{time?.label ?? "--:--"}</span>;
}
