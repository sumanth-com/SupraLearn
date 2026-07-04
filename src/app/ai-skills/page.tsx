"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useProgressStore } from "@/store/use-progress-store";
import { useCurriculum } from "@/hooks/use-curriculum";
import {
  getProfessionalAiSkill,
  PROFESSIONAL_AI_WEEK_ID,
  getProfessionalAiWeekTitle,
} from "@/curriculum/ai-skills-professional";
import { StickyPageToolbar } from "@/components/shared/sticky-page-toolbar";
import { CardGrid } from "@/components/shared/surface-card";
import { TopicWeekCard } from "@/components/shared/topic-week-card";
import { FilterSelect } from "@/components/shared/filter-pills";
import { Progress } from "@/components/ui/progress";
import type { CurriculumWeekDefinition } from "@/curriculum/types";

function countAiItems(skill: CurriculumWeekDefinition["aiSkill"]) {
  return skill.learningTopics.length + skill.exercises.length + (skill.promptExercises?.length ?? 0);
}

function collectAiIds(skill: CurriculumWeekDefinition["aiSkill"]) {
  return [
    ...skill.learningTopics.map((t) => t.id),
    ...skill.exercises.map((e) => e.id),
    ...(skill.promptExercises ?? []).map((p) => p.id),
  ];
}

export default function AISkillsPage() {
  const weeks = useCurriculum();
  const professionalSkill = getProfessionalAiSkill();
  const isDone = useProgressStore((s) => s.isDone);
  const isModuleWeekLocked = useProgressStore((s) => s.isModuleWeekLocked);
  const getWeekProgress = useProgressStore((s) => s.getWeekProgress);

  const [filterWeek, setFilterWeek] = useState<number | "all">("all");

  const allModules = useMemo(
    () => [
      ...weeks
        .filter((w) => w.id !== PROFESSIONAL_AI_WEEK_ID)
        .map((w) => ({
          weekId: w.id,
          title: w.title,
          skill: w.aiSkill,
          locked: isModuleWeekLocked("ai-skills", w.id),
          progress: getWeekProgress(w.id).ai.percentage,
        })),
      {
        weekId: PROFESSIONAL_AI_WEEK_ID,
        title: getProfessionalAiWeekTitle(),
        skill: professionalSkill,
        locked: isModuleWeekLocked("ai-skills", PROFESSIONAL_AI_WEEK_ID),
        progress: (() => {
          const ids = collectAiIds(professionalSkill);
          const done = ids.filter((id) => isDone(id)).length;
          return ids.length ? Math.round((done / ids.length) * 100) : 0;
        })(),
      },
    ],
    [weeks, isModuleWeekLocked, getWeekProgress, professionalSkill, isDone]
  );

  const visibleModules =
    filterWeek === "all" ? allModules : allModules.filter((m) => m.weekId === filterWeek);

  const { totalItems, completedItems, progressPct } = useMemo(() => {
    let total = 0;
    let done = 0;
    allModules.forEach(({ skill }) => {
      const ids = collectAiIds(skill);
      total += ids.length;
      done += ids.filter((id) => isDone(id)).length;
    });
    return {
      totalItems: total,
      completedItems: done,
      progressPct: total ? Math.round((done / total) * 100) : 0,
    };
  }, [allModules, isDone]);

  const weekOptions = [
    { value: "all" as const, label: "All Weeks" },
    ...allModules.map((m) => ({
      value: m.weekId as number | "all",
      label: m.weekId === PROFESSIONAL_AI_WEEK_ID ? "Professional Mastery" : `Week ${m.weekId}`,
    })),
  ];

  return (
    <div className="space-y-5">
      <StickyPageToolbar className="space-y-3 py-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-xl font-bold tracking-tight text-zinc-50 sm:text-2xl">AI Skills</h1>
            <p className="mt-0.5 text-sm tabular-nums text-zinc-400">
              {completedItems} / {totalItems} completed
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Java + Gen AI skills for ~2 years experience — prompt engineering through RAG, Spring AI, and production patterns
            </p>
          </div>
          <div className="flex w-full items-center gap-2.5 sm:max-w-xs">
            <Progress value={progressPct} className="h-1.5 flex-1" />
            <span className="w-9 shrink-0 text-right text-xs font-medium tabular-nums text-indigo-300">
              {progressPct}%
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t border-zinc-800/60 pt-3">
          <FilterSelect
            label="Week"
            value={filterWeek}
            onChange={setFilterWeek}
            options={weekOptions as { value: number | "all"; label: string }[]}
            className="w-[168px] shrink-0"
          />
          <span className="ml-auto text-xs text-zinc-500">
            {allModules.length} modules · {totalItems} topics
          </span>
        </div>
      </StickyPageToolbar>

      <CardGrid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {visibleModules.map((mod, i) => {
          const itemCount = countAiItems(mod.skill);
          const complete = mod.progress === 100;
          const weekLabel =
            mod.weekId === PROFESSIONAL_AI_WEEK_ID ? "Professional" : `Week ${mod.weekId}`;

          return (
            <motion.div
              key={mod.skill.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="h-full"
            >
              <TopicWeekCard
                weekLabel={weekLabel}
                title={mod.title}
                subtitle={
                  mod.skill.description ??
                  `Learn AI tools and practice ${itemCount} exercises this week.`
                }
                progress={mod.progress}
                progressDetail={`${itemCount} topics & exercises`}
                href={mod.locked ? undefined : `/ai-skills/${mod.weekId}`}
                accent="purple"
                variant={mod.locked ? "locked" : complete ? "success" : "default"}
                locked={mod.locked}
                complete={complete}
              />
            </motion.div>
          );
        })}
      </CardGrid>
    </div>
  );
}
