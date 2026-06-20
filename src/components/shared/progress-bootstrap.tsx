"use client";

import { useEffect, useRef } from "react";
import { useProgressStore } from "@/store/use-progress-store";
import { useCurriculum } from "@/hooks/use-curriculum";
import { triggerConfetti } from "@/lib/confetti";
import {
  COMMUNICATION_WEEKS,
} from "@/curriculum/communication-skills";
import {
  getModuleWeekProgress,
  LEARNING_MODULES,
  MODULE_LABELS,
  type LearningModule,
} from "@/lib/module-progress";

/** Runs once on app load: restore profile, daily goal, streak. */
export function ProgressBootstrap() {
  const bootstrap = useProgressStore((s) => s.bootstrapSession);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  return null;
}

/** Unlocks next week per module when that module's week hits 100%. */
export function ModuleCompletionWatcher() {
  const weeks = useCurriculum();
  const progress = useProgressStore((s) => s.progress);
  const completeModuleWeek = useProgressStore((s) => s.completeModuleWeek);
  const isModuleWeekCompleted = useProgressStore((s) => s.isModuleWeekCompleted);
  const prevPctRef = useRef<Record<string, number>>({});

  useEffect(() => {
    LEARNING_MODULES.forEach((module) => {
      const weekIds =
        module === "communication"
          ? COMMUNICATION_WEEKS.map((w) => w.weekId)
          : weeks.map((w) => w.id);

      weekIds.forEach((weekId) => {
        const key = `${module}-${weekId}`;
        const week = weeks.find((w) => w.id === weekId);
        const pct = getModuleWeekProgress(module, weekId, week, progress).percentage;
        const prev = prevPctRef.current[key] ?? 0;

        if (prev < 100 && pct >= 100 && !isModuleWeekCompleted(module, weekId)) {
          triggerConfetti();
          completeModuleWeek(module, weekId);
          const nextWeek = weekId + 1;
          if (nextWeek <= weekIds.length) {
            try {
              sessionStorage.setItem(
                "module-unlock-celebrate",
                JSON.stringify({ module, weekId: nextWeek })
              );
            } catch {
              /* ignore */
            }
          }
        }

        prevPctRef.current[key] = pct;
      });
    });
  }, [weeks, progress.completed, progress.moduleGates, completeModuleWeek, isModuleWeekCompleted]);

  return null;
}

/** @deprecated use ModuleCompletionWatcher */
export function WeekCompletionWatcher() {
  return <ModuleCompletionWatcher />;
}

export { MODULE_LABELS, type LearningModule };
