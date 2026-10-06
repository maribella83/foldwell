/**
 * The kraft Note Box with envelopes standing up inside it.
 *
 * Layers, back to front:
 *   1. the inside back wall of the box (darker kraft)
 *   2. the envelopes, each one a little lower than the one behind it
 *   3. the front of the box, with the child's name on a paper label
 *
 * The front of the box covers the bottom of every envelope, so you only
 * see (and can only tap) each envelope's top strip.
 */
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

import type { BoxNote } from '@/data/sample-notes';
import { fonts, palette, radius, space, touchTarget } from '@/theme/tokens';

import { Envelope } from './envelope';

/** How much of each back envelope shows above the one in front of it. */
const STEP = touchTarget.kid + 12;
/** How much of the front envelope shows above the box. */
const FRONT_PEEK = 96;
/** Height of the front of the box. */
const BOX_FRONT_HEIGHT = 160;
/** Space between the box sides and the envelopes. */
const INSET = 20;
/** Small hand-placed tilts, in degrees, back to front. */
const TILTS = [-1.5, 1, -0.5];

type Props = {
  notes: BoxNote[];
  nickname: string;
  width: number;
  onOpen: (note: BoxNote) => void;
};

export function NoteBox({ notes, nickname, width, onOpen }: Props) {
  const boxTop = Math.max(notes.length - 1, 0) * STEP + FRONT_PEEK;
  // Every envelope ends a little below the top of the box front: deep
  // enough that none looks like it's floating, short enough that none
  // pokes out of the bottom of the box.
  const envelopeBottom = boxTop + 40;
  const totalHeight = boxTop + BOX_FRONT_HEIGHT + space.md;

  return (
    <View style={{ width, height: totalHeight }}>
      {/* 1. Inside back wall */}
      <View
        style={[
          styles.backWall,
          { top: 28, width, height: boxTop - 28 + space.lg },
        ]}
      />

      {/* 2. Envelopes, back to front */}
      {notes.map((note, index) => (
        <Envelope
          key={note.id}
          note={note}
          width={width - INSET * 2}
          height={envelopeBottom - index * STEP}
          top={index * STEP}
          left={INSET}
          tilt={TILTS[index % TILTS.length]}
          onPress={() => onOpen(note)}
        />
      ))}

      {/* Soft shadow under the box */}
      <View
        style={[styles.shadow, { top: boxTop + BOX_FRONT_HEIGHT - space.sm }]}
      />

      {/* 3. Front of the box */}
      <View style={[styles.front, { top: boxTop, width, height: BOX_FRONT_HEIGHT }]}>
        <Svg width={width} height={BOX_FRONT_HEIGHT} style={StyleSheet.absoluteFill}>
          <Rect
            x={0}
            y={0}
            width={width}
            height={BOX_FRONT_HEIGHT}
            rx={radius.md}
            fill={palette.kraft}
          />
          {/* The box's top edge, a touch darker, so it reads as cardboard */}
          <Rect
            x={0}
            y={0}
            width={width}
            height={10}
            rx={4}
            fill={palette.kraftLid}
            fillOpacity={0.45}
          />
        </Svg>

        <View style={styles.label}>
          <Text style={styles.labelText} numberOfLines={1} adjustsFontSizeToFit>
            {nickname}’s Note Box
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backWall: {
    position: 'absolute',
    left: 0,
    backgroundColor: palette.kraftLid,
    borderTopLeftRadius: radius.md,
    borderTopRightRadius: radius.md,
  },
  shadow: {
    position: 'absolute',
    left: space.md,
    right: space.md,
    height: space.md,
    borderRadius: radius.pill,
    backgroundColor: palette.ink,
    opacity: 0.06,
  },
  front: {
    position: 'absolute',
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    backgroundColor: palette.paper,
    borderColor: palette.kraftLid,
    borderWidth: 1.5,
    borderRadius: radius.sm,
    paddingHorizontal: space.lg,
    paddingVertical: space.sm + 2,
    maxWidth: '80%',
  },
  labelText: {
    fontFamily: fonts.uiExtraBold,
    fontSize: 22,
    color: palette.ink,
  },
});
