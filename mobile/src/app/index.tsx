/**
 * Note Box home (ages 4–8). Static screen with FAKE notes (Kickoff step A6).
 *
 * What's deliberately missing: no note counts, no "new" badges, no
 * empty-box guilt, no timers. Tapping an envelope opens that note.
 */
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NoteBox } from '@/components/note-box/note-box';
import { sampleChild, sampleNotes } from '@/data/sample-notes';
import { fonts, fontSize, palette, space } from '@/theme/tokens';

const MAX_BOX_WIDTH = 420;

export default function NoteBoxScreen() {
  const { width: screenWidth } = useWindowDimensions();
  const boxWidth = Math.min(screenWidth - space.lg * 2, MAX_BOX_WIDTH);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.greeting} accessibilityRole="header">
          Hi, {sampleChild.nickname}!
        </Text>
        <Text style={styles.hint}>Tap a note to open it.</Text>

        <NoteBox
          notes={sampleNotes}
          nickname={sampleChild.nickname}
          width={boxWidth}
          onOpen={(note) =>
            router.push({ pathname: '/note/[id]', params: { id: note.id } })
          }
        />
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
    alignItems: 'center',
    paddingHorizontal: space.lg,
    paddingTop: space.xl,
    paddingBottom: space.xxl,
  },
  greeting: {
    fontFamily: fonts.uiExtraBold,
    fontSize: fontSize.kidTitle,
    color: palette.ink,
  },
  hint: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 18,
    color: palette.softInk,
    marginTop: space.xs,
    marginBottom: space.xl,
  },
});
