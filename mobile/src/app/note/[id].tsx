/**
 * One opened note in the Note Box (ages 4–8). FAKE data for now.
 *
 * The file name [id].tsx means "this screen takes an id from the link",
 * so /note/note-1 opens the note whose id is "note-1".
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
import { findSampleNote } from '@/data/sample-notes';
import { envelopeColors, fonts, fontSize, palette, radius, space } from '@/theme/tokens';

function goBackToBox() {
  // If the note was opened from a link (nothing to go back to), go home.
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace('/');
  }
}

export default function NoteScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const note = findSampleNote(id);

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
