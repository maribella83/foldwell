/**
 * The family: the children a parent writes to, and the notes they write.
 *
 * Children and notes are saved in the on-device database (see database.ts),
 * so they are still there after the app is closed. A fresh install starts
 * empty. Screens use useFamily() to read and change both.
 *
 * The lists on screen are kept in memory too, so screens update instantly;
 * every change is written to the database first, and only then shown.
 * (Writing one tiny row is instant. Expo's docs only warn against heavy
 * work with these "sync" commands.)
 *
 * Per the privacy rules, a child is only ever a nickname + age band.
 */
import { useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

import { AGE_BANDS, type AgeBand } from '@/constants/age-bands';
import {
  cleanFrom,
  cleanText,
  insertNote,
  makeNoteId,
  readNotes,
  type Note,
  type NoteInput,
} from '@/data/notes';
import { sampleNotes } from '@/data/sample-notes';

export type Child = {
  id: string;
  nickname: string;
  ageBand: AgeBand;
};

export type ChildInput = Omit<Child, 'id'>;

export const NICKNAME_MAX_LENGTH = 20;

/**
 * A 6-year-old, a little one, and a teen. Sam has sample notes; Bea's box is empty.
 * Only used by "Load sample family", which shows while developing and never in a
 * real store build. A real family starts with an empty app.
 */
const sampleFamily: Child[] = [
  { id: 'sam', nickname: 'Sam', ageBand: '4-8' },
  { id: 'bea', nickname: 'Bea', ageBand: '4-8' },
  { id: 'leo', nickname: 'Leo', ageBand: '13+' },
];

/** Trims the ends and squashes double spaces ("  Sam   J " -> "Sam J"). */
export function cleanNickname(raw: string): string {
  return raw.trim().replace(/\s+/g, ' ');
}

/** A space suggests a full name. We only gently mention it; "Mary Kate" is fine. */
export function looksLikeFullName(raw: string): boolean {
  return cleanNickname(raw).includes(' ');
}

export type ChildFormErrors = {
  nickname?: string;
  ageBand?: string;
};

/** Returns an empty object when the child can be saved. */
export function checkChild(
  nickname: string,
  ageBand: AgeBand | null,
  kids: Child[],
  editingId?: string,
): ChildFormErrors {
  const errors: ChildFormErrors = {};
  const name = cleanNickname(nickname);

  if (!name) {
    errors.nickname = 'Add a nickname first.';
  } else if (name.length > NICKNAME_MAX_LENGTH) {
    errors.nickname = `Keep it to ${NICKNAME_MAX_LENGTH} letters or fewer.`;
  } else {
    const twin = kids.find(
      (kid) =>
        kid.id !== editingId && kid.nickname.toLocaleLowerCase() === name.toLocaleLowerCase(),
    );
    if (twin) {
      errors.nickname = `You already have a ${twin.nickname}. Try a different nickname so their notes don’t get mixed up.`;
    }
  }

  if (!ageBand) {
    errors.ageBand = 'Choose an age range.';
  }

  return errors;
}

function makeId(): string {
  return `child-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

/** One row as it sits in the database table. */
type ChildRow = {
  id: string;
  nickname: string;
  age_band: string;
};

function isAgeBand(value: string): value is AgeBand {
  return (AGE_BANDS as readonly string[]).includes(value);
}

/** Reads every child, oldest first. A row with an unknown age band is skipped, not trusted. */
function readChildren(db: SQLiteDatabase): Child[] {
  const rows = db.getAllSync<ChildRow>(
    'SELECT id, nickname, age_band FROM children ORDER BY created_at, rowid',
  );
  const kids: Child[] = [];
  for (const row of rows) {
    if (isAgeBand(row.age_band)) {
      kids.push({ id: row.id, nickname: row.nickname, ageBand: row.age_band });
    }
  }
  return kids;
}

function insertChild(db: SQLiteDatabase, child: Child) {
  db.runSync(
    'INSERT INTO children (id, nickname, age_band, created_at) VALUES (?, ?, ?, ?)',
    child.id,
    child.nickname,
    child.ageBand,
    Date.now(),
  );
}

/** Handed out when a child has no notes, so "no notes" is always the same empty list. */
const NO_NOTES: Note[] = [];

type FamilyContextValue = {
  kids: Child[];
  getChild: (id: string | undefined) => Child | undefined;
  addChild: (input: ChildInput) => Child;
  updateChild: (id: string, input: ChildInput) => void;
  removeChild: (id: string) => void;
  /** A child's notes, newest first. Empty if the child has none (or doesn't exist). */
  notesForChild: (childId: string | undefined) => Note[];
  /** Looks only inside this child's box, so one child's link can't open another's note. */
  findNote: (childId: string | undefined, noteId: string | undefined) => Note | undefined;
  addNote: (childId: string, input: NoteInput) => Note;
  /** For testing while developing only: adds Sam, Bea and Leo (skips any already there). */
  loadSampleFamily: () => void;
};

const FamilyContext = createContext<FamilyContextValue | null>(null);

export function FamilyProvider({ children }: { children: ReactNode }) {
  const db = useSQLiteContext();
  // The function form runs once, on the first render: read what is saved.
  const [kids, setKids] = useState<Child[]>(() => readChildren(db));
  const [notes, setNotes] = useState<Note[]>(() => readNotes(db));

  const getChild = useCallback((id: string | undefined) => kids.find((kid) => kid.id === id), [kids]);

  // Sorts the notes into one list per child. A Map (not a plain object), so
  // an id like "constructor" can't pick up a built-in property.
  const notesByChild = useMemo(() => {
    const map = new Map<string, Note[]>();
    for (const note of notes) {
      const list = map.get(note.childId);
      if (list) {
        list.push(note);
      } else {
        map.set(note.childId, [note]);
      }
    }
    return map;
  }, [notes]);

  const notesForChild = useCallback(
    (childId: string | undefined) => (childId ? (notesByChild.get(childId) ?? NO_NOTES) : NO_NOTES),
    [notesByChild],
  );

  const findNote = useCallback(
    (childId: string | undefined, noteId: string | undefined) =>
      notesForChild(childId).find((note) => note.id === noteId),
    [notesForChild],
  );

  const addChild = useCallback(
    (input: ChildInput) => {
      const child: Child = {
        id: makeId(),
        nickname: cleanNickname(input.nickname),
        ageBand: input.ageBand,
      };
      insertChild(db, child);
      setKids((current) => [...current, child]);
      return child;
    },
    [db],
  );

  const updateChild = useCallback(
    (id: string, input: ChildInput) => {
      const nickname = cleanNickname(input.nickname);
      db.runSync(
        'UPDATE children SET nickname = ?, age_band = ? WHERE id = ?',
        nickname,
        input.ageBand,
        id,
      );
      setKids((current) =>
        current.map((kid) => (kid.id === id ? { ...kid, nickname, ageBand: input.ageBand } : kid)),
      );
    },
    [db],
  );

  const removeChild = useCallback(
    (id: string) => {
      // One unit: the child's notes and the child go together, or neither does.
      // (Later, this will also delete the child's voice files.)
      db.withTransactionSync(() => {
        db.runSync('DELETE FROM notes WHERE child_id = ?', id);
        db.runSync('DELETE FROM children WHERE id = ?', id);
      });
      setKids((current) => current.filter((kid) => kid.id !== id));
      setNotes((current) => current.filter((note) => note.childId !== id));
    },
    [db],
  );

  const addNote = useCallback(
    (childId: string, input: NoteInput) => {
      const note: Note = {
        id: makeNoteId(),
        childId,
        from: cleanFrom(input.from),
        envelope: input.envelope,
        text: cleanText(input.text),
        createdAt: Date.now(),
      };
      insertNote(db, note);
      // Newest first, matching the order the database hands them back.
      setNotes((current) => [note, ...current]);
      return note;
    },
    [db],
  );

  const loadSampleFamily = useCallback(() => {
    const takenNames = new Set(kids.map((kid) => kid.nickname.toLocaleLowerCase()));
    const toAdd = sampleFamily.filter(
      (sample) =>
        !kids.some((kid) => kid.id === sample.id) &&
        !takenNames.has(sample.nickname.toLocaleLowerCase()),
    );
    if (toAdd.length === 0) return;

    // Sam's sample notes come along. Each is stamped a second earlier than
    // the one before, so they sit in the box in the order they're listed.
    const now = Date.now();
    const toAddNotes: Note[] = [];
    for (const sample of toAdd) {
      (sampleNotes[sample.id] ?? []).forEach((input, index) => {
        toAddNotes.push({
          id: `${sample.id}-sample-${index + 1}`,
          childId: sample.id,
          from: input.from,
          envelope: input.envelope,
          text: input.text,
          createdAt: now - index * 1000,
        });
      });
    }

    // One unit: all the children and notes are saved, or none.
    db.withTransactionSync(() => {
      for (const sample of toAdd) {
        insertChild(db, sample);
      }
      for (const note of toAddNotes) {
        insertNote(db, note);
      }
    });
    setKids((current) => [...current, ...toAdd]);
    setNotes((current) => [...toAddNotes, ...current]);
  }, [db, kids]);

  const value = useMemo(
    () => ({
      kids,
      getChild,
      addChild,
      updateChild,
      removeChild,
      notesForChild,
      findNote,
      addNote,
      loadSampleFamily,
    }),
    [
      kids,
      getChild,
      addChild,
      updateChild,
      removeChild,
      notesForChild,
      findNote,
      addNote,
      loadSampleFamily,
    ],
  );

  return <FamilyContext.Provider value={value}>{children}</FamilyContext.Provider>;
}

export function useFamily(): FamilyContextValue {
  const value = useContext(FamilyContext);
  if (!value) {
    throw new Error('useFamily() must be used inside <FamilyProvider>.');
  }
  return value;
}

/**
 * One child, for a screen about that child. Like getChild(), except that
 * right after a child is removed it keeps returning their last details, so
 * screens that are sliding away don't flash "not found" on the way out.
 */
export function useChild(childId: string | undefined): Child | undefined {
  const { getChild } = useFamily();
  const child = getChild(childId);
  const [lastSeen, setLastSeen] = useState(child);

  // Remember the latest details (React allows this "update while rendering"
  // pattern for keeping a value in sync with props).
  if (child && child !== lastSeen) {
    setLastSeen(child);
  }

  return child ?? (lastSeen?.id === childId ? lastSeen : undefined);
}
