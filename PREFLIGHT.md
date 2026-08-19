# Preflight

Ordered by *"if this is broken, when do I need to know?"* Everything runs on QA or
locally — nothing depends on the dev cluster.

---

## A · Prove the cluster demos

### A1 · Agent Desktop

Three traps, all of which have already cost time on a cluster. In this order.

```bash
# 1. i18n — NOT optional. Without it the nav renders "I18n Missing".
php /var/www/app/i18ncompile.php
ls /var/www/app/cache/i18n/enus.php      # lowercase. Checking enUS.php looks like a failure.
```

```sql
-- 2. Grant the module. 403 until an ACE exists AND an ACL row grants it.
SELECT aceOption FROM AccessControlEntry
  JOIN AccessControlList ON aclAceId = aceId
 WHERE aceType = 'M' AND aceOption = 'singleconsole';
```

> Verify with **the login you will demo from**, not with an admin.

```bash
# 3. Restart the telemetry drainer. Telemetry is queued, not written by the web request;
#    the daemon holds ingest in memory for its whole life and does NOT respawn.
docker exec -d <classic> sh -c "cd /var/www/dss && sh -c 'php ctel.php >> /var/www/data/ctel.log 2>&1' &"
```

Then, in demo order: the console mounts, presence changes, a call arrives; then the Tower
shows a pulse, a session drawer and a probe round trip.

**If the Tower shows nothing:** a read immediately after a POST is premature — the drain
takes about ten seconds.

### A2 · The rescue flare, end to end

Now that it works on QA, rehearse it **with the actual teammate and the actual phone**,
because this is the one beat with another human in it.

- They sign into Agent Desktop and go Available.
- Wifi off. The verdict goes `dark` immediately; the flare renders after **20 seconds** of
  holding it. Do not shorten this — the wait is the drama.
- You scan with your phone. Confirm it lands beside the session, and that the Tower lights
  the rescued badge.

Check: **can your phone reach the cluster on cellular**, and does mobile Chrome or Safari
accept the certificate? If not, put the phone on the same wifi as everyone else and say so.

Rehearsal aids, so you can frame the shot without killing wifi repeatedly:

```js
window.__SC_RESCUE__.simulate('dark')
window.__SC_RESCUE__.flare()
window.__SC_RESCUE__.code()
```

### A3 · sctower

```bash
cd ~/Work/acd/src/go
go vet ./sctower/... && go test ./sctower/...
go build -o /usr/local/bin/sctower ./sctower/cmd/sctower
```

```toml
# ~/.config/sctower/config.toml
default-cluster = "qa"
[clusters.qa]
classic = "https://qa.singlecomm.com"
```

```bash
sctower auth login && sctower live && sctower digest
sctower watch --since 1h ; echo "exit=$?"
sctower ui
```

**Check now, not on the day:** the OAuth client registration migration must be applied on
the cluster. If `auth login` bounces, that is the first suspect.

**Known gotcha:** the bearer is anchored to a session, so it stops working when that
session expires while still looking valid. **Log in fresh just before you present.**

---

## B · Prove the Understudy demos

Both live runs are the centrepiece of part one, so run them end to end at least once.

```bash
cd ~/Work/understudy
set -a; source secrets/qa.env; set +a          # SingleMeet API key etc. — never inline these
export UNDERSTUDY_TTS_BACKEND=openai          # WITHOUT this you get local, robotic voices
pnpm build && pnpm bundle:runtime && pnpm bundle:voice && pnpm bundle:meet
node scripts/capture-session.mjs ciprian      # only needed for the co-resident agent leg
node scripts/capture-session.mjs --pool agent

# the voice run — co-resident agent console + synthetic customer
pnpm understudy run scenarios/voice/r3a-healthfirst-inbound \
    --env qa --execute --headed

# the four-party, four-language meet run — English, Spanish, French, German, live captions.
# All four parties are standalone, so no captured session is needed for this one.
pnpm understudy run scenarios/meet/four-language-showcase \
    --env qa --execute --headed --hold
```

**Warm the audio before you present.** Run the meet scenario once WITHOUT `--execute`: it
renders and caches all twelve turns by content hash, so on the day there is no vendor
round-trip, no cost and no chance of a different-sounding take. ~64s of speech, ~1m45 with
the gaps.

**Dry-run either of them without a browser** by dropping `--execute` — it prints the
resolved parties, campaign bindings and step order in about a second. Do that first; it
catches a missing secret or an unbound campaign before you have spent a minute on Chromium.

**`--hold`** keeps headed windows open until you press Enter. Use it for the meet run so
the four windows stay on screen while you talk.

**Watching the meet room.** A standalone party used to render nothing — it joined,
published and read captions, but never attached the tracks it received, so a headed run
showed the entry page with only the HUD on it. With `--headed` each party now draws a tile
grid of the whole room (itself plus the other three) with a caption strip underneath,
each line tagged with the identity the system attributed it to. **Maximise one window** —
every party renders the same room, so one window is the whole demo. The grid is off in
headless runs, so CI does not decode video nobody is watching.

Rebuild the channel bundle after pulling this change: `pnpm bundle:meet`.

**Turn-taking:** the agent leg used to start its next line before the previous one had
finished, so the two parties talked over each other. That is fixed — the browser transport
now returns the playback promise, so a `speak` step ends when the audio ends
(`packages/drivers/src/browser-agent-voice-transport.ts`, and the SingleConsole session's
`play()`). Two consequences worth knowing:

- **Runs are now longer in wall clock**, because turns no longer overlap. Time the voice
  scenario before you present so you know whether it fits the slot.
- **If any scenario had `wait.settle` values tuned around the overlap**, they may now be
  short. Re-run and, if needed, `understudy save` a fresh baseline.

Also worth a dry run: `pnpm understudy catalog` — instant, local, and safe to do live.

---

## C · Rehearse the simulation

```bash
cd ~/Work/singleconsole
pnpm demo:tower                             # 900 consoles, seed 7
CONSOLES=900 SEED=7 POLL=2 pnpm demo:tower  # same arc in three minutes, for rehearsal
```

Read `docs/TOWER-SIM.md` §6 in the singleconsole repo once, then rehearse until
you know which minute each of the seven sentences lands on.

- **Do not edit source while rehearsing.** Hot reload resets the sim clock to tick 0 and
  you will think it is broken.
- Same seed = same fleet = **same names**. You can rehearse a line about a specific agent.
- Rehearse at `poll=2`, present at the default.
- The map's frame follows the filter — type a site name on the Map tab and it flies there.

The seven sentences and their owners — know these cold:

| at | the board says | who to call |
|---|---|---|
| 0:00 | 13 of 16 with `network-relay-only` share one floor | that floor's network team |
| 0:00 | 40 of 86 quiet consoles are only hidden windows | **nobody** — 40 calls not made |
| 1:00 | 11 of 15 with `cdn-unreachable` share one site | desktop IT |
| 2:00 | 20 of 23 with `audio-underrun` share one console version | release eng — roll it back |
| 3:40 | 11 of 19 at one work-from-home region went quiet within 2 s | that country's ISP |
| 4:00 | 11 of 11 with `mic-permission-lost` share one building | whoever pushed the policy |
| 5:00 | 41 `reconnect-storm` across 33 sites and 3 builds | **us** |
| 6:00 | 14 of 14 with `network-no-relay` share one region | our own relay edge |

---

## D · Materials and room

```bash
cd ~/Work/summit-miami-2026   # this folder
./build.sh                 # leaflets → PDF
node tools-measure.mjs     # asserts nothing clips
xdg-open deck/index.html   # S = speaker view, F = fullscreen, ? = help
```

- **Print three leaflets, 10 copies each**, colour, double-sided, scale-to-fit **off**.
- **Test on the projector at 1920×1080.** The Tower grid and the terminal UI are the two
  things that go unreadable — set the terminal to at least 18pt.
- **Offline test:** wifi off, open the deck, click every slide. It is fully self-contained
  — Montserrat and the logo are local files, no network at any point.
- Do-not-disturb on the laptop and the phone you will scan with.
- Full dry run, out loud, with the clock. Target 55 minutes of talking.

---

## E · The five minutes before you start

```bash
# 1. sctower auth is fresh — this is the credential that expires
sctower auth login && sctower live | head

# 2. sim up and parked, ready for the cold open
cd ~/Work/singleconsole && pnpm demo:tower

# 3. second browser profile, already signed in to Agent Desktop + Tower on QA
# 4. terminal at 18pt, clean prompt
```

- Deck on the presenter screen, speaker view (`S`) on the laptop.
- Leaflets on the table.
- **Teammate briefed** for the rescue demo: what you will ask, and when.
- **Do not open your editor.** A stray autosave resets the sim.

---

## F · Fallbacks — decide these now

| If this fails | Do this |
|---|---|
| Cluster is down | Everything else is local. Run the console on the mock wire and say "the cluster is down, which is itself a Tower story". |
| `sctower auth login` bounces | Export a token in a scratch shell as backup. Skip the OAuth theatre, keep the TUI. |
| The rescue demo misfires | `window.__SC_RESCUE__.simulate('dark')` renders the flare immediately. Say you are forcing the state rather than waiting for it. |
| An Understudy run wedges | You have the catalog and the scenario file. Talk through what it *would* have done and move on — do not debug on stage. |
| Sim won't start | The arc is deterministic, so talk it through from the seven sentences below — you know them, and the board is not the point, the phone calls are. |
| Projector mangles colours | Deck: press `T` for the light theme. Sim: `THEME=light TILES=0 pnpm demo:tower`. |
| Someone challenges a number | Say where it comes from — the census of 1,387 real consoles, the simulation, or invented. The sim documentation is explicit about which is which; borrow that habit out loud. |
