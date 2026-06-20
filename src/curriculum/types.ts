import type { Difficulty } from "@/types";

/** Static curriculum definition — no user progress */
export interface CurriculumChecklistItem {
  id: string;
  title: string;
  estimatedMinutes?: number;
  difficulty?: Difficulty;
}

export interface CurriculumDayTopic {
  id: string;
  title: string;
  estimatedMinutes?: number;
  difficulty?: Difficulty;
  items: CurriculumChecklistItem[];
}

export interface CurriculumDay {
  id: string;
  dayNumber: number;
  title: string;
  theme?: string;
  estimatedMinutes?: number;
  topics: CurriculumDayTopic[];
}

export interface CurriculumTopic {
  id: string;
  title: string;
  estimatedMinutes?: number;
  difficulty?: Difficulty;
  items: CurriculumChecklistItem[];
}

export interface CurriculumProgrammingQuestion {
  id: string;
  title: string;
  difficulty: Difficulty;
  description?: string;
}

export interface CurriculumQuestionCategory {
  id: string;
  category: string;
  questions: CurriculumProgrammingQuestion[];
}

export interface CurriculumProjectFeature {
  id: string;
  title: string;
}

export interface CurriculumProject {
  id: string;
  title: string;
  description: string;
  features: CurriculumProjectFeature[];
  requirements?: string[];
  bonusFeatures?: string[];
}

export interface CurriculumAISkill {
  id: string;
  title: string;
  description?: string;
  learningTopics: CurriculumChecklistItem[];
  tools: string[];
  exercises: CurriculumChecklistItem[];
  promptExercises?: { id: string; prompt: string }[];
}

export interface CurriculumGitHubFile {
  id: string;
  path: string;
}

export interface CurriculumGitHubTasks {
  id: string;
  repository: string;
  description?: string;
  files: CurriculumGitHubFile[];
}

export interface CurriculumInterviewQuestion {
  id: string;
  question: string;
  /** Professional interview-ready answer */
  answer: string;
  /** Real-world scenario or industry usage */
  realWorld?: string;
  /** Code snippet demonstrating the concept */
  code?: string;
  /** Expected program/output sample */
  output?: string;
}

/** Supplemental interview pack (e.g. API, DB) not tied to a curriculum week */
export interface CurriculumInterviewPack {
  id: string;
  title: string;
  subtitle?: string;
  categories: CurriculumInterviewCategory[];
}

export interface CurriculumInterviewCategory {
  id: string;
  category: string;
  questions: CurriculumInterviewQuestion[];
}

export interface CurriculumDeliverable {
  id: string;
  title: string;
  description?: string;
  /** Auto-complete when linked metric reaches targetCount */
  autoComplete?: {
    type: "programming" | "projects" | "github" | "ai" | "interview";
    targetCount: number;
  };
}

export interface CurriculumWeekDefinition {
  id: number;
  slug: string;
  title: string;
  goal: string;
  description: string;
  estimatedHours: number;
  difficulty: Difficulty;
  days: CurriculumDay[];
  topics: CurriculumTopic[];
  programmingQuestions: CurriculumQuestionCategory[];
  projects: CurriculumProject[];
  aiSkill: CurriculumAISkill;
  githubTasks: CurriculumGitHubTasks;
  interviewQuestions: CurriculumInterviewCategory[];
  deliverables: CurriculumDeliverable[];
}

export type TrackableEntityType =
  | "day-item"
  | "topic-item"
  | "programming-question"
  | "project-feature"
  | "project-complete"
  | "ai-topic"
  | "ai-exercise"
  | "ai-prompt"
  | "github-file"
  | "interview-question"
  | "deliverable"
  | "learning-lesson";

export interface TrackableEntity {
  id: string;
  weekId: number;
  type: TrackableEntityType;
  label: string;
  difficulty?: Difficulty;
  category?: string;
}
