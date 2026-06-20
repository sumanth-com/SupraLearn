"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  ChevronRight,
  Circle,
  Coffee,
  Database,
  GitBranch,
  Layers,
  Lock,
  Map,
  Rocket,
  Shield,
  Sparkles,
  Trophy,
  Waves,
  type LucideIcon,
} from "lucide-react";
import type { CurriculumWeekDefinition } from "@/curriculum/types";
import { WEEK_ROADMAP_CURRICULUM } from "@/curriculum/java-roadmap/curriculum";
import { cn } from "@/lib/utils";
import { useStoreHydrated } from "@/hooks/use-store-hydrated";
import { playUnlockSound } from "@/lib/game-sounds";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export interface CandyCrushRoadmapProps {
  weeks: CurriculumWeekDefinition[];
  currentWeekId: number;
  isLocked: (weekId: number) => boolean;
  isCompleted: (weekId: number) => boolean;
  getWeekProgress: (weekId: number) => { overall: { percentage: number } };
  completedCount: number;
  overallPct: number;
}

const WEEK_META = Object.fromEntries(
  WEEK_ROADMAP_CURRICULUM.map((w) => [
    w.weekId,
    {
      title: w.title,
      description: w.description,
      badge: w.badge,
      topicCount: w.subtopics.length,
    },
  ])
);

const WEEK_ICONS: Record<number, LucideIcon> = {
  1: Coffee,
  2: GitBranch,
  3: Layers,
  4: Sparkles,
  5: Sparkles,
  6: Waves,
  7: Brain,
  8: Map,
  9: Database,
  10: Rocket,
  11: Shield,
  12: Rocket,
};

const SKILL_PILLARS = [
  { label: "Java & OOP", icon: Coffee },
  { label: "DSA", icon: Brain },
  { label: "Spring Boot", icon: Rocket },
  { label: "SQL & JDBC", icon: Database },
  { label: "Git & Tools", icon: GitBranch },
  { label: "Cloud & DevOps", icon: Shield },
];

function WeekModuleCard({
  week,
  index,
  locked,
  done,
  active,
  pct,
  justUnlocked,
  hydrated,
  isLast,
  prevDone,
}: {
  week: CurriculumWeekDefinition;
  index: number;
  locked: boolean;
  done: boolean;
  active: boolean;
  pct: number;
  justUnlocked: boolean;
  hydrated: boolean;
  isLast: boolean;
  prevDone: boolean;
}) {
  const meta = WEEK_META[week.id] ?? {
    title: week.title,
    description: "",
    badge: undefined,
    topicCount: 0,
  };
  const Icon = WEEK_ICONS[week.id] ?? Layers;

  const card = (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className={cn(
        "group relative flex-1 rounded-xl border transition-all duration-200",
        locked && "border-zinc-800/80 bg-zinc-950/40 opacity-60",
        done && "border-emerald-500/25 bg-zinc-900/60",
        active && "border-indigo-500/40 bg-zinc-900 shadow-lg shadow-indigo-500/5 ring-1 ring-indigo-500/20",
        !locked && !done && !active && "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/70"
      )}
    >
      {justUnlocked && (
        <span className="absolute -top-2.5 right-4 rounded-md bg-emerald-600 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm">
          Unlocked
        </span>
      )}

      <div className="flex items-start gap-4 p-4 sm:p-5">
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border",
            locked && "border-zinc-800 bg-zinc-900 text-zinc-600",
            done && "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
            active && "border-indigo-500/40 bg-indigo-500/10 text-indigo-400",
            !locked && !done && !active && "border-zinc-700 bg-zinc-800/80 text-zinc-300"
          )}
        >
          {locked ? <Lock className="h-5 w-5" /> : done ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
              Week {week.id}
            </span>
            {meta.badge && !locked && (
              <Badge variant="secondary" className="h-5 px-1.5 text-[10px] font-medium">
                {meta.badge}
              </Badge>
            )}
            {active && (
              <Badge variant="purple" className="h-5 px-1.5 text-[10px] font-medium">
                Current
              </Badge>
            )}
            {done && (
              <Badge className="h-5 border-0 bg-emerald-500/15 px-1.5 text-[10px] font-medium text-emerald-400">
                Complete
              </Badge>
            )}
          </div>

          <h3 className={cn("mt-1 text-base font-semibold leading-snug", locked ? "text-zinc-500" : "text-zinc-100")}>
            {meta.title}
          </h3>

          {!locked && meta.description && (
            <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-zinc-500">{meta.description}</p>
          )}

          {!locked && (
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="text-xs text-zinc-500">{meta.topicCount} topics</span>
              <span className="text-xs text-zinc-600">·</span>
              <span className="text-xs text-emerald-500/90">11 Easy</span>
              <span className="text-xs text-amber-500/90">11 Medium</span>
              <span className="text-xs text-rose-500/90">11 Hard</span>
            </div>
          )}

          {!locked && hydrated && (
            <div className="mt-3 flex items-center gap-3">
              <Progress value={pct} className="h-1.5 max-w-[140px] flex-1 bg-zinc-800" />
              <span className="text-xs tabular-nums text-zinc-500">{pct}%</span>
            </div>
          )}
        </div>

        {!locked && (
          <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-zinc-600 transition group-hover:translate-x-0.5 group-hover:text-zinc-400" />
        )}
      </div>
    </motion.article>
  );

  return (
    <li className="relative flex gap-0 sm:gap-5">
      {/* Timeline rail */}
      <div className="relative flex w-8 shrink-0 flex-col items-center sm:w-10">
        <div
          className={cn(
            "relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 bg-zinc-950 transition-colors",
            locked && "border-zinc-800 text-zinc-600",
            done && "border-emerald-500 bg-emerald-500/10",
            active && "border-indigo-500 bg-indigo-500/10",
            !locked && !done && !active && "border-zinc-600 bg-zinc-900"
          )}
        >
          {done ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          ) : active ? (
            <Circle className="h-3 w-3 fill-indigo-500 text-indigo-500" />
          ) : locked ? (
            <Lock className="h-3.5 w-3.5 text-zinc-600" />
          ) : (
            <span className="text-[11px] font-semibold text-zinc-400">{week.id}</span>
          )}
        </div>
        {!isLast && (
          <div className="relative mt-1 w-px flex-1 min-h-[24px] bg-zinc-800">
            <motion.div
              className="absolute inset-x-0 top-0 w-px origin-top bg-indigo-500"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: prevDone || done ? 1 : 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ height: "100%" }}
            />
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1 pb-8">
        {locked ? card : (
          <Link href={`/roadmap/week/${week.id}`} className="block outline-none">
            {card}
          </Link>
        )}
      </div>
    </li>
  );
}

export function CandyCrushRoadmap({
  weeks,
  currentWeekId,
  isLocked,
  isCompleted,
  getWeekProgress,
  completedCount,
  overallPct,
}: CandyCrushRoadmapProps) {
  const hydrated = useStoreHydrated();
  const prevLockedRef = useRef<Record<number, boolean>>({});
  const [justUnlockedId, setJustUnlockedId] = useState<number | null>(null);

  useEffect(() => {
    if (!hydrated) return;
    let unlocked: number | null = null;
    weeks.forEach((week) => {
      const was = prevLockedRef.current[week.id];
      const now = isLocked(week.id);
      if (was === true && !now && week.id > 1) unlocked = week.id;
      prevLockedRef.current[week.id] = now;
    });
    if (unlocked) {
      setJustUnlockedId(unlocked);
      playUnlockSound();
      const t = window.setTimeout(() => setJustUnlockedId(null), 2500);
      return () => window.clearTimeout(t);
    }
  }, [weeks, isLocked, hydrated]);

  const currentWeek = WEEK_META[currentWeekId];

  return (
    <div className="min-h-screen bg-zinc-950 pb-16">
      <div className="mx-auto max-w-3xl px-4 pt-8 sm:px-6 lg:pt-10">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium text-indigo-400">Learning path</p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
                Java Backend Roadmap
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-500">
                12 weeks from Java basics to Spring Boot, cloud, and system design. Each topic includes
                Easy, Medium, and Hard problems.
              </p>
            </div>
            <div className="shrink-0 rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-right">
              <p className="text-2xl font-semibold tabular-nums text-zinc-100">{overallPct}%</p>
              <p className="text-xs text-zinc-500">{completedCount} of 12 weeks done</p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/30 p-4">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-zinc-400">
                {currentWeek ? (
                  <>
                    Up next: <span className="font-medium text-zinc-200">{currentWeek.title}</span>
                  </>
                ) : (
                  "Your progress"
                )}
              </span>
              <span className="text-xs text-zinc-500">Week {currentWeekId}</span>
            </div>
            <Progress value={overallPct} className="h-2 bg-zinc-800" />
          </div>
        </header>

        {/* Skill pillars */}
        <section className="mb-8">
          <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
            What you will learn
          </h2>
          <div className="flex flex-wrap gap-2">
            {SKILL_PILLARS.map(({ label, icon: Icon }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 text-xs text-zinc-400"
              >
                <Icon className="h-3.5 w-3.5 text-zinc-500" />
                {label}
              </span>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section>
          <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-zinc-500">
            Weekly modules
          </h2>
          <ol className="list-none">
            {weeks.map((week, index) => {
              const locked = isLocked(week.id);
              const done = isCompleted(week.id);
              const active = !locked && !done && week.id === currentWeekId;
              const prevDone = index === 0 || isCompleted(weeks[index - 1].id);

              return (
                <WeekModuleCard
                  key={week.id}
                  week={week}
                  index={index}
                  locked={locked}
                  done={done}
                  active={active}
                  pct={getWeekProgress(week.id).overall.percentage}
                  justUnlocked={justUnlockedId === week.id}
                  hydrated={hydrated}
                  isLast={index === weeks.length - 1}
                  prevDone={prevDone}
                />
              );
            })}
          </ol>
        </section>

        {/* Graduate milestone */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={cn(
            "mt-2 flex items-center gap-4 rounded-xl border p-5",
            completedCount === 12
              ? "border-amber-500/30 bg-amber-500/5"
              : "border-zinc-800 bg-zinc-900/30"
          )}
        >
          <div
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border",
              completedCount === 12
                ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
                : "border-zinc-800 bg-zinc-900 text-zinc-600"
            )}
          >
            <Trophy className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-zinc-200">Backend Developer Certificate</h3>
            <p className="mt-0.5 text-sm text-zinc-500">
              Complete all 12 weeks to finish Java, Spring, databases, and system design.
            </p>
          </div>
          {completedCount < 12 && (
            <ArrowRight className="hidden h-5 w-5 shrink-0 text-zinc-700 sm:block" />
          )}
        </motion.div>
      </div>
    </div>
  );
}
