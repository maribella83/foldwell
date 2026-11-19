# Foldwell: Session Handoff

**Last session:** November 19, 2026 (second session that day). **Update this file at the end of each session.**

## Paste this to start a new chat

```
Read CLAUDE.md and Session-Handoff.md. We're picking up where the last
session left off. Start with "Start here tomorrow", then ask me how the
phone check went.
```

(Maribel likes to call Claude "Claudia." She is a new engineer: explain mobile and developer terms in plain words, define each term the first time, and keep steps small.)

---

## Start here tomorrow

**Storage Step 1 (save children on the phone) is DONE: Maribel's five phone checks all passed (November 19).**

**Storage Step 2 (write a note) is DONE: built, and Maribel's seven phone checks all passed (November 19).** Also passed on the Mac: `tsc`, `expo lint`, and a `sqlite3` test of the new table. Check whether it is committed and pushed (`git status`); if not, ask her before committing.

**Next:** Step 3 (record a voice note). Before that, get her answers to the two open questions at the bottom of this section. The checks she ran, for reference (`npx expo start --port 8082`, then Expo Go):

1. **Load sample family** (testing only). Open **Sam**'s page: "In the Note Box" lists Mom, Dad, Grandma. Bea and Leo have none.
2. On **Bea**'s page tap **Write a note to Bea**. Try **Save with nothing typed**: it should ask for who it's from and for a few words. Then write one as "Mom", pick an envelope, save. It appears at the top of Bea's list.
3. Tap **Open Bea's Note Box** → her envelope is in the box → tap it → the note opens with big text. There is **no play button** (on purpose, see below).
4. **Close the app completely**, reopen: Bea's note is still there.
5. Write a **second** note: "From" should already say "Mom", and the envelope color should be the next one in the rotation. Try a **long** "from" like "Grandma Joy" and a long note (scrolls on the note screen).
6. **Remove Bea** (Edit details), then **Load sample family** again so Bea comes back: her old note must **not** reappear (notes go with the child).
7. **Leo (13+)**'s page has **no** "Write a note" button (Notebook notes come later; says so on the page).

- **If all pass:** next is **Step 3 (record a voice note)** in `Storage-and-Audio-Plan.md`. It needs two new packages (`expo-audio`, `expo-file-system`): **ask before installing.**
- **If any fail:** ask for the red error text or a screenshot and fix it first.

Also small and quick: ask Maribel to run `npx expo-doctor` on her Mac (two checks could not run in the cloud workspace because they need Expo's servers).

**Questions to put to Maribel (not decided):**
- A parent cannot **edit or delete a note** after saving it (a typo stays). Not in the plan; it is a small, natural next piece. Add it before Step 3, or wait?
- Notes are written for **Note Box children (4–8) only** for now, because the Notebook that would show them isn't built.

---

## Where things stand

**Phase 1 (Foundation).** Navigation and family setup are built. **The hold on storage and audio was lifted by Maribel on November 19, 2026**, because families who tried the Note Box expected the big voice button to play or record. Photos, stickers, doodles and print ordering are still on hold.

| Item | Status |
|---|---|
| App name | **Foldwell** (was "Passing Notes", which was taken) |
| Bundle ID / package | `com.circleroottech.foldwell` |
| Domain / social | foldwellnotes.com, @foldwellnotes on Instagram and TikTok |
| GitHub | https://github.com/maribella83/foldwell (private) |
| Expo / EAS | https://expo.dev/accounts/maribella83/projects/foldwell |
| Expo SDK | **58** (upgraded from 57 on November 19, 2026). React Native 0.88, React 19.3. Confirmed working on Maribel's iPhone in Expo Go. |
| Project folder on her Mac | `~/Desktop/passing-notes-app` (the app is in its `mobile` folder) |

### IMPORTANT: where the work lives
All of this session's work is on the branch **`claude/foldwell-session-handoff-piyjst`**, **not on `main`**. Maribel's Mac is switched to that branch. Nothing has been merged into `main`, and no pull request exists. Ask her when she wants to merge (a pull request is a request to merge a branch into `main`); do not create one unless she asks. Until then, `main` is still the October 12 version (SDK 57, fake in-memory data).

### What happened this session (in order)
1. Confirmed the four October 12 decisions.
2. **Strings file, step 1:** `mobile/src/strings/en.ts` + `index.ts`. Only the Your family screen and child cards read from it so far. Checked in the web preview.
3. Phone could not open the app: Expo Go had updated itself to SDK 58, and iPhones can only run the newest SDK. **Upgraded Foldwell to SDK 58** (done in the cloud workspace, one small code fix in `child/[childId]/edit.tsx` for a React Native type rename). Maribel confirmed the Your family screen, child page and Add/Edit sheets work.
4. Maribel found the big voice button does nothing (it is a placeholder, by design) and said testers expected it to play or record. She lifted the hold; a plan was written and her four decisions confirmed (`Storage-and-Audio-Plan.md`).
5. **Storage step 1 built**, then confirmed on her phone (all five checks passed).
6. **Storage step 2 built** (write a note). Her Mac's branch was 6 commits behind GitHub at the start; fast-forwarded (nothing lost). `npm install` was missing `expo-sqlite` in her folder, so it was run once (2 packages added, lockfile unchanged).

## What's built (`mobile/`)

```
Your family (home)                     src/app/index.tsx
├── child page                         src/app/child/[childId]/index.tsx
│   ├── Write a note (sheet)           src/app/child/[childId]/new-note.tsx
│   ├── Edit details / Remove (sheet)  src/app/child/[childId]/edit.tsx
│   └── "Open Sam's Note Box" ──► kid view
│         Note Box or Notebook cover   src/app/kid/[childId]/index.tsx
│         └── one note                 src/app/kid/[childId]/note/[noteId].tsx
└── Add a child (sheet)                src/app/add-child.tsx
```

- **Database** (`src/data/database.ts`): on-device SQLite (`expo-sqlite`), numbered migrations, now **two tables**: `children` (id, nickname, age band, created time) and `notes` (id, child id, "from" label, envelope color, body text, created time). Migration 2 added `notes`. Foreign keys are switched on at every start, and a child's notes are deleted with the child. **Never edit a migration once shipped; add a new one** (Step 3 will add an `audio_file` column as migration 3). `SQLiteProvider` wraps the whole app in `src/app/_layout.tsx`.
- **Family data** (`src/data/family.tsx`): `FamilyProvider` reads and writes the database. Screens use `useFamily()` (children **and** notes: `notesForChild`, `findNote`, `addNote`) and `useChild()`. A fresh install starts **empty**. A **development-only** "Load sample family (testing only)" button on the home screen adds Sam (4–8) with three notes, Bea (4–8, empty box) and Leo (13+); real store builds never show it.
- **Notes** (`src/data/notes.ts`): the `Note` type, the checks before saving (needs a "from" and some words for now; later words **or** a recording), limits (from: 16 letters, note: 1000 letters), and the read/insert functions. There is deliberately **no** seen/played field (rule 6). Newest note first.
- **Sample notes** (`src/data/sample-notes.ts`): now only the **developer sample** (Sam's three notes), saved by "Load sample family". Not shown to real families.
- **Write a note** (`new-note.tsx`, `components/parent/note-form.tsx`, `envelope-picker.tsx`): sheet with who it's from (pre-filled with the last one used in that box), the words, and a 3-color envelope picker (color names written on the swatches plus a check mark, not color alone). Only for Note Box children for now.
- **Kid note screen:** shows the saved note in big text. **The big "Hear Mom" button is hidden** until a note has a voice recording (Step 4); `play-button.tsx` is kept for then. `note-picture.tsx` (placeholder sun/moon/heart art) is no longer used by any screen; keep for photos later or delete (ask first).
- **Strings** (`src/strings/`): English words for the Your family screen, child cards, the dev button, the New note sheet, the kid note screen, and the new parts of the child page. Every other screen still has its words written inside it.
- **Age bands** (`src/constants/age-bands.ts`): 4–8 = Note Box, 9–12 and 13+ = Notebook. `isUnder13()` is for privacy decisions. Its labels ("Ages 4–8", "Note Box") are still English-only in that file.
- **Kid view safety:** hold-to-leave "Grown-ups" button (1.5 seconds; a tap does nothing). iPhone swipe-back is off, and Android's back button is ignored on the box. It keeps small hands out but **isn't a lock**.
- **Big voice button** (`src/components/note-box/play-button.tsx`): not shown on any screen right now. Size and look are final; Step 4 puts it back on notes that have a recording.
- **Notebook cover**, parent pieces (`src/components/parent/`), theme (`src/theme/tokens.ts`, no hardcoded colors), fonts (Lora, Nunito, DM Mono, all open licenses), Reduce Motion helper, app name in `src/constants/app.ts` + `app.json`, icons and splash: all as before.
- **Web preview does NOT work any more** with the database (it needs extra web setup; we test on the phone instead). `.claude/launch.json` still exists for the browser pane.

Full write-up of the parent screens, 10 bugs found and fixed: `Parent-Screens-Audit.md`.

## Open items

1. **Steps 3–5 of `Storage-and-Audio-Plan.md`:** record a voice, play it, test with the real microphone wording via an EAS build. **Ask before installing** `expo-audio` and `expo-file-system`. First settle edit/delete for saved notes (question above).
2. **Strings file, remaining work:** convert the other screens (about 17 files, in small batches Maribel checks), then the wording in `constants/age-bands.ts`, then draft Spanish (a native speaker should review it). New screens should read from `src/strings/` from the start.
3. **Phone checklist** (`Parent-Screens-Audit.md`, section 6), still not checked one by one: swipe-back blocked in the Note Box, the Grown-ups hold with a real finger, swipe-down blocked on a half-filled sheet, keyboard, VoiceOver, large text. Now possible because the phone works.
4. **`CLAUDE.md` still says to hold audio and the database** ("Current phase" section). Maribel lifted that hold on November 19. Ask her OK and update that paragraph.
5. **`expo-doctor` on her Mac** (two checks need Expo's servers). Also `--tunnel` now needs `expo login` (use `--tunnel ngrok` for the old kind), but a normal Wi-Fi connection works now.
6. **Note Box feedback:** families' feedback so far was positive with nothing critical, and they expected the voice button to play or record. Next time ask pointed questions ("Did your child work out the envelopes without help? Was anything confusing or too babyish?").
7. **`Document-Scanning-Notes.docx` needs fixes before Phase 3:** it says "Passing Notes", suggests Firebase Storage (breaks the on-device rule for v1), mentions a "child's phone" (v1 is one shared device), and says EAS is already in use. Kept out of Git until fixed.
8. **Mockup images** still say "Passing Notes" on the notebook cover; redraw in the design tool. Mockup PNG is kept out of Git until then.
9. **Cleanup whenever:** `mobile/example/` (Expo samples, ignored by Git) and unused placeholder images in `mobile/assets/images/`. Ask before deleting.
10. **Attorney list:** trademark filing for Foldwell; COPPA review; privacy policy before the website sign-up form goes live; the in-app line "Everything stays on this phone. No ads, no tracking."; and **new: iPhone's own backup may include the app's files (including voice recordings) in the person's iCloud by default** (not our servers, but CLAUDE.md puts cloud backup out of scope until legal review).
11. **`npm audit`** shows 3 moderate issues inside Expo's own tooling (`minimatch` in `@expo/fingerprint`). Not in the app. The suggested fix is a downgrade to Expo 52, so **ignore it**.

## Other next steps (when ready)

- **Website (Track C):** recruit paper-test families and a parent waitlist at foldwellnotes.com. Privacy page before any sign-up form. See `Website-Brief.md`.
- **First-open explainer slider** for parents (see below). Draft the words first.
- **Parent PIN** behind the Grown-ups gate. Needs `expo-secure-store` (new package), so ask first.

## Idea: first-open explainer (added October 5, 2026)

Maribel wants a short welcome experience the first time a parent opens the app: an **explainer slider**, or possibly a **small animation or video**, about why Foldwell exists, what it's for, and why it matters. The feeling to land: *not just an app, not a website: a connector for you and yours.*

- **Parents only.** Shown on first open, before "Your family"; never in the kid view. Skippable, and re-openable later from settings.
- **Start with a swipeable slider** (3–4 cards, paper look, our fonts and colors). Cheap and reversible; the same words can go on the website home page.
- **Animation or video comes later** (CLAUDE.md lists them as out of scope early). Any motion must respect Reduce Motion (`useReduceMotion()`), with a still version.
- **Words matter most.** Draft the copy first (English, Spanish-ready). Follow the Website Brief's "claims to avoid": no "first/only/best," no therapy or mental-health claims, no promising features that aren't built yet.
- Possible card flow: why (real words from home are rare now) → what (notes, voice, stickers, doodles) → the keepsake → privacy promise (on your phone, no ads, kids don't type).

## Decisions made (don't re-ask)

- App lives in `mobile/`; repo covers the whole project folder (docs + `mobile/`, later `website/`).
- App opens on the parent's "Your family" screen; the kid view sits behind each child's page.
- A child is only a nickname + age band. Nickname max 20 characters; no two children share a nickname (case doesn't matter).
- Confirmed November 18: age bands 4–8 / 9–12 / 13+; the "Grown-ups" label also shows for teens (still worth asking teens in the paper test if it feels babyish); removing a child is allowed; the full-name check warns but never blocks.
- Confirmed November 19 (storage and audio): a fresh install starts **empty**, with a developer-only way to load sample children; a note needs words **or** a voice recording, either is fine; "from" on a note is a label the parent types ("Mom", "Grandma"); the iPhone-backup question goes on the attorney list.
- Upgrade to SDK 58 approved and done November 19. `expo-sqlite` installed with Maribel's approval.
- Sticker + text-to-speech test (StickerButton, speak.ts, feelings.ts, expo-speech) is still **on hold**.
- Git commits for this repo use the GitHub private email `90976725+maribella83@users.noreply.github.com` (GitHub blocks pushes that expose other addresses). Push only to `claude/foldwell-session-handoff-piyjst`.
- Maribel has shipped Expo apps since May 2026; skip basics, still explain new things, give full files, small verified steps, ask before deleting, reorganizing or installing packages.

## Things learned about the setup (save time)

- **Cloud workspace vs. her Mac:** the cloud workspace (where Claude runs) is fast and runs `tsc`, `expo lint`, an iPhone bundle build and package installs; it cannot run the app or the phone-only database. Workflow that worked: Claude installs and changes code in the cloud and pushes; Maribel runs `git pull`, `npm install`, then `npx expo start` on her Mac and checks on her iPhone.
- In the cloud workspace, `npx expo install` and `expo-doctor` cannot reach `api.expo.dev`, so run them with `EXPO_OFFLINE=1` (uses the version list shipped inside the `expo` package). Maribel approved adding `docs.expo.dev` and `expo.dev` to the workspace's allowed sites so Expo's docs can be read (this setting applies to her future sessions too).
- **Always read Expo's current docs before touching Expo APIs** (the `mobile/AGENTS.md` rule). Versioned pages: `https://docs.expo.dev/versions/v58.0.0/sdk/<package>.md`.
- **Her Mac is slow the first time** it reads files after a change: the first `tsc`/`lint`/Metro run took minutes (88 seconds for one `tsc`), later runs 2 seconds. Cause not found (iCloud Desktop sync was only a guess). Be patient; ask how long she waited.
- **Port 8081 is taken** by her other project (Merak). `npx expo start` then asks a question; answer `y`, or use `--port 8082`.
- Her Terminal opens in her home folder; she must `cd ~/Desktop/passing-notes-app` first. Several other Expo servers (Merak, Kongvene) may be running at once; that was not the cause of any problem.

## Handy commands

On Maribel's Mac, to get the newest work from the session branch (she is already switched to it):

```bash
cd ~/Desktop/passing-notes-app
```

```bash
git pull origin claude/foldwell-session-handoff-piyjst
```

```bash
cd mobile
```

```bash
npm install
```

```bash
npx expo start --port 8082
```

Then scan the QR code with the iPhone Camera app (Expo Go opens). Checks before saving work: `npx tsc --noEmit`, `npx expo lint`, `npx expo-doctor`. EAS build for a phone test build: `npx eas-cli@latest build --profile preview --platform ios`.
