/**
 * The form for adding or editing a child: a nickname and an age range.
 * That's all Foldwell ever asks (privacy rule 4).
 *
 * Behavior worth knowing:
 * - Errors only appear after the first tap on Save, then update as you
 *   type, so nobody gets scolded before they've started.
 * - Once something is typed, swiping the sheet down is turned off (iOS),
 *   so a stray swipe can't throw the parent's work away. Cancel still works.
 * - Save can only fire once, so a double tap can't add the same child twice.
 */
import { Stack } from 'expo-router';
import { useRef, useState } from 'react';
import { AccessibilityInfo, StyleSheet, Text, TextInput, View } from 'react-native';

import { ageBandInfo, containerNames, type AgeBand } from '@/constants/age-bands';
import {
  checkChild,
  cleanNickname,
  looksLikeFullName,
  NICKNAME_MAX_LENGTH,
  useFamily,
  type ChildFormErrors,
  type ChildInput,
} from '@/data/family';
import { fonts, palette, radius, space } from '@/theme/tokens';

import { AgeBandPicker } from './age-band-picker';
import { ParentButton } from './parent-button';

type Props = {
  /** The child's current details when editing; leave out when adding. */
  initial?: ChildInput;
  /** The id of the child being edited, so they don't count as their own duplicate. */
  editingId?: string;
  submitLabel: string;
  onSubmit: (input: ChildInput) => void;
};

export function ChildForm({ initial, editingId, submitLabel, onSubmit }: Props) {
  const { kids } = useFamily();
  const [nickname, setNickname] = useState(initial?.nickname ?? '');
  const [ageBand, setAgeBand] = useState<AgeBand | null>(initial?.ageBand ?? null);
  const [triedToSave, setTriedToSave] = useState(false);
  const submitted = useRef(false);

  const errors = checkChild(nickname, ageBand, kids, editingId);
  const shownErrors: ChildFormErrors = triedToSave ? errors : {};
  const dirty = nickname !== (initial?.nickname ?? '') || ageBand !== (initial?.ageBand ?? null);
  const name = cleanNickname(nickname);

  const oldContainer = initial ? ageBandInfo[initial.ageBand].container : null;
  const newContainer = ageBand ? ageBandInfo[ageBand].container : null;

  function handleSave() {
    if (submitted.current) return;
    if (errors.nickname || errors.ageBand || !ageBand) {
      setTriedToSave(true);
      AccessibilityInfo.announceForAccessibility(
        [errors.nickname, errors.ageBand].filter(Boolean).join(' '),
      );
      return;
    }
    submitted.current = true;
    onSubmit({ nickname: name, ageBand });
  }

  return (
    <View style={styles.form}>
      <Stack.Screen options={{ gestureEnabled: !dirty }} />

      <View style={styles.field}>
        <Text style={styles.label} nativeID="nickname-label">
          What do you call them?
        </Text>
        <Text style={styles.help}>
          A first name or nickname is all Foldwell needs. No last names or birthdays.
        </Text>
        <TextInput
          value={nickname}
          onChangeText={setNickname}
          placeholder="Sam, Bug, Mimi…"
          placeholderTextColor={palette.placeholder}
          maxLength={NICKNAME_MAX_LENGTH}
          autoCapitalize="words"
          autoCorrect={false}
          autoComplete="off"
          textContentType="none"
          returnKeyType="done"
          accessibilityLabel="What do you call them?"
          aria-labelledby="nickname-label"
          style={[styles.input, shownErrors.nickname && styles.inputError]}
        />
        {shownErrors.nickname ? (
          <Text style={styles.error} accessibilityLiveRegion="polite">
            {shownErrors.nickname}
          </Text>
        ) : (
          nickname !== (initial?.nickname ?? '') &&
          looksLikeFullName(nickname) && (
            <Text style={styles.note}>
              Heads-up: just a first name or nickname is enough. No need for a last name.
            </Text>
          )
        )}
      </View>

      <View style={styles.field}>
        <Text style={styles.label} accessibilityRole="header">
          How old are they?
        </Text>
        <Text style={styles.help}>Just the age range. You can change it as they grow.</Text>
        <AgeBandPicker
          value={ageBand}
          onChange={setAgeBand}
          hasError={Boolean(shownErrors.ageBand)}
        />
        {shownErrors.ageBand && (
          <Text style={styles.error} accessibilityLiveRegion="polite">
            {shownErrors.ageBand}
          </Text>
        )}
        {oldContainer && newContainer && oldContainer !== newContainer && (
          <Text style={styles.note}>
            {name || 'They'} will see a {containerNames[newContainer]} instead of a{' '}
            {containerNames[oldContainer]}.
          </Text>
        )}
      </View>

      <ParentButton label={submitLabel} onPress={handleSave} />
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
