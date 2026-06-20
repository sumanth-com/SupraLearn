"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, Star } from "lucide-react";
import type { LearnDifficulty, LearnLesson, LearnWeekBundle } from "@/learning-engine/types";
import { lessonEntityId } from "@/learning-engine/types";
import {
  DIFFICULTY_LABELS,
  problemTypeLabel,
  weekProgress,
} from "@/learning-engine/labels";
import { categoryLabel } from "@/components/learning-engine/lesson-renderer";
import { useProgressStore } from "@/store/use-progress-store";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 25;

interface ChallengeItem {
  lesson: LearnLesson;
  topicSlug: string;
  topicTitle: string;
  entityId: string;
}

function learnUrl(weekId: number, topicSlug: string, lesson: LearnLesson) {
  const params = new URLSearchParams({
    topic: topicSlug,
    lesson: lesson.id,
    difficulty: lesson.difficulty,
  });
  if (lesson.problemType) params.set("type", lesson.problemType);
  return `/roadmap/week/${weekId}/learn?${params.toString()}`;
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-zinc-800/80 pb-4 last:border-0">
      <p className="mb-2.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">{title}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function FilterCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-300">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-3.5 w-3.5 rounded border-zinc-600 bg-zinc-900 accent-emerald-500"
      />
      {label}
    </label>
  );
}

const DIFFICULTY_COLORS: Record<LearnDifficulty, string> = {
  easy: "text-emerald-400",
  medium: "text-amber-400",
  hard: "text-rose-400",
};

export function WeekChallengeHub({ week }: { week: LearnWeekBundle }) {
  const [activeTopic, setActiveTopic] = useState<string>("all");
  const [page, setPage] = useState(0);
  const [showSolved, setShowSolved] = useState(true);
  const [showUnsolved, setShowUnsolved] = useState(true);
  const [diffEasy, setDiffEasy] = useState(true);
  const [diffMedium, setDiffMedium] = useState(true);
  const [diffHard, setDiffHard] = useState(true);
  const [skillFilters, setSkillFilters] = useState<Record<string, boolean>>({});

  const isDoneFn = useProgressStore((s) => s.isDone);

  const allChallenges = useMemo<ChallengeItem[]>(() => {
    return week.topics.flatMap((bundle) =>
      bundle.lessons.map((lesson) => ({
        lesson,
        topicSlug: bundle.topic.slug,
        topicTitle: bundle.topic.title,
        entityId: lessonEntityId({
          weekId: week.weekId,
          topicSlug: bundle.topic.slug,
          id: lesson.id,
        }),
      }))
    );
  }, [week]);

  const skillOptions = useMemo(() => {
    const set = new Set<string>();
    for (const c of allChallenges) {
      set.add(c.lesson.problemType ?? "logic");
    }
    return Array.from(set).sort();
  }, [allChallenges]);

  const activeSkills = useMemo(() => {
    const defaults = Object.fromEntries(skillOptions.map((s) => [s, true]));
    return { ...defaults, ...skillFilters };
  }, [skillOptions, skillFilters]);

  const progress = useMemo(() => weekProgress(week, isDoneFn), [week, isDoneFn]);

  const filtered = useMemo(() => {
    return allChallenges.filter((c) => {
      if (activeTopic !== "all" && c.topicSlug !== activeTopic) return false;

      const done = isDoneFn(c.entityId);
      if (done && !showSolved) return false;
      if (!done && !showUnsolved) return false;

      const d = c.lesson.difficulty;
      if (d === "easy" && !diffEasy) return false;
      if (d === "medium" && !diffMedium) return false;
      if (d === "hard" && !diffHard) return false;

      const skill = c.lesson.problemType ?? "logic";
      if (activeSkills[skill] === false) return false;

      return true;
    });
  }, [
    allChallenges,
    activeTopic,
    isDoneFn,
    showSolved,
    showUnsolved,
    diffEasy,
    diffMedium,
    diffHard,
    activeSkills,
  ]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const toggleSkill = (skill: string, value: boolean) => {
    setSkillFilters((prev) => ({ ...prev, [skill]: value }));
    setPage(0);
  };

  const selectTopic = (slug: string) => {
    setActiveTopic(slug);
    setPage(0);
  };

  const pointsToNext = progress.total - progress.completed;

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-zinc-500">
        <Link href="/roadmap" className="hover:text-zinc-300">
          Roadmap
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-zinc-400">Week {week.weekId}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-50 sm:text-3xl">{week.title}</h1>
          <p className="mt-1 max-w-xl text-sm text-zinc-500">{week.description}</p>
        </div>
        <div className="w-full shrink-0 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 lg:w-72">
          <p className="text-xs text-zinc-400">
            {pointsToNext > 0
              ? `${pointsToNext} more challenge${pointsToNext === 1 ? "" : "s"} to complete this week!`
              : "Week complete — great job!"}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <Progress value={progress.percent} className="h-2 flex-1" />
            <span className="text-sm font-semibold tabular-nums text-emerald-400">{progress.percent}%</span>
          </div>
          <p className="mt-2 text-[11px] tabular-nums text-zinc-500">
            Progress: {progress.completed}/{progress.total} challenges
          </p>
        </div>
      </div>

      {/* Topic tabs */}
      <div className="flex gap-6 overflow-x-auto border-b border-zinc-800">
        <button
          type="button"
          onClick={() => selectTopic("all")}
          className={cn(
            "shrink-0 border-b-2 pb-2.5 text-sm font-medium transition-colors",
            activeTopic === "all"
              ? "border-emerald-500 text-emerald-400"
              : "border-transparent text-zinc-500 hover:text-zinc-300"
          )}
        >
          All Topics
        </button>
        {week.topics.map((t) => (
          <button
            key={t.topic.slug}
            type="button"
            onClick={() => selectTopic(t.topic.slug)}
            className={cn(
              "shrink-0 border-b-2 pb-2.5 text-sm font-medium transition-colors",
              activeTopic === t.topic.slug
                ? "border-emerald-500 text-emerald-400"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            )}
          >
            {t.topic.title}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Challenge list */}
        <div className="min-w-0 flex-1 space-y-3">
          {pageItems.length === 0 ? (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-10 text-center text-sm text-zinc-500">
              No challenges match your filters.
            </div>
          ) : (
            pageItems.map((item, i) => {
              const { lesson, topicSlug, topicTitle, entityId } = item;
              const done = isDoneFn(entityId);
              const isFirst = page === 0 && i === 0;
              return (
                <article
                  key={entityId}
                  className="rounded-xl border border-zinc-800/90 bg-zinc-900/40 p-4 transition-colors hover:border-zinc-700"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start gap-2">
                        <button
                          type="button"
                          className="mt-0.5 shrink-0 text-zinc-600 hover:text-amber-400"
                          aria-label="Bookmark"
                        >
                          <Star className="h-4 w-4" />
                        </button>
                        <div className="min-w-0">
                          <h2 className="text-base font-semibold text-zinc-100">{lesson.title}</h2>
                          <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-zinc-500">
                            <span className={cn("font-medium", DIFFICULTY_COLORS[lesson.difficulty])}>
                              {DIFFICULTY_LABELS[lesson.difficulty]}
                            </span>
                            <span>|</span>
                            <span>{topicTitle}</span>
                            <span>|</span>
                            <span>{problemTypeLabel(lesson.problemType)}</span>
                            <span>|</span>
                            <span>Est. {lesson.estimatedMinutes ?? 10} min</span>
                            {done && (
                              <>
                                <span>|</span>
                                <span className="text-emerald-400">Solved</span>
                              </>
                            )}
                          </p>
                          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-400">
                            {lesson.problemStatement?.split("\n")[0] ??
                              lesson.description ??
                              `Practice ${categoryLabel(lesson.category)} concepts.`}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Link href={learnUrl(week.weekId, topicSlug, lesson)} className="shrink-0">
                      <Button
                        size="sm"
                        className={cn(
                          "h-9 min-w-[8.5rem] font-semibold",
                          isFirst && !done
                            ? "bg-emerald-600 hover:bg-emerald-500"
                            : done
                              ? "border border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-800"
                              : "border border-emerald-600/60 bg-transparent text-emerald-400 hover:bg-emerald-500/10"
                        )}
                        variant={isFirst && !done ? "default" : "outline"}
                      >
                        {done ? "Review" : "Solve Challenge"}
                      </Button>
                    </Link>
                  </div>
                </article>
              );
            })
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 0}
                onClick={() => setPage((p) => p - 1)}
                className="h-8 border-zinc-800"
              >
                Previous
              </Button>
              <span className="text-xs tabular-nums text-zinc-500">
                Page {page + 1} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages - 1}
                onClick={() => setPage((p) => p + 1)}
                className="h-8 border-zinc-800"
              >
                Next
              </Button>
            </div>
          )}
        </div>

        {/* Filter sidebar */}
        <aside className="w-full shrink-0 space-y-4 rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 lg:w-56">
          <FilterSection title="Status">
            <FilterCheckbox label="Solved" checked={showSolved} onChange={setShowSolved} />
            <FilterCheckbox label="Unsolved" checked={showUnsolved} onChange={setShowUnsolved} />
          </FilterSection>

          <FilterSection title="Skills">
            {skillOptions.map((skill) => (
              <FilterCheckbox
                key={skill}
                label={problemTypeLabel(skill)}
                checked={activeSkills[skill] !== false}
                onChange={(v) => toggleSkill(skill, v)}
              />
            ))}
          </FilterSection>

          <FilterSection title="Difficulty">
            <FilterCheckbox label="Easy" checked={diffEasy} onChange={setDiffEasy} />
            <FilterCheckbox label="Medium" checked={diffMedium} onChange={setDiffMedium} />
            <FilterCheckbox label="Hard" checked={diffHard} onChange={setDiffHard} />
          </FilterSection>
        </aside>
      </div>
    </div>
  );
}
