import type { AiLearnDetail } from "@/curriculum/ai-content/types";

function d(answer: string, realWorld: string): AiLearnDetail {
  return { answer, realWorld };
}

/** Short, practical communication content — all 12 weeks */
export const COMMUNICATION_CONTENT: Record<string, AiLearnDetail> = {
  "comm-w1-ex-1": d(
    `Record 60s: name, role, task, goal.`,
    `Reuse for stand-up & interviews.`
  ),

  "comm-w1-ex-2": d(
    `Read README aloud at half speed. 3 min.`,
    `Trains slow, clear speaking.`
  ),

  "comm-w1-ex-3": d(
    `Mark stress on 10 email sentences. Read aloud.`,
    `Stops monotone delivery.`
  ),

  "comm-w1-ex-4": d(
    `90s stand-up: yesterday / today / blockers. No um, like, basically.`,
    `Most common dev speaking format — practice it.`
  ),

  "comm-w1-topic-1": d(
    `• **Breath** — belly, not chest
• **Pace** — slow down when nervous
• **Volume** — clear, don't shout
• **Articulation** — finish each word`,
    `Sprint review: slower speech → zero repeat questions.`
  ),

  "comm-w1-topic-2": d(
    `• Aim to be **understood**, not accent-free
• Fix: v/w, th, ending sounds
• Practice: repository, asynchronous, deployed`,
    `'Wersion control' → say 'version control' in interviews.`
  ),

  "comm-w1-topic-3": d(
    `• Stress **main words**, not every syllable
• REcord (noun) vs reCORD (verb)
• Example: We **deployed** the **API** **today**`,
    `Wrong stress → people misunderstand in calls.`
  ),

  "comm-w1-topic-4": d(
    `• Don't mumble — open mouth slightly
• Finish t, d, k at word ends
• Read 1 doc paragraph aloud daily`,
    `Clear 'done' vs 'dun' — fewer 'what?' in stand-up.`
  ),

  "comm-w1-topic-5": d(
    `• Pick 1 work topic
• Speak 2 min, no fillers
• Record → replay → fix`,
    `Do daily before stand-up for 2 weeks.`
  ),

  "comm-w2-ex-1": d(
    `Rewrite 5 casual Slack msgs — professional, short.`,
    `'hey check this' → 'Could you review this PR? Thanks.'`
  ),

  "comm-w2-ex-2": d(
    `Status email: replace do/make/get/fix with strong verbs.`,
    `'Working on bug' → 'Investigating login timeout.'`
  ),

  "comm-w2-ex-3": d(
    `Record 2-min update. Count fillers. Re-record.`,
    `Interviewers notice filler words.`
  ),

  "comm-w2-ex-4": d(
    `List 10 project terms. 1 sentence each.`,
    `Shows real project experience in interviews.`
  ),

  "comm-w2-topic-1": d(
    `• **Formal** — clients, managers, unknown emails
• **Informal** — close teammates on Slack
• Match the channel`,
    `Slack: 'Review PR #42?' Email: 'Could you review when convenient?'`
  ),

  "comm-w2-topic-2": d(
    `Use: **propose, confirm, escalate, align, deliver, block**
Avoid: try, maybe, kind of, stuff`,
    `'I will deliver the API Thursday' > 'I will try to do the API.'`
  ),

  "comm-w2-topic-3": d(
    `• Soft start: 'Could we…', 'I suggest…'
• Still state your point clearly`,
    `'Could we move feature B to next sprint?' — polite pushback.`
  ),

  "comm-w2-topic-4": d(
    `Cut: basically, actually, like, you know
**Pause** instead — sounds confident`,
    `Count fillers in a 2-min recording. Aim under 3.`
  ),

  "comm-w2-topic-5": d(
    `• Add 20 work words/week to a list
• Use each in 1 real message`,
    `deploy, rollback, mitigate, stakeholder — keep a word bank.`
  ),

  "comm-w3-ex-1": d(
    `Fix 10 grammar errors in old emails.`,
    `Your sent folder = free practice.`
  ),

  "comm-w3-ex-2": d(
    `Write 5-line status: past + present + future.`,
    `Copy same format every week for manager.`
  ),

  "comm-w3-ex-3": d(
    `Fix prepositions: on Monday, in prod, by deadline, responsible for.`,
    `'Deploy to production' not 'on production.'`
  ),

  "comm-w3-ex-4": d(
    `Checklist on last email. Fix 1 repeat mistake.`,
    `Everyone has 2–3 patterns — find yours.`
  ),

  "comm-w3-topic-1": d(
    `Status update tenses:
• **Past** — finished
• **Present** — now
• **Future** — next`,
    `'Merged auth. API in QA. Deploy Friday.'`
  ),

  "comm-w3-topic-2": d(
    `• **a/an** — one of many
• **the** — specific thing
• 'an issue' not 'a issue'`,
    `Small grammar errors add up in client emails.`
  ),

  "comm-w3-topic-3": d(
    `• **by** Friday = deadline
• **until** Friday = before end
• **within** 3 days = inside window`,
    `'By EOD' = before today ends. Don't mix up by/until.`
  ),

  "comm-w3-topic-4": d(
    `• Subject + verb must match
• 'Tests **pass**' not 'passes'
• 'Each service **has**' — singular`,
    `Pick US or UK style for 'data is/are' — stay consistent.`
  ),

  "comm-w3-topic-5": d(
    `Before send:
1. One idea per line
2. Correct tense
3. Clear ask
4. Read aloud once`,
    `10-second read catches typos before CEO sees it.`
  ),

  "comm-w4-ex-1": d(
    `Email: ask senior for PR review. Link + urgency.`,
    `Clear ask = faster review.`
  ),

  "comm-w4-ex-2": d(
    `Polite no to extra work. Offer next sprint.`,
    `Protect your committed sprint.`
  ),

  "comm-w4-ex-3": d(
    `Follow-up email — neutral tone, no guilt.`,
    `OK to follow up 2–3× on blockers.`
  ),

  "comm-w4-ex-4": d(
    `Rewrite blunt Slack to kind + actionable.`,
    `'Wrong, redo' → 'Consider null-check — NPE risk here.'`
  ),

  "comm-w4-topic-1": d(
    `Email:
• Subject — specific
• Line 1 — why you're writing
• Body — bullets if 3+ points
• Close — ask + thanks`,
    `Subject: 'PR #88 ready — UserService refactor'`
  ),

  "comm-w4-topic-2": d(
    `• Direct + respectful
• Facts, not blame
• 'Build failed step 3' not 'You broke it'`,
    `Incident: 'Latency spike at 14:00 UTC. Investigating.'`
  ),

  "comm-w4-topic-3": d(
    `• **Request** — what, why, when
• **Decline** — thanks + reason + alt
• **Follow-up** — date + restate ask`,
    `'Following up on Tuesday's API access note — confirm by Wed EOD?'`
  ),

  "comm-w4-topic-4": d(
    `Slack:
• 1 topic per msg
• Use threads
• @ only when needed
• please + thanks`,
    `'Gentle ping on PR #42' > '???'`
  ),

  "comm-w4-topic-5": d(
    `Sorry once → what went wrong → what you'll do`,
    `'Missed window. Rollback deploy at 10:00. Sorry for disruption.'`
  ),

  "comm-w5-ex-1": d(
    `2-min stand-up on blocker using PREP.`,
    `Reason + example → faster help.`
  ),

  "comm-w5-ex-2": d(
    `Write 3 opening lines: stand-up, review, 1:1.`,
    `Same update, different meeting hook.`
  ),

  "comm-w5-ex-3": d(
    `Voice-only 5-point summary. Under 3 min.`,
    `Good for phone screens & client calls.`
  ),

  "comm-w5-ex-4": d(
    `Answer aloud: what you built, hardest bug, stack, trade-off, lesson.`,
    `Top 5 interview questions — rehearse short.`
  ),

  "comm-w5-topic-1": d(
    `**PREP**
• **P**oint
• **R**eason
• **E**xample
• **P**oint again`,
    `'Ship at risk → 3 QA blockers → Safari login fails → need 2 days.'`
  ),

  "comm-w5-topic-2": d(
    `First 15 sec: who (if needed) + topic + why it matters`,
    `'Sprint update — on track for Thursday release.'`
  ),

  "comm-w5-topic-3": d(
    `Use: First… Next… Finally… In summary…`,
    `Helps people follow long explanations.`
  ),

  "comm-w5-topic-4": d(
    `Hard Q: pause → repeat Q → answer → admit gaps`,
    `'Don't have that number — I'll follow up EOD.'`
  ),

  "comm-w5-topic-5": d(
    `End with clear next step or decision needed`,
    `'Pick A or B by Friday' — not 'so yeah…'`
  ),

  "comm-w6-ex-1": d(
    `10-min mock 1:1. Paraphrase before you reply.`,
    `Better at receiving feedback too.`
  ),

  "comm-w6-ex-2": d(
    `5 questions for vague ticket: 'Improve performance.'`,
    `Clarify before you code.`
  ),

  "comm-w6-ex-3": d(
    `Summarize 5-min tech video in 3 sentences.`,
    `Same skill as meeting notes.`
  ),

  "comm-w6-ex-4": d(
    `3 listening mistakes + 1 fix each.`,
    `Interrupting, assuming, phone — pick yours.`
  ),

  "comm-w6-topic-1": d(
    `**Listen → reflect → respond**
Don't plan reply while they talk.`,
    `Repeat requirement back → catch wrong assumption early.`
  ),

  "comm-w6-topic-2": d(
    `Paraphrase: 'So you need 404 when user deleted, not 403 — right?'`,
    `Saves weeks of wrong code.`
  ),

  "comm-w6-topic-3": d(
    `Ask: success criteria? edge cases? who uses it?
Wait till they finish.`,
    `5 good questions > 50 bug fixes later.`
  ),

  "comm-w6-topic-4": d(
    `Video: camera on, nod, notes, no visible multitask`,
    `Notes on call = you capture commitments.`
  ),

  "comm-w6-topic-5": d(
    `1:1: ask 'Advice or just vent?'
Don't jump to fix every time.`,
    `Sometimes people need heard first.`
  ),

  "comm-w7-ex-1": d(
    `Script 30s client call opening. Rehearse.`,
    `First impression matters.`
  ),

  "comm-w7-ex-2": d(
    `Narrate 3-min IDE debug screen share.`,
    `Demo + on-call skill combined.`
  ),

  "comm-w7-ex-3": d(
    `Practice: 'Deploy Friday — prod or staging?'`,
    `Clarify without blame.`
  ),

  "comm-w7-ex-4": d(
    `Email: 2 time slots, IST + US Eastern.`,
    `Options = one reply, not 4 emails.`
  ),

  "comm-w7-topic-1": d(
    `Open: Hi, [Name], [Team], calling about [topic]
Close: recap + thanks + next steps`,
    `Name + purpose in 10 sec = professional.`
  ),

  "comm-w7-topic-2": d(
    `Headset, mute when silent, test mic first`,
    `Unmuted keyboard noise kills calls.`
  ),

  "comm-w7-topic-3": d(
    `Screen share: say what you click
'Opening logs… filtering errors… here's stack trace'`,
    `Narration helps everyone follow.`
  ),

  "comm-w7-topic-4": d(
    `Dropped? Rejoin → 'Last point you heard?' → continue`,
    `Don't restart from slide 1.`
  ),

  "comm-w7-topic-5": d(
    `Always put **timezone** in invites
'3 PM IST / 9:30 AM GMT'`,
    `'3 PM' alone causes missed meetings.`
  ),

  "comm-w8-ex-1": d(
    `Rewrite 'bad idea' → polite + reason.`,
    `'Concern is ops cost — compared managed vs self-hosted?'`
  ),

  "comm-w8-ex-2": d(
    `Deadline slip: 3 options — cut scope, add help, shift date.`,
    `Managers decide faster with options.`
  ),

  "comm-w8-ex-3": d(
    `Agree 1 line → counter in 2 lines.`,
    `Use for 'tell me about disagreement' interview Q.`
  ),

  "comm-w8-ex-4": d(
    `Slack: decline scope + offer alternative.`,
    `'Can't do mobile — I'll doc APIs for next sprint.'`
  ),

  "comm-w8-topic-1": d(
    `Soften with: could, would, might, suggest`,
    `'We might refactor auth first' > 'We must rewrite everything.'`
  ),

  "comm-w8-topic-2": d(
    `**Problem → Options → Recommendation**`,
    `'Slow API. Cache or index. I pick index — lower risk.'`
  ),

  "comm-w8-topic-3": d(
    `Agree part first, then disagree
'I agree deadline is tight. We still need 2 QA days.'`,
    `Sounds collaborative, not combative.`
  ),

  "comm-w8-topic-4": d(
    `No to scope = offer trade
'A+B this sprint. C moves to backlog?'`,
    `PMs respect options, not flat no.`
  ),

  "comm-w8-topic-5": d(
    `Summarize agreement → open issue → propose vote/spike`,
    `'All agree security first. OAuth provider — spike this week?'`
  ),

  "comm-w9-ex-1": d(
    `Write DESC for missed deadline (no warning).`,
    `Structure on paper first.`
  ),

  "comm-w9-ex-2": d(
    `3 sentences to harsh feedback: 'code is messy.'`,
    `'Thanks. Example PR? I'll focus readability this sprint.'`
  ),

  "comm-w9-ex-3": d(
    `3 de-escalation lines for heated review thread.`,
    `DM or call > public argument.`
  ),

  "comm-w9-ex-4": d(
    `Role-play: you want refactor, they want ship fast.`,
    `Find shared goal: ship safely.`
  ),

  "comm-w9-topic-1": d(
    `**DESC**
• **D**escribe facts
• **E**xpress impact
• **S**pecify change
• **C**onsequence`,
    `'Builds failed (D). Blocked QA (E). Run tests before merge (S). Team unblocked (C).'`
  ),

  "comm-w9-topic-2": d(
    `Criticism: listen → ask example → thank → pick 1 fix`,
    `'Which PR?' turns vague feedback into action.`
  ),

  "comm-w9-topic-3": d(
    `Feedback = situation + behavior + impact + suggestion`,
    `'Interrupted client twice — they went quiet. Let's let them finish.'`
  ),

  "comm-w9-topic-4": d(
    `De-escalate:
• 'Let's solve this together'
• 'Focus on the issue'
• 'Pause 10 min?'`,
    `Heated Slack → move to call.`
  ),

  "comm-w9-topic-5": d(
    `High emotion or missing facts → pause meeting`,
    `'Continue tomorrow with logs' beats angry decisions.`
  ),

  "comm-w10-ex-1": d(
    `Explain your project to non-tech friend. 2 min.`,
    `If they get it, interview answer is ready.`
  ),

  "comm-w10-ex-2": d(
    `Write bug report template with 4 sections.`,
    `Become the dev QA loves.`
  ),

  "comm-w10-ex-3": d(
    `Rewrite 3 harsh review comments — keep tech fix.`,
    `'Wrong' → 'Returns null on empty — use Optional.empty()'`
  ),

  "comm-w10-ex-4": d(
    `1 paragraph: choice made, alt rejected, why.`,
    `Mini ADR — good senior habit.`
  ),

  "comm-w10-topic-1": d(
    `Explain stack simply:
User → API → Service → DB
Draw boxes`,
    `'App hits API, saves to PostgreSQL' — enough for PM.`
  ),

  "comm-w10-topic-2": d(
    `README top:
• what it does
• how to run
• env vars
• how to test`,
    `Recruiters clone repo — no README = no run.`
  ),

  "comm-w10-topic-3": d(
    `Bug ticket:
• steps
• expected
• actual
• env + logs`,
    `'Login broken' vs 'Safari 17, step 1-2-3, 500 error'`
  ),

  "comm-w10-topic-4": d(
    `Review: specific + kind + actionable
'nit:' for style only`,
    `Block on bugs/security/tests only.`
  ),

  "comm-w10-topic-5": d(
    `Trade-off in business terms:
time, risk, cost — not jargon`,
    `'A ships fast. B scales. 1k users → A is fine.'`
  ),

  "comm-w11-ex-1": d(
    `3 STAR stories: tech challenge, conflict, failure.`,
    `Covers most behavioral interviews.`
  ),

  "comm-w11-ex-2": d(
    `Record 90s intro 5×. Cut fillers each time.`,
    `Watch video — fix speed & eyes.`
  ),

  "comm-w11-ex-3": d(
    `5 hard Java Qs — 30s spoken answer each.`,
    `Speaking reveals gaps reading hides.`
  ),

  "comm-w11-ex-4": d(
    `5 questions specific to target company.`,
    `Shows real interest at offer stage.`
  ),

  "comm-w11-topic-1": d(
    `**STAR** (90 sec)
• **S**ituation
• **T**ask
• **A**ction
• **R**esult + number if possible`,
    `'Crash before launch → I owned fix → rollback + health check → zero downtime.'`
  ),

  "comm-w11-topic-2": d(
    `90s intro:
Present → 1 past win → why this company`,
    `'Java dev, built payments, excited about your platform team.'`
  ),

  "comm-w11-topic-3": d(
    `Weakness = real + what you're fixing
No 'I'm a perfectionist'`,
    `'I over-engineered → now timebox spikes, ship MVP.'`
  ),

  "comm-w11-topic-4": d(
    `Ask interviewer:
• team shape
• on-call
• success at 6 months
Not 'nothing'`,
    `'Strong first 90 days?' — shows you care.`
  ),

  "comm-w11-topic-5": d(
    `Salary: research range → state X–Y → flexible on package`,
    `Polite + factual. Not apologetic.`
  ),

  "comm-w12-ex-1": d(
    `3-min project story: start, conflict, lesson. Record.`,
    `Interview capstone story.`
  ),

  "comm-w12-ex-2": d(
    `1-page quarter summary: 3 bullets up top.`,
    `Same for promotion / client QBR.`
  ),

  "comm-w12-ex-3": d(
    `Same message — US direct vs UK soft version.`,
    `Practice both tones.`
  ),

  "comm-w12-ex-4": d(
    `Note: best skill, weakest skill, 1 habit next month.`,
    `Close the 12-week loop.`
  ),

  "comm-w12-topic-1": d(
    `Calls: steady pace, pause before key point, don't upspeak on statements`,
    `Match lead's pace on exec calls.`
  ),

  "comm-w12-topic-2": d(
    `Story: context → problem → fix → lesson`,
    `'Q2 deadline → integration failed → phased rollout → test staging earlier.'`
  ),

  "comm-w12-topic-3": d(
    `US = more direct. UK/India = softer tone.
Same facts, adjust style.`,
    `Global team = switch tone weekly.`
  ),

  "comm-w12-topic-4": d(
    `Exec summary: 3 bullets at top, details below`,
    `CTO reads line 1 only — put ask there.`
  ),

  "comm-w12-topic-5": d(
    `Weekly 15 min:
• 1 recorded update
• 1 email reviewed
• 1 meeting listen-first`,
    `Maintain habit after week 12.`
  ),
};

export function getCommunicationDetail(
  id: string,
  title: string,
  kind: "topic" | "practice"
): AiLearnDetail {
  if (COMMUNICATION_CONTENT[id]) return COMMUNICATION_CONTENT[id];
  return d(
    `**${title}** — try once in writing or aloud. Keep it under 1 minute.`,
    "Clear updates at work = same care as clean code."
  );
}
