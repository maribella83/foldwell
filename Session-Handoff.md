# Foldwell: Session Handoff

**Last session:** October 5, 2026. **Update this file at the end of each session.**

## Paste this to start a new chat

```
Read CLAUDE.md and Session-Handoff.md. We're picking up where the last
session left off. Start with the "Open items" list, then ask me what
I want to do next.
```

---

## Where things stand

**Kickoff steps A3–A6 are done.** Per the Kickoff Plan, this is the "stop and reassess" point. Audio, stickers, doodles, and the database stay on hold until the Week 4 decision (paper-test and prototype feedback).

| Item | Status |
|---|---|
| App name | **Foldwell** (was "Passing Notes", which was taken) |
| Bundle ID / package | `com.circleroottech.foldwell` |
| Domain / social | foldwellnotes.com, @foldwellnotes on Instagram and TikTok |
| GitHub | https://github.com/maribella83/foldwell (private), branch `main` |
| Expo / EAS | https://expo.dev/accounts/maribella83/projects/foldwell |
| Expo SDK | 57 (routes live in `mobile/src/app/`) |

## What's built (`mobile/`)

- **Theme** (`src/theme/tokens.ts`): all colors, note and envelope colors, illustration colors, type sizes, spacing, touch targets (kid = 56pt, play button = 88pt). Screens never hardcode colors.
- **Fonts** (`src/theme/fonts.ts`): Lora (notes), Nunito (controls and kid notes), DM Mono (teen labels). All SIL Open Font License, OK for print.
- **App name** in one place: `src/constants/app.ts` (plus `app.json`).
- **Note Box home** (`src/app/index.tsx`): kraft box with three envelopes (Mom, Dad, Grandma). FAKE data in `src/data/sample-notes.ts`.
- **Note view** (`src/app/note/[id].tsx`): big picture, big text, "Hear Mom" button (does nothing yet), big back button.
- **App icons** from `foldwell-icons/` wired into `app.json`; splash shows the pocket-note art.
- **Web preview**: `.claude/launch.json` lets Claude check screens in its browser pane.

## Open items (pick up here)

1. **iOS preview build: done, worked.** Installed on Maribel's iPhone; the icon looks great and the splash screen shows. Still to confirm: Note Box works the same in the build as in Expo Go.
2. **Note Box phone test:** Maribel was testing in Expo Go and with a child if possible. Bring feedback: does tapping envelopes make sense, is text big enough, anything babyish?
3. **`Document-Scanning-Notes.docx` needs fixes before Phase 3:** it says "Passing Notes", suggests Firebase Storage (breaks the on-device rule for v1), mentions a "child's phone" (v1 is one shared device), and says EAS is already in use. Kept out of Git until fixed.
4. **Mockup images** still say "Passing Notes" on the notebook cover; redraw in the design tool. Mockup PNG is kept out of Git until then.
5. **`mobile/example/`** holds Expo's sample screens for reference (ignored by Git). Delete whenever.
6. **Unused Expo placeholder images** are still in `mobile/assets/images/` (expo-logo, react-logo, etc.). Safe to clean up later.
7. **Attorney:** trademark filing for Foldwell; COPPA review; privacy policy before the website sign-up form goes live.

## New idea: first-open explainer (added October 5, 2026)

Maribel wants a short welcome experience the first time a parent opens the app: an **explainer slider**, or possibly a **small animation or video**, about why Foldwell exists, what it's for, and why it matters. The feeling to land: *not just an app, not a website: a connector for you and yours.*

Notes for when we build it:
- **Parents only.** Shown on first open before family setup; never in the kid view. Skippable, and re-openable later from settings.
- **Start with a swipeable slider** (3–4 cards, paper look, our fonts and colors). It's cheap and reversible, fits the current phase, and the same words can go on the website home page.
- **Animation or video comes later.** CLAUDE.md lists animations and video as out of scope early (react-native-reanimated is planned for later). Any motion must respect the iPhone's Reduce Motion setting, with a still version.
- **Words matter most.** Draft the copy first (English, Spanish-ready). Follow the Website Brief's "claims to avoid": no "first/only/best," no therapy or mental-health claims, and no promising features that aren't built yet.
- Possible card flow: why (real words from home are rare now) → what (notes, voice, stickers, doodles) → the keepsake (it becomes something you can hold) → privacy promise (on your phone, no ads, kids don't type).

## Suggested next steps (choose one)

- **Website (Track C):** first job is recruiting paper-test families and a parent waitlist at foldwellnotes.com. Privacy page before any sign-up form. See `Website-Brief.md`.
- **Parent-side static screens** with fake data (family setup, child list), still cheap and reversible.
- **Wait for feedback** and act on the Note Box test results.

## Decisions made (don't re-ask)

- App lives in `mobile/`; repo covers the whole project folder (docs + `mobile/`, later `website/`).
- Sticker + text-to-speech test (StickerButton, speak.ts, feelings.ts, expo-speech) is **on hold until Week 4**.
- Git commits for this repo use the GitHub private email `90976725+maribella83@users.noreply.github.com` (GitHub blocks pushes that expose other addresses).
- Maribel has shipped Expo apps since May 2026; skip basics, still explain new things, give full files, small verified steps, ask before deleting or reorganizing.

## Handy commands

Run from `~/Desktop/passing-notes-app/mobile`:

```bash
npx expo start -c
```

```bash
npx eas-cli@latest build --profile preview --platform ios
```

Checks before saving work: `npx tsc --noEmit`, `npx expo lint`, `npx expo-doctor`.
