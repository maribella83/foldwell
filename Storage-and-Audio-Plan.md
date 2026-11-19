# Foldwell: Storage and Audio Plan

Written November 19, 2026. **Status (November 19, 2026): Step 1 done and confirmed on Maribel's phone. Step 2 built and confirmed on her phone. Steps 3–5 not started.**

Maribel lifted the hold on storage and audio on November 19, 2026. Reason: families who tried the Note Box expected the big voice button to play something or record. Right now it is a placeholder that does nothing (`mobile/src/components/note-box/play-button.tsx`, and `onPress={() => {}}` in `mobile/src/app/kid/[childId]/note/[noteId].tsx`).

---

## 1. What we are building, in plain words

Today everything in the app is fake and disappears when the app closes. This plan makes it real, in five small steps:

1. **Remember the family.** Children are saved on the phone and are still there tomorrow.
2. **Let a parent write a note.** A "New note" screen. Saved notes show up in the child's Note Box.
3. **Let a parent record their voice** on that note (about 2 minutes at most).
4. **Make the big button play it.**
5. **Test on a real phone,** including the real microphone permission wording.

Each step is small, and Maribel checks it on her phone before the next begins.

## 2. Words used in this plan

- **Database (SQLite):** a small filing cabinet inside the app that remembers things when the app closes. It lives only on the phone.
- **Migration:** a numbered change to the filing cabinet's layout (for example "add a notes drawer"). Numbering them lets future app updates change the layout without losing what families already saved. Once released, a migration is never edited, only added to.
- **Permission:** the iPhone asks "Allow Foldwell to use the microphone?" before an app can record.
- **Cache folder vs. document folder:** the phone can delete files in the *cache* folder whenever it is low on space. The *document* folder is kept safe. Voice recordings must go in the document folder, because a parent's voice cannot be re-made.

## 3. What gets saved (and what never does)

| Saved on the phone | Never saved |
|---|---|
| Child: a nickname and an age band | Full names, birthdates, photos of children, schools, locations |
| Note: who it is from ("Mom"), envelope color, the parent's text, a date written | Anything a child types, records, or photographs (children never do) |
| The name of the parent's voice file (the file itself sits in the document folder) | Anything sent to a server. Nothing leaves the phone |

No counts, "new" badges, or "heard" markers anywhere. The app must never show whether or when a child opened or played a note (CLAUDE.md rule 6).

## 4. The steps

### Step 1: Remember the family (database foundation)
- **What:** add the database. Children are saved and loaded from it. Add, edit, and remove keep working exactly as they do now. Only the inside of `FamilyProvider` in `mobile/src/data/family.tsx` changes; screens keep calling `useFamily()` the same way.
- **New package:** `expo-sqlite`. Ask before installing.
- **You will see:** add a child, close the app completely, reopen: the child is still there.
- **Deleting a child** also deletes that child's notes (and, from Step 3 on, their voice files).
- **Undo:** revert one commit; the app goes back to fake data.

### Step 2: Write a note (parent side)
- **What:** a "New note" screen from the child's page: who it is from, the words, an envelope color. Saved notes appear in that child's Note Box. This replaces `mobile/src/data/sample-notes.ts`.
- **No new package.**
- **You will see:** write a note as "Mom", open the Note Box, tap the envelope, read it. Close the app: the note is still there.
- **Not in this step:** photos of notes (later), sticker or doodle replies (later).

### Step 3: Record a voice note (parent side only)
- **What:** on the New note screen, a "Record your voice" button. First it shows a short, kind explainer screen about why the app wants the microphone, *then* the iPhone's own permission question. Recording stops by itself at 2 minutes. Before saving, the app checks the phone has enough free space. The parent can listen back, record again, or delete.
- **New packages:** `expo-audio` (recording and playing) and `expo-file-system` (checking free space and keeping files). Ask before installing.
- **Recording happens only on parent screens.** Nothing in the kid view can record (CLAUDE.md rule 2).
- **You will see:** record "I love you" in your own voice, listen back, save. Kill the app and reopen; the recording is still attached to the note.

### Step 4: Make the big button play it
- **What:** the "Hear Mom" button plays the recording. It plays even if the phone's silent switch is on (parents will be surprised otherwise). A note with no recording does **not** show the button, so nothing is a dead button.
- **No new package.**
- **You will see:** open Sam's Note Box, tap the envelope, tap the big button, hear the voice.

### Step 5: Phone test, with the real permission wording
- In Expo Go, the iPhone's permission popup shows Expo Go's wording, not ours. To see **Foldwell's** wording we need a build made with EAS (which Maribel already uses). Plan one test build once Step 3 works.

## 5. Decisions needed from Maribel

> **Confirmed by Maribel, November 19, 2026: "Yes to all, recommended."** (1) First launch is empty, with a developer-only way to load Sam, Bea and Leo. (2) A note needs words or a voice recording, either is fine. (3) "From" stays a typed label. (4) The iPhone-backup question goes on the attorney list. Still to do: ask before installing each new package.

1. **First launch: empty, or with sample children?** Recommendation: **empty**, which is what a real family sees. For testing, we keep a way to load Sam, Bea and Leo (for example only while developing).
2. **A note needs at least one of: words or a voice recording.** Recommendation: allow either or both, because the Blueprint says text is the support and voice leads for ages 4–8.
3. **Who a note is "from":** a free-text label the parent types ("Mom", "Grandma"). That is how the sample notes work today. Recommendation: keep it.
4. **iPhone backups (for the attorney list).** Files in the app's document folder are included in a person's own iPhone/iCloud backup by default. Not our servers, and it protects recordings from a lost phone, but CLAUDE.md puts "cloud backup" out of scope until legal review. Add this to the attorney questions; no action is needed now.

## 6. Risks and things to know

- **The web preview will not show saved data.** SQLite on the web needs extra setup (a wasm file and special server headers; see the docs). The phone now works with Expo Go on SDK 58, so the phone is the test device for this work. We will not spend effort on the web preview.
- **Reinstalling the app deletes the saved data**, since everything lives on the phone. There is no backup in v1. Worth telling testers.
- **Voice recordings are irreplaceable.** That is why they go in the document folder and not the cache folder, and why deleting a child must also delete their files (otherwise orphaned recordings pile up).
- **Store the recording's file *name*, not its full path.** The full path of the app's folder can change when the app is updated, so the app rebuilds the path each time. (This is a design choice of mine, standard practice, not a statement from Expo's docs.)
- **A recording may pick up background voices.** The explainer screen can say, in kind words, to record in a quiet moment. Wording is for the copy step, not the code step.
- **Strings file:** all new screens read their words from `mobile/src/strings/`, so Spanish stays possible. The remaining old screens still need converting; this can happen in between steps.

## 7. Facts checked in Expo's SDK 58 docs (November 19, 2026)

- `expo-sqlite`: install with `npx expo install expo-sqlite`; included in Expo Go; supports a provider with a start-up function that checks a stored version number (`PRAGMA user_version`) and applies numbered migrations. Web needs a Metro (bundler) config and special headers. <https://docs.expo.dev/versions/v58.0.0/sdk/sqlite.md>
- `expo-audio`: install with `npx expo install expo-audio`; included in Expo Go; recorder via `useAudioRecorder`, permission via `AudioModule.requestRecordingPermissionsAsync()`, a time limit via `record({ forDuration: seconds })`, playing in silent mode via `setAudioModeAsync({ playsInSilentMode: true })`. The iPhone permission wording is set by the `microphonePermission` option of the `expo-audio` config plugin in `app.json`. **Recordings go to the cache folder by default, and the system may delete cache files; passing `directory: 'document'` keeps them safe.** <https://docs.expo.dev/versions/v58.0.0/sdk/audio.md>
- `expo-file-system`: `Paths.availableDiskSpace` gives free space in bytes (iOS and Android); `Paths.document` is the folder "safe from being deleted by the system". <https://docs.expo.dev/versions/v58.0.0/sdk/filesystem.md>

## 8. Rules check (CLAUDE.md non-negotiables)

| Rule | How this plan keeps it |
|---|---|
| 1 Parent is the only account holder | No accounts at all |
| 2 Children never type, record or photograph | Recording exists only on parent screens |
| 3 All data stays on the device | SQLite and local files; no servers (see decision 4 on iPhone backups) |
| 4 Store only nickname and age band | Table above |
| 5 No analytics or tracking | No such package is added |
| 6 No counts, "seen" markers, badges | No play counts, no "heard" state anywhere |
| 7 No AI reading children's work | None used |
| 9 Only parents record; about 2 minutes; check storage | `forDuration` cap; `availableDiskSpace` check before saving |
| 10 Explain why the app wants the microphone, kindly | Explainer screen before the iPhone's popup, plus the `microphonePermission` wording |
| 12 Nothing outside the current phase | Photos, stickers, doodles, printing stay held |

## 9. Next action

Maribel confirms the four decisions in section 5, then Step 1 starts (ask first before installing `expo-sqlite`).
