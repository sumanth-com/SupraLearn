"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame, TrendingUp } from "lucide-react";
import { useProgressStore } from "@/store/use-progress-store";
import { useStoreHydrated } from "@/hooks/use-store-hydrated";
import { PageHeader } from "@/components/shared/page-header";
import { ProgressSettings } from "@/components/shared/progress-settings";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PROFILE_IMAGE } from "@/lib/profile-image";

function ProfileLoader() {
  return (
    <div className="mt-3 flex items-center gap-3">
      <span className="relative flex h-7 w-7 shrink-0 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-indigo-400/25" />
        <span className="relative inline-flex h-7 w-7 animate-spin rounded-full border-[3px] border-indigo-500/20 border-t-indigo-400 shadow-[0_0_14px_rgba(129,140,248,0.55)]" />
      </span>
      <span className="text-sm font-medium tracking-wide text-indigo-200">
        upcoming java developer
      </span>
    </div>
  );
}

function LearningSnapshot() {
  const hydrated = useStoreHydrated();
  const profile = useProgressStore((s) => s.profile);
  const resumePosition = useProgressStore((s) => s.resumePosition);
  const getStats = useProgressStore((s) => s.getStats);
  const practiceWeek = useProgressStore((s) => s.getModuleCurrentWeek("practice"));

  const stats = getStats();
  const overallPct = hydrated ? stats.overallProgress : 0;
  const streak = hydrated ? profile.streak : 0;
  const week = hydrated ? practiceWeek : 1;
  const resumeHref = resumePosition?.href ?? `/roadmap/week/${week}`;

  return (
    <div className="flex h-[11rem] flex-col justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-5 sm:h-[12rem]">
      <div>
        <h3 className="text-sm font-semibold text-zinc-100">Learning Snapshot</h3>
        <p className="mt-0.5 text-xs text-zinc-500">Your progress at a glance</p>
      </div>

      <div className="space-y-3">
        <div>
          <div className="mb-1.5 flex items-center justify-between text-[11px] text-zinc-500">
            <span className="inline-flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5 text-indigo-400" />
              Overall progress
            </span>
            <span className="font-semibold tabular-nums text-indigo-300">{overallPct}%</span>
          </div>
          <Progress value={overallPct} className="h-1.5 bg-zinc-800" />
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-zinc-500">Practice week</span>
          <span className="font-medium text-zinc-200">Week {week}</span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="inline-flex items-center gap-1 text-zinc-500">
            <Flame className="h-3.5 w-3.5 text-orange-400" />
            Study streak
          </span>
          <span className="font-medium text-zinc-200">{streak} days</span>
        </div>
      </div>

      <Link href={resumeHref} className="block">
        <Button variant="gradient" size="sm" className="h-9 w-full gap-2">
          Continue Learning
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </Link>
    </div>
  );
}

export default function ProfilePage() {
  const profile = useProgressStore((s) => s.profile);

  return (
    <div className="space-y-6">
      <PageHeader title="Profile" description="Your learning progress at a glance" />

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="relative h-[11rem] overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/40 via-zinc-900/80 to-purple-950/30 sm:h-[12rem]">
          <div className="relative z-10 flex h-full flex-col justify-center px-5 sm:px-6">
            <h2 className="text-xl font-bold tracking-tight text-zinc-50 sm:text-2xl">
              {profile.name}
            </h2>
            <ProfileLoader />
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
