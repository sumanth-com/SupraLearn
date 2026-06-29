"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame, Radio, TrendingUp } from "lucide-react";
import { useProgressStore } from "@/store/use-progress-store";
import { useStoreHydrated } from "@/hooks/use-store-hydrated";
import { PageHeader } from "@/components/shared/page-header";
import { ProgressSettings } from "@/components/shared/progress-settings";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PROFILE_IMAGE } from "@/lib/profile-image";

function LearningSnapshot() {
  const hydrated = useStoreHydrated();
  const profile = useProgressStore((s) => s.profile);
  const resumePosition = useProgressStore((s) => s.resumePosition);
  const getStats = useProgressStore((s) => s.getStats);
  const practiceWeek = useProgressStore((s) => s.getModuleCurrentWeek("practice"));
  const getModuleWeekProgress = useProgressStore((s) => s.getModuleWeekProgress);

  const stats = getStats();
  const streak = hydrated ? profile.streak : 0;
  const week = hydrated ? practiceWeek : 1;
  const weekChallengePct = hydrated
    ? getModuleWeekProgress("practice", week).percentage
    : 0;
  const overallPct = hydrated ? stats.overallProgress : 0;
  const resumeHref = resumePosition?.href ?? `/roadmap/week/${week}`;

  return (
    <div className="flex min-h-[12rem] flex-col rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-zinc-100">Learning Snapshot</h3>
        <p className="mt-0.5 text-xs text-zinc-500">Your progress at a glance</p>
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <div>
          <div className="mb-1.5 flex items-center justify-between text-[11px] text-zinc-500">
            <span className="inline-flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5 text-indigo-400" />
              Week {week} challenges
            </span>
            <span className="font-semibold tabular-nums text-indigo-300">{weekChallengePct}%</span>
          </div>
          <Progress value={weekChallengePct} className="h-1.5 bg-zinc-800" />
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between text-[11px] text-zinc-500">
            <span>Overall roadmap</span>
            <span className="font-semibold tabular-nums text-zinc-400">{overallPct}%</span>
          </div>
          <Progress value={overallPct} className="h-1 bg-zinc-800/80" />
        </div>

        <div className="grid grid-cols-2 items-end gap-3 rounded-xl border border-zinc-800/60 bg-zinc-950/40 px-3 py-2.5">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">Practice week</p>
            <p className="mt-0.5 text-sm font-semibold text-zinc-100">Week {week}</p>
          </div>
          <div className="text-right">
            <p className="inline-flex items-center justify-end gap-1 text-[10px] font-medium uppercase tracking-wider text-zinc-500">
              <Flame className="h-3.5 w-3.5 text-orange-400" />
              Study streak
            </p>
            <p className="mt-0.5 text-sm font-semibold tabular-nums text-zinc-100">{streak} days</p>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <Link href={resumeHref} className="block">
          <Button variant="gradient" size="sm" className="h-9 w-full gap-2">
            Continue Learning
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
        <Link href="/live" className="block">
          <Button variant="outline" size="sm" className="h-9 w-full gap-2 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10">
            <Radio className="h-3.5 w-3.5" />
            Open live view
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const profile = useProgressStore((s) => s.profile);

  return (
    <div className="space-y-6">
      <PageHeader title="Profile" description="Your learning progress at a glance" />

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="relative min-h-[12rem] overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/40 via-zinc-900/80 to-purple-950/30">
          <div className="relative z-10 flex h-full flex-col justify-center px-5 py-6 sm:px-6">
            <h2 className="text-xl font-bold tracking-tight text-zinc-50 sm:text-2xl">{profile.name}</h2>
            <p className="mt-2 text-sm font-medium tracking-wide text-indigo-200/90">
              upcoming java developer
            </p>
          </div>

          <div className="pointer-events-none absolute inset-y-1 right-1 w-[48%] max-w-[200px] sm:inset-y-0 sm:right-2 sm:w-[44%] sm:max-w-[220px]">
            <Image
              src={PROFILE_IMAGE}
              alt={`${profile.name} profile photo`}
              fill
              className="object-contain object-right"
              sizes="220px"
              priority
            />
          </div>
        </div>

        <LearningSnapshot />
      </div>

      <ProgressSettings />
    </div>
  );
}
