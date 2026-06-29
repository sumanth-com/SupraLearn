"use client";

import { useEffect, useRef } from "react";
import { useProgressStore } from "@/store/use-progress-store";
import { useCurriculum } from "@/hooks/use-curriculum";
import { getWeekById } from "@/curriculum/java-roadmap/curriculum";
import { isWeekFullyCompleteAcrossModules } from "@/lib/module-progress";
import { fireWeekCelebration } from "@/components/shared/week-completion-celebration";

/** Runs once on app load: restore profile, daily goal, streak. */
export function ProgressBootstrap() {
  const bootstrap = useProgressStore((s) => s.bootstrapSession);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  return null;
}

/** Celebrates when a week is fully complete across every learning module. */
export function ModuleCompletionWatcher() {
  const weeks = useCurriculum();
  const progress = useProgressStore((s) => s.progress);
  const prevCompleteRef = useRef<Record<number, boolean>>({});
  const initializedRef = useRef(false);

  useEffect(() => {
    weeks.forEach((week) => {
      const complete = isWeekFullyCompleteAcrossModules(progress, week.id, weeks);
      const prev = prevCompleteRef.current[week.id] ?? false;

      if (initializedRef.current && !prev && complete) {
        const meta = getWeekById(week.id);
        const nextWeek = week.id + 1;
        fireWeekCelebration({
          completedWeekId: week.id,
          nextWeekId: nextWeek <= weeks.length ? nextWeek : null,
          weekTitle: meta?.title ?? `Week ${week.id}`,
          weekEmoji: meta?.emoji,
        });
      }

      prevCompleteRef.current[week.id] = complete;
    });
    initializedRef.current = true;
  }, [weeks, progress.completed]);

  return null;
}

/** @deprecated use ModuleCompletionWatcher */
export function WeekCompletionWatcher() {
  return <ModuleCompletionWatcher />;
}

export { MODULE_LABELS, type LearningModule } from "@/lib/module-progress";
