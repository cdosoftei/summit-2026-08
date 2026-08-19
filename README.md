# Understudy & SingleConsole — session materials

> **We don't put models in the loop. We use models to find the rules — then run the rules
> without the model.**

135 minutes, nine people: two founders, three ops, three developers, one QA.

## Start here

| Read this | For |
|---|---|
| [PLAN.md](PLAN.md) | running order, thesis, interactivity devices, what runs where |
| [PREFLIGHT.md](PREFLIGHT.md) | what to verify and rehearse, with fallbacks |
| [SCRIPT.md](SCRIPT.md) | landing lines and stage directions |

## The deck

```bash
xdg-open deck/index.html
```

31 slides. Self-contained: Montserrat and the logo are local files, no network, no build
step. Works from a USB stick.

| key | |
|---|---|
| `→` `␣` `n` / `←` `p` | next / previous |
| `S` | **speaker view** — notes, timer, next slide (syncs across windows) |
| `F` | fullscreen |
| `O` / `Esc` | overview grid |
| `T` | light theme (projector rescue) |
| `B` / `.` | blank the screen |
| `1`–`99` | jump to slide |
| `?` | help |

## The leaflets

```bash
./build.sh              # → leaflets/*.pdf — US Letter, two sides each
./build.sh a4           # → leaflets/*-a4.pdf, alongside
node tools-measure.mjs  # asserts no page clips (add 'a4' or 'both')
```

Three of them — Understudy, SingleConsole, and AI-Assisted Engineering. Print **10 copies
each**, colour, double-sided, US Letter, scale-to-fit **off**, and put them out before you start.

## Brand

Per the SingleComm guidelines: Dark Blue `#202767` for backgrounds, Bright Red `#D61F26` as
an accent only, Blue Grey `#E4E9EC` and white as neutrals, Montserrat throughout.
Assets in `assets/` — the logo in on-dark and on-light variants, and the embedded font.

## Demos

| beat | where | notes |
|---|---|---|
| Tower simulation | local | `pnpm demo:tower` — deterministic, seed 7 |
| Widget in a host page | local | `pnpm dev`, mock wire |
| Understudy catalog | local | instant, safe to run live |
| Understudy voice + meet, headed | QA | build bundles and capture a session first |
| Agent Desktop | QA | i18n, permissions, telemetry drainer — see PREFLIGHT |
| Rescue QR flare | QA | needs a teammate and a phone; rehearse once |
| sctower + OAuth + TUI | QA | log in fresh right before you present |
