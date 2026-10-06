/**
 * FAKE data for building the Note Box screens. Nothing here is saved.
 * This file is replaced by the on-device database in a later step.
 *
 * Per the privacy rules, a child is only ever a nickname + age band.
 */
import type { EnvelopeColor } from '@/theme/tokens';

export type AgeBand = '4-8' | '9-13' | '14+';

export type Child = {
  nickname: string;
  ageBand: AgeBand;
};

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

export const sampleChild: Child = {
  nickname: 'Sam',
  ageBand: '4-8',
};

export const sampleNotes: BoxNote[] = [
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

export function findSampleNote(id: string | undefined): BoxNote | undefined {
  return sampleNotes.find((note) => note.id === id);
}
