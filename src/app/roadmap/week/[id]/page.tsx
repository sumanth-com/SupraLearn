"use client";

import { Suspense, use } from "react";
import Link from "next/link";
import { getLearningWeek } from "@/learning-engine/loader";
import { WeekChallengeHub } from "@/components/learning-engine/week-challenge-hub";
import { LockedWeekMessage } from "@/components/shared/locked-week-message";
import { Button } from "@/components/ui/button";
import { useProgressStore } from "@/store/use-progress-store";

function WeekHubContent({ weekId }: { weekId: number }) {
  const week = getLearningWeek(weekId);
  const isLocked = useProgressStore((s) => s.isModuleWeekLocked("practice", weekId));

  if (!week) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-semibold">Week not found</h2>
        <Link href="/roadmap">
          <Button className="mt-4" variant="secondary">
            Back to Roadmap
          </Button>
        </Link>
      </div>
    );
  }

  if (isLocked) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
        <LockedWeekMessage module="practice" weekId={weekId} />
        <Link href="/roadmap" className="mt-6">
          <Button variant="secondary">Back to Roadmap</Button>
        </Link>
      </div>
    );
  }

  return <WeekChallengeHub key={weekId} week={week} />;
}

export default function RoadmapWeekPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const weekId = parseInt(id, 10);

  return (
    <Suspense fallback={<div className="py-20 text-center text-zinc-500">Loading week…</div>}>
      <WeekHubContent weekId={weekId} />
    </Suspense>
  );
}
