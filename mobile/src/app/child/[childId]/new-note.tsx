/**
 * Write a note to a child. Slides up as a sheet over the child's page.
 *
 * Parents only: the child never sees this screen. A saved note goes straight
 * into the child's Note Box and is still there after the app closes.
 */
import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ModalTopBar, SHEET_EDGES } from '@/components/parent/modal-top-bar';
import { NoteForm } from '@/components/parent/note-form';
import { useChild, useFamily } from '@/data/family';
import { ENVELOPE_CHOICES } from '@/data/notes';
import { strings } from '@/strings';
import { fonts, palette, space } from '@/theme/tokens';

export default function NewNoteScreen() {
  const { childId } = useLocalSearchParams<{ childId: string }>();
  const { addNote, notesForChild } = useFamily();
  const child = useChild(childId);

  if (!child) {
    return (
      <SafeAreaView style={styles.safeArea} edges={SHEET_EDGES}>
        <ModalTopBar title={strings.noteForm.title} onCancel={() => router.back()} />
        <View style={styles.content}>
          <Text style={styles.missing}>This child isn’t in your family list.</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Start with the "from" used last in this box, and rotate the envelope
  // color so a box doesn't fill up with one color. Both are easy to change.
  const existing = notesForChild(child.id);
  const initialFrom = existing[0]?.from ?? '';
  const initialEnvelope = ENVELOPE_CHOICES[existing.length % ENVELOPE_CHOICES.length];

  return (
    <SafeAreaView style={styles.safeArea} edges={SHEET_EDGES}>
      <ModalTopBar title={strings.noteForm.title} onCancel={() => router.back()} />
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets
      >
        <NoteForm
          nickname={child.nickname}
          initialFrom={initialFrom}
          initialEnvelope={initialEnvelope}
          onSubmit={(input) => {
            addNote(child.id, input);
            router.back();
          }}
        />
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
    paddingBottom: space.xxl,
    gap: space.xl,
    maxWidth: 560,
    width: '100%',
    alignSelf: 'center',
  },
  missing: {
    fontFamily: fonts.uiBold,
    fontSize: 20,
    color: palette.ink,
  },
});
