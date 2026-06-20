"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgressStore } from "@/store/use-progress-store";
import {
  getAllProjectListings,
  PORTFOLIO_WEEK_ID,
  type ProjectDifficulty,
} from "@/curriculum/project-catalog";
import { StickyPageToolbar } from "@/components/shared/sticky-page-toolbar";
import { DifficultyTabs, FilterSelect } from "@/components/shared/filter-pills";
import { ProjectCard } from "@/components/projects/project-card";
import { Progress } from "@/components/ui/progress";

type DifficultyFilter = ProjectDifficulty | "all";

export default function ProjectsPage() {
  const isDone = useProgressStore((s) => s.isDone);
  const isModuleWeekLocked = useProgressStore((s) => s.isModuleWeekLocked);

  const [filterWeek, setFilterWeek] = useState<number | "all">("all");
  const [filterDifficulty, setFilterDifficulty] = useState<DifficultyFilter>("all");

  const allProjects = useMemo(() => getAllProjectListings(), []);

  const filtered = useMemo(() => {
    return allProjects.filter((p) => {
      if (filterWeek !== "all" && p.weekId !== filterWeek) return false;
      if (filterDifficulty !== "all" && p.difficulty !== filterDifficulty) return false;
      return true;
    });
  }, [allProjects, filterWeek, filterDifficulty]);

  const { totalProjects, completedProjects, progressPct } = useMemo(() => {
    const total = allProjects.length;
    const done = allProjects.filter((p) => isDone(`${p.id}-complete`)).length;
    return {
      totalProjects: total,
      completedProjects: done,
      progressPct: total ? Math.round((done / total) * 100) : 0,
    };
  }, [allProjects, isDone]);

  const weekOptions = useMemo(() => {
    const weeks = new Set(allProjects.map((p) => p.weekId));
    const sorted = [...weeks].sort((a, b) => a - b);
    return [
      { value: "all" as const, label: "All Weeks" },
      ...sorted.map((w) => ({
        value: w as number | "all",
        label: w === PORTFOLIO_WEEK_ID ? "Portfolio" : `Week ${w}`,
      })),
    ];
  }, [allProjects]);

  const difficultyOptions = [
    { id: "all" as const, label: "All" },
    { id: "easy" as const, label: "Easy" },
    { id: "medium" as const, label: "Medium" },
    { id: "hard" as const, label: "Advance" },
  ];

  return (
    <div className="space-y-5">
      <StickyPageToolbar className="space-y-3 py-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-xl font-bold tracking-tight text-zinc-50 sm:text-2xl">Projects</h1>
            <p className="mt-0.5 text-sm tabular-nums text-zinc-400">
              {completedProjects} / {totalProjects} completed
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
            options={weekOptions}
            className="w-[132px] shrink-0"
          />
          <DifficultyTabs
            options={difficultyOptions}
            value={filterDifficulty}
            onChange={setFilterDifficulty}
          />
          <span className="ml-auto text-xs text-zinc-500">
            {filtered.length} project{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </StickyPageToolbar>

      <AnimatePresence mode="popLayout">
        <motion.div
          key={`${filterWeek}-${filterDifficulty}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((project, i) => {
            const locked =
              project.weekId !== PORTFOLIO_WEEK_ID &&
              isModuleWeekLocked("projects", project.weekId);
            const complete = isDone(`${project.id}-complete`);

            return (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                locked={locked}
                complete={complete}
              />
            );
          })}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <div className="py-16 text-center text-zinc-500">
          No projects match your filters. Try a different week or difficulty.
        </div>
      )}
    </div>
  );
}
