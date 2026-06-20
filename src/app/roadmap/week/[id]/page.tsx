"use client";

import { Suspense, use } from "react";
import Link from "next/link";
import { Lock } from "lucide-react";
import { getLearningWeek } from "@/learning-engine/loader";
import { WeekChallengeHub } from "@/components/learning-engine/week-challenge-hub";
import { Button } from "@/components/ui/button";
import { useProgressStore } from "@/store/use-progress-store";

function WeekHubContent({ weekId }: { weekId: number }) {
  const week = getLearningWeek(weekId);
  const isLocked = useProgressStore((s) => s.isLocked(weekId));

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
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
          <Lock className="h-6 w-6 text-zinc-500" />
        </div>
        <h2 className="text-lg font-semibold text-zinc-300">Week {weekId} is locked</h2>
        <p className="mt-2 max-w-sm text-sm text-zinc-500">Complete the previous week to unlock this module.</p>
        <Link href="/roadmap">
          <Button className="mt-6" variant="secondary">
            Back to Roadmap
          </Button>
        </Link>
      </div>
    );
  }

  return <WeekChallengeHub week={week} />;
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
