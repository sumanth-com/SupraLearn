import { getCurriculumWeeks } from "@/curriculum/registry";
import {
  isWeekFullyCompleteAcrossModules,
  markWeekCompleteAllModules,
  migrateProgressStateV3,
} from "@/lib/module-progress";
import type { UserProgressState } from "@/store/progress-types";

/** Week 1 → 100% everywhere and Week 2 unlocked (Prathyu bootstrap). */
export function ensureWeekOneUnlock(progress: UserProgressState): UserProgressState {
  const weeks = getCurriculumWeeks();
  const week2Open = progress.moduleGates?.practice?.unlockedWeekIds?.includes(2) ?? false;
  const week1Done = isWeekFullyCompleteAcrossModules(progress, 1, weeks);

  if (week2Open && week1Done) {
    return migrateProgressStateV3(progress, weeks, { rebuildGates: true });
  }

  const seeded = markWeekCompleteAllModules(progress, 1, weeks);
  return migrateProgressStateV3(seeded, weeks, { rebuildGates: true });
}
