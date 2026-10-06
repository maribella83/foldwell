/**
 * One envelope standing up inside the Note Box.
 *
 * Only the top strip of each envelope is visible above the box, so the
 * "From Mom" label and the stamp both live in that strip. The whole
 * envelope is the tap target; envelopes in front cover the ones behind,
 * so a tap always opens the envelope you can see under your finger.
 */
import { Pressable, StyleSheet, Text } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

import type { BoxNote } from '@/data/sample-notes';
import { envelopeColors, fonts, palette, radius } from '@/theme/tokens';

const HEART_PATH =
  'M12 21C12 21 3 15.5 3 9.5A4.5 4.5 0 0 1 12 7A4.5 4.5 0 0 1 21 9.5C21 15.5 12 21 12 21Z';

const STAMP_WIDTH = 40;
const STAMP_HEIGHT = 48;
const EDGE = 16;

type Props = {
  note: BoxNote;
  width: number;
  height: number;
  /** Where the envelope sits inside the box. */
  top: number;
  left: number;
  /** A small rotation in degrees so the envelopes look hand-placed. */
  tilt: number;
  onPress: () => void;
};

export function Envelope({ note, width, height, top, left, tilt, onPress }: Props) {
  const colors = envelopeColors[note.envelope];
  const stampX = width - EDGE - STAMP_WIDTH;
  const stampY = 14;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Note from ${note.from}`}
      accessibilityHint="Opens the note"
      style={({ pressed }) => [
        styles.envelope,
        {
          width,
          height,
          top,
          left,
          // While a finger is on it, the envelope lifts a little. This is an
          // instant change, not an animation, so it's fine with Reduce Motion.
          transform: [{ rotate: `${tilt}deg` }, { translateY: pressed ? -8 : 0 }],
        },
      ]}
    >
      <Svg width={width} height={height}>
        {/* Envelope body */}
        <Rect
          x={1}
          y={1}
          width={width - 2}
          height={height - 2}
          rx={radius.md}
          fill={colors.paper}
          stroke={colors.ink}
          strokeOpacity={0.15}
          strokeWidth={1.5}
        />

        {/* Stamp: white paper with a perforated edge and a heart */}
        <Rect
          x={stampX}
          y={stampY}
          width={STAMP_WIDTH}
          height={STAMP_HEIGHT}
          rx={3}
          fill={palette.white}
          stroke={colors.ink}
          strokeOpacity={0.3}
          strokeDasharray="3 3"
        />
        <Rect
          x={stampX + 5}
          y={stampY + 5}
          width={STAMP_WIDTH - 10}
          height={STAMP_HEIGHT - 10}
          rx={2}
          fill={colors.paper}
        />
        <Path
          d={HEART_PATH}
          fill={colors.ink}
          fillOpacity={0.7}
          transform={`translate(${stampX + 8} ${stampY + 11})`}
        />
      </Svg>

      <Text style={[styles.from, { color: colors.ink }]} numberOfLines={1}>
        From {note.from}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  envelope: {
    position: 'absolute',
  },
  from: {
    position: 'absolute',
    top: 18,
    left: EDGE + 2,
    right: EDGE + STAMP_WIDTH + 12,
    fontFamily: fonts.uiExtraBold,
    fontSize: 24,
  },
});
