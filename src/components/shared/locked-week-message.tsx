import { Lock } from "lucide-react";
import { MODULE_LABELS, type LearningModule } from "@/lib/module-progress";

interface LockedWeekMessageProps {
  module: LearningModule;
  weekId?: number;
  className?: string;
}

export function LockedWeekMessage({ module, weekId, className }: LockedWeekMessageProps) {
  return (
    <div
      className={
        className ??
        "flex flex-col items-center justify-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/50 px-6 py-12 text-center"
      }
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-800/80">
        <Lock className="h-5 w-5 text-zinc-400" />
      </div>
      <div>
        <p className="text-sm font-semibold text-zinc-200">🔒 Locked</p>
        <p className="mt-1 max-w-sm text-sm text-zinc-500">
          Complete the previous week in {MODULE_LABELS[module]}
          {weekId && weekId > 1 ? ` (Week ${weekId - 1})` : ""} to unlock
          {weekId ? ` Week ${weekId}` : " this content"}.
        </p>
      </div>
    </div>
  );
}
