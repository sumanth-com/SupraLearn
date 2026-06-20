"use client";

import { motion } from "framer-motion";
import { Flame, Clock, Target, TrendingUp, Award, FileText, Calendar } from "lucide-react";
import { useProgressStore } from "@/store/use-progress-store";
import { useGlobalStats, useCurrentWeekId, useTotalWeeks } from "@/hooks/use-curriculum";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressSettings } from "@/components/shared/progress-settings";

export default function ProfilePage() {
  const profile = useProgressStore((s) => s.profile);
  const stats = useGlobalStats();
  const currentWeekId = useCurrentWeekId();
  const totalWeeks = useTotalWeeks();
  const addStudySession = useProgressStore((s) => s.addStudySession);

  const learningStats = [
    { label: "Overall Progress", value: `${stats.overallProgress}%`, icon: TrendingUp },
    { label: "Study Hours", value: profile.totalStudyHours.toFixed(1), icon: Clock },
    { label: "Current Streak", value: `${profile.streak} days`, icon: Flame },
    { label: "Current Week", value: `${currentWeekId}/${totalWeeks}`, icon: Calendar },
    { label: "Projects", value: `${stats.projectsCompleted}/${stats.projectsTotal}`, icon: Award },
    { label: "Interview", value: `${stats.interviewCompleted}/${stats.interviewTotal}`, icon: FileText },
  ];

  return (
    <div className="space-y-8">
      <PageHeader title="Profile" description="Learning stats derived from curriculum progress" />

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/40 via-zinc-900/80 to-purple-950/30 p-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-3xl font-bold text-white">
            {profile.avatar}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <p className="text-zinc-400 mt-1">Java Backend + AI Developer in Training</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
              <Badge variant="purple">Week {currentWeekId}</Badge>
              <Badge variant="success">{profile.streak} day streak</Badge>
              <Badge variant="default">{stats.overallProgress}% complete</Badge>
            </div>
          </div>
          <Button variant="gradient" onClick={() => addStudySession(1)} className="gap-2">
            <Clock className="h-4 w-4" /> Log 1 Hour
          </Button>
        </div>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {learningStats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card>
              <CardContent className="flex items-center gap-4 p-5">
                <div className="rounded-lg bg-indigo-500/10 p-2.5"><stat.icon className="h-5 w-5 text-indigo-400" /></div>
                <div>
                  <p className="text-xs text-zinc-500">{stat.label}</p>
                  <p className="text-lg font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Resume Readiness</CardTitle></CardHeader>
          <CardContent>
            <Progress value={profile.resumeReadinessScore} className="h-3" />
            <p className="mt-2 text-sm text-indigo-300">{profile.resumeReadinessScore}% ready</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>GitHub Portfolio</CardTitle></CardHeader>
          <CardContent>
            <Progress value={profile.githubProgress} className="h-3" />
            <p className="mt-2 text-sm text-indigo-300">{profile.githubProgress}% complete</p>
          </CardContent>
        </Card>
      </div>

      <ProgressSettings />
    </div>
  );
}
