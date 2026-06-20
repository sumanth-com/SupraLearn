import type { AiLearnDetail } from "@/curriculum/ai-content/types";

function d(answer: string, realWorld: string): AiLearnDetail {
  return { answer, realWorld };
}

/** Teaching content keyed by item id (comm-w{n}-topic-{i} / comm-w{n}-ex-{i}) */
export const COMMUNICATION_CONTENT: Record<string, AiLearnDetail> = {
  // Week 1
  "comm-w1-topic-1": d(
    "Clear professional speech rests on four pillars. **Breath** supports volume without strain — breathe from the diaphragm, not the chest. **Pace** should allow the listener to absorb each idea; most speakers rush when nervous. **Volume** must reach the back of the room without shouting. **Articulation** means every consonant and vowel is completed.\n\nPractice these together: inhale, speak one sentence at moderate pace, and ask yourself whether each word was fully heard.",
    "In a sprint review, a developer spoke too quickly and mumbled technical terms. The product owner asked for repetition three times. After slowing down and articulating, the same update took thirty seconds longer but needed no clarification."
  ),
  "comm-w1-topic-2": d(
    "Indian English has distinct strengths and predictable patterns. Focus on **v/w** distinction, **th** sounds, and final consonants (many speakers drop ending sounds in 'worked', 'asked', 'developed').\n\nDo not aim to erase your accent — aim for **intelligibility**. Record yourself naming Java terms: repository, architecture, asynchronous. Compare with a clear reference and adjust one sound at a time.",
    "A candidate said 'wersion control' instead of 'version control' in an interview. The panel understood eventually, but clarity on technical vocabulary builds credibility immediately."
  ),
  "comm-w1-topic-3": d(
    "English is a **stress-timed** language: stressed syllables are longer and louder; unstressed syllables are shorter. Wrong stress changes meaning ('REcord vs reCORD').\n\nIn sentences, **content words** (nouns, main verbs, adjectives) carry stress; function words (the, is, to) are reduced. Read aloud: 'We **deployed** the **service** **yesterday**.' Mark stress before every team call.",
    "A team lead said 'I will present the REport' with wrong stress. The room waited, thinking he meant 'rePORT' (verb). Small stress errors cause brief but frequent misunderstandings."
  ),
  "comm-w1-topic-4": d(
    "Mumbling usually comes from **closed mouth posture**, **low volume**, and **running words together**. Open your mouth slightly more than feels natural. Finish plosives: the 't' in 'it', the 'd' in 'and'.\n\nRead one paragraph daily as if teaching a beginner. Exaggerate clarity for two weeks until it becomes natural.",
    "Stand-up updates improved team-wide when one engineer started completing final consonants. 'Done' became clearly 'done', not 'dun'. Small change, fewer 'sorry, what was that?' moments."
  ),
  "comm-w1-topic-5": d(
    "The **two-minute clarity drill**: choose any work topic, set a timer, speak for two minutes without filler words, then listen to the recording. Score yourself on pace, articulation, and structure.\n\nDo this daily for two weeks. It builds muscle memory faster than passive video watching.",
    "Engineers who record daily two-minute updates before stand-up report less anxiety and shorter meetings — they already know exactly what to say."
  ),
  "comm-w1-ex-1": d(
    "Record a sixty-second introduction: name, role, current project, one goal this week. Listen once without judgment, then again with a checklist (pace, volume, fillers, articulation). Re-record until you would understand yourself on a poor phone line.",
    "Self-introductions appear in stand-ups, client calls, and interviews. A polished sixty-second version saves mental energy every time."
  ),
  "comm-w1-ex-2": d(
    "Select a paragraph from documentation or news. Read it at **half your normal speed** with deliberate consonants. Slow reading trains your mouth for slow speaking.",
    "Reading aloud slowly is a classic elocution exercise used in broadcast and diplomacy training."
  ),
  "comm-w1-ex-3": d(
    "Take ten sentences from your last email thread. Mark the stressed syllable in each content word. Read the thread aloud with marked stress.",
    "Marked stress prevents monotone delivery — a common reason listeners tune out in long meetings."
  ),
  "comm-w1-ex-4": d(
    "Practice five tongue-twisters slowly, then at conversation speed: 'Red leather, yellow leather', 'Unique New York', 'She sells seashells'. Focus on consonant precision, not speed.",
    "Actors and newsreaders use tongue-twisters before going live. Developers benefit equally before demos."
  ),

  // Week 2 — sample pattern; continue for all weeks...
};

// Generate remaining content programmatically with quality templates
const WEEK_FOCUS: Record<number, string> = {
  2: "professional vocabulary",
  3: "business grammar",
  4: "written correspondence",
  5: "meetings and presentations",
  6: "active listening",
  7: "remote calls",
  8: "persuasion",
  9: "difficult conversations",
  10: "technical communication",
  11: "interview English",
  12: "executive presence",
};

function generatedDetail(weekId: number, kind: "topic" | "practice", title: string): AiLearnDetail {
  const focus = WEEK_FOCUS[weekId] ?? "professional communication";
  if (kind === "topic") {
    return d(
      `**Study this carefully**\n\n${title}\n\nThis is a core lesson in ${focus}. Read the title as a promise: by the end of the week, you should be able to explain this idea to a colleague and use it in real messages.\n\nTake notes in complete sentences. Write one example from your current job for each concept. Review your notes aloud before marking this topic complete.`,
      `Strong ${focus} skills distinguish senior engineers in global teams. Managers notice when updates are precise, polite, and easy to act on — especially in writing.`
    );
  }
  return d(
    `**Practice exercise**\n\n${title}\n\nComplete this in writing or aloud — preferably both. Time yourself. Aim for clarity over length.\n\nWhen finished, compare your work against the checklist in the learning topics for this week. Revise once before marking complete.`,
    `Deliberate practice each week compounds. Candidates who rehearse aloud perform significantly better in interviews and client calls than those who only read.`
  );
}

export function getCommunicationDetail(
  id: string,
  title: string,
  kind: "topic" | "practice"
): AiLearnDetail {
  if (COMMUNICATION_CONTENT[id]) return COMMUNICATION_CONTENT[id];
  const match = id.match(/^comm-w(\d+)-(topic|ex)-\d+$/);
  if (match) {
    const weekId = parseInt(match[1], 10);
    const itemKind = match[2] === "topic" ? "topic" : "practice";
    return generatedDetail(weekId, itemKind, title);
  }
  return d(
    `**${title}**\n\nWork through this item with the same discipline you bring to code review: prepare, execute, reflect. Note one improvement for next time.`,
    "Consistent communication practice is as valuable as consistent coding practice for a long-term software career."
  );
}
