/**
 * The big "Hear Mom" button on a Note Box note.
 *
 * Placeholder: it doesn't play anything yet. Parent audio notes come in
 * Phase 3, after the paper-test feedback. The size is final, though:
 * 88 points tall, so a small hand can't miss it.
 */
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { fonts, fontSize, palette, radius, space, touchTarget } from '@/theme/tokens';

const CIRCLE = touchTarget.kidPrimary - space.md;

type Props = {
  from: string;
  onPress: () => void;
};

export function PlayButton({ from, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Hear ${from}'s voice`}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <View style={styles.circle}>
        <Svg width={34} height={34} viewBox="0 0 24 24">
          {/* Rounded play triangle, nudged right so it looks centered */}
          <Path
            d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"
            fill={palette.ink}
          />
        </Svg>
      </View>
      {/* Longer names ("Grandma", "Uncle Joe") wrap to a second line, never cut off. */}
      <Text style={styles.label} numberOfLines={2}>
        Hear {from}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: touchTarget.kidPrimary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    backgroundColor: palette.ink,
    borderRadius: radius.pill,
    paddingLeft: space.sm,
    paddingRight: space.lg,
    paddingVertical: space.sm,
  },
  pressed: {
    opacity: 0.85,
  },
  circle: {
    width: CIRCLE,
    height: CIRCLE,
    borderRadius: CIRCLE / 2,
    backgroundColor: palette.paper,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    flexShrink: 1,
    fontFamily: fonts.uiExtraBold,
    fontSize: fontSize.kidBody,
    color: palette.paper,
  },
});
