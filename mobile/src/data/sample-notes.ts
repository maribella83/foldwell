/**
 * FAKE notes for building the Note Box screens. Nothing here is saved.
 * This file is replaced by the on-device database in a later step.
 *
 * Only the sample child "Sam" has notes, so Bea's empty box shows what a
 * brand-new Note Box looks like.
 */
import type { EnvelopeColor } from '@/theme/tokens';

/** Which simple placeholder picture to draw (stands in for a parent's photo). */
export type PictureScene = 'sun' | 'moon' | 'heart';

export type BoxNote = {
  id: string;
  /** Who it's from, as the child knows them ("Mom", "Dad", "Grandma"). */
  from: string;
  envelope: EnvelopeColor;
  picture: PictureScene;
  text: string;
};

const samsNotes: BoxNote[] = [
  {
    id: 'note-1',
    from: 'Mom',
    envelope: 'butter',
    picture: 'sun',
    text: 'You were so brave today. I am proud of you!',
  },
  {
    id: 'note-2',
    from: 'Dad',
    envelope: 'mint',
    picture: 'moon',
    text: 'Let’s read our dragon book together tonight.',
  },
  {
    id: 'note-3',
    from: 'Grandma',
    envelope: 'blush',
    picture: 'heart',
    text: 'I love you to the moon and back, little one.',
  },
];

const notesByChild: Record<string, BoxNote[]> = {
  sam: samsNotes,
};

const NO_NOTES: BoxNote[] = [];

export function notesForChild(childId: string | undefined): BoxNote[] {
  // hasOwn, so an id like "constructor" can't pick up a built-in property.
  return childId && Object.hasOwn(notesByChild, childId) ? notesByChild[childId] : NO_NOTES;
}

/** Looks only inside this child's box, so one child's link can't open another's note. */
export function findNoteForChild(
  childId: string | undefined,
  noteId: string | undefined,
): BoxNote | undefined {
  return notesForChild(childId).find((note) => note.id === noteId);
}
