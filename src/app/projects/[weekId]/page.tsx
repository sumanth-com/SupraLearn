"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useProgressStore } from "@/store/use-progress-store";
import { useCurriculumWeek, useWeekProgress } from "@/hooks/use-curriculum";
import { getProjectProgressPercent } from "@/lib/progress-engine";
import { ProjectCard } from "@/components/projects/project-card";
import { getAllProjectListings } from "@/curriculum/project-catalog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

function shortTitle(title: string) {
  return title.split("+")[0]?.split("—")[0]?.trim() ?? title;
}

export default function ProjectWeekPage({ params }: { params: Promise<{ weekId: string }> }) {
  const { weekId: weekIdStr } = use(params);
  const weekId = parseInt(weekIdStr, 10);
  const week = useCurriculumWeek(weekId);
  const weekProgress = useWeekProgress(weekId);
  const progress = useProgressStore((s) => s.progress);
  const isLocked = useProgressStore((s) => s.isModuleWeekLocked("projects", weekId));
  const isDone = useProgressStore((s) => s.isDone);

  const listings = getAllProjectListings().filter((p) => p.weekId === weekId);

  if (!week) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-semibold">Week not found</h2>
        <Link href="/projects">
          <Button className="mt-4" variant="secondary">
            Back to Projects
          </Button>
        </Link>
      </div>
    );
  }

  if (isLocked) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-semibold text-zinc-400">This week is locked</h2>
        <Link href="/projects">
          <Button className="mt-4" variant="secondary">
            Back to Projects
          </Button>
        </Link>
      </div>
    );
  }

  const projectsPct = weekProgress?.projects.percentage ?? 0;
  const projectsDone = week.projects.filter((p) => isDone(`${p.id}-complete`)).length;

  return (
    <div className="fixed inset-0 z-10 flex flex-col overflow-hidden bg-zinc-950 lg:left-64">
      <header className="flex h-14 shrink-0 items-center gap-3 border-b border-zinc-800/80 bg-zinc-950/95 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
        <div className="flex shrink-0 items-center gap-2.5">
          <Link href="/projects">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <Badge variant="purple" className="text-[10px]">
            Week {weekId}
          </Badge>
          <h1 className="hidden max-w-[160px] truncate text-sm font-semibold text-zinc-50 sm:block lg:max-w-[240px]">
            {shortTitle(week.title)}
          </h1>
          {projectsPct === 100 && (
            <Badge variant="success" className="hidden text-[10px] sm:inline-flex">
              Done
            </Badge>
          )}
        </div>

        <div className="flex min-w-0 flex-1 items-center gap-3 px-2">
          <Progress value={projectsPct} className="h-1.5 flex-1" />
          <span className="w-9 shrink-0 text-right text-xs font-medium tabular-nums text-indigo-300">
            {projectsPct}%
          </span>
        </div>

        <span className="hidden shrink-0 text-[11px] tabular-nums text-zinc-500 sm:inline">
          {projectsDone}/{week.projects.length} projects
        </span>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing, i) => {
            const projectPct = getProjectProgressPercent(listing.id, week, progress);
            const complete = isDone(`${listing.id}-complete`) || projectPct === 100;

            return (
              <ProjectCard
                key={listing.id}
                project={{ ...listing, href: `/projects/${weekId}/${listing.id}` }}
                index={i}
                complete={complete}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
