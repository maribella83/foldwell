/**
 * One child on the "Your family" screen, plus the "Add a child" card.
 *
 * Deliberately no counts here ("3 notes", "2 unread"): the parent side
 * follows the same no-pressure rule as the kid side.
 */
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { ageBandInfo, containerNames } from '@/constants/age-bands';
import type { Child } from '@/data/family';
import { strings } from '@/strings';
import { fonts, palette, radius, space } from '@/theme/tokens';

import { ContainerThumb } from './container-thumb';

type Props = {
  child: Child;
  onPress: () => void;
};

export function ChildCard({ child, onPress }: Props) {
  const band = ageBandInfo[child.ageBand];
  const container = containerNames[band.container];

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={strings.childCard.a11yLabel(child.nickname, band.spoken, container)}
      accessibilityHint={strings.childCard.a11yHint(child.nickname)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <ContainerThumb ageBand={child.ageBand} width={52} />
      <View style={styles.text}>
        <Text style={styles.nickname} numberOfLines={1}>
          {child.nickname}
        </Text>
        <Text style={styles.meta}>{strings.childCard.meta(band.label, container)}</Text>
      </View>
      <Svg width={20} height={20} viewBox="0 0 24 24">
        <Path
          d="M9 5l7 7-7 7"
          stroke={palette.softInk}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>
    </Pressable>
  );
}

export function AddChildCard({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={strings.childCard.addChild}
      style={({ pressed }) => [styles.card, styles.addCard, pressed && styles.pressed]}
    >
      <View style={styles.plus}>
        <Svg width={22} height={22} viewBox="0 0 24 24">
          <Path
            d="M12 5v14M5 12h14"
            stroke={palette.ink}
            strokeWidth={2.5}
            strokeLinecap="round"
          />
        </Svg>
      </View>
      <Text style={styles.addLabel}>{strings.childCard.addChild}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 92,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    paddingHorizontal: space.md,
    paddingVertical: space.sm + 4,
    backgroundColor: palette.white,
    borderColor: palette.line,
    borderWidth: 1,
    borderRadius: radius.lg,
  },
  pressed: {
    opacity: 0.8,
  },
  text: {
    flex: 1,
    gap: 2,
  },
  nickname: {
    fontFamily: fonts.uiExtraBold,
    fontSize: 22,
    color: palette.ink,
  },
  meta: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 15,
    color: palette.softInk,
  },
  addCard: {
    minHeight: 72,
    backgroundColor: 'transparent',
    borderStyle: 'dashed',
    borderWidth: 1.5,
    borderColor: palette.softInk,
  },
  plus: {
    width: 52,
    alignItems: 'center',
  },
  addLabel: {
    fontFamily: fonts.uiExtraBold,
    fontSize: 18,
    color: palette.ink,
  },
});
