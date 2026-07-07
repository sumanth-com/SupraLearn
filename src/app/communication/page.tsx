"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Languages } from "lucide-react";
import { useProgressStore } from "@/store/use-progress-store";
import { useStoreHydrated } from "@/hooks/use-store-hydrated";
import {
  COMMUNICATION_WEEKS,
  getCommunicationWeekProgress,
} from "@/curriculum/communication-skills";
import { StickyPageToolbar } from "@/components/shared/sticky-page-toolbar";
import { CardGrid } from "@/components/shared/surface-card";
import { TopicWeekCard } from "@/components/shared/topic-week-card";
import { Progress } from "@/components/ui/progress";

export default function CommunicationSkillsPage() {
  const hydrated = useStoreHydrated();
  const isDone = useProgressStore((s) => s.isDone);
  const isModuleWeekLocked = useProgressStore((s) => s.isModuleWeekLocked);
  const isModuleWeekCompleted = useProgressStore((s) => s.isModuleWeekCompleted);
  const communicationCurrentWeek = useProgressStore((s) => s.getModuleCurrentWeek("communication"));

  const modules = useMemo(
    () =>
      COMMUNICATION_WEEKS.map((week) => ({
        ...week,
        progress: getCommunicationWeekProgress(week.skill, isDone),
        itemCount: week.skill.learningTopics.length + week.skill.exercises.length,
      })),
    [isDone]
  );

  const { completed, total, progressPct } = useMemo(() => {
    let t = 0;
    let d = 0;
    modules.forEach((m) => {
      t += m.itemCount;
      d += Math.round((m.progress / 100) * m.itemCount);
    });
    return {
      total: t,
      completed: d,
      progressPct: t ? Math.round((d / t) * 100) : 0,
    };
  }, [modules]);

  const displayCompleted = hydrated ? completed : 0;
  const displayProgressPct = hydrated ? progressPct : 0;

  return (
    <div className="space-y-5">
      <StickyPageToolbar className="space-y-3 py-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 ring-1 ring-emerald-500/25">
                <Languages className="h-4 w-4 text-emerald-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-zinc-50 sm:text-2xl">
                  Communication Skills
                </h1>
                <p className="text-xs text-zinc-500">12-week programme</p>
              </div>
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
              A structured path to professional English — clarity in speech, composure in meetings,
              and confidence in writing. One week at a time, the classical way: study, practice,
              reflect, repeat.
            </p>
          </div>
          <div className="flex w-full items-center gap-2.5 sm:max-w-xs">
            <Progress
              value={displayProgressPct}
              className="h-1.5 flex-1"
              indicatorClassName="bg-gradient-to-r from-emerald-500 to-teal-400"
            />
            <span className="w-9 shrink-0 text-right text-xs font-medium tabular-nums text-emerald-400">
              {displayProgressPct}%
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t border-zinc-800/60 pt-3 text-xs text-zinc-500">
          <span>
            {displayCompleted} / {total} completed
          </span>
          <span className="hidden sm:inline">·</span>
          <span>What to learn for clear, credible workplace communication</span>
        </div>
      </StickyPageToolbar>

      <CardGrid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {modules.map((mod, i) => {
          const progress = hydrated ? mod.progress : 0;
          const complete = progress === 100;
          const locked = hydrated ? isModuleWeekLocked("communication", mod.weekId) : mod.weekId !== 1;
          const active = hydrated && !locked && !complete && mod.weekId === communicationCurrentWeek;
          return (
            <motion.div
              key={mod.weekId}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="h-full"
            >
              <TopicWeekCard
                weekLabel={`Week ${mod.weekId}`}
                title={mod.title}
                subtitle={mod.subtitle}
                progress={progress}
                progressDetail={`${mod.itemCount} lessons & exercises`}
                href={locked ? undefined : `/communication/${mod.weekId}`}
                accent="emerald"
                variant={complete ? "success" : active ? "active" : "default"}
                locked={locked}
                complete={complete || (hydrated && isModuleWeekCompleted("communication", mod.weekId))}
              />
            </motion.div>
          );
        })}
      </CardGrid>
    </div>
  );
}
