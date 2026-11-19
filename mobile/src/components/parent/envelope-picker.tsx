/**
 * Choose an envelope color for a note: three swatches that work like radio
 * buttons (pick exactly one).
 *
 * Each swatch is a small envelope-colored card with the color's NAME written
 * on it and a check mark when chosen, so nobody has to tell the colors apart
 * by sight alone.
 */
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { ENVELOPE_CHOICES } from '@/data/notes';
import { strings } from '@/strings';
import { envelopeColors, fonts, palette, radius, space, touchTarget, type EnvelopeColor } from '@/theme/tokens';

type Props = {
  value: EnvelopeColor;
  onChange: (color: EnvelopeColor) => void;
};

export function EnvelopePicker({ value, onChange }: Props) {
  return (
    <View accessibilityRole="radiogroup" style={styles.group}>
      {ENVELOPE_CHOICES.map((color) => {
        const colors = envelopeColors[color];
        const name = strings.noteForm.envelopeNames[color];
        const selected = value === color;

        return (
          <Pressable
            key={color}
            onPress={() => onChange(color)}
            accessibilityRole="radio"
            aria-checked={selected}
            accessibilityLabel={strings.noteForm.envelopeA11y(name)}
            style={({ pressed }) => [
              styles.swatch,
              { backgroundColor: colors.paper, borderColor: selected ? palette.ink : palette.line },
              selected && styles.swatchSelected,
              pressed && styles.pressed,
            ]}
          >
            <Text style={[styles.name, { color: colors.ink }]}>{name}</Text>
            {/* Always takes up room, so the name doesn't jump when chosen. */}
            <View style={styles.checkSlot}>
              {selected && (
                <Svg width={18} height={18} viewBox="0 0 24 24">
                  <Path
                    d="M5 12.5l4.5 4.5L19 7.5"
                    fill="none"
                    stroke={colors.ink}
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              )}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    gap: space.sm + 2,
  },
  swatch: {
    flex: 1,
    minHeight: touchTarget.kid,
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.xs,
    paddingVertical: space.sm,
    borderWidth: 1.5,
    borderRadius: radius.md,
  },
  swatchSelected: {
    borderWidth: 3,
  },
  pressed: {
    opacity: 0.85,
  },
  name: {
    fontFamily: fonts.uiExtraBold,
    fontSize: 17,
  },
  checkSlot: {
    height: 18,
    justifyContent: 'center',
  },
});
