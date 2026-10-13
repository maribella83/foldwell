/**
 * Choose a child's age range: three big option cards that work like radio
 * buttons (pick exactly one). Each card says what that child will get, so
 * the parent understands the choice instead of guessing.
 *
 * Nothing is pre-selected for a new child: the parent picks on purpose.
 */
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AGE_BANDS, ageBandInfo, containerNames, type AgeBand } from '@/constants/age-bands';
import { fonts, palette, radius, space } from '@/theme/tokens';

import { ContainerThumb } from './container-thumb';

type Props = {
  value: AgeBand | null;
  onChange: (band: AgeBand) => void;
  hasError?: boolean;
};

export function AgeBandPicker({ value, onChange, hasError = false }: Props) {
  return (
    <View accessibilityRole="radiogroup" style={styles.group}>
      {AGE_BANDS.map((band) => {
        const info = ageBandInfo[band];
        const container = containerNames[info.container];
        const selected = value === band;

        return (
          <Pressable
            key={band}
            onPress={() => onChange(band)}
            accessibilityRole="radio"
            aria-checked={selected}
            accessibilityLabel={`${info.spoken}, ${container}. ${info.blurb}`}
            style={({ pressed }) => [
              styles.option,
              selected && styles.optionSelected,
              hasError && !value && styles.optionError,
              pressed && styles.pressed,
            ]}
          >
            <ContainerThumb ageBand={band} width={40} />
            <View style={styles.text}>
              <Text style={styles.label}>
                {info.label} <Text style={styles.container}>· {container}</Text>
              </Text>
              <Text style={styles.blurb}>{info.blurb}</Text>
            </View>
            <View style={[styles.radio, selected && styles.radioSelected]}>
              {selected && <View style={styles.radioDot} />}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const RADIO = 24;

const styles = StyleSheet.create({
  group: {
    gap: space.sm + 2,
  },
  option: {
    minHeight: 76,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    padding: space.md,
    backgroundColor: palette.white,
    borderColor: palette.line,
    borderWidth: 1.5,
    borderRadius: radius.md,
  },
  optionSelected: {
    borderColor: palette.ink,
    borderWidth: 2,
  },
  optionError: {
    borderColor: palette.danger,
  },
  pressed: {
    opacity: 0.85,
  },
  text: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontFamily: fonts.uiExtraBold,
    fontSize: 17,
    color: palette.ink,
  },
  container: {
    fontFamily: fonts.uiSemiBold,
    color: palette.softInk,
  },
  blurb: {
    fontFamily: fonts.ui,
    fontSize: 15,
    lineHeight: 20,
    color: palette.softInk,
  },
  radio: {
    width: RADIO,
    height: RADIO,
    borderRadius: RADIO / 2,
    borderWidth: 2,
    borderColor: palette.softInk,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: palette.ink,
  },
  radioDot: {
    width: RADIO / 2,
    height: RADIO / 2,
    borderRadius: RADIO / 4,
    backgroundColor: palette.ink,
  },
});
