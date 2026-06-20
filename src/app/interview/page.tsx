"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useProgressStore } from "@/store/use-progress-store";
import { useCurriculum } from "@/hooks/use-curriculum";
import { getSupplementalInterviewPacks } from "@/curriculum/interview/merge";
import {
  countInterviewDone,
  countInterviewItems,
} from "@/components/shared/interview-week-content";
import { StickyPageToolbar } from "@/components/shared/sticky-page-toolbar";
import { CardGrid } from "@/components/shared/surface-card";
import { TopicWeekCard } from "@/components/shared/topic-week-card";
import { FilterSelect } from "@/components/shared/filter-pills";
import { Progress } from "@/components/ui/progress";

export default function InterviewPage() {
  const weeks = useCurriculum();
  const supplementalPacks = useMemo(() => getSupplementalInterviewPacks(), []);
  const isDone = useProgressStore((s) => s.isDone);
  const isModuleWeekLocked = useProgressStore((s) => s.isModuleWeekLocked);
  const getWeekProgress = useProgressStore((s) => s.getWeekProgress);

  const [filterWeek, setFilterWeek] = useState<number | "all" | "api" | "db">("all");

  const interviewWeeks = useMemo(() => weeks.filter((w) => w.id !== 12), [weeks]);

  const allWeekItems = useMemo(
    () =>
      interviewWeeks.flatMap((w) =>
        w.interviewQuestions.flatMap((cat) => cat.questions.map((q) => ({ id: q.id, weekId: w.id })))
      ),
    [interviewWeeks]
  );

  const allPackItems = useMemo(
    () =>
      supplementalPacks.flatMap((p) =>
        p.categories.flatMap((cat) => cat.questions.map((q) => ({ id: q.id, packId: p.id })))
      ),
    [supplementalPacks]
  );

  const { totalQuestions, completedQuestions, progressPct } = useMemo(() => {
    const allIds = [...allWeekItems.map((q) => q.id), ...allPackItems.map((q) => q.id)];
    const done = allIds.filter((id) => isDone(id)).length;
    return {
      totalQuestions: allIds.length,
      completedQuestions: done,
      progressPct: allIds.length ? Math.round((done / allIds.length) * 100) : 0,
    };
  }, [allWeekItems, allPackItems, isDone]);

  const visibleWeeks =
    filterWeek === "all" || filterWeek === "api" || filterWeek === "db"
      ? filterWeek === "all"
        ? interviewWeeks
        : []
      : interviewWeeks.filter((w) => w.id === filterWeek);

  const visiblePacks =
    filterWeek === "all"
      ? supplementalPacks
      : filterWeek === "api" || filterWeek === "db"
        ? supplementalPacks.filter((p) => p.id === filterWeek)
        : [];

  const weekOptions = [
    { value: "all" as const, label: "All Weeks" },
    ...interviewWeeks.map((w) => ({ value: w.id as number | "all" | "api" | "db", label: `Week ${w.id}` })),
    { value: "api" as const, label: "API" },
    { value: "db" as const, label: "DB" },
  ];

  return (
    <div className="space-y-5">
      <StickyPageToolbar className="space-y-3 py-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-xl font-bold tracking-tight text-zinc-50 sm:text-2xl">
              Interview Questions
            </h1>
            <p className="mt-0.5 text-sm tabular-nums text-zinc-400">
              {completedQuestions} / {totalQuestions} mastered
            </p>
          </div>
          <div className="flex w-full items-center gap-2.5 sm:w-auto sm:min-w-[200px]">
            <Progress value={progressPct} className="h-1.5 flex-1" />
            <span className="shrink-0 text-sm font-semibold tabular-nums text-indigo-300">
              {progressPct}%
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t border-zinc-800/60 pt-3">
          <FilterSelect
            label="Week"
            value={filterWeek}
            onChange={setFilterWeek}
            options={weekOptions}
            className="w-[148px] shrink-0"
          />
          <span className="text-xs text-zinc-500 sm:ml-auto">
            {interviewWeeks.length + supplementalPacks.length} sets
          </span>
        </div>
      </StickyPageToolbar>

      <CardGrid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {visibleWeeks.map((week, i) => {
          const locked = isModuleWeekLocked("interview", week.id);
          const wp = getWeekProgress(week.id);
          const total = countInterviewItems(week.interviewQuestions);
          const done = countInterviewDone(week.interviewQuestions, isDone);
          const complete = wp.interview.percentage === 100;

          return (
            <motion.div
              key={`week-${week.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="h-full"
            >
              <TopicWeekCard
                weekLabel={`Week ${week.id}`}
                title={week.title}
                subtitle={`Master ${total} interview questions covering Java, OOP, and concepts from this week.`}
                progress={wp.interview.percentage}
                progressDetail={`${done}/${total} questions mastered`}
                href={locked ? undefined : `/interview/${week.id}`}
                accent="sky"
                variant={locked ? "locked" : complete ? "success" : "default"}
                locked={locked}
                complete={complete}
              />
            </motion.div>
          );
        })}

        {visiblePacks.map((pack, i) => {
          const total = countInterviewItems(pack.categories);
          const done = countInterviewDone(pack.categories, isDone);
          const pct = total ? Math.round((done / total) * 100) : 0;
          const complete = pct === 100;

          return (
            <motion.div
              key={pack.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (visibleWeeks.length + i) * 0.03 }}
              className="h-full"
            >
              <TopicWeekCard
                weekLabel={pack.id.toUpperCase()}
                title={pack.title}
                subtitle={pack.subtitle ?? `Practice ${total} focused interview questions for ${pack.id.toUpperCase()} topics.`}
                progress={pct}
                progressDetail={`${done}/${total} questions mastered`}
                href={`/interview/${pack.id}`}
                accent="sky"
                variant={complete ? "success" : "default"}
                complete={complete}
              />
            </motion.div>
          );
        })}
      </CardGrid>
    </div>
  );
}
