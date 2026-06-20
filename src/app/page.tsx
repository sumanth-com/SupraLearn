"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Flame, Clock, Target, TrendingUp, FolderGit2,
  MessageSquare, Brain, FileText, ArrowRight, CheckCircle2,
} from "lucide-react";
import { useProgressStore } from "@/store/use-progress-store";
import {
  useCurriculum, useGlobalStats, useCurrentWeekId, useWeekProgress, useTodayProgress, useTotalWeeks,
} from "@/hooks/use-curriculum";
import { StatCard } from "@/components/shared/stat-card";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { CardGrid, WeekProgressRing } from "@/components/shared/surface-card";
import { TopicWeekCard } from "@/components/shared/topic-week-card";
import { getGreeting } from "@/lib/utils";

export default function DashboardPage() {
  const profile = useProgressStore((s) => s.profile);
  const todayGoal = useProgressStore((s) => s.todayGoal);
  const todayGoalCompleted = useProgressStore((s) => s.todayGoalCompleted);
  const toggleTodayGoal = useProgressStore((s) => s.toggleTodayGoal);
  const isLocked = useProgressStore((s) => s.isLocked);
  const isCompleted = useProgressStore((s) => s.isCompleted);
  const getWeekProgress = useProgressStore((s) => s.getWeekProgress);

  const weeks = useCurriculum();
  const stats = useGlobalStats();
  const currentWeekId = useCurrentWeekId();
  const weekProgress = useWeekProgress(currentWeekId);
  const todayProgress = useTodayProgress(currentWeekId);
  const totalWeeks = useTotalWeeks();
  const currentWeek = weeks.find((w) => w.id === currentWeekId);

  return (
    <div className="space-y-8">
      <PageHeader
        title={`${getGreeting()}, ${profile.name}`}
        description="Your personalized Java Backend + AI learning journey"
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/50 via-zinc-900/80 to-purple-950/30 p-6 sm:p-8"
      >
        <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3">
            <Badge variant="purple">Week {currentWeekId} of {totalWeeks}</Badge>
            <h2 className="text-xl font-bold sm:text-2xl">{currentWeek?.title ?? "Getting Started"}</h2>
            <p className="max-w-lg text-sm text-zinc-400">{currentWeek?.goal}</p>
            <div className="flex-1 max-w-xs">
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-zinc-400">Week Progress</span>
                <span className="text-indigo-300">{weekProgress?.overall.percentage ?? 0}%</span>
              </div>
              <Progress value={weekProgress?.overall.percentage ?? 0} />
            </div>
          </div>
          <Link href={`/roadmap/week/${currentWeekId}`}>
            <Button variant="gradient" size="lg" className="gap-2">
              Continue Learning <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </motion.div>

      <Card className="border-zinc-800">
        <CardContent className="flex items-center gap-4 p-5">
          <Checkbox checked={todayGoalCompleted} onCheckedChange={() => toggleTodayGoal()} />
          <div className="flex-1">
            <p className="text-sm font-medium text-zinc-300">Today&apos;s Goal</p>
            <p className={todayGoalCompleted ? "text-sm text-zinc-500 line-through" : "text-sm text-zinc-400"}>
              {todayGoal} — Today: {todayProgress.completed}/{todayProgress.total} items ({todayProgress.percentage}%)
            </p>
          </div>
          <Target className="h-5 w-5 text-indigo-400" />
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Overall Progress" value={`${stats.overallProgress}%`} icon={TrendingUp} delay={0.1} />
        <StatCard title="Weekly Progress" value={`${weekProgress?.overall.percentage ?? 0}%`} subtitle={`Week ${currentWeekId}`} icon={Target} delay={0.15} />
        <StatCard title="Daily Streak" value={`${profile.streak} days`} icon={Flame} delay={0.2} />
        <StatCard title="Study Hours" value={profile.totalStudyHours.toFixed(1)} icon={Clock} delay={0.25} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Lessons Completed" value={`${stats.topicsCompleted}/${stats.topicsTotal}`} icon={CheckCircle2} delay={0.3} />
        <StatCard title="Projects Completed" value={`${stats.projectsCompleted}/${stats.projectsTotal}`} icon={FolderGit2} delay={0.35} />
        <StatCard title="Interview Questions" value={`${stats.interviewCompleted}/${stats.interviewTotal}`} icon={MessageSquare} delay={0.4} />
        <StatCard title="AI Skills" value={`${stats.aiCompleted}/${stats.aiTotal}`} icon={Brain} delay={0.45} />
        <StatCard title="Resume Readiness" value={`${profile.resumeReadinessScore}%`} icon={FileText} delay={0.5} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-indigo-400" />
            Roadmap Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardGrid>
            {weeks.map((week) => {
              const locked = isLocked(week.id);
              const wp = getWeekProgress(week.id);
              const done = isCompleted(week.id);
              const isActive = !locked && !done && week.id === currentWeekId;
              const variant = locked ? "locked" : isActive ? "active" : done ? "success" : "default";

              return (
                <TopicWeekCard
                  key={week.id}
                  weekLabel={`Week ${week.id}`}
                  title={week.title}
                  subtitle={locked ? week.description : week.goal}
                  progress={wp.overall.percentage}
                  progressDetail={`${week.estimatedHours}h · ${week.difficulty}`}
                  href={locked ? undefined : `/roadmap/week/${week.id}`}
                  accent={isActive ? "purple" : "indigo"}
                  variant={variant}
                  locked={locked}
                  complete={done}
                  trailing={
                    <WeekProgressRing
                      weekId={week.id}
                      progress={wp.overall.percentage}
                      locked={locked}
                      done={done}
                    />
                  }
                />
              );
            })}
          </CardGrid>
        </CardContent>
      </Card>
    </div>
  );
}
