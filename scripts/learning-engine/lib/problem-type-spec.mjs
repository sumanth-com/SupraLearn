/**
 * Problem type quotas per topic / category.
 * Loops topic is intentionally much richer than defaults.
 */

export const PROBLEM_TYPE_LABELS = {
  pattern: "Pattern Programs",
  logic: "Logic Problems",
  "output-prediction": "Output Prediction",
  "find-bug": "Find the Bug",
  mcq: "MCQ",
  "dry-run": "Dry Run",
  interview: "Interview Coding",
  hackerrank: "HackerRank Style",
  leetcode: "LeetCode Style",
  company: "Company Questions",
  optimization: "Optimization",
  debugging: "Debugging",
  "nested-pattern": "Nested Loop Patterns",
  select: "SELECT Queries",
  insert: "INSERT",
  update: "UPDATE",
  join: "JOINs",
  aggregate: "GROUP BY / HAVING",
  subquery: "Subqueries",
  transaction: "Transactions",
  controller: "Controller",
  service: "Service Layer",
  repository: "Repository",
  jwt: "JWT Flow",
  prompt: "Prompt Engineering",
  terminal: "Terminal Workflow",
};

/** Default ~20 problems per difficulty for most topics */
export const DEFAULT_QUOTAS = {
  easy: [
    { type: "pattern", count: 6 },
    { type: "logic", count: 6 },
    { type: "output-prediction", count: 3 },
    { type: "find-bug", count: 3 },
    { type: "mcq", count: 2 },
  ],
  medium: [
    { type: "logic", count: 6 },
    { type: "interview", count: 5 },
    { type: "nested-pattern", count: 4 },
    { type: "dry-run", count: 3 },
    { type: "output-prediction", count: 2 },
  ],
  hard: [
    { type: "leetcode", count: 7 },
    { type: "hackerrank", count: 7 },
    { type: "company", count: 6 },
  ],
};

/** Extremely rich loops curriculum */
export const FOR_LOOP_QUOTAS = {
  easy: [
    { type: "pattern", count: 20 },
    { type: "logic", count: 20 },
    { type: "output-prediction", count: 10 },
    { type: "dry-run", count: 10 },
  ],
  medium: [
    { type: "pattern", count: 20 },
    { type: "nested-pattern", count: 20 },
    { type: "interview", count: 15 },
  ],
  hard: [
    { type: "hackerrank", count: 20 },
    { type: "leetcode", count: 20 },
    { type: "company", count: 10 },
  ],
};

export const WHILE_LOOP_QUOTAS = {
  easy: [
    { type: "logic", count: 10 },
    { type: "pattern", count: 8 },
    { type: "output-prediction", count: 5 },
    { type: "dry-run", count: 5 },
  ],
  medium: [
    { type: "logic", count: 10 },
    { type: "interview", count: 8 },
    { type: "nested-pattern", count: 7 },
  ],
  hard: [
    { type: "hackerrank", count: 10 },
    { type: "leetcode", count: 10 },
    { type: "company", count: 5 },
  ],
};

/** SQL topic quotas */
export const SQL_QUOTAS = {
  easy: [
    { type: "select", count: 8 },
    { type: "insert", count: 6 },
    { type: "output-prediction", count: 3 },
    { type: "mcq", count: 3 },
  ],
  medium: [
    { type: "join", count: 8 },
    { type: "aggregate", count: 7 },
    { type: "subquery", count: 5 },
  ],
  hard: [
    { type: "optimization", count: 8 },
    { type: "transaction", count: 7 },
    { type: "company", count: 5 },
  ],
};

/** DSA quotas */
export const DSA_QUOTAS = {
  easy: [
    { type: "logic", count: 8 },
    { type: "pattern", count: 6 },
    { type: "output-prediction", count: 3 },
    { type: "dry-run", count: 3 },
  ],
  medium: [
    { type: "interview", count: 10 },
    { type: "logic", count: 6 },
    { type: "dry-run", count: 4 },
  ],
  hard: [
    { type: "leetcode", count: 10 },
    { type: "hackerrank", count: 8 },
    { type: "company", count: 7 },
  ],
};

/** REST / Spring quotas */
export const BACKEND_QUOTAS = {
  easy: [
    { type: "controller", count: 6 },
    { type: "logic", count: 6 },
    { type: "output-prediction", count: 4 },
    { type: "mcq", count: 4 },
  ],
  medium: [
    { type: "service", count: 8 },
    { type: "interview", count: 7 },
    { type: "debugging", count: 5 },
  ],
  hard: [
    { type: "leetcode", count: 8 },
    { type: "company", count: 7 },
    { type: "optimization", count: 5 },
  ],
};

export function getQuotasForTopic(slug, category) {
  if (slug === "for-loop") return FOR_LOOP_QUOTAS;
  if (slug === "while-loop") return WHILE_LOOP_QUOTAS;
  if (category === "sql" || category === "database-design") return SQL_QUOTAS;
  if (category === "dsa") return DSA_QUOTAS;
  if (["rest-api", "spring-boot", "jdbc", "hibernate", "security", "mongodb"].includes(category)) {
    return BACKEND_QUOTAS;
  }
  if (category === "git") {
    return {
      easy: [
        { type: "terminal", count: 8 },
        { type: "logic", count: 6 },
        { type: "mcq", count: 4 },
        { type: "output-prediction", count: 2 },
      ],
      medium: [
        { type: "terminal", count: 10 },
        { type: "interview", count: 6 },
        { type: "debugging", count: 4 },
      ],
      hard: [
        { type: "company", count: 8 },
        { type: "optimization", count: 7 },
        { type: "debugging", count: 5 },
      ],
    };
  }
  if (category === "ai") {
    return {
      easy: [
        { type: "prompt", count: 8 },
        { type: "logic", count: 6 },
        { type: "mcq", count: 4 },
        { type: "output-prediction", count: 2 },
      ],
      medium: [
        { type: "prompt", count: 10 },
        { type: "interview", count: 6 },
        { type: "debugging", count: 4 },
      ],
      hard: [
        { type: "company", count: 8 },
        { type: "optimization", count: 7 },
        { type: "leetcode", count: 5 },
      ],
    };
  }
  return DEFAULT_QUOTAS;
}

export function estimatedMinutes(difficulty, problemType) {
  const base = difficulty === "easy" ? 8 : difficulty === "medium" ? 15 : 25;
  const bonus =
    problemType === "mcq" || problemType === "output-prediction"
      ? -3
      : problemType === "leetcode" || problemType === "company"
        ? 10
        : 0;
  return Math.max(5, base + bonus);
}
