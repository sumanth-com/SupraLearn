"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import { useProgressStore } from "@/store/use-progress-store";
import { useCurriculumWeek, useWeekProgress } from "@/hooks/use-curriculum";
import { getSupplementalInterviewPacks } from "@/curriculum/interview/merge";
import {
  InterviewWeekContent,
  countInterviewDone,
  countInterviewItems,
} from "@/components/shared/interview-week-content";
import { WeekDetailShell } from "@/components/shared/week-detail-shell";
import { Button } from "@/components/ui/button";

export default function InterviewWeekPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const isPack = id === "api" || id === "db";
  const parsedWeekId = parseInt(id, 10);
  const weekId = Number.isNaN(parsedWeekId) ? 0 : parsedWeekId;
  const week = useCurriculumWeek(isPack ? 0 : weekId);
  const weekProgress = useWeekProgress(isPack ? 0 : weekId);
  const packs = useMemo(() => getSupplementalInterviewPacks(), []);
  const pack = isPack ? packs.find((p) => p.id === id) : undefined;

  const isLocked = useProgressStore((s) => (!isPack && weekId ? s.isLocked(weekId) : false));
  const isDone = useProgressStore((s) => s.isDone);
  const toggleComplete = useProgressStore((s) => s.toggleComplete);
  const getNote = useProgressStore((s) => s.getNote);
  const setNote = useProgressStore((s) => s.setNote);
  const isBookmarked = useProgressStore((s) => s.isBookmarked);
  const toggleBookmark = useProgressStore((s) => s.toggleBookmark);

  const categories = (isPack ? pack?.categories : week?.interviewQuestions) ?? [];
  const title = (isPack ? pack?.title : week?.title) ?? "Interview";
  const total = countInterviewItems(categories);
  const done = countInterviewDone(categories, isDone);
  const progressPct = total ? Math.round((done / total) * 100) : 0;
  const displayPct = !isPack && week ? (weekProgress?.interview.percentage ?? progressPct) : progressPct;

  const notFound = isPack ? !pack : !week;

  if (notFound) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-semibold">Not found</h2>
        <Link href="/interview">
          <Button className="mt-4" variant="secondary">
            Back to Interview
          </Button>
        </Link>
      </div>
    );
  }

  if (!isPack && week && isLocked) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-semibold text-zinc-400">This week is locked</h2>
        <Link href="/interview">
          <Button className="mt-4" variant="secondary">
            Back to Interview
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <WeekDetailShell
      backHref="/interview"
      weekId={!isPack ? weekId : undefined}
      badgeLabel={isPack ? id.toUpperCase() : undefined}
      title={title}
      progressPct={displayPct}
      complete={displayPct === 100}
    >
      <InterviewWeekContent
        categories={categories}
        isDone={isDone}
        onToggle={toggleComplete}
        getNote={getNote}
        setNote={setNote}
        isBookmarked={isBookmarked}
        onToggleBookmark={toggleBookmark}
      />
    </WeekDetailShell>
  );
}
