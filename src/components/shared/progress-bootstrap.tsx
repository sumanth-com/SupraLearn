"use client";

import { useEffect, useRef } from "react";
import { useProgressStore } from "@/store/use-progress-store";
import { useCurriculum } from "@/hooks/use-curriculum";
import { triggerConfetti } from "@/lib/confetti";

/** Runs once on app load: restore profile, daily goal, streak. */
export function ProgressBootstrap() {
  const bootstrap = useProgressStore((s) => s.bootstrapSession);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  return null;
}

/** Fires confetti when a week crosses 100% for the first time in session. */
export function WeekCompletionWatcher() {
  const weeks = useCurriculum();
  const getWeekProgress = useProgressStore((s) => s.getWeekProgress);
  const completeWeek = useProgressStore((s) => s.completeWeek);
  const isCompleted = useProgressStore((s) => s.isCompleted);
  const prevPctRef = useRef<Record<number, number>>({});

  const progress = useProgressStore((s) => s.progress.completed);

  useEffect(() => {
    weeks.forEach((week) => {
      const pct = getWeekProgress(week.id).overall.percentage;
      const prev = prevPctRef.current[week.id] ?? 0;
      if (prev < 100 && pct === 100 && !isCompleted(week.id)) {
        triggerConfetti();
        completeWeek(week.id);
        const nextWeek = week.id + 1;
        if (nextWeek <= weeks.length) {
          try {
            sessionStorage.setItem("roadmap-unlock-celebrate", String(nextWeek));
          } catch {
            /* ignore */
          }
        }
      }
      prevPctRef.current[week.id] = pct;
    });
  }, [weeks, progress, getWeekProgress, completeWeek, isCompleted]);

  return null;
}
