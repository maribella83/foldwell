# Foldwell: Session Handoff

**Last session:** October 12, 2026. **Update this file at the end of each session.**

## Paste this to start a new chat

```
Read CLAUDE.md and Session-Handoff.md. We're picking up where the last
session left off. Start with the "Open items" list, then ask me what
I want to do next.
```

---

## Where things stand

**Phase 1 (Foundation): navigation and family setup are built** with fake, in-memory data. The app opens on the parent's "Your family" screen, and each child's Note Box or Notebook sits behind their page. **It runs on Maribel's iPhone in Expo Go (confirmed October 12).** The database, audio, stickers, and doodles stay on hold until the Week 4 decision (paper-test and prototype feedback).

| Item | Status |
|---|---|
| App name | **Foldwell** (was "Passing Notes", which was taken) |
| Bundle ID / package | `com.circleroottech.foldwell` |
| Domain / social | foldwellnotes.com, @foldwellnotes on Instagram and TikTok |
| GitHub | https://github.com/maribella83/foldwell (private), branch `main` |
| Expo / EAS | https://expo.dev/accounts/maribella83/projects/foldwell |
| Expo SDK | 57 (routes live in `mobile/src/app/`) |

## What's built (`mobile/`)

**Screens (how the app fits together):**

```
Your family (home)                     src/app/index.tsx
├── child page                         src/app/child/[childId]/index.tsx
│   ├── Edit details / Remove (sheet)  src/app/child/[childId]/edit.tsx
│   └── "Open Sam's Note Box" ──► kid view
│         Note Box or Notebook cover   src/app/kid/[childId]/index.tsx
│         └── one note                 src/app/kid/[childId]/note/[noteId].tsx
└── Add a child (sheet)                src/app/add-child.tsx
```

- **Family data** (`src/data/family.tsx`): FAKE and **in memory only**, so it resets when the app closes. Sam (4–8, has notes), Bea (4–8, empty box), Leo (13+). Screens use `useFamily()` and `useChild()`; when the database comes, only `FamilyProvider` changes.
- **Sample notes** (`src/data/sample-notes.ts`): only Sam has notes. They're looked up per child, so one child's link can't open another's note.
- **Age bands** (`src/constants/age-bands.ts`): 4–8 = Note Box, 9–12 and 13+ = Notebook. `isUnder13()` is there for privacy decisions.
- **Kid view safety:** hold-to-leave "Grown-ups" button (1.5 seconds; a tap does nothing). iPhone swipe-back is off, and Android's back button is ignored on the box. It keeps small hands out but **isn't a lock**.
- **Notebook cover** (`src/components/notebook/notebook-cover.tsx`): marbled composition cover drawn in code with a fixed pattern, so it matches what prints.
- **Parent pieces** (`src/components/parent/`): button, child card, age-range picker, child form (nickname + age range only), sheet top bar.
- **Theme** (`src/theme/tokens.ts`): all colors, including new `line`, `placeholder`, `danger`, and `notebookCover`. Screens never hardcode colors.
- **Fonts** (`src/theme/fonts.ts`): Lora (notes and titles), Nunito (controls and kid text), DM Mono (labels). All SIL Open Font License, OK for print.
- **Reduce Motion helper** (`src/hooks/use-reduce-motion.ts`).
- **App name** in one place: `src/constants/app.ts` (plus `app.json`). App icons and splash screen are wired up.
- **Web preview**: `.claude/launch.json` lets Claude check screens in its browser pane (port 8091).

**Full write-up of the parent screens** (decisions, the 10 bugs found and fixed, and what was tested): `Parent-Screens-Audit.md`.

## Open items (pick up here)

1. ~~Confirm the October 12 decisions~~ **Done November 18, 2026.** Maribel confirmed all four (see "Decisions made" below).
2. **Phone checklist** (`Parent-Screens-Audit.md`, section 6). The app works in Expo Go, but these weren't each checked one by one yet: swipe-back blocked in the box, the hold with a real finger, swipe-down blocked on a half-filled sheet, keyboard, VoiceOver, and large text.
3. **Expo package updates:** `expo-doctor` reports 6 small patch updates (for example expo-router 57.0.24 → 57.0.26). This predates the parent screens. Run `npx expo install --check` when ready, but ask first.
4. **Note Box feedback from a real child:** does tapping envelopes make sense, is the text big enough, anything babyish?
5. **`Document-Scanning-Notes.docx` needs fixes before Phase 3:** it says "Passing Notes", suggests Firebase Storage (breaks the on-device rule for v1), mentions a "child's phone" (v1 is one shared device), and says EAS is already in use. Kept out of Git until fixed.
6. **Mockup images** still say "Passing Notes" on the notebook cover; redraw in the design tool. Mockup PNG is kept out of Git until then.
7. **Cleanup whenever:** `mobile/example/` (Expo samples, ignored by Git) and unused placeholder images in `mobile/assets/images/` (expo-logo, react-logo, etc.).
8. **Attorney:** trademark filing for Foldwell; COPPA review; privacy policy before the website sign-up form goes live. Add the in-app line "Everything stays on this phone. No ads, no tracking." to the review.

## Suggested next steps (choose one)

- **Website (Track C):** first job is recruiting paper-test families and a parent waitlist at foldwellnotes.com. Privacy page before any sign-up form. See `Website-Brief.md`.
- **First-open explainer slider** for parents (see below). Draft the words first.
- **Parent PIN** behind the Grown-ups gate. Needs `expo-secure-store` (a new package), so ask first.
- **Strings file for Spanish-readiness:** move all on-screen words into one place with full sentences per language. English possessives like "Sam's Note Box" don't translate word for word.
- **Wait for feedback** and act on the paper-test and Note Box results.

## Idea: first-open explainer (added October 5, 2026)

Maribel wants a short welcome experience the first time a parent opens the app: an **explainer slider**, or possibly a **small animation or video**, about why Foldwell exists, what it's for, and why it matters. The feeling to land: *not just an app, not a website: a connector for you and yours.*

Notes for when we build it:
- **Parents only.** Shown on first open, before "Your family"; never in the kid view. Skippable, and re-openable later from settings.
- **Start with a swipeable slider** (3–4 cards, paper look, our fonts and colors). It's cheap and reversible, fits the current phase, and the same words can go on the website home page.
- **Animation or video comes later.** CLAUDE.md lists animations and video as out of scope early. Any motion must respect Reduce Motion (use `useReduceMotion()`), with a still version.
- **Words matter most.** Draft the copy first (English, Spanish-ready). Follow the Website Brief's "claims to avoid": no "first/only/best," no therapy or mental-health claims, and no promising features that aren't built yet.
- Possible card flow: why (real words from home are rare now) → what (notes, voice, stickers, doodles) → the keepsake (it becomes something you can hold) → privacy promise (on your phone, no ads, kids don't type).

## Decisions made (don't re-ask)

- App lives in `mobile/`; repo covers the whole project folder (docs + `mobile/`, later `website/`).
- App opens on the parent's "Your family" screen; the kid view sits behind each child's page (October 12).
- A child is only a nickname + age band. Nickname max 20 characters; no two children share a nickname (case doesn't matter).
- Confirmed by Maribel, November 18, 2026: age bands 4–8 / 9–12 / 13+; the "Grown-ups" label also shows for teens; removing a child is allowed; the full-name check warns but never blocks. (Still worth asking teens in the paper test whether "Grown-ups" feels babyish.)
- Sticker + text-to-speech test (StickerButton, speak.ts, feelings.ts, expo-speech) is **on hold until Week 4**.
- Git commits for this repo use the GitHub private email `90976725+maribella83@users.noreply.github.com` (GitHub blocks pushes that expose other addresses).
- Maribel has shipped Expo apps since May 2026; skip basics, still explain new things, give full files, small verified steps, ask before deleting or reorganizing.

## Handy commands

Expo must be started from the `mobile` folder, not the project folder:

```bash
cd ~/Desktop/passing-notes-app/mobile
```

```bash
npx expo start -c
```

```bash
npx eas-cli@latest build --profile preview --platform ios
```

Checks before saving work: `npx tsc --noEmit`, `npx expo lint`, `npx expo-doctor`.
