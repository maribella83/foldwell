/**
 * Big "back to my box" button for the kid view. The arrow carries the
 * meaning for children who can't read yet; the words help the grown-up.
 */
import { Pressable, StyleSheet, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { fonts, palette, radius, space, touchTarget } from '@/theme/tokens';

type Props = {
  label: string;
  onPress: () => void;
};

export function BackButton({ label, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Svg width={22} height={22} viewBox="0 0 24 24">
        <Path
          d="M15 5l-7 7 7 7"
          stroke={palette.ink}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: touchTarget.kid,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    paddingLeft: space.md,
    paddingRight: space.lg,
    backgroundColor: palette.white,
    borderColor: palette.kraft,
    borderWidth: 2,
    borderRadius: radius.pill,
  },
  pressed: {
    opacity: 0.8,
  },
  label: {
    fontFamily: fonts.uiBold,
    fontSize: 20,
    color: palette.ink,
  },
});
