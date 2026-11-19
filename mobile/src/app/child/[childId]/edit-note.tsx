/**
 * Change or delete a note a parent already wrote. Slides up as a sheet over
 * the child's page. The note keeps its place in the box.
 *
 * Deleting asks first, right here on the screen (not a pop-up), and says
 * plainly that it can't be undone. Parents only: the kid view has no way
 * to get here.
 */
import { router, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { ScrollView, type ScrollViewInstance, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ModalTopBar, SHEET_EDGES } from '@/components/parent/modal-top-bar';
import { NoteForm } from '@/components/parent/note-form';
import { ParentButton } from '@/components/parent/parent-button';
import { useChild, useFamily, useNote } from '@/data/family';
import { useReduceMotion } from '@/hooks/use-reduce-motion';
import { strings } from '@/strings';
import { fonts, palette, radius, space } from '@/theme/tokens';

export default function EditNoteScreen() {
  const { childId, noteId } = useLocalSearchParams<{ childId: string; noteId: string }>();
  const { updateNote, removeNote } = useFamily();
  const child = useChild(childId);
  const note = useNote(childId, noteId);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const deleted = useRef(false);
  const scrollRef = useRef<ScrollViewInstance>(null);
  const reduceMotion = useReduceMotion();

  if (!child || !note) {
    return (
      <SafeAreaView style={styles.safeArea} edges={SHEET_EDGES}>
        <ModalTopBar title={strings.noteEdit.title} onCancel={() => router.back()} />
        <View style={styles.content}>
          <Text style={styles.missing}>{strings.noteEdit.missing}</Text>
        </View>
      </SafeAreaView>
    );
  }

  function handleDelete() {
    if (!child || !note || deleted.current) return;
    deleted.current = true;
    removeNote(child.id, note.id);
    router.back();
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={SHEET_EDGES}>
      <ModalTopBar title={strings.noteEdit.title} onCancel={() => router.back()} />
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets
      >
        <NoteForm
          initialFrom={note.from}
          initialEnvelope={note.envelope}
          initialText={note.text}
          submitLabel={strings.noteEdit.saveChanges}
          onSubmit={(input) => {
            updateNote(child.id, note.id, input);
            router.back();
          }}
        />

        <View style={styles.deleteArea}>
          {confirmingDelete ? (
            <View
              style={styles.confirm}
              accessibilityLiveRegion="polite"
              // Bring the question into view; it opens near the bottom.
              onLayout={() => scrollRef.current?.scrollToEnd({ animated: !reduceMotion })}
            >
              <Text style={styles.confirmTitle}>{strings.noteEdit.confirmTitle}</Text>
              <Text style={styles.confirmBody}>{strings.noteEdit.confirmBody(child.nickname)}</Text>
              <View style={styles.confirmButtons}>
                <ParentButton
                  variant="secondary"
                  label={strings.noteEdit.keep}
                  onPress={() => setConfirmingDelete(false)}
                />
                <ParentButton
                  variant="danger"
                  label={strings.noteEdit.confirmDelete}
                  onPress={handleDelete}
                />
              </View>
            </View>
          ) : (
            <ParentButton
              variant="dangerQuiet"
              label={strings.noteEdit.deleteQuiet}
              onPress={() => setConfirmingDelete(true)}
            />
          )}
        </View>
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
  deleteArea: {
    borderTopWidth: 1,
    borderTopColor: palette.line,
    paddingTop: space.lg,
  },
  confirm: {
    gap: space.sm,
    padding: space.md,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: palette.danger,
    backgroundColor: palette.white,
  },
  confirmTitle: {
    fontFamily: fonts.uiExtraBold,
    fontSize: 18,
    color: palette.danger,
  },
  confirmBody: {
    fontFamily: fonts.ui,
    fontSize: 15,
    lineHeight: 21,
    color: palette.ink,
  },
  confirmButtons: {
    gap: space.sm,
    marginTop: space.sm,
  },
  missing: {
    fontFamily: fonts.uiBold,
    fontSize: 20,
    color: palette.ink,
  },
});
