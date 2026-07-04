import { getCurriculumWeeks } from "@/curriculum/registry";
import {
  isWeekFullyCompleteAcrossModules,
  markWeekCompleteAllModules,
} from "@/lib/module-progress";
import type { UserProgressState } from "@/store/progress-types";

/** Force Week 1 to 100% in every section and unlock Week 2 via gate rebuild. */
export function ensureWeekOneComplete(progress: UserProgressState): UserProgressState {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem("prathyu-week1-complete-all-modules-v10");
    } catch {
      /* ignore */
    }
  }
  const weeks = getCurriculumWeeks();
  if (isWeekFullyCompleteAcrossModules(progress, 1, weeks)) {
    return progress;
  }
  return markWeekCompleteAllModules(progress, 1, weeks);
}
