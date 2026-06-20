"use client";

import { useProgressStore } from "@/store/use-progress-store";
import { useCurriculum, useGlobalStats } from "@/hooks/use-curriculum";
import { CandyCrushRoadmap } from "@/components/roadmap/candy-crush-roadmap";

export default function RoadmapPage() {
  const weeks = useCurriculum();
  const stats = useGlobalStats();
  const isLocked = useProgressStore((s) => s.isLocked);
  const isCompleted = useProgressStore((s) => s.isCompleted);
  const getWeekProgress = useProgressStore((s) => s.getWeekProgress);
  const currentWeekId = useProgressStore((s) => s.getCurrentWeekId());

  const completedCount = weeks.filter((w) => isCompleted(w.id)).length;

  return (
    <CandyCrushRoadmap
      weeks={weeks}
      currentWeekId={currentWeekId}
      isLocked={isLocked}
      isCompleted={isCompleted}
      getWeekProgress={getWeekProgress}
      completedCount={completedCount}
      overallPct={stats.overallProgress}
    />
  );
}
