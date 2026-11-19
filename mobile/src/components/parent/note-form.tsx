/**
 * The form for writing a note: who it's from, the words, and an envelope.
 *
 * Behavior (the same as the Add a child form, so it feels familiar):
 * - Errors only appear after the first tap on Save, then update as you
 *   type, so nobody gets scolded before they've started.
 * - Once something is typed, swiping the sheet down is turned off (iOS),
 *   so a stray swipe can't throw the parent's words away. Cancel still works.
 * - Save can only fire once, so a double tap can't save the note twice.
 *
 * "Who it's from" starts filled in with the last name used in this child's
 * box (usually the same parent writes again). It's plain text, easy to change.
 */
import { Stack } from 'expo-router';
import { useRef, useState } from 'react';
import { AccessibilityInfo, StyleSheet, Text, TextInput, View } from 'react-native';

import {
  checkNote,
  cleanFrom,
  FROM_MAX_LENGTH,
  NOTE_MAX_LENGTH,
  type NoteFormErrors,
  type NoteInput,
} from '@/data/notes';
import { strings } from '@/strings';
import { fonts, palette, radius, space, type EnvelopeColor } from '@/theme/tokens';

import { EnvelopePicker } from './envelope-picker';
import { ParentButton } from './parent-button';

/** Show the "letters left" line only when the end is near, so it's never nagging. */
const SHOW_LETTERS_LEFT_BELOW = 100;

type Props = {
  nickname: string;
  /** Pre-filled "from" and envelope for a new note. */
  initialFrom: string;
  initialEnvelope: EnvelopeColor;
  onSubmit: (input: NoteInput) => void;
};

export function NoteForm({ nickname, initialFrom, initialEnvelope, onSubmit }: Props) {
  const [from, setFrom] = useState(initialFrom);
  const [text, setText] = useState('');
  const [envelope, setEnvelope] = useState<EnvelopeColor>(initialEnvelope);
  const [triedToSave, setTriedToSave] = useState(false);
  const submitted = useRef(false);

  const errors = checkNote(from, text);
  const shownErrors: NoteFormErrors = triedToSave ? errors : {};
  // Typing a "from" doesn't count as work worth protecting, since it's pre-filled.
  const dirty = text.trim().length > 0 || cleanFrom(from) !== cleanFrom(initialFrom);
  const lettersLeft = NOTE_MAX_LENGTH - text.length;

  function handleSave() {
    if (submitted.current) return;
    if (errors.from || errors.text) {
      setTriedToSave(true);
      AccessibilityInfo.announceForAccessibility(
        [errors.from, errors.text].filter(Boolean).join(' '),
      );
      return;
    }
    submitted.current = true;
    onSubmit({ from, envelope, text });
  }

  return (
    <View style={styles.form}>
      <Stack.Screen options={{ gestureEnabled: !dirty }} />

      <View style={styles.field}>
        <Text style={styles.label} nativeID="note-from-label">
          {strings.noteForm.fromLabel}
        </Text>
        <Text style={styles.help}>{strings.noteForm.fromHelp}</Text>
        <TextInput
          value={from}
          onChangeText={setFrom}
          placeholder={strings.noteForm.fromPlaceholder}
          placeholderTextColor={palette.placeholder}
          maxLength={FROM_MAX_LENGTH}
          autoCapitalize="words"
          autoCorrect={false}
          autoComplete="off"
          textContentType="none"
          returnKeyType="done"
          accessibilityLabel={strings.noteForm.fromLabel}
          aria-labelledby="note-from-label"
          style={[styles.input, shownErrors.from && styles.inputError]}
        />
        {shownErrors.from && (
          <Text style={styles.error} accessibilityLiveRegion="polite">
            {shownErrors.from}
          </Text>
        )}
      </View>

      <View style={styles.field}>
        <Text style={styles.label} nativeID="note-text-label">
          {strings.noteForm.textLabel}
        </Text>
        <Text style={styles.help}>{strings.noteForm.textHelp}</Text>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder={strings.noteForm.textPlaceholder}
          placeholderTextColor={palette.placeholder}
          maxLength={NOTE_MAX_LENGTH}
          multiline
          textAlignVertical="top"
          autoCapitalize="sentences"
          accessibilityLabel={strings.noteForm.textLabel}
          aria-labelledby="note-text-label"
          style={[styles.input, styles.textInput, shownErrors.text && styles.inputError]}
        />
        {shownErrors.text ? (
          <Text style={styles.error} accessibilityLiveRegion="polite">
            {shownErrors.text}
          </Text>
        ) : (
          lettersLeft <= SHOW_LETTERS_LEFT_BELOW && (
            <Text style={styles.note}>{strings.noteForm.lettersLeft(lettersLeft)}</Text>
          )
        )}
      </View>

      <View style={styles.field}>
        <Text style={styles.label} accessibilityRole="header">
          {strings.noteForm.envelopeLabel}
        </Text>
        <Text style={styles.help}>{strings.noteForm.envelopeHelp}</Text>
        <EnvelopePicker value={envelope} onChange={setEnvelope} />
      </View>

      <ParentButton label={strings.noteForm.save(nickname)} onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: space.xl,
  },
  field: {
    gap: space.sm,
  },
  label: {
    fontFamily: fonts.uiExtraBold,
    fontSize: 20,
    color: palette.ink,
  },
  help: {
    fontFamily: fonts.ui,
    fontSize: 15,
    lineHeight: 21,
    color: palette.softInk,
  },
  input: {
    minHeight: 56,
    marginTop: space.xs,
    paddingHorizontal: space.md,
    fontFamily: fonts.uiBold,
    fontSize: 20,
    color: palette.ink,
    backgroundColor: palette.white,
    borderColor: palette.line,
    borderWidth: 1.5,
    borderRadius: radius.md,
  },
  // The words of the note: the warm "letter" font, with room to write.
  textInput: {
    minHeight: 160,
    paddingTop: space.md,
    paddingBottom: space.md,
    fontFamily: fonts.note,
    fontSize: 19,
    lineHeight: 27,
  },
  inputError: {
    borderColor: palette.danger,
  },
  error: {
    fontFamily: fonts.uiBold,
    fontSize: 15,
    color: palette.danger,
  },
  note: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 15,
    lineHeight: 21,
    color: palette.softInk,
  },
});
