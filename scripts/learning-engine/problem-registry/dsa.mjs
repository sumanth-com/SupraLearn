import { buildDsaLessons } from "../builders.mjs";
import { generateCuratedProblems } from "../lib/curated-engine.mjs";

export function getDsaProblems(weekId, topic) {
  const problems = generateCuratedProblems(
    topic.slug,
    topic.title ?? topic.slug.replace(/-/g, " "),
    "dsa"
  );
  return buildDsaLessons(weekId, topic.slug, problems);
}
