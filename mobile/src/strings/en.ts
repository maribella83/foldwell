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

  /** The parent's page for one child (only the parts converted so far). */
  childPage: {
    writeNote: (nickname: string) => `Write a note to ${nickname}`,
    /** Shown to a child with a Note Box. */
    comingSoonNoteBox:
      'Photographing a handwritten note and recording your voice are on the way in a coming update.',
    /** Shown to a child with a Notebook, whose notes can't be written yet. */
    comingSoonNotebookTitle: 'Writing notes comes next',
    comingSoonNotebook:
      'Notes for the Notebook are on the way in a coming update.',
    comingSoonNoteBoxTitle: 'More ways to write are coming',
    /** Read aloud for one note in the list. */
    noteA11y: (from: string, text: string) => `From ${from}: ${text}`,
    noteFrom: (from: string) => `From ${from}`,
  },

  /** The "New note" sheet a parent writes in. */
  noteForm: {
    title: 'New note',
    fromLabel: 'Who is this note from?',
    fromHelp: 'The name your child knows you by, like Mom, Dad or Grandma.',
    fromPlaceholder: 'Mom, Dad, Grandma…',
    textLabel: 'What would you like to say?',
    textHelp: 'Short and sweet is perfect. Your child will see it in big letters.',
    textPlaceholder: 'Write your note here…',
    lettersLeft: (count: number) => `${count} letters left`,
    envelopeLabel: 'Pick an envelope',
    envelopeHelp: 'Just for fun. It sets the color of the envelope in the box.',
    envelopeNames: {
      butter: 'Butter',
      mint: 'Mint',
      blush: 'Blush',
    },
    /** Read aloud for each envelope choice, e.g. "Mint envelope". */
    envelopeA11y: (colorName: string) => `${colorName} envelope`,
    save: (nickname: string) => `Put it in ${nickname}’s box`,
    errorFrom: 'Add who the note is from.',
    errorText: 'Write a few words first.',
  },

  /** A note opened in the Note Box (the child's side). */
  kidNote: {
    from: (from: string) => `From ${from}`,
    backToBox: 'Back to my box',
    missing: 'This note isn’t here.',
  },

  /** Only shown while developing, never in a store build. */
  dev: {
    loadSampleFamily: 'Load sample family (testing only)',
  },
};
