/**
 * The family: the children a parent writes to.
 *
 * FAKE starting data, kept in memory only. Adding, editing, and removing a
 * child works while the app is open and resets when it closes. When the
 * on-device database arrives, only the inside of FamilyProvider changes;
 * screens keep calling useFamily() the same way.
 *
 * Per the privacy rules, a child is only ever a nickname + age band.
 */
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

import type { AgeBand } from '@/constants/age-bands';

export type Child = {
  id: string;
  nickname: string;
  ageBand: AgeBand;
};

export type ChildInput = Omit<Child, 'id'>;

export const NICKNAME_MAX_LENGTH = 20;

/** A 6-year-old, a little one, and a teen. Sam has sample notes; Bea's box is empty. */
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

type FamilyContextValue = {
  kids: Child[];
  getChild: (id: string | undefined) => Child | undefined;
  addChild: (input: ChildInput) => Child;
  updateChild: (id: string, input: ChildInput) => void;
  removeChild: (id: string) => void;
};

const FamilyContext = createContext<FamilyContextValue | null>(null);

export function FamilyProvider({ children }: { children: ReactNode }) {
  const [kids, setKids] = useState<Child[]>(sampleFamily);

  const getChild = useCallback((id: string | undefined) => kids.find((kid) => kid.id === id), [kids]);

  const addChild = useCallback((input: ChildInput) => {
    const child: Child = {
      id: makeId(),
      nickname: cleanNickname(input.nickname),
      ageBand: input.ageBand,
    };
    setKids((current) => [...current, child]);
    return child;
  }, []);

  const updateChild = useCallback((id: string, input: ChildInput) => {
    setKids((current) =>
      current.map((kid) =>
        kid.id === id
          ? { ...kid, nickname: cleanNickname(input.nickname), ageBand: input.ageBand }
          : kid,
      ),
    );
  }, []);

  const removeChild = useCallback((id: string) => {
    setKids((current) => current.filter((kid) => kid.id !== id));
  }, []);

  const value = useMemo(
    () => ({ kids, getChild, addChild, updateChild, removeChild }),
    [kids, getChild, addChild, updateChild, removeChild],
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
