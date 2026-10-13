/**
 * The one button style for parent screens, in a few weights:
 *
 * - primary: the main thing to do on a screen (charcoal, full width)
 * - secondary: an outlined alternative
 * - quiet: text only, for low-key actions
 * - dangerQuiet: text-only first step of a can't-undo action
 * - danger: the final "yes, remove" confirmation
 *
 * 52 points tall, comfortably above Apple's 44-point minimum.
 */
import { Pressable, StyleSheet, Text } from 'react-native';

import { fonts, palette, radius, space } from '@/theme/tokens';

export type ParentButtonVariant = 'primary' | 'secondary' | 'quiet' | 'dangerQuiet' | 'danger';

type Props = {
  label: string;
  onPress: () => void;
  variant?: ParentButtonVariant;
  accessibilityHint?: string;
  /** Shrink to fit the label instead of filling the row. */
  compact?: boolean;
};

export function ParentButton({
  label,
  onPress,
  variant = 'primary',
  accessibilityHint,
  compact = false,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      style={({ pressed }) => [
        styles.base,
        variantStyles[variant],
        compact && styles.compact,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.label, labelStyles[variant]]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: radius.pill,
    paddingHorizontal: space.lg,
    paddingVertical: space.sm + 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compact: {
    alignSelf: 'flex-start',
  },
  pressed: {
    opacity: 0.75,
  },
  label: {
    fontFamily: fonts.uiExtraBold,
    fontSize: 17,
    textAlign: 'center',
  },
});

const variantStyles = StyleSheet.create({
  primary: {
    backgroundColor: palette.ink,
  },
  secondary: {
    backgroundColor: palette.white,
    borderWidth: 1.5,
    borderColor: palette.ink,
  },
  quiet: {},
  dangerQuiet: {},
  danger: {
    backgroundColor: palette.danger,
  },
});

const labelStyles = StyleSheet.create({
  primary: { color: palette.paper },
  secondary: { color: palette.ink },
  quiet: { color: palette.ink, textDecorationLine: 'underline' },
  dangerQuiet: { color: palette.danger, textDecorationLine: 'underline' },
  danger: { color: palette.white },
});
