/**
 * One opened note in the Note Box (ages 4–8). FAKE data for now.
 *
 * The address /kid/sam/note/note-1 opens note "note-1" from Sam's box.
 * The note is looked up only inside that child's box, so a link can't
 * open another child's note.
 *
 * Built for a child and a grown-up looking at one screen together:
 * big picture, big text, big play button, big way back.
 */
import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackButton } from '@/components/note-box/back-button';
import { NotePicture } from '@/components/note-box/note-picture';
import { PlayButton } from '@/components/note-box/play-button';
import { findNoteForChild } from '@/data/sample-notes';
import { envelopeColors, fonts, fontSize, palette, radius, space } from '@/theme/tokens';

export default function NoteScreen() {
  const { childId, noteId } = useLocalSearchParams<{ childId: string; noteId: string }>();
  const note = findNoteForChild(childId, noteId);

  function goBackToBox() {
    // If the note was opened from a link (nothing to go back to), go to the box.
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace({ pathname: '/kid/[childId]', params: { childId } });
    }
  }

  if (!note) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <BackButton label="Back to my box" onPress={goBackToBox} />
          <Text style={styles.missing}>This note isn’t here.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const colors = envelopeColors[note.envelope];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <BackButton label="Back to my box" onPress={goBackToBox} />

        <View style={[styles.card, { backgroundColor: colors.paper }]}>
          <Text style={[styles.from, { color: colors.ink }]} accessibilityRole="header">
            From {note.from}
          </Text>

          <NotePicture scene={note.picture} />

          <Text style={[styles.text, { color: colors.ink }]}>{note.text}</Text>

          {/* Placeholder until parent audio notes are built (Phase 3). */}
          <PlayButton from={note.from} onPress={() => {}} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.kidBackground,
  },
  content: {
    padding: space.lg,
    gap: space.lg,
    maxWidth: 560,
    width: '100%',
    alignSelf: 'center',
  },
  card: {
    borderRadius: radius.lg,
    padding: space.lg,
    gap: space.lg,
  },
  from: {
    fontFamily: fonts.uiExtraBold,
    fontSize: fontSize.kidBody,
  },
  text: {
    fontFamily: fonts.uiBold,
    fontSize: 28,
    lineHeight: 28 * 1.35,
  },
  missing: {
    fontFamily: fonts.uiBold,
    fontSize: fontSize.kidBody,
    color: palette.ink,
  },
});
