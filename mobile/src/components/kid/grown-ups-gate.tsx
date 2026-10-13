/**
 * The hold-to-leave "Grown-ups" button in the kid view.
 *
 * A quick tap does nothing (a curious child won't wander into the parent
 * screens); pressing and holding for 1.5 seconds leaves. While held, the
 * label changes to "Keep holding…" so a grown-up knows it's working. That
 * change is instant, not an animation, so it's fine with Reduce Motion.
 *
 * This keeps small hands out; it is not a lock. A PIN step for the parent
 * screens is planned separately.
 */
import { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

import { fonts, palette, radius, space, touchTarget } from '@/theme/tokens';

export const GATE_LABEL = 'Grown-ups';
const HOLD_MS = 1500;

type Props = {
  onLeave: () => void;
};

export function GrownUpsGate({ onLeave }: Props) {
  const [holding, setHolding] = useState(false);

  return (
    <Pressable
      onPressIn={() => setHolding(true)}
      onPressOut={() => setHolding(false)}
      onLongPress={() => {
        setHolding(false);
        onLeave();
      }}
      delayLongPress={HOLD_MS}
      accessibilityRole="button"
      accessibilityLabel={GATE_LABEL}
      accessibilityHint="Press and hold to go back to the grown-up screens"
      style={[styles.button, holding && styles.holding]}
    >
      <Svg width={16} height={16} viewBox="0 0 24 24">
        <Rect x={5} y={10.5} width={14} height={10} rx={2.5} fill={palette.softInk} />
        <Path
          d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"
          stroke={palette.softInk}
          strokeWidth={2.2}
          fill="none"
        />
      </Svg>
      <Text style={styles.label}>{holding ? 'Keep holding…' : GATE_LABEL}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: touchTarget.standard,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xs + 2,
    paddingHorizontal: space.md,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: palette.line,
  },
  holding: {
    backgroundColor: palette.white,
    borderColor: palette.softInk,
  },
  label: {
    fontFamily: fonts.uiBold,
    fontSize: 15,
    color: palette.softInk,
  },
});
