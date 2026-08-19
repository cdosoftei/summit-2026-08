# Speaker script

Not a read-aloud. These are the **landing lines** — the sentences worth having exact — plus
the transitions between them, because transitions are where talks fall apart.

Anything in `‹ ›` is a stage direction. Slide numbers match the deck.

---

## Cold open — before slide 1

`‹ Sim already on the projector. No title slide. Let them look at it while they sit down. ›`
`‹ Wait for the room to go quiet on its own. Do not talk over the shuffle. ›`

> That's nine hundred agent consoles.
>
> Right now, a hundred and sixty-two things are wrong on that fleet.
>
> `‹ pause ›`
>
> I'm going to show you seven sentences that cover all of them. One of the seven says the
> problem is us. Another says the problem is nobody.
>
> Hold that thought — I'll come back to it.

`‹ Switch to the deck. ›`

> Two things before I start. There are three leaflets on the table — one for each product,
> and one that's just the practices, which is the one I'd argue about first.
>
> And interrupt me. I'd rather this was a conversation than a lecture.

---

## Slide 2 · Three positions of the model

> I'm showing three things, and they're not three versions of the same thing. They're three
> different positions of the model relative to the loop.
>
> Understudy: the model is the **operator**. It calls our tool. That's software written for
> an audience of agents, not humans.
>
> Control Tower: the model **proposes**, and never acts. It reads evidence, proposes a rule,
> a human approves, and the deterministic engine runs it.
>
> And sctower: the model as **investigator** — a CLI built so an agent can pick it up and
> troubleshoot, shipped with its own skill so it doesn't have to be taught.

---

## Slides 4–8 · Understudy

`‹ Slide 4 ›`

> The scenarios that matter are the ones you can't stage alone. Anything with two or more
> people talking at the same time. A warm transfer then a supervisor listening in. A
> customer who switches language mid-call. A network that dies *during* the call.
>
> Every one of those needs people, phones and an afternoon. `‹ look at QA ›` So they get
> tested once, by hand, badly — and then never again.

`‹ Slide 5 ›`

> One browser tab is one understudy. Synthetic microphone from text-to-speech, synthetic
> camera, and then it joins as a real party over the real signalling. Real SIP registration,
> real conference, real media room. The only synthetic thing is the human.

`‹ Slide 6 ›`

> And the thing that drives it is not me.

`‹ Slide 7 — the inversion. Open the skill file. ›`

> It ships a skill. A coding agent working a ticket loads this, and can then stand up the
> exact call the ticket describes and assert on what came back.
>
> An agent that can only read code is guessing. An agent that can place a call and listen to
> what came back is verifying.
>
> Note the guard — every scenario declares which environments it may run on, and production
> is forbidden by construction. That's what makes letting an agent do this a reasonable idea
> rather than a terrifying one.

`‹ Slide 8 — the YAML ›`

> A synthetic customer speaks Spanish. The assertion is that English captions came back.
> That's a real test of the live translation path, and it fits on a slide.
>
> Readability is the argument. If QA can read it, QA can write it.

---

## Slide 9 · The catalog — live

> `pnpm understudy catalog` — no cluster, instant.
>
> `‹ open the HTML · to QA ›` Have a scroll. Which of these would you have wanted for the
> last release?

---

## Slide 10 · A voice call, headed — live on QA

`‹ Start the run, then talk over it. Narrate what it costs, not what's on screen. ›`

> Headed mode is the whole point. I'm not reading a report about a call — I'm watching the
> console an agent would be looking at, while a synthetic customer talks to it.
>
> This is the confidence I want *before* something goes to UAT. Not "the tests passed". I
> watched it happen, and I can watch it again tomorrow.

`‹ If the turn-taking looks off, name it and move on — don't debug on stage. ›`

---

## Slide 11 · Four in a room, four languages — live on QA

`‹ Give this room. Maximise ONE window — each party renders the whole room, so one window
  shows all four tiles plus the caption strip. ›`

> Same machinery as the voice one. Different channel, four parties instead of two — English,
> Spanish, French and German, all in one room, captions live.
>
> Nobody in this room could stage that in an afternoon. It's one command, and it's identical
> tomorrow.

`‹ Let Greta's line land — "und wenn nicht, dann ist es eben ein Fehlerbericht", and if not,
  it's a bug report. It is deadpan on purpose. Then Pierre says the actual point out loud:
  that is what a replayable test is. ›`

`‹ If asked about the voices: each party has its own voice and an explicit native-accent
  instruction. The vendor default would have made all four sound like one narrator. ›`

---

## Slide 12 · Record → replay

> Save freezes a green run. Check-baseline diffs against it and fails on drift.
>
> Which means a bug repro becomes a committed regression test. The repro **is** the
> artefact — not a ticket comment describing one.

`‹ Questions here, then call a break. ›`

---

## Slides 14–17 · SingleConsole

`‹ Slide 14 — 45 seconds, no dwelling ›`

> A hundred and sixteen AJAX verbs. Thirty-six signalling frame types. PHP 7.4, jQuery, no
> build step, and no seam to test at — the console *is* the DOM and the wire at the same
> time. You can't refactor out of that. You can only grow something beside it.
>
> Strangling fig. With one honest caveat: a fig only strangles if it keeps growing.

`‹ Slide 15 — four shells ›`

> React renders, the kernel decides. All the state lives somewhere with no DOM dependency —
> and that's what makes these four one product instead of four forks.
>
> `‹ to the founders ›` The reason desktop and native are on that row at all is that the
> expensive part of a desktop client is the logic, and the logic is already written once.

`‹ Slide 16 — Agent Desktop, live on QA. Three minutes. ›`

> `‹ change presence · take a call · try to submit wrap-up with no disposition ›`
>
> It refused. That's the kernel enforcing it, not the UI — which is exactly what the old
> console could never guarantee.
>
> Same page, same session, same permissions. It's a module. It doesn't need a migration to
> exist.

`‹ Slide 17 — the widget, live and local ›`

> Same kernel. `‹ point at the host bar ›` Someone else's product.
>
> We can put this inside a customer's CRM without them touching our stack, and without us
> touching theirs.

---

## Slides 19–26 · Control Tower

`‹ Slide 19 — back to the sim ›`

> Nine hundred consoles. Same seed, same fleet, forever — same *names*, which is why I could
> rehearse this.
>
> Browser mix, CPU, memory, in-call rate, device topology, trouble rates: from a census of
> 1,387 real production consoles. Geography and latency: from a read-only probe of
> production. Individual names and call timing: invented, and the code says which is which.
>
> `‹ point at the bar ›` And that bar can't be dismissed. It's one of four locks that stop
> this shipping by accident. Same software as production, synthetic data. Both true.

`‹ Now talk freely: the seven sentences, then hand a finding to ops. ›`

> `‹ to ops ›` Pick one. Which of these would you want to be true?
>
> `‹ on expansion ›` A picture gets drawn when it answers a question a sentence can't. "When
> did this start" qualifies — an error happening all day and an error that began at nine
> twelve are different incidents, and only the second one has a cause somebody changed four
> minutes earlier. A count doesn't qualify. That's a sentence.

`‹ Slide 20 — liveness ›`

> A console whose network has gone doesn't report the outage. It **stops reporting**. The
> board gets *quieter* while people can't work.
>
> These are liveness states — whether we're hearing from a machine at all. Nothing to do
> with agent status, which is about what the person is doing.

`‹ Slide 21 — ASK THE ROOM. At least three guesses. Do not rush. ›`

> Of every agent console running in production right now — what percentage is the focused
> window in the browser?
>
> `‹ after the guesses ›` Seven percent. Sixty-nine percent aren't even visible.
>
> And a browser throttles a hidden tab's timers to about one a minute. So a console behind a
> spreadsheet beacons late and looks *exactly* like one in trouble. On this fleet that's
> forty of eighty-six quiet consoles who are completely fine.
>
> Saying so is forty phone calls not made.

`‹ Slides 22–23 — Watch vs Review ›`

> Watch is what we can prove. Review is what we suspect.
>
> `‹ Review screen ›` On the left, a rule that counted an error it is **not allowed to
> read** — the recorder physically cannot store what its registry doesn't permit. So the
> rule knows it happened a lot, and can't tell you what it was.
>
> On the right, a proposal that read the evidence and says what the error actually is.
> Labelled inferred, with its reasoning, how sure it is, and what would prove it wrong.
>
> And the night before — a proposal whose output was a new rule, plus the backtest showing
> it would have caught this.
>
> **Now the honest bit: no model runs in this simulation.** The shape is what I'm showing
> you. The job it slots into is real.

`‹ Slide 24 — boundaries ›`

> It suggests, people decide, the engine acts. Pick from a list before writing prose. And
> "certain" and "probably" are different kinds of answer, not two ends of one scale —
> otherwise a ninety-seven percent guess quietly starts behaving like a fact.
>
> Every suggestion gets scored afterwards: shown, accepted, run, and did it actually work.
> One that keeps working becomes a rule we ship. That's how it improves without a model
> anywhere near the runtime.

`‹ Slide 25 — the line. Say it, don't explain it. ›`

`‹ Slide 26 — the ladder, then the live rescue ›`

> The flare is the loudest thing the product can do, so it's the last rung and not the
> first. Twenty seconds of held dark before it fires, because most offline blips are shorter
> than that.
>
> `‹ to the teammate ›` Can you switch your wifi off?
>
> `‹ Twenty seconds. DO NOT FILL THE SILENCE. Let the room watch the console notice. ›`
>
> `‹ QR appears — scan it ›` That code points at the agent's own cluster, deliberately, not
> at whatever origin served the page.
>
> `‹ Tower badge lights. SAY NOTHING. Three seconds. ›`
>
> That came off a machine that couldn't reach us.

---

## Slides 27–30 · sctower

> `sctower auth login` `‹ browser opens, approve, come back ›`
>
> OAuth 2.1 with PKCE, through the system browser, answered on a loopback listener. The
> server side needed nothing new — the cluster already required PKCE of every client.
>
> `sctower live` … `sctower digest` — the same sentences the Tower draws. The CLI isn't a
> lesser surface.

`‹ Slide 29 ›`

> `sctower watch --since 1h && echo clean`
>
> Exit 1 is not a failure. It's an answer: *answered, and the answer is bad*. Exit 4 means I
> couldn't reach the tower. An agent that can tell those apart can triage. One that can't
> will hallucinate the difference — confidently.
>
> `‹ show the skill ›` And that's what ships with it, so an agent doesn't have to be taught
> any of this.

`‹ Slide 30 — run the TUI. Say almost nothing. Move around. ›`

> Same client. Same data. Over SSH.

---

## Close

`‹ Slide 31 ›`

> That's the three of them. Understudy, where the model is the operator. The Tower, where it
> proposes and we decide. And the CLI, which exists so an agent can investigate without
> being handed a wiki page.
>
> We use models to find the rules — then run the rules without the model.
>
> This presentation was not AI generated. It only looks that way.
>
> `‹ beat ›` What have you got?

---

## Phrases to avoid

- "So basically…" — you reach for it under pressure. Replace with a pause.
- "This is just a demo" — it isn't. Say "simulated data on production software".
- "Obviously" — nothing here is obvious to two founders and three ops.
- Don't describe the Go service as "our backend" or as "a skeleton". If asked: a complete
  parallel implementation that no environment currently schedules.

## If someone challenges a number

Say where it comes from, immediately and without defensiveness: the census of 1,387 real
consoles, the simulation, or invented. Doing that unprompted turns a challenge into a
compliment.
