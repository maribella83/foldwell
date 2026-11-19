/**
 * Notes a parent writes for a child: the shape of a note, the checks before
 * saving, and the small functions that read and write the notes table.
 *
 * The screens don't call these directly. They go through useFamily()
 * (src/data/family.tsx), which keeps the notes on screen and in the database
 * in step.
 *
 * What a note stores: who it's from (a label the parent types, like "Mom"),
 * an envelope color, the parent's words, and when it was written. Nothing a
 * child makes. There is deliberately no "seen", "opened" or "played" field.
 */
import type { SQLiteDatabase } from 'expo-sqlite';

import { strings } from '@/strings';
import { envelopeColors, type EnvelopeColor } from '@/theme/tokens';

export type Note = {
  id: string;
  childId: string;
  /** Who it's from, as the child knows them ("Mom", "Dad", "Grandma"). */
  from: string;
  envelope: EnvelopeColor;
  text: string;
  /** When the parent wrote it, in milliseconds. Used only to order the notes. */
  createdAt: number;
};

/** What the New note form hands over. The id, child and time are added when saving. */
export type NoteInput = {
  from: string;
  envelope: EnvelopeColor;
  text: string;
};

/** Short, so "From Grandma" still fits on the strip of an envelope. */
export const FROM_MAX_LENGTH = 16;
export const NOTE_MAX_LENGTH = 1000;

export const ENVELOPE_CHOICES = Object.keys(envelopeColors) as EnvelopeColor[];

function isEnvelopeColor(value: string): value is EnvelopeColor {
  return Object.hasOwn(envelopeColors, value);
}

/** Trims the ends and squashes double spaces ("  Grandma   Joy " -> "Grandma Joy"). */
export function cleanFrom(raw: string): string {
  return raw.trim().replace(/\s+/g, ' ');
}

/** Trims the ends only, so the parent's line breaks inside the note are kept. */
export function cleanText(raw: string): string {
  return raw.trim();
}

export type NoteFormErrors = {
  from?: string;
  text?: string;
};

/**
 * Returns an empty object when the note can be saved.
 * (Later, once voice recording exists, a note will need words OR a recording.)
 */
export function checkNote(from: string, text: string): NoteFormErrors {
  const errors: NoteFormErrors = {};
  if (!cleanFrom(from)) {
    errors.from = strings.noteForm.errorFrom;
  }
  if (!cleanText(text)) {
    errors.text = strings.noteForm.errorText;
  }
  return errors;
}

export function makeNoteId(): string {
  return `note-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

/** One row as it sits in the database table. */
type NoteRow = {
  id: string;
  child_id: string;
  from_label: string;
  envelope: string;
  body: string;
  created_at: number;
};

/**
 * Reads every note, newest first. A note with an envelope color this version
 * doesn't know is still shown (in the first color) rather than hidden, because
 * a parent's words should never silently disappear.
 */
export function readNotes(db: SQLiteDatabase): Note[] {
  const rows = db.getAllSync<NoteRow>(
    'SELECT id, child_id, from_label, envelope, body, created_at FROM notes ORDER BY created_at DESC, rowid DESC',
  );
  return rows.map((row) => ({
    id: row.id,
    childId: row.child_id,
    from: row.from_label,
    envelope: isEnvelopeColor(row.envelope) ? row.envelope : ENVELOPE_CHOICES[0],
    text: row.body,
    createdAt: row.created_at,
  }));
}

export function insertNote(db: SQLiteDatabase, note: Note) {
  db.runSync(
    'INSERT INTO notes (id, child_id, from_label, envelope, body, created_at) VALUES (?, ?, ?, ?, ?, ?)',
    note.id,
    note.childId,
    note.from,
    note.envelope,
    note.text,
    note.createdAt,
  );
}
