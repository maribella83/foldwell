# Kickoff Plan: App, Brand, Website (paper test runs in parallel)

Decision (October 2026): Maribel is moving forward with the app and website now. The paper test runs alongside and does not block building.

---

## Ground rules while we build

1. **Build the cheap, reversible parts first** (setup, static screens with fake data, branding, website). Hold the expensive parts (audio, doodles, print ordering, backend) until test feedback arrives. Features can change after the paper test.
2. **The name is Foldwell** (decided October 2026). Keep it in one file in the code. Ask an attorney before filing a trademark.
3. **Privacy rules in CLAUDE.md always apply**, including no accounts for children, no tracking, and no analyzing a child's writing or drawings.
4. **Small steps, check each one.** After every step, run it and confirm it works before the next.
5. **One tool edits files at a time.** If Claude Code is editing, don't edit the same files in Cursor.

---

## Track A: App (Claude Code)

Where: the Claude desktop app, Code tab (no terminal needed), or the terminal if you prefer.

**Step A1: Folder and files**
1. Create a folder on your Mac, for example `passing-notes`.
2. Copy `CLAUDE.md` and `Notes-App-Build-Blueprint.md` into it. `CLAUDE.md` must be named exactly that, in the top folder.
3. Open that folder in Claude Code.

**Step A2: First prompt**
```
Read CLAUDE.md and Notes-App-Build-Blueprint.md. We are starting Phase 1 (Foundation). I'm a beginner. First, tell me in plain language what tools I need installed and why, and wait for my okay before installing anything.
```
Done when: Claude Code lists what's needed and you understand each item.

**Step A3: Blank app on your phone**
```
Set up a blank Expo project with TypeScript and Expo Router in this folder. One small step at a time. After each step, tell me how to check it worked. The goal is a screen that says "Hello" running on my iPhone through Expo Go.
```
Done when: you see "Hello" on your phone.

**Step A4: Save your history (Git)**
```
Set up Git for this project and explain what it does in plain language. Then help me make a private GitHub repository and save the first version.
```
Done when: the first version is saved and you can explain what Git is for.

**Step A5: Name in one place**
```
Create a single constants file that holds the app name "Foldwell" so it can be changed in one place later. Explain why this helps.
```

**Step A6: Static Note Box screen (fake data, no real features)**
```
Build the Note Box screen from the blueprint (Section 6, Ages 4-8) using fake sample notes. Show a box with three envelopes. Tapping one opens a note screen with a big picture, large text, and a play button that does nothing yet. No database, no audio yet. Use the colors in CLAUDE.md. Explain the code in plain language as you go.
```
Done when: you can tap an envelope on your phone and see a note.

**Stop here and reassess** after A6, using paper-test and prototype feedback.

---

## Track B: Brand and prototypes (Claude Design)

Where: claude.ai/design (beta; check your plan includes it).

**Upload:**
1. `Brand-Brief.md` (included in this kit).
2. The mockup images in the `Mockups/` folder (start with `0-Mockups-Overview.png`). Look B (file 5b) is for tweens and younger teens, and look A (file 5a) is for older teens. Both are new, unreviewed drafts. File 6 is an optional dark version you do not prefer as the default.
3. Any reference images you love (notebooks, paper textures, children's book art) that you own or are free to use.
4. No logo yet.

**Steps:**
1. Create a design system from those files. Review what it makes (colors, type, buttons, cards) and correct anything that feels off.
2. Build a clickable prototype of the Note Box and a second of the Notebook.
3. Show both to 2–3 children (ages 4–8) with a parent, and 2–3 tweens or teens. Ask what feels fun and what feels babyish.
4. When the app screens are final, use Claude Design's handoff to Claude Code.

---

## Track C: Website

See `Website-Brief.md`. First job of the website: recruit paper-test families and collect a parent waitlist. Keep the name in one shared place in the site's code.

Steps:
1. Draft in Claude Design using the website brief.
2. Choose where it lives (a page on circleroottech.com is easiest to start).
3. Write the privacy page before turning on any sign-up form.

---

## Track D: Paper test (runs in parallel, about 30 minutes a day)

1. Send the invitation message to 5–8 parents this week.
2. Give them the Part 1, Part 2, and printable pack.
3. Collect the weekly check-ins.
4. Bring results back to this project.

## Track E: Name and legal (background)

1. Done (October 2026): "Passing Notes" was taken; name chosen is **Foldwell** after a USPTO search and domain check. Bundle ID / package: `com.circleroottech.foldwell`.
2. Check App Store and Google Play by hand for "Foldwell."
3. Done: domain foldwellnotes.com and @foldwellnotes on Instagram and TikTok.
4. Ask an attorney about a trademark filing for Foldwell.
5. Commission sticker art with the brief; get rights in writing.
6. Ask an attorney to review: children's privacy (COPPA), artist agreement, and the privacy policy.

---

## Suggested pace (for someone working full time)

| Week | Goal |
|---|---|
| 1 | Tools installed, "Hello" on your phone, Git set up. Invitations sent. Brand brief uploaded to Claude Design. |
| 2 | Design system reviewed. Note Box static screen (A6). Website first draft. Testers using the pack. |
| 3 | Prototypes shown to a few children and tweens. Website privacy page and waitlist. First check-ins arrive. |
| 4 | Review everything together here. Decide what to build next based on real feedback. |

## Decision point (Week 4)

Bring these here: check-ins, prototype reactions, name results, artist quotes. We decide whether to build audio and stickers next, change direction, or pause.
