/**
 * The kid view's home: a child's Note Box (ages 4–8), or for ages 9+ a
 * placeholder Notebook cover until the Notebook is built.
 *
 * What's deliberately missing: no note counts, no "new" badges, no
 * empty-box guilt, no timers. Tapping an envelope opens that note.
 *
 * Leaving: the swipe-back gesture is off (root layout) and Android's back
 * button does nothing here, so the only way out is pressing and holding
 * "Grown-ups" at the top.
 */
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback } from 'react';
import { BackHandler, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GrownUpsGate } from '@/components/kid/grown-ups-gate';
import { NoteBox } from '@/components/note-box/note-box';
import { NotebookCover } from '@/components/notebook/notebook-cover';
import { containerFor } from '@/constants/age-bands';
import { useChild } from '@/data/family';
import { notesForChild } from '@/data/sample-notes';
import { fonts, fontSize, palette, space } from '@/theme/tokens';

const MAX_BOX_WIDTH = 420;
const MAX_COVER_WIDTH = 280;

export default function KidHomeScreen() {
  const { childId } = useLocalSearchParams<{ childId: string }>();
  const child = useChild(childId);
  const { width: screenWidth } = useWindowDimensions();
  // Floor of 240: the first web render reports a 0-wide window, and a
  // negative width breaks the drawing. Real phones are 320+ wide.
  const contentWidth = Math.max(screenWidth - space.lg * 2, 240);

  // Android's back button: ignored while this screen is showing.
  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener('hardwareBackPress', () => true);
      return () => subscription.remove();
    }, []),
  );

  function leave() {
    if (router.canGoBack()) {
      router.back();
    } else if (child) {
      // Opened from a link with nothing behind it: go to the child's parent page.
      router.replace({ pathname: '/child/[childId]', params: { childId: child.id } });
    } else {
      router.replace('/');
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topBar}>
        <GrownUpsGate onLeave={leave} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {!child ? (
          <Text style={styles.greeting}>This box isn’t here.</Text>
        ) : containerFor(child.ageBand) === 'noteBox' ? (
          <NoteBoxHome
            childId={child.id}
            nickname={child.nickname}
            width={Math.min(contentWidth, MAX_BOX_WIDTH)}
          />
        ) : (
          <View style={styles.notebook}>
            <NotebookCover width={Math.min(contentWidth, MAX_COVER_WIDTH)} name={child.nickname} />
            <Text style={styles.notebookTitle} accessibilityRole="header">
              Hi, {child.nickname}.
            </Text>
            <Text style={styles.notebookBody}>
              Your notebook is almost ready. Notes from your family will show up here.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function NoteBoxHome({ childId, nickname, width }: { childId: string; nickname: string; width: number }) {
  const notes = notesForChild(childId);

  return (
    <>
      <Text style={styles.greeting} accessibilityRole="header">
        Hi, {nickname}!
      </Text>
      <Text style={styles.hint}>
        {notes.length > 0 ? 'Tap a note to open it.' : 'Notes from your family will go in here.'}
      </Text>

      <NoteBox
        notes={notes}
        nickname={nickname}
        width={width}
        onOpen={(note) =>
          router.push({
            pathname: '/kid/[childId]/note/[noteId]',
            params: { childId, noteId: note.id },
          })
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.kidBackground,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: space.md,
    paddingTop: space.xs,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: space.lg,
    paddingTop: space.md,
    paddingBottom: space.xxl,
  },
  greeting: {
    fontFamily: fonts.uiExtraBold,
    fontSize: fontSize.kidTitle,
    color: palette.ink,
    textAlign: 'center',
  },
  hint: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 18,
    color: palette.softInk,
    textAlign: 'center',
    marginTop: space.xs,
    marginBottom: space.xl,
  },
  notebook: {
    alignItems: 'center',
    gap: space.md,
    paddingTop: space.md,
  },
  notebookTitle: {
    fontFamily: fonts.noteBold,
    fontSize: fontSize.title,
    color: palette.ink,
    marginTop: space.sm,
  },
  notebookBody: {
    fontFamily: fonts.note,
    fontSize: fontSize.body,
    lineHeight: 25,
    color: palette.softInk,
    textAlign: 'center',
    maxWidth: 320,
  },
});
