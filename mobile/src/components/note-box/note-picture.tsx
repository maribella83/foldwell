/**
 * Simple placeholder pictures for notes. In the real app this spot shows
 * the parent's photo or drawing; for now it's one of three tiny scenes
 * drawn from basic shapes (original art, colors from the theme).
 */
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import type { PictureScene } from '@/data/sample-notes';
import { illustration, radius } from '@/theme/tokens';

const HEART_PATH =
  'M12 21C12 21 3 15.5 3 9.5A4.5 4.5 0 0 1 12 7A4.5 4.5 0 0 1 21 9.5C21 15.5 12 21 12 21Z';

/** What a screen reader says for each picture. */
const DESCRIPTIONS: Record<PictureScene, string> = {
  sun: 'A sun over green hills',
  moon: 'A moon and stars at night',
  heart: 'A big heart',
};

type Props = {
  scene: PictureScene;
};

export function NotePicture({ scene }: Props) {
  return (
    <View
      style={styles.frame}
      accessible
      accessibilityRole="image"
      accessibilityLabel={DESCRIPTIONS[scene]}
    >
      <Svg width="100%" height="100%" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice">
        {scene === 'sun' && <SunScene />}
        {scene === 'moon' && <MoonScene />}
        {scene === 'heart' && <HeartScene />}
      </Svg>
    </View>
  );
}

function SunScene() {
  return (
    <>
      <Rect width={320} height={200} fill={illustration.sky} />
      <Circle cx={228} cy={70} r={34} fill={illustration.sun} />
      <Path d="M0 150 Q 80 100 170 140 T 320 128 V200 H0 Z" fill={illustration.hillFar} />
      <Path d="M0 172 Q 120 122 220 166 T 320 158 V200 H0 Z" fill={illustration.hill} />
    </>
  );
}

function MoonScene() {
  const stars = [
    [48, 40, 3],
    [96, 78, 2.5],
    [140, 30, 3.5],
    [180, 92, 2],
    [282, 132, 2.5],
    [36, 118, 2],
  ];
  return (
    <>
      <Rect width={320} height={200} fill={illustration.night} />
      {stars.map(([cx, cy, r]) => (
        <Circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={illustration.cream} />
      ))}
      {/* Crescent: a pale circle with a night-colored circle over part of it */}
      <Circle cx={232} cy={70} r={32} fill={illustration.sun} />
      <Circle cx={248} cy={60} r={28} fill={illustration.night} />
      <Path d="M0 176 Q 140 140 320 172 V200 H0 Z" fill={illustration.hill} fillOpacity={0.6} />
    </>
  );
}

function HeartScene() {
  return (
    <>
      <Rect width={320} height={200} fill={illustration.cream} />
      <Path d={HEART_PATH} fill={illustration.clay} transform="translate(106 38) scale(4.5)" />
      {/* Little sparkles */}
      <Path d="M60 50 v20 M50 60 h20" stroke={illustration.sky} strokeWidth={4} strokeLinecap="round" />
      <Path d="M262 128 v16 M254 136 h16" stroke={illustration.sky} strokeWidth={4} strokeLinecap="round" />
      <Path d="M250 44 v12 M244 50 h12" stroke={illustration.hill} strokeWidth={4} strokeLinecap="round" />
    </>
  );
}

const styles = StyleSheet.create({
  frame: {
    width: '100%',
    aspectRatio: 1.6,
    borderRadius: radius.md,
    overflow: 'hidden',
  },
});
