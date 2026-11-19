/**
 * SAMPLE notes for testing while developing. Only used by the developer-only
 * "Load sample family" button (see family.tsx), which saves these into the
 * database for Sam. A real family never sees this button or these notes.
 *
 * Only Sam gets notes, so Bea's empty box shows what a brand-new Note Box
 * looks like.
 */
import type { NoteInput } from '@/data/notes';

export const sampleNotes: Record<string, NoteInput[]> = {
  sam: [
    {
      from: 'Mom',
      envelope: 'butter',
      text: 'You were so brave today. I am proud of you!',
    },
    {
      from: 'Dad',
      envelope: 'mint',
      text: 'Let’s read our dragon book together tonight.',
    },
    {
      from: 'Grandma',
      envelope: 'blush',
      text: 'I love you to the moon and back, little one.',
    },
  ],
};
