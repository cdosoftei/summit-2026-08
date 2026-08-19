# Session plan

**135 minutes. Nine people** — two founders, three ops, three developers, one QA.
Roughly 55 minutes of you talking; the rest is demos running, questions, and discussion.

---

## The thesis

Three AI plays, and they are deliberately not three versions of the same thing. They are
three different positions of the model relative to the loop:

| | Where the model sits | Who calls whom |
|---|---|---|
| **Understudy** | AI as **operator** | The model calls *our* tool. Software written for an audience of agents. |
| **Control Tower** | AI as **proposer** | It reads evidence and proposes a *rule*. A human approves. The deterministic engine runs it. |
| **sctower** | AI as **investigator** | An AI-agent-ready CLI, shipped with its own skill. |

The line, said three times across the session:

> **We don't put models in the loop. We use models to find the rules — then run the rules
> without the model.**

Not stage spin: it is the documented position in the singleconsole repo's
`docs/adr/0017-detection-and-suggestion.md`
§4.1 — *"it proposes; it never acts"* — and §4.4's promotion path from suggestion →
verified → reviewed rule.

---

## Running order

31 slides. Wall clock assumes a 15:45 start; shift as needed.

| Slides | Beat | Clock | You talk | Format |
|---|---|---|---|---|
| — | Cold open — the sim is already running | 0:00 | 4 min | demo, no slides |
| 1–2 | Title, then the three positions of the model | 0:04 | 5 min | slides |
| 3 | *Understudy* | 0:09 | — | divider |
| 4–8 | The problem · what it is · the inversion · a scenario | 0:09 | 10 min | slides |
| 9 | The catalog | 0:19 | 2 min | **live, local** |
| 10 | A voice call, headed | 0:21 | 5 min | **live, QA** |
| 11 | Four in a room, three languages | 0:26 | 6 min | **live, QA** |
| 12 | Record → replay | 0:32 | 4 min | slide |
| — | *Questions, then a break* | 0:36 | — | 15 min |
| 13 | *SingleConsole* | 0:51 | — | divider |
| 14–15 | Why classic can't be saved · four shells | 0:51 | 6 min | slides |
| 16 | Agent Desktop | 0:57 | 4 min | **live, QA** |
| 17 | The widget in a host page | 1:01 | 4 min | **live, local** |
| 18 | *Control Tower* | 1:05 | — | divider |
| 19 | The simulated fleet | 1:05 | 12 min | **live, local** |
| 20–21 | Liveness states · the focused-window question | 1:17 | 6 min | slides + ask |
| 22–25 | Watch vs Review · the AI beat · the boundaries | 1:23 | 10 min | slides |
| 26 | The ladder → **the rescue demo** | 1:33 | 10 min | **live, QA** |
| — | *Questions* | 1:43 | — | 7 min |
| 27–30 | *sctower* — sign in, exit codes, the TUI | 1:50 | 10 min | **live, QA** |
| 31 | Questions | 2:00 | — | open floor |

Compressible if you run long: slide 12's narration, and slides 24–25. **Protect the
rescue demo and the sim** — they are the two things nobody else can show.

---

## Interactivity — concrete devices, in the order you use them

Nine people in a room. Lecturing is the failure mode.

1. **Leaflets on the table before you start.** Three of them. Say so in the first minute.
2. **The cold open is already on screen** when they walk in. No title slide. Let them ask
   what it is before you explain.
3. **The stop-me rule, stated once:** "Interrupt me. I'd rather this was a conversation."
4. **QA picks the scenario** at the catalog (slide 9). Hand over the scroll.
5. **The prediction** (slide 21). Ask what percentage of production consoles is the
   focused window. Take at least three guesses out loud. The answer — **7%**, with 69% not
   even visible — reframes everything after it, and it comes from a census of 1,387 real
   consoles.
6. **Ops picks the finding** in the Tower sim. Don't choose for them. They will pick the
   one about a floor, because that is their life.
7. **A teammate is in the rescue demo.** Recruit them at the break, not on the spot. They
   sign into Agent Desktop, go Available, and switch off wifi on your cue.
8. **One deliberate silence.** After the QR resolves in the Tower, say nothing for three
   seconds. Let "that came off a dead machine" land on its own.

---

## What runs where

| Beat | Where | Risk |
|---|---|---|
| Tower simulation | local, `pnpm demo:tower` | none — deterministic, seed 7 |
| Widget in a host page | local, `pnpm dev` | none — mock wire |
| Understudy catalog | local, `pnpm understudy catalog` | none |
| Understudy voice + meet, headed | **QA** | needs bundles built and a captured session |
| Agent Desktop | **QA** | i18n / permissions / telemetry drainer — see PREFLIGHT |
| Control Tower on the real fleet | **QA** | small fleet; the "it's real" beat, not the wow beat |
| Rescue QR flare | **QA** | teammate + phone; rehearse once beforehand |
| sctower + OAuth + TUI | **QA** | OAuth client registration must be applied |

---

## Beat notes

### Cold open
Sim already running, default speed. No slide.

> "That's nine hundred agent consoles. Right now a hundred and sixty-two things are wrong
> on that fleet. I'm going to show you seven sentences that cover all of them — and one of
> the seven says the problem is us, and another says the problem is nobody. Hold that
> thought."

Then go to the deck. The unresolved cliffhanger is what stops this being a lecture; it
gets resolved during the Tower section.

### Understudy (slides 4–12)
Problem → shape → the inversion → a readable scenario → then two live runs.

The strongest single argument is **headed mode**: you are not reading a report about a
call, you are watching the console an agent would be looking at while a synthetic customer
talks to it. Say the sentence about UAT out loud.

The four-party multilingual SingleMeet run is the most visually striking thing in the
session — four people in one room across English, Spanish and French, with live captions.
Give it room and let it play while you talk.

### SingleConsole (slides 14–17)
Keep it to twenty minutes. The console is context; the Tower is the payload.
The four-shells slide is the founders' slide — native and desktop are the answer to
"what about clients who won't run this in a browser", and the reason they are cheap is
that the logic is already written once.

### Control Tower (slides 19–26)
Peak of the session. The slides deliberately get out of the way at the sim — talk freely
over the seven sentences, the hidden-window story and the expanded finding.

On Review, **say out loud that no model runs in the simulation.** Saying it unprompted is
worth more than the demo; it is the difference between a demo and an engineering claim.

Then the rescue demo, live, with a teammate. Twenty seconds of nothing happening is the
most persuasive part — do not fill the silence.

### sctower (slides 27–30)
Sign in, `live`, `digest`, the exit-code point, the skill, then `sctower ui` and stop
talking for a moment. Engineers like terminal things; let it land without narration.

---

## Files here

| File | What it is |
|---|---|
| `PLAN.md` | this |
| `PREFLIGHT.md` | what to verify and rehearse beforehand, with fallbacks |
| `SCRIPT.md` | beat-by-beat speaking script |
| `deck/index.html` | the deck. `S` for speaker view |
| `leaflets/*.pdf` | three giveaways |
| `build.sh` · `tools-measure.mjs` | render the leaflets; check nothing clips |
