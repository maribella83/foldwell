/**
 * One opened note in the Note Box (ages 4–8).
 *
 * The address /kid/<childId>/note/<noteId> opens one saved note. The note is
 * looked up only inside that child's box, so a link can't open another
 * child's note.
 *
 * Built for a child and a grown-up looking at one screen together: big text
 * and a big way back. The big "Hear Mom" play button isn't shown yet: no note
 * has a voice recording, and a button that does nothing is just confusing. It
 * comes back, on notes that have a voice, when recording is built.
 */
import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackButton } from '@/components/note-box/back-button';
import { useFamily } from '@/data/family';
import { strings } from '@/strings';
import { envelopeColors, fonts, fontSize, palette, radius, space } from '@/theme/tokens';

export default function NoteScreen() {
  const { childId, noteId } = useLocalSearchParams<{ childId: string; noteId: string }>();
  const { findNote } = useFamily();
  const note = findNote(childId, noteId);

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
          <BackButton label={strings.kidNote.backToBox} onPress={goBackToBox} />
          <Text style={styles.missing}>{strings.kidNote.missing}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const colors = envelopeColors[note.envelope];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <BackButton label={strings.kidNote.backToBox} onPress={goBackToBox} />

        <View style={[styles.card, { backgroundColor: colors.paper }]}>
          <Text style={[styles.from, { color: colors.ink }]} accessibilityRole="header">
            {strings.kidNote.from(note.from)}
          </Text>

          <Text style={[styles.text, { color: colors.ink }]}>{note.text}</Text>
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
