/**
 * Temporary "Hello" screen (Kickoff step A3).
 *
 * Its only job is to prove the theme works on a real phone: the paper
 * background, the three fonts, and one note in each note color.
 * It gets replaced when we build the real home screen.
 */
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { APP_NAME } from '@/constants/app';
import { fonts, fontSize, noteColors, palette, radius, space, type NoteKind } from '@/theme/tokens';

const sampleNotes: { kind: NoteKind; label: string; text: string }[] = [
  { kind: 'parent', label: 'PARENT NOTE', text: 'I loved hearing you laugh at breakfast today.' },
  { kind: 'folded', label: 'FOLDED NOTE', text: 'Proud of how you handled this week.' },
  { kind: 'reply', label: 'REPLY', text: 'Thank you. Love you too.' },
];

export default function HelloScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>BY CIRCLEROOTTECH</Text>
        <Text style={styles.title} accessibilityRole="header">
          Hello from {APP_NAME}
        </Text>
        <Text style={styles.subtitle}>
          Notes from home, in your own words.
        </Text>

        <View style={styles.kidCard}>
          <Text style={styles.kidText}>Hi, sweet pea!</Text>
          <Text style={styles.kidCaption}>Nunito, kid size, on the Note Box background</Text>
        </View>

        {sampleNotes.map((note) => (
          <View
            key={note.kind}
            style={[styles.note, { backgroundColor: noteColors[note.kind].background }]}
          >
            <Text style={[styles.noteLabel, { color: noteColors[note.kind].text }]}>
              {note.label}
            </Text>
            <Text style={[styles.noteText, { color: noteColors[note.kind].text }]}>
              {note.text}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.paper,
  },
  content: {
    padding: space.lg,
    gap: space.md,
  },
  eyebrow: {
    fontFamily: fonts.label,
    fontSize: fontSize.label,
    letterSpacing: 1.5,
    color: palette.softInk,
    marginTop: space.lg,
  },
  title: {
    fontFamily: fonts.noteBold,
    fontSize: fontSize.title,
    color: palette.ink,
  },
  subtitle: {
    fontFamily: fonts.noteItalic,
    fontSize: fontSize.body,
    color: palette.softInk,
    marginBottom: space.sm,
  },
  kidCard: {
    backgroundColor: palette.kidBackground,
    borderColor: palette.kraft,
    borderWidth: 2,
    borderRadius: radius.lg,
    padding: space.lg,
    gap: space.xs,
  },
  kidText: {
    fontFamily: fonts.uiExtraBold,
    fontSize: fontSize.kidTitle,
    color: palette.ink,
  },
  kidCaption: {
    fontFamily: fonts.ui,
    fontSize: fontSize.small,
    color: palette.softInk,
  },
  note: {
    borderRadius: radius.md,
    padding: space.lg,
    gap: space.sm,
  },
  noteLabel: {
    fontFamily: fonts.labelMedium,
    fontSize: fontSize.label,
    letterSpacing: 1.2,
  },
  noteText: {
    fontFamily: fonts.note,
    fontSize: fontSize.note,
    lineHeight: fontSize.note * 1.4,
  },
});
