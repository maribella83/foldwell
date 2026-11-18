/**
 * Every word the app shows, in English.
 *
 * Rules for this file:
 * - Write whole sentences. Never build a sentence out of pieces in a
 *   screen ("Sam" + "'s Note Box"), because other languages put the words
 *   in a different order.
 * - When a sentence needs a name or a number, make it a small function
 *   (like `opensPage` below). The Spanish file gets its own version.
 * - "a11y" means accessibility: the words a screen reader (VoiceOver on
 *   iPhone, TalkBack on Android) reads aloud for people who can't see
 *   the screen.
 * - The app's name is NOT written here. It comes from constants/app.ts.
 *
 * Sections get added one screen at a time. Wording that still lives in
 * constants/age-bands.ts moves here in a later step.
 */
export const en = {
  family: {
    title: 'Your family',
    subtitleWithKids: 'Who would you like to write to?',
    subtitleEmpty: 'Add a child to make their Note Box or Notebook.',
    privacy: 'Everything stays on this phone. No ads, no tracking.',
  },

  childCard: {
    /** Small gray line under the nickname, e.g. "Ages 4–8 · Note Box". */
    meta: (ageLabel: string, containerName: string) => `${ageLabel} · ${containerName}`,
    /** Read aloud for the whole card. `ageSpoken` is e.g. "ages 4 to 8". */
    a11yLabel: (nickname: string, ageSpoken: string, containerName: string) =>
      `${nickname}, ${ageSpoken}, ${containerName}`,
    a11yHint: (nickname: string) => `Opens ${nickname}’s page`,
    addChild: 'Add a child',
  },
};
