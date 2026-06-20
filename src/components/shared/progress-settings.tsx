"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Upload,
  RotateCcw,
  AlertTriangle,
  HardDrive,
  CheckCircle2,
} from "lucide-react";
import { useProgressStore } from "@/store/use-progress-store";
import { useTotalWeeks } from "@/hooks/use-curriculum";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FilterSelect } from "@/components/shared/filter-pills";

export function ProgressSettings() {
  const totalWeeks = useTotalWeeks();
  const exportProgress = useProgressStore((s) => s.exportProgress);
  const importProgress = useProgressStore((s) => s.importProgress);
  const resetWeekProgress = useProgressStore((s) => s.resetWeekProgress);
  const resetAllProgress = useProgressStore((s) => s.resetAllProgress);

  const [resetWeek, setResetWeek] = useState<number>(1);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const weekOptions = Array.from({ length: totalWeeks }, (_, i) => ({
    value: i + 1,
    label: `Week ${i + 1}`,
  }));

  const showSuccess = (text: string) => {
    setError(null);
    setMessage(text);
    setTimeout(() => setMessage(null), 4000);
  };

  const handleExport = () => {
    exportProgress();
    showSuccess("Progress exported to your downloads folder.");
  };

  const handleImport = async (file: File) => {
    try {
      const text = await file.text();
      importProgress(text);
      showSuccess("Progress restored successfully.");
    } catch (err) {
      setMessage(null);
      setError(err instanceof Error ? err.message : "Import failed.");
    }
  };

  const handleResetWeek = () => {
    if (!window.confirm(`Reset all progress for Week ${resetWeek}? This cannot be undone.`)) return;
    resetWeekProgress(resetWeek);
    showSuccess(`Week ${resetWeek} progress reset.`);
  };

  const handleResetAll = () => {
    if (
      !window.confirm(
        "Reset ALL learning progress? Notes, completions, and streak will be cleared. Export a backup first if needed."
      )
    ) {
      return;
    }
    resetAllProgress();
    showSuccess("All progress reset. Fresh start!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HardDrive className="h-5 w-5 text-indigo-400" />
          Local Storage & Backup
        </CardTitle>
        <p className="text-sm text-zinc-500">
          Everything is saved automatically in your browser. No account, no server — works fully offline.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-400"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            {message}
          </motion.div>
        )}
        {error && (
          <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          <Button variant="secondary" className="gap-2" onClick={handleExport}>
            <Download className="h-4 w-4" />
            Export Progress (JSON)
          </Button>
          <Button variant="secondary" className="gap-2" onClick={() => fileRef.current?.click()}>
            <Upload className="h-4 w-4" />
            Import Progress (JSON)
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImport(file);
              e.target.value = "";
            }}
          />
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-3">
          <p className="text-sm font-medium text-zinc-300">Reset Week Progress</p>
          <div className="flex flex-wrap items-center gap-3">
            <FilterSelect label="Week" value={resetWeek} onChange={setResetWeek} options={weekOptions} />
            <Button variant="outline" className="gap-2 text-amber-400 border-amber-500/30" onClick={handleResetWeek}>
              <RotateCcw className="h-4 w-4" />
              Reset Week
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
          <p className="text-sm font-medium text-zinc-300">Reset Entire Roadmap</p>
          <p className="mt-1 text-xs text-zinc-500">Clears all completions, notes, bookmarks, and study sessions.</p>
          <Button
            variant="outline"
            className="mt-3 gap-2 border-red-500/40 text-red-400 hover:bg-red-500/10"
            onClick={handleResetAll}
          >
            <AlertTriangle className="h-4 w-4" />
            Reset Everything
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
