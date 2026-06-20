import type { CurriculumWeekDefinition } from "@/curriculum/types";
import { collectTrackableEntities } from "@/curriculum/entities";
import {
  COMMUNICATION_WEEKS,
  collectCommunicationIds,
  getCommunicationWeek,
} from "@/curriculum/communication-skills";
import { getTotalWeeks } from "@/curriculum/registry";
import type { UserProgressState } from "@/store/progress-types";
import { UNLOCK_ALL_WEEKS } from "@/lib/feature-flags";
import type { ProgressCounts } from "@/lib/progress-engine";

export type LearningModule =
  | "roadmap"
  | "practice"
  | "ai-skills"
  | "projects"
  | "github"
  | "interview"
  | "communication";

export const LEARNING_MODULES: LearningModule[] = [
  "roadmap",
  "practice",
  "ai-skills",
  "projects",
  "github",
  "interview",
  "communication",
];

export const MODULE_LABELS: Record<LearningModule, string> = {
  roadmap: "Roadmap",
  practice: "Practice",
  "ai-skills": "AI Skills",
  projects: "Projects",
  github: "GitHub Tasks",
  interview: "Interview",
  communication: "Communication",
};

export interface ModuleWeekGate {
  unlockedWeekIds: number[];
  completedWeekIds: number[];
}

export type ModuleWeekGates = Record<LearningModule, ModuleWeekGate>;

export interface ResumePosition {
  module: LearningModule;
  weekId: number;
  title: string;
  subtitle?: string;
  href: string;
  updatedAt: string;
}

const emptyCounts = (): ProgressCounts => ({ completed: 0, total: 0, percentage: 0 });

function countProgress(ids: string[], completed: Record<string, boolean>): ProgressCounts {
  const total = ids.length;
  if (total === 0) return emptyCounts();
  const done = ids.filter((id) => completed[id]).length;
  return {
    completed: done,
    total,
    percentage: Math.round((done / total) * 100),
  };
}

function idsOfType(week: CurriculumWeekDefinition, type: string): string[] {
  return collectTrackableEntities(week)
    .filter((e) => e.type === type)
    .map((e) => e.id);
}

export function createDefaultModuleGates(): ModuleWeekGates {
  const mk = (): ModuleWeekGate => ({ unlockedWeekIds: [1], completedWeekIds: [] });
  return {
    roadmap: mk(),
    practice: mk(),
    "ai-skills": mk(),
    projects: mk(),
    github: mk(),
    interview: mk(),
    communication: mk(),
  };
}

export function getModuleWeekProgress(
  module: LearningModule,
  weekId: number,
  week: CurriculumWeekDefinition | undefined,
  progress: UserProgressState
): ProgressCounts {
  if (module === "communication") {
    const commWeek = getCommunicationWeek(weekId);
    if (!commWeek) return emptyCounts();
    const ids = collectCommunicationIds(commWeek.skill);
    return countProgress(ids, progress.completed);
  }

  if (!week) return emptyCounts();

  const { completed } = progress;

  switch (module) {
    case "roadmap":
      return countProgress(idsOfType(week, "day-item"), completed);
    case "practice": {
      const lessonIds = idsOfType(week, "learning-lesson");
      const programmingIds = idsOfType(week, "programming-question");
      return countProgress([...lessonIds, ...programmingIds], completed);
    }
    case "ai-skills": {
      const aiIds = [
        ...idsOfType(week, "ai-topic"),
        ...idsOfType(week, "ai-exercise"),
        ...idsOfType(week, "ai-prompt"),
      ];
      return countProgress(aiIds, completed);
    }
    case "projects":
      return countProgress(idsOfType(week, "project-complete"), completed);
    case "github":
      return countProgress(idsOfType(week, "github-file"), completed);
    case "interview":
      return countProgress(idsOfType(week, "interview-question"), completed);
    default:
      return emptyCounts();
  }
}

export function isModuleWeekLocked(
  module: LearningModule,
  weekId: number,
  progress: UserProgressState
): boolean {
  if (UNLOCK_ALL_WEEKS) return false;
  const gates = progress.moduleGates?.[module];
  if (!gates) return weekId !== 1;
  return !gates.unlockedWeekIds.includes(weekId);
}

export function isModuleWeekCompleted(
  module: LearningModule,
  weekId: number,
  progress: UserProgressState
): boolean {
  return progress.moduleGates?.[module]?.completedWeekIds.includes(weekId) ?? false;
}

export function getModuleCurrentWeek(
  module: LearningModule,
  progress: UserProgressState,
  totalWeeks = getTotalWeeks()
): number {
  const gates = progress.moduleGates?.[module];
  if (!gates) return 1;
  const incomplete = gates.unlockedWeekIds.find((id) => !gates.completedWeekIds.includes(id));
  return incomplete ?? gates.unlockedWeekIds[gates.unlockedWeekIds.length - 1] ?? totalWeeks;
}

function unlockNextWeek(gate: ModuleWeekGate, weekId: number, maxWeek: number): ModuleWeekGate {
  const completedWeekIds = gate.completedWeekIds.includes(weekId)
    ? gate.completedWeekIds
    : [...gate.completedWeekIds, weekId];
  const nextId = weekId + 1;
  const unlockedWeekIds =
    nextId <= maxWeek && !gate.unlockedWeekIds.includes(nextId)
      ? [...gate.unlockedWeekIds, nextId].sort((a, b) => a - b)
      : gate.unlockedWeekIds;
  return { completedWeekIds, unlockedWeekIds };
}

export function applyModuleCompletionUnlock(
  module: LearningModule,
  weekId: number,
  gates: ModuleWeekGates,
  maxWeek = 12
): ModuleWeekGates {
  const gate = gates[module];
  if (!gate || gate.completedWeekIds.includes(weekId)) return gates;
  return {
    ...gates,
    [module]: unlockNextWeek(gate, weekId, maxWeek),
  };
}

export function rebuildModuleGatesFromProgress(
  weeks: CurriculumWeekDefinition[],
  progress: UserProgressState
): ModuleWeekGates {
  const gates = createDefaultModuleGates();
  const maxJavaWeek = weeks.length || getTotalWeeks();

  for (const module of LEARNING_MODULES) {
    if (module === "communication") {
      for (const commWeek of COMMUNICATION_WEEKS) {
        const pct = getModuleWeekProgress(module, commWeek.weekId, undefined, progress).percentage;
        if (pct >= 100) {
          gates.communication = unlockNextWeek(
            gates.communication,
            commWeek.weekId,
            COMMUNICATION_WEEKS.length
          );
        }
      }
      continue;
    }

    for (const week of weeks) {
      const pct = getModuleWeekProgress(module, week.id, week, progress).percentage;
      if (pct >= 100) {
        gates[module] = unlockNextWeek(gates[module], week.id, maxJavaWeek);
      }
    }
  }

  return gates;
}

export function migrateProgressStateV3(state: UserProgressState, weeks: CurriculumWeekDefinition[]): UserProgressState {
  if (state.moduleGates && state.version >= 3) return state;

  const moduleGates = rebuildModuleGatesFromProgress(weeks, state);

  return {
    ...state,
    version: 3,
    moduleGates,
    unlockedWeekIds: state.unlockedWeekIds?.length ? state.unlockedWeekIds : [1],
    completedWeekIds: state.completedWeekIds ?? [],
  };
}
