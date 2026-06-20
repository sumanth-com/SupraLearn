"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProfile, AppNote, StudySession, ProjectStatus } from "@/types";
import type { UserProgressState } from "./progress-types";
import { defaultProgressState, PROGRESS_VERSION } from "./progress-types";
import { getCurriculumWeeks, getTotalWeeks } from "@/curriculum/registry";
import {
  downloadJson,
  getWeekEntityIds,
  getWeekProjectIds,
  parseImportedProgress,
} from "@/lib/progress-storage";
import {
  computeWeekProgress,
  computeGlobalStats,
  getCurrentWeekId,
  isWeekLocked,
  isWeekCompleted,
} from "@/lib/progress-engine";

const defaultProfile: UserProfile = {
  name: "Prathyu",
  avatar: "P",
  currentWeek: 1,
  streak: 0,
  totalStudyHours: 0,
  lastActiveDate: new Date().toISOString().split("T")[0],
  resumeReadinessScore: 0,
  githubProgress: 0,
};

const defaultNotes: AppNote[] = [
  {
    id: "note-1",
    title: "Learning Notes",
    content: "# My Notes\n\n- [ ] Start Week 1\n\nWrite your notes in **Markdown**...",
    updatedAt: new Date().toISOString(),
  },
];

interface ProgressStore {
  progress: UserProgressState;
  profile: UserProfile;
  studySessions: StudySession[];
  notes: AppNote[];
  todayGoal: string;
  todayGoalDate: string;
  todayGoalCompleted: boolean;

  getCompletionDate: (entityId: string) => string | undefined;
  getStats: () => ReturnType<typeof computeGlobalStats>;
  getWeekProgress: (weekId: number) => ReturnType<typeof computeWeekProgress>;
  getCurrentWeekId: () => number;
  isLocked: (weekId: number) => boolean;
  isCompleted: (weekId: number) => boolean;
  isDone: (entityId: string) => boolean;
  getNote: (entityId: string) => string;
  isBookmarked: (entityId: string) => boolean;

  // Universal toggle
  toggleComplete: (entityId: string) => void;
  setComplete: (entityId: string, value: boolean) => void;
  setNote: (entityId: string, note: string) => void;
  toggleBookmark: (entityId: string) => void;

  // Project-specific
  updateProjectMeta: (
    projectId: string,
    updates: Partial<{ progress: number; status: ProjectStatus; githubLink: string; notes: string }>
  ) => void;
  setProjectComplete: (projectId: string, complete: boolean) => void;

  // GitHub repo links
  setGitHubRepoLink: (weekId: number, link: string) => void;
  getGitHubRepoLink: (weekId: number) => string;

  // Week
  updateWeekNotes: (weekId: number, notes: string) => void;
  completeWeek: (weekId: number) => void;

  // Profile & misc
  setTodayGoal: (goal: string) => void;
  toggleTodayGoal: () => void;
  addStudySession: (hours: number) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  addNote: (note: AppNote) => void;
  updateNote: (id: string, updates: Partial<AppNote>) => void;
  deleteNote: (id: string) => void;
  updateStreak: () => void;
  syncProfileFromProgress: () => void;
  bootstrapSession: () => void;
  resetWeekProgress: (weekId: number) => void;
  resetAllProgress: () => void;
  exportProgress: () => void;
  importProgress: (json: string) => void;
}

function todayIso() {
  return new Date().toISOString().split("T")[0];
}

function stripEntityKeys<T extends Record<string, unknown>>(map: T, ids: Set<string>): T {
  const next = { ...map };
  ids.forEach((id) => {
    delete next[id];
  });
  return next;
}

function syncDerivedProfile(
  profile: UserProfile,
  stats: ReturnType<typeof computeGlobalStats>,
  currentWeek: number
): UserProfile {
  return {
    ...profile,
    currentWeek,
    resumeReadinessScore: Math.min(
      Math.round(stats.overallProgress * 0.6 + stats.interviewCompleted * 2),
      100
    ),
    githubProgress: stats.githubTotal
      ? Math.round((stats.githubCompleted / stats.githubTotal) * 100)
      : 0,
  };
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      progress: defaultProgressState,
      profile: defaultProfile,
      studySessions: [],
      notes: defaultNotes,
      todayGoal: "Complete today's learning plan items",
      todayGoalDate: todayIso(),
      todayGoalCompleted: false,

      getStats: () => computeGlobalStats(getCurriculumWeeks(), get().progress),

      getWeekProgress: (weekId) => {
        const week = getCurriculumWeeks().find((w) => w.id === weekId);
        if (!week) {
          const empty = { completed: 0, total: 0, percentage: 0 };
          return {
            overall: empty,
            dayItems: empty,
            topicItems: empty,
            programming: empty,
            projects: empty,
            ai: empty,
            github: empty,
            interview: empty,
          };
        }
        return computeWeekProgress(week, get().progress);
      },

      getCurrentWeekId: () => getCurrentWeekId(getCurriculumWeeks(), get().progress),

      isLocked: (weekId) => isWeekLocked(weekId, get().progress),

      isCompleted: (weekId) => isWeekCompleted(weekId, get().progress),

      isDone: (entityId) => Boolean(get().progress.completed[entityId]),

      getNote: (entityId) => get().progress.notes[entityId] ?? "",

      isBookmarked: (entityId) => Boolean(get().progress.bookmarks[entityId]),

      getCompletionDate: (entityId) => get().progress.completionDates[entityId],

      toggleComplete: (entityId) => {
        set((state) => {
          const wasDone = state.progress.completed[entityId];
          const nowDone = !wasDone;
          const completed = { ...state.progress.completed, [entityId]: nowDone };
          const completionDates = { ...state.progress.completionDates };
          if (nowDone) {
            completionDates[entityId] = todayIso();
          } else {
            delete completionDates[entityId];
          }
          const progress = { ...state.progress, completed, completionDates };
          const stats = computeGlobalStats(getCurriculumWeeks(), progress);
          const currentWeek = getCurrentWeekId(getCurriculumWeeks(), progress);
          return {
            progress,
            profile: syncDerivedProfile(state.profile, stats, currentWeek),
          };
        });
        get().updateStreak();
      },

      setComplete: (entityId, value) => {
        const current = get().isDone(entityId);
        if (current !== value) get().toggleComplete(entityId);
      },

      setNote: (entityId, note) =>
        set((state) => ({
          progress: {
            ...state.progress,
            notes: { ...state.progress.notes, [entityId]: note },
          },
        })),

      toggleBookmark: (entityId) =>
        set((state) => ({
          progress: {
            ...state.progress,
            bookmarks: {
              ...state.progress.bookmarks,
              [entityId]: !state.progress.bookmarks[entityId],
            },
          },
        })),

      updateProjectMeta: (projectId, updates) =>
        set((state) => {
          const existing = state.progress.projectMeta[projectId] ?? {
            progress: 0,
            status: "not-started" as ProjectStatus,
            githubLink: "",
            notes: "",
          };
          const merged = { ...existing, ...updates };
          if (updates.progress !== undefined) {
            merged.status =
              updates.progress >= 100
                ? "completed"
                : updates.progress > 0
                  ? "in-progress"
                  : "not-started";
          }
          return {
            progress: {
              ...state.progress,
              projectMeta: { ...state.progress.projectMeta, [projectId]: merged },
            },
          };
        }),

      setProjectComplete: (projectId, complete) => {
        get().setComplete(`${projectId}-complete`, complete);
        get().updateProjectMeta(projectId, {
          progress: complete ? 100 : get().progress.projectMeta[projectId]?.progress ?? 0,
          status: complete ? "completed" : "in-progress",
        });
      },

      setGitHubRepoLink: (weekId, link) =>
        set((state) => ({
          progress: {
            ...state.progress,
            githubRepoLinks: { ...state.progress.githubRepoLinks, [weekId]: link },
          },
        })),

      getGitHubRepoLink: (weekId) => get().progress.githubRepoLinks[weekId] ?? "",

      updateWeekNotes: (weekId, notes) =>
        set((state) => ({
          progress: {
            ...state.progress,
            weekNotes: { ...state.progress.weekNotes, [weekId]: notes },
          },
        })),

      completeWeek: (weekId) =>
        set((state) => {
          const nextId = weekId + 1;
          const completedWeekIds = state.progress.completedWeekIds.includes(weekId)
            ? state.progress.completedWeekIds
            : [...state.progress.completedWeekIds, weekId];
          const unlockedWeekIds = state.progress.unlockedWeekIds.includes(nextId)
            ? state.progress.unlockedWeekIds
            : nextId <= getTotalWeeks()
              ? [...state.progress.unlockedWeekIds, nextId]
              : state.progress.unlockedWeekIds;
          const progress = { ...state.progress, completedWeekIds, unlockedWeekIds };
          const stats = computeGlobalStats(getCurriculumWeeks(), progress);
          const currentWeek = getCurrentWeekId(getCurriculumWeeks(), progress);
          return {
            progress,
            profile: syncDerivedProfile(state.profile, stats, currentWeek),
          };
        }),

      setTodayGoal: (goal) => set({ todayGoal: goal }),
      toggleTodayGoal: () => set((s) => ({ todayGoalCompleted: !s.todayGoalCompleted })),

      bootstrapSession: () => {
        const today = todayIso();
        set((state) => {
          const updates: Partial<typeof state> = {};
          if (state.todayGoalDate !== today) {
            updates.todayGoalDate = today;
            updates.todayGoalCompleted = false;
          }
          const stats = computeGlobalStats(getCurriculumWeeks(), state.progress);
          const currentWeek = getCurrentWeekId(getCurriculumWeeks(), state.progress);
          updates.profile = syncDerivedProfile(state.profile, stats, currentWeek);
          return { ...state, ...updates };
        });
        get().updateStreak();
      },

      resetWeekProgress: (weekId) => {
        const week = getCurriculumWeeks().find((w) => w.id === weekId);
        if (!week) return;
        const ids = new Set(getWeekEntityIds(week));
        const projectIds = getWeekProjectIds(week);

        set((state) => {
          const progress = {
            ...state.progress,
            completed: stripEntityKeys(state.progress.completed, ids),
            notes: stripEntityKeys(state.progress.notes, ids),
            bookmarks: stripEntityKeys(state.progress.bookmarks, ids),
            completionDates: stripEntityKeys(state.progress.completionDates, ids),
            projectMeta: Object.fromEntries(
              Object.entries(state.progress.projectMeta).filter(([id]) => !projectIds.includes(id))
            ),
            githubRepoLinks: Object.fromEntries(
              Object.entries(state.progress.githubRepoLinks).filter(([id]) => Number(id) !== weekId)
            ),
            weekNotes: Object.fromEntries(
              Object.entries(state.progress.weekNotes).filter(([id]) => Number(id) !== weekId)
            ),
            completedWeekIds: state.progress.completedWeekIds.filter((id) => id !== weekId),
            unlockedWeekIds: state.progress.unlockedWeekIds.includes(weekId)
              ? state.progress.unlockedWeekIds
              : [...state.progress.unlockedWeekIds, weekId].sort((a, b) => a - b),
          };
          const stats = computeGlobalStats(getCurriculumWeeks(), progress);
          const currentWeek = getCurrentWeekId(getCurriculumWeeks(), progress);
          return { progress, profile: syncDerivedProfile(state.profile, stats, currentWeek) };
        });
      },

      resetAllProgress: () => {
        set({
          progress: defaultProgressState,
          profile: { ...defaultProfile, lastActiveDate: todayIso() },
          studySessions: [],
          notes: defaultNotes,
          todayGoal: "Complete today's learning plan items",
          todayGoalDate: todayIso(),
          todayGoalCompleted: false,
        });
      },

      exportProgress: () => {
        const state = get();
        const payload = {
          version: PROGRESS_VERSION,
          exportedAt: new Date().toISOString(),
          app: "prathyu-academy" as const,
          progress: state.progress,
          profile: state.profile,
          studySessions: state.studySessions,
          notes: state.notes,
          todayGoal: state.todayGoal,
          todayGoalDate: state.todayGoalDate,
          todayGoalCompleted: state.todayGoalCompleted,
        };
        downloadJson(
          `prathyu-progress-${todayIso()}.json`,
          JSON.stringify(payload, null, 2)
        );
      },

      importProgress: (json) => {
        const data = parseImportedProgress(json);
        set({
          progress: { ...defaultProgressState, ...(data.progress as UserProgressState) },
          profile: { ...defaultProfile, ...(data.profile as UserProfile) },
          studySessions: (data.studySessions as StudySession[]) ?? [],
          notes: (data.notes as AppNote[]) ?? defaultNotes,
          todayGoal: data.todayGoal ?? "Complete today's learning plan items",
          todayGoalDate: data.todayGoalDate ?? todayIso(),
          todayGoalCompleted: Boolean(data.todayGoalCompleted),
        });
        get().syncProfileFromProgress();
      },

      addStudySession: (hours) =>
        set((state) => {
          const today = todayIso();
          const weekId = getCurrentWeekId(getCurriculumWeeks(), state.progress);
          const existing = state.studySessions.find((s) => s.date === today);
          const sessions = existing
            ? state.studySessions.map((s) =>
                s.date === today ? { ...s, hours: s.hours + hours } : s
              )
            : [...state.studySessions, { date: today, hours, weekId }];
          return {
            studySessions: sessions,
            profile: { ...state.profile, totalStudyHours: state.profile.totalStudyHours + hours },
          };
        }),

      updateProfile: (updates) => set((s) => ({ profile: { ...s.profile, ...updates } })),

      addNote: (note) => set((s) => ({ notes: [...s.notes, note] })),
      updateNote: (id, updates) =>
        set((s) => ({
          notes: s.notes.map((n) =>
            n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n
          ),
        })),
      deleteNote: (id) => set((s) => ({ notes: s.notes.filter((n) => n.id !== id) })),

      updateStreak: () =>
        set((state) => {
          const today = todayIso();
          const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
          const { lastActiveDate, streak } = state.profile;
          if (lastActiveDate === today) return state;
          const newStreak = lastActiveDate === yesterday ? streak + 1 : 1;
          return { profile: { ...state.profile, streak: newStreak, lastActiveDate: today } };
        }),

      syncProfileFromProgress: () =>
        set((state) => {
          const stats = computeGlobalStats(getCurriculumWeeks(), state.progress);
          const currentWeek = getCurrentWeekId(getCurriculumWeeks(), state.progress);
          return { profile: syncDerivedProfile(state.profile, stats, currentWeek) };
        }),
    }),
    {
      name: "prathyu-academy-v2",
      version: PROGRESS_VERSION,
      migrate: (persisted, version) => {
        if (!persisted || typeof persisted !== "object") return persisted;
        const state = persisted as Record<string, unknown>;
        if (!state.todayGoalDate) state.todayGoalDate = todayIso();
        if (version < PROGRESS_VERSION && state.progress) {
          (state.progress as UserProgressState).version = PROGRESS_VERSION;
        }
        return persisted;
      },
      onRehydrateStorage: () => (state) => {
        state?.bootstrapSession();
      },
    }
  )
);

/** Backward-compatible alias */
export const useAppStore = useProgressStore;

export function getStats() {
  return useProgressStore.getState().getStats();
}
