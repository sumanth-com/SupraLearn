import type { CurriculumAISkill } from "@/curriculum/types";

export const COMMUNICATION_WEEKS_COUNT = 12;

export interface CommunicationWeekModule {
  weekId: number;
  title: string;
  subtitle: string;
  focus: string;
  skill: CurriculumAISkill;
}

function weekSkill(
  weekId: number,
  title: string,
  description: string,
  topics: { title: string }[],
  exercises: { title: string }[]
): CurriculumAISkill {
  return {
    id: `comm-week-${weekId}`,
    title,
    description,
    learningTopics: topics.map((t, i) => ({
      id: `comm-w${weekId}-topic-${i + 1}`,
      title: t.title,
    })),
    tools: ["Mirror practice", "Journal", "Recording app", "Peer feedback"],
    exercises: exercises.map((e, i) => ({
      id: `comm-w${weekId}-ex-${i + 1}`,
      title: e.title,
    })),
  };
}

export const COMMUNICATION_WEEKS: CommunicationWeekModule[] = [
  {
    weekId: 1,
    title: "Foundations of Clear English",
    subtitle: "Breath, pace, and articulation for everyday professional speech.",
    focus: "Speak slowly enough to be understood. Finish every word.",
    skill: weekSkill(1, "Week 1 — Foundations of Clear English", "Build the physical and mental base for clear spoken English.", [
      { title: "The four pillars: breath, pace, volume, articulation" },
      { title: "Common pronunciation patterns for Indian English speakers" },
      { title: "Stress and rhythm in English sentences" },
      { title: "Eliminating mumbling: opening the mouth and completing words" },
      { title: "The two-minute clarity drill (daily habit)" },
    ], [
      { title: "Record and review a 60-second self-introduction" },
      { title: "Read a paragraph aloud at half your normal speed" },
      { title: "Mark stressed syllables in ten workplace sentences" },
      { title: "Practice five tongue-twisters for consonant clarity" },
    ]),
  },
  {
    weekId: 2,
    title: "Professional Vocabulary & Register",
    subtitle: "Choose words that sound confident, polite, and appropriate at work.",
    focus: "Replace casual words with precise professional alternatives.",
    skill: weekSkill(2, "Week 2 — Professional Vocabulary & Register", "Expand your workplace lexicon without sounding stiff or unnatural.", [
      { title: "Formal vs informal register: when each is correct" },
      { title: "Power verbs for meetings: propose, confirm, escalate, align" },
      { title: "Softening language without weakening your message" },
      { title: "Avoiding filler words: basically, actually, like, you know" },
      { title: "Building a personal word bank (20 words per week)" },
    ], [
      { title: "Rewrite five casual messages in professional English" },
      { title: "Replace weak verbs in a status-update email" },
      { title: "Eliminate fillers from a two-minute spoken update" },
      { title: "Create a glossary of ten terms from your current project" },
    ]),
  },
  {
    weekId: 3,
    title: "Grammar for Business Communication",
    subtitle: "Reliable sentence structure for emails, chats, and spoken updates.",
    focus: "Short sentences. One idea per sentence. Correct tense.",
    skill: weekSkill(3, "Week 3 — Grammar for Business Communication", "Master the grammar patterns that appear every day at work.", [
      { title: "Tenses in status updates: past progress, present state, future plan" },
      { title: "Articles (a, an, the): the rules that matter most at work" },
      { title: "Prepositions in time and project phrases: by, until, within" },
      { title: "Subject–verb agreement in technical descriptions" },
      { title: "Proofreading checklist before you send anything" },
    ], [
      { title: "Correct ten common grammar errors in sample emails" },
      { title: "Write a status update using past, present, and future tenses" },
      { title: "Fix preposition errors in five project sentences" },
      { title: "Apply the proofreading checklist to your last sent email" },
    ]),
  },
  {
    weekId: 4,
    title: "Email & Written Correspondence",
    subtitle: "Structure, tone, and etiquette for every professional message.",
    focus: "Clear subject line. Purpose in line one. Polite close.",
    skill: weekSkill(4, "Week 4 — Email & Written Correspondence", "Write emails that get read, understood, and acted upon.", [
      { title: "The anatomy of a professional email: subject, opening, body, close" },
      { title: "Tone calibration: direct but respectful" },
      { title: "Requesting, declining, and following up with grace" },
      { title: "Slack and chat etiquette: brevity without rudeness" },
      { title: "Apologising and taking ownership professionally" },
    ], [
      { title: "Draft a request email to a senior colleague" },
      { title: "Write a polite decline with an alternative suggestion" },
      { title: "Compose a follow-up that does not sound impatient" },
      { title: "Rewrite a blunt chat message into a courteous one" },
    ]),
  },
  {
    weekId: 5,
    title: "Meetings & Presentations",
    subtitle: "Open strongly, organise your points, and close with clarity.",
    focus: "Tell them what you will say. Say it. Tell them what you said.",
    skill: weekSkill(5, "Week 5 — Meetings & Presentations", "Contribute with confidence in stand-ups, reviews, and demos.", [
      { title: "The PREP framework: Point, Reason, Example, Point" },
      { title: "Opening a meeting update in fifteen seconds" },
      { title: "Signposting language: first, next, in summary" },
      { title: "Handling questions without losing your thread" },
      { title: "Closing with a clear ask or next step" },
    ], [
      { title: "Deliver a two-minute stand-up using PREP" },
      { title: "Practice three opening lines for different meeting types" },
      { title: "Record a five-slide project summary (voice only)" },
      { title: "Simulate Q&A: answer five common technical questions" },
    ]),
  },
  {
    weekId: 6,
    title: "Active Listening & Thoughtful Response",
    subtitle: "Listen to understand, then reply with substance.",
    focus: "Pause before you speak. Paraphrase before you disagree.",
    skill: weekSkill(6, "Week 6 — Active Listening & Thoughtful Response", "Become the colleague people trust in conversation.", [
      { title: "The listen–reflect–respond cycle" },
      { title: "Paraphrasing to confirm understanding" },
      { title: "Asking clarifying questions without interrupting" },
      { title: "Non-verbal cues: nodding, eye contact, note-taking" },
      { title: "Avoiding premature solutions in one-to-one conversations" },
    ], [
      { title: "Practice paraphrasing in a mock one-to-one (10 minutes)" },
      { title: "Write five clarifying questions for a vague requirement" },
      { title: "Summarise a recorded meeting in your own words" },
      { title: "Identify three listening mistakes from a sample dialogue" },
    ]),
  },
  {
    weekId: 7,
    title: "Phone & Video Calls",
    subtitle: "Sound professional when you cannot rely on body language alone.",
    focus: "State your name and purpose in the first ten seconds.",
    skill: weekSkill(7, "Week 7 — Phone & Video Calls", "Excel on Zoom, Teams, and client calls.", [
      { title: "Professional openings and closings on calls" },
      { title: "Managing audio quality, mute, and background noise" },
      { title: "Screen-sharing narration: guiding the audience" },
      { title: "Recovering from connection issues or misunderstandings" },
      { title: "Time zones and scheduling language" },
    ], [
      { title: "Script and rehearse a client call opening" },
      { title: "Practice narrating a screen share for three minutes" },
      { title: "Role-play recovering from a misunderstood requirement" },
      { title: "Draft a scheduling email across two time zones" },
    ]),
  },
  {
    weekId: 8,
    title: "Persuasion & Diplomatic Language",
    subtitle: "Recommend ideas, negotiate timelines, and influence without pressure.",
    focus: "Lead with benefit. Offer options. Invite agreement.",
    skill: weekSkill(8, "Week 8 — Persuasion & Diplomatic Language", "Advance your ideas while preserving relationships.", [
      { title: "Hedging and modal verbs: would, could, might, suggest" },
      { title: "Framing proposals: problem, option, recommendation" },
      { title: "Agreeing partially before presenting a counter-view" },
      { title: "Saying no to scope creep professionally" },
      { title: "Building consensus in group discussions" },
    ], [
      { title: "Rewrite a harsh pushback into a diplomatic response" },
      { title: "Propose a deadline extension with three options" },
      { title: "Practice partial agreement before disagreeing" },
      { title: "Draft a scope-decline message with a constructive alternative" },
    ]),
  },
  {
    weekId: 9,
    title: "Difficult Conversations",
    subtitle: "Stay calm, clear, and respectful under pressure.",
    focus: "Separate facts from feelings. Stay on the issue, not the person.",
    skill: weekSkill(9, "Week 9 — Difficult Conversations", "Handle conflict, feedback, and pushback with composure.", [
      { title: "The DESC model: Describe, Express, Specify, Consequence" },
      { title: "Receiving criticism without defensiveness" },
      { title: "Giving constructive feedback with specific examples" },
      { title: "De-escalation phrases that lower tension" },
      { title: "When to pause a conversation and reschedule" },
    ], [
      { title: "Script feedback for a missed deadline using DESC" },
      { title: "Practice responding to harsh feedback in three sentences" },
      { title: "Write de-escalation lines for a heated chat thread" },
      { title: "Role-play a respectful disagreement with a teammate" },
    ]),
  },
  {
    weekId: 10,
    title: "Technical Communication for Developers",
    subtitle: "Explain systems, document decisions, and lead stand-ups with clarity.",
    focus: "Assume your listener is intelligent but not in your head.",
    skill: weekSkill(10, "Week 10 — Technical Communication for Developers", "Bridge the gap between code and conversation.", [
      { title: "Explaining architecture in plain English" },
      { title: "Writing README sections that colleagues actually read" },
      { title: "Bug reports: reproduction steps, expected vs actual" },
      { title: "Code review comments: specific, kind, actionable" },
      { title: "Estimating and explaining trade-offs to non-technical stakeholders" },
    ], [
      { title: "Explain your current project to a non-technical friend" },
      { title: "Write a model bug report for a hypothetical issue" },
      { title: "Rewrite three blunt code review comments professionally" },
      { title: "Draft a one-paragraph trade-off summary for a design choice" },
    ]),
  },
  {
    weekId: 11,
    title: "Interview & Career English",
    subtitle: "Present your experience with structure, confidence, and authenticity.",
    focus: "Prepare stories. Practice aloud. Be concise.",
    skill: weekSkill(11, "Week 11 — Interview & Career English", "Communicate your value in interviews and career conversations.", [
      { title: "The STAR method: Situation, Task, Action, Result" },
      { title: "Crafting a ninety-second professional introduction" },
      { title: "Answering weakness and failure questions honestly" },
      { title: "Questions to ask the interviewer (thoughtful, not generic)" },
      { title: "Salary and offer discussions: polite, factual, firm" },
    ], [
      { title: "Write three STAR stories from your projects" },
      { title: "Record your ninety-second introduction ten times" },
      { title: "Prepare answers for five common Java backend questions" },
      { title: "Draft five intelligent questions for your target company" },
    ]),
  },
  {
    weekId: 12,
    title: "Executive Presence & Global Communication",
    subtitle: "Lead with voice, story, and cultural awareness on global teams.",
    focus: "Speak as if the room is listening. End with direction.",
    skill: weekSkill(12, "Week 12 — Executive Presence & Global Communication", "Capstone week: polish, presence, and lifelong habit.", [
      { title: "Executive presence: pace, pause, and conviction" },
      { title: "Storytelling for updates: context, tension, resolution" },
      { title: "Cross-cultural communication: direct vs indirect cultures" },
      { title: "Writing executive summaries: one page, three decisions" },
      { title: "Building a lifelong communication practice plan" },
    ], [
      { title: "Deliver a three-minute project story with a clear moral" },
      { title: "Write an executive summary for a quarter's work" },
      { title: "Adapt the same message for US and UK audiences" },
      { title: "Create your personal twelve-week communication review" },
    ]),
  },
];

export function getCommunicationWeek(weekId: number): CommunicationWeekModule | undefined {
  return COMMUNICATION_WEEKS.find((w) => w.weekId === weekId);
}

export function collectCommunicationIds(skill: CurriculumAISkill): string[] {
  return [
    ...skill.learningTopics.map((t) => t.id),
    ...skill.exercises.map((e) => e.id),
  ];
}

export function getCommunicationWeekProgress(skill: CurriculumAISkill, isDone: (id: string) => boolean): number {
  const ids = collectCommunicationIds(skill);
  if (!ids.length) return 0;
  return Math.round((ids.filter((id) => isDone(id)).length / ids.length) * 100);
}
