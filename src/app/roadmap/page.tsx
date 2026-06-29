"use client";

import { useMemo } from "react";
import { useProgressStore } from "@/store/use-progress-store";
import { useCurriculum } from "@/hooks/use-curriculum";
import { CandyCrushRoadmap } from "@/components/roadmap/candy-crush-roadmap";

export default function RoadmapPage() {
  const weeks = useCurriculum();
  const progress = useProgressStore((s) => s.progress);
  const isLocked = useProgressStore((s) => s.isLocked);
  const isModuleWeekCompleted = useProgressStore((s) => s.isModuleWeekCompleted);
  const getModuleWeekProgress = useProgressStore((s) => s.getModuleWeekProgress);
  const currentWeekId = useProgressStore((s) => s.getModuleCurrentWeek("practice"));

  const completedCount = weeks.filter((w) => isModuleWeekCompleted("practice", w.id)).length;

  const overallPct = useMemo(() => {
    if (!weeks.length) return 0;
    const sum = weeks.reduce(
      (acc, w) => acc + getModuleWeekProgress("practice", w.id).percentage,
      0
    );
    return Math.round(sum / weeks.length);
  }, [weeks, getModuleWeekProgress, progress.completed]);

  const getRoadmapWeekProgress = (weekId: number) => ({
    overall: getModuleWeekProgress("practice", weekId),
  });

  return (
    <CandyCrushRoadmap
      weeks={weeks}
      currentWeekId={currentWeekId}
      isLocked={isLocked}
      isCompleted={(weekId) => isModuleWeekCompleted("practice", weekId)}
      getWeekProgress={getRoadmapWeekProgress}
      completedCount={completedCount}
      overallPct={overallPct}
    />
  );
}
