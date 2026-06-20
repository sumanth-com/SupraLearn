"use client";

import { useEffect } from "react";
import { useProgressStore } from "@/store/use-progress-store";
import type { LearningModule } from "@/lib/module-progress";

export function useTrackResumePosition(
  module: LearningModule,
  weekId: number,
  title: string,
  subtitle: string | undefined,
  href: string,
  enabled = true
) {
  const setResumePosition = useProgressStore((s) => s.setResumePosition);

  useEffect(() => {
    if (!enabled || !href || weekId < 1) return;
    setResumePosition({
      module,
      weekId,
      title,
      subtitle,
      href,
      updatedAt: new Date().toISOString(),
    });
  }, [module, weekId, title, subtitle, href, enabled, setResumePosition]);
}
