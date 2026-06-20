import type { ProjectStatus } from "@/types";

export interface ProjectProgressMeta {
  progress: number;
  status: ProjectStatus;
  githubLink: string;
  notes: string;
}

export interface UserProgressState {
  version: number;
  /** Universal completion map — key is entity ID from curriculum */
  completed: Record<string, boolean>;
  notes: Record<string, string>;
  bookmarks: Record<string, boolean>;
  completionDates: Record<string, string>;
  projectMeta: Record<string, ProjectProgressMeta>;
  githubRepoLinks: Record<string, string>;
  weekNotes: Record<number, string>;
  unlockedWeekIds: number[];
  completedWeekIds: number[];
}

export const PROGRESS_VERSION = 2;

export const defaultProgressState: UserProgressState = {
  version: PROGRESS_VERSION,
  completed: {},
  notes: {},
  bookmarks: {},
  completionDates: {},
  projectMeta: {},
  githubRepoLinks: {},
  weekNotes: {},
  unlockedWeekIds: [1],
  completedWeekIds: [],
};
