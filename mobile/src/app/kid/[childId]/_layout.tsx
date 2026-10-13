/**
 * The kid view's own little stack: the child's Note Box (or Notebook) and
 * the notes opened from it.
 *
 * Inside here, swiping back from a note to the box is fine. Leaving the
 * kid view altogether is not: the root layout turns that swipe off, and
 * grown-ups leave with the hold-to-leave button instead.
 */
import { Stack } from 'expo-router';

import { palette } from '@/theme/tokens';

export default function KidLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: palette.kidBackground },
      }}
    />
  );
}
