# Parent Screens: Build Audit

**Date:** October 12, 2026 · **Phase:** 1, Foundation (family setup + navigation) · **Status:** built, browser-tested, not yet tested on a phone

---

## 1. What was built

The app now opens on a parent home screen, and each child's container sits behind it.

```
Your family (home)
├── Sam  (4–8, Note Box)  → Sam's page → "Open Sam's Note Box" → kid view → open a note
├── Bea  (4–8, Note Box)  → empty box (shows what a brand-new box looks like)
├── Leo  (13+, Notebook)  → Notebook cover placeholder
└── + Add a child         → sheet: nickname + age range
                               Sam's page → "Edit Sam's details" → sheet: change or remove
```

| Screen | File | What it does |
|---|---|---|
| Your family | `mobile/src/app/index.tsx` | Child cards (nickname, age range, Note Box or Notebook thumbnail). No counts. |
| Child page | `mobile/src/app/child/[childId]/index.tsx` | Hand-off button, what's in the box, honest "coming next" note, Edit. |
| Add a child | `mobile/src/app/add-child.tsx` | Slides up as a sheet. Nickname + age range only. |
| Edit details | `mobile/src/app/child/[childId]/edit.tsx` | Same form, plus Remove with an on-screen "are you sure". |
| Kid home | `mobile/src/app/kid/[childId]/index.tsx` | Note Box (4–8) or Notebook cover (9+), with the hold-to-leave **Grown-ups** button. |
| Kid note | `mobile/src/app/kid/[childId]/note/[noteId].tsx` | The note screen you already tested, moved to its new address. |

New building blocks: family data (`src/data/family.tsx`), age bands (`src/constants/age-bands.ts`), the marbled Notebook cover (`src/components/notebook/`), parent buttons, cards, and form (`src/components/parent/`), the Grown-ups gate (`src/components/kid/`), and a Reduce Motion helper (`src/hooks/`).

**New terms, in plain words:**
- **In-memory data:** the family list lives only while the app is open. Closing the app resets it to Sam, Bea and Leo. The database comes later. Only the inside of `FamilyProvider` will change; screens won't.
- **Sheet (modal):** a screen that slides up from the bottom (iOS) and can be swiped down to close.
- **`aria-checked`:** a label that tells screen readers (VoiceOver, TalkBack) whether a choice is selected.

---

## 2. Decisions I made (please confirm or change)

1. **Age bands are now 4–8 / 9–12 / 13+** (they were 4–8 / 9–13 / 14+). They now match the legal under-13 line (COPPA), so every privacy rule maps onto a band. Which Notebook look a child sees first (Soft Collage or Oat and Ink) should become a separate setting the young person can switch.
2. **Nothing is pre-selected** for a new child's age range. The parent picks on purpose.
3. **The full-name check only warns, it never blocks.** "Maya Rose" shows a gentle heads-up, because "Mary Kate" is a real first name.
4. **Two children can't share a nickname** (case doesn't matter), so their notes can't get mixed up.
5. **The Grown-ups button uses the same label for teens.** It could say "Parent" in the Notebook view if "Grown-ups" feels babyish to a 13-year-old. That's worth asking in the paper test.
6. **Removing a child is possible now**, with a clear warning. Today it only removes the fake in-memory entry.

---

## 3. Built to the rules (CLAUDE.md check)

| Rule | How it's met |
|---|---|
| Store only nickname + age band (rule 4) | The form asks for nothing else. The helper text says "No last names or birthdays." Autofill and autocorrect are off on the nickname field, so iOS won't suggest contact names. |
| No counts, badges, or guilt (rule 6) | No "3 notes" or "unread" anywhere. The empty box reads "Notes from your family will go in here." |
| Parent is the only account holder (rule 1) | The kid view has no settings or editing, and no way out except the hold-to-leave button. |
| Nothing purchasable from the kid view (rule 6) | There's nothing to buy anywhere. |
| No new packages (rule 5) | None added. Everything uses packages already installed. |
| Colors from the theme | New colors (`line`, `placeholder`, `danger`, `notebookCover`) were added to `tokens.ts`. No screen hardcodes a hex value. |
| Name from constants | "Foldwell" comes from `APP_NAME`. |
| Reduced motion | No animations were added. The one scroll movement (on Remove) turns off when Reduce Motion is on. |
| Screen reader labels | Every button, card, and radio has a spoken label. Age ranges are read as "ages 4 to 8", not "4 minus 8". |
| Touch targets | Parent buttons are 52pt and cards 72–92pt (Apple's minimum is 44). The kid view's 56pt and 88pt sizes are unchanged. |
| Original art | The Notebook marble, thumbnails, and lock icon are drawn in code from basic shapes. |
| Kid view can't be escaped by accident | iPhone swipe-back is off, and Android's back button is ignored on the box. A quick tap on Grown-ups does nothing; leaving takes a 1.5-second hold. |

---

## 4. Bugs found and fixed during testing

| # | Bug | Fix |
|---|---|---|
| 1 | Removing a child made the two closing screens flash "This child isn't in your family list" while sliding away. | New `useChild()` keeps showing the last known details during the exit. |
| 2 | The duplicate-name message copied the typed spelling: "You already have a sam." | It now uses the existing child's spelling: "a Sam". |
| 3 | The radio buttons didn't report "selected" to screen readers on web. | Switched to `aria-checked`, which works on iPhone, Android, and web. |
| 4 | Notebook children got a broken sentence: "Typing a note, photographing a handwritten one are on the way." | Separate, grammatical sentences for Note Box and Notebook. |
| 5 | The full-name heads-up showed every time a parent opened Edit for a two-word name. | It now shows only while the name is being changed. |
| 6 | The "Remove Leo?" confirmation opened partly below the screen. | It scrolls into view (instantly if Reduce Motion is on). |
| 7 | **Existing bug from before today:** the Note Box got a width of −48 on the very first web render (the screen width reads 0 at first). | The width now has a 240pt floor; real phones are 320pt and up. |
| 8 | The nickname placeholder ("Sam, Bug, Mimi…") was as dark as typed text, so the field looked already filled in. | New lighter `placeholder` color. |
| 9 | A lookup by an id like "constructor" could return a built-in JavaScript value instead of notes. | Uses `Object.hasOwn`. |
| 10 | Tapping Save twice quickly could add the same child twice, or run Remove twice. | Each can only fire once. |

---

## 5. What was tested (web preview, iPhone-sized window)

- **Passed:** home shows three children with the right thumbnails, and no counts.
- **Passed:** child page, then Open Note Box, then the kid view.
- **Passed:** a quick tap on Grown-ups stays in the kid view.
- **Passed:** holding Grown-ups shows "Keep holding…" and then returns to the child's page.
- **Passed:** Save on an empty form shows both errors, and the age options get a red outline.
- **Passed:** the duplicate "SAM" is caught: "You already have a Sam."
- **Passed:** the full-name heads-up shows for "Maya Rose", and saving adds her exactly once.
- **Passed:** Maya's page and Notebook kid view show the cover with her name.
- **Passed:** Edit, changing 9–12 to 4–8, shows "Maya Rose will see a Note Box instead of a Notebook."
- **Passed:** Remove, then confirm, returns to Your family with Maya gone.
- **Passed:** Bea's empty box is calm, with no guilt wording.
- **Passed:** a link to Sam's note from Bea's box shows "This note isn't here", so one child's link can't open another's note.
- **Passed:** an unknown child shows a friendly message, and "Back to your family" works with no history.
- **Passed:** type check (`tsc`): 0 errors. Lint: 0 problems. No console errors after the fixes, and no route warnings.
- **Needs attention (existing, not from today):** `expo-doctor` reports 6 Expo packages with small patch updates. Run `npx expo install --check` when you're ready; I didn't install anything.

---

## 6. Please test on your iPhone (Expo Go)

The browser can't test these. They only work on a real phone:

1. **Swipe-back is blocked:** in Sam's Note Box, swipe from the left edge. Nothing should happen.
2. **Swipe inside the kid view works:** open a note, then swipe from the left edge. It should go back to the box.
3. **The hold works with a real finger:** a quick tap does nothing, and holding about 1.5 seconds leaves.
4. **Sheet protection:** in Add a child, type a name, then try swiping the sheet down. It shouldn't close. Cancel still works.
5. **Keyboard:** typing the nickname, the keyboard shouldn't cover the field.
6. **VoiceOver (optional):** turn it on and swipe through Your family. Each card should read like "Sam, ages 4 to 8, Note Box."
7. **Large text:** Settings > Display > Text Size at maximum. Check that "From Grandma" on the envelopes still fits.

---

## 7. Known limits and what's next

**These are by design for now:**
- The family resets when the app closes; saving waits for the database (held until Week 4).
- Grown-ups keeps small hands out but **isn't a lock**. A parent PIN needs `expo-secure-store`, a new package, so it waits for your OK.
- On web, the browser's own back button can leave the kid view. Web is only a preview, so this doesn't affect the phone app.
- "Writing notes comes next" is honest placeholder text. Writing and photographing notes are Phase 3.

**Worth planning before Spanish:** words are written directly in the screens, and English possessives like "Sam's Note Box" don't translate word for word ("La caja de notas de Sam"). Before Spanish, move all wording into one strings file with full sentences per language.

**For the attorney list:** the home screen says "Everything stays on this phone. No ads, no tracking." That's true today and must stay true. Have it reviewed with the privacy policy.

**Questions for the paper test:**
- Does "Grown-ups" feel babyish to 13+?
- Is a 1.5-second hold right? A 4-year-old shouldn't figure it out quickly, and a parent shouldn't feel stuck.
- Do parents understand the three age-range cards without help?
