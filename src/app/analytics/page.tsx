"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, Radar, AreaChart, Area,
} from "recharts";
import { useProgressStore } from "@/store/use-progress-store";
import { useCurriculum, useGlobalStats } from "@/hooks/use-curriculum";
import { aggregateStudyHoursByMonth } from "@/lib/progress-storage";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AnalyticsPage() {
  const weeks = useCurriculum();
  const studySessions = useProgressStore((s) => s.studySessions);
  const profile = useProgressStore((s) => s.profile);
  const getWeekProgress = useProgressStore((s) => s.getWeekProgress);
  const stats = useGlobalStats();

  const weeklyData = weeks.map((w) => ({
    name: `W${w.id}`,
    progress: getWeekProgress(w.id).overall.percentage,
    programming: getWeekProgress(w.id).programming.percentage,
    hours: w.estimatedHours,
  }));

  const monthlyData =
    studySessions.length > 0
      ? aggregateStudyHoursByMonth(studySessions)
      : [{ month: "—", hours: 0 }];

  const skillData = weeks.map((w) => ({
    skill: w.title.split(" ")[0].slice(0, 8),
    value: getWeekProgress(w.id).overall.percentage,
  }));

  const studyHoursData = studySessions.length > 0
    ? studySessions.slice(-14).map((s) => ({ date: s.date.slice(5), hours: s.hours }))
    : [{ date: "Today", hours: 0 }];

  const chartTooltipStyle = {
    contentStyle: { background: "#18181b", border: "1px solid #27272a", borderRadius: "8px", color: "#fafafa" },
  };

  return (
    <div className="space-y-8">
      <PageHeader title="Progress Analytics" description="All metrics derived from curriculum + completion state" />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Weekly Progress</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="name" stroke="#71717a" fontSize={12} />
                <YAxis stroke="#71717a" fontSize={12} />
                <Tooltip {...chartTooltipStyle} />
                <Bar dataKey="progress" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Programming Questions by Week</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="name" stroke="#71717a" fontSize={12} />
                <YAxis stroke="#71717a" fontSize={12} />
                <Tooltip {...chartTooltipStyle} />
                <Bar dataKey="programming" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Monthly Study Hours</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="month" stroke="#71717a" fontSize={12} />
                <YAxis stroke="#71717a" fontSize={12} />
                <Tooltip {...chartTooltipStyle} />
                <Area type="monotone" dataKey="hours" stroke="#6366f1" fill="#6366f1" fillOpacity={0.15} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Skill Progress</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={skillData}>
                <PolarGrid stroke="#27272a" />
                <PolarAngleAxis dataKey="skill" stroke="#71717a" fontSize={11} />
                <Radar dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} />
                <Tooltip {...chartTooltipStyle} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Daily Study Hours</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={studyHoursData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="date" stroke="#71717a" fontSize={12} />
                <YAxis stroke="#71717a" fontSize={12} />
                <Tooltip {...chartTooltipStyle} />
                <Line type="monotone" dataKey="hours" stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Completion Overview</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={[
                { name: "Projects", completed: stats.projectsCompleted, total: stats.projectsTotal },
                { name: "Interview", completed: stats.interviewCompleted, total: stats.interviewTotal },
                { name: "AI Skills", completed: stats.aiCompleted, total: stats.aiTotal },
              ]} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis type="number" stroke="#71717a" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="#71717a" fontSize={12} width={80} />
                <Tooltip {...chartTooltipStyle} />
                <Bar dataKey="completed" fill="#6366f1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
