/**
 * Age bands: the only thing Foldwell knows about a child's age.
 *
 * The bands follow the legal line (under 13 vs. 13 and up, from COPPA,
 * the US children's privacy law), so every privacy rule lines up with a
 * band. Which Notebook look a young person sees first is a separate,
 * switchable default, never tied to these bands.
 */

export const AGE_BANDS = ['4-8', '9-12', '13+'] as const;

export type AgeBand = (typeof AGE_BANDS)[number];

/** What the child sees: a Note Box (4–8) or a Notebook (9+). */
export type ContainerKind = 'noteBox' | 'notebook';

export const containerNames: Record<ContainerKind, string> = {
  noteBox: 'Note Box',
  notebook: 'Notebook',
};

type AgeBandInfo = {
  /** Shown on screen. */
  label: string;
  /** Read by VoiceOver / TalkBack ("4–8" can be read as "4 minus 8"). */
  spoken: string;
  container: ContainerKind;
  /** One line for the parent explaining what this band gets. */
  blurb: string;
};

export const ageBandInfo: Record<AgeBand, AgeBandInfo> = {
  '4-8': {
    label: 'Ages 4–8',
    spoken: 'ages 4 to 8',
    container: 'noteBox',
    blurb: 'Your voice and pictures do the talking. Big buttons, no reading needed.',
  },
  '9-12': {
    label: 'Ages 9–12',
    spoken: 'ages 9 to 12',
    container: 'notebook',
    blurb: 'Sticky notes and photos. They decide what goes in the keepsake.',
  },
  '13+': {
    label: 'Ages 13+',
    spoken: 'ages 13 and up',
    container: 'notebook',
    blurb: 'A calmer, grown-up look. Their words are theirs to share, or not.',
  },
};

/** Under 13 means COPPA applies. Keep privacy decisions on this, not on the look. */
export function isUnder13(band: AgeBand): boolean {
  return band !== '13+';
}

export function containerFor(band: AgeBand): ContainerKind {
  return ageBandInfo[band].container;
}
