/**
 * The black-and-white marbled composition-notebook cover (ages 9+).
 *
 * The marble is a few hundred small, irregular pale shapes on a dark cover,
 * placed by a "seeded" random number generator: it looks random, but it's
 * the same pattern every time, so the cover never flickers or changes
 * between screens (and will match what prints).
 *
 * At small sizes (thumbnails) the label is left blank; from about 140
 * points wide it shows the young person's name.
 */
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

import { fonts, notebookCover } from '@/theme/tokens';

/** Cover drawing size; the real size scales from this. */
const W = 100;
const H = 130;
const SPINE = 12;
/** Label position, in cover units. */
const LABEL = { x: 24, y: 26, width: 64, height: 36 };
const SHOW_TEXT_FROM_WIDTH = 140;

/** Small deterministic random number generator (mulberry32). */
function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeMarble(): string[] {
  const random = seeded(1983);
  const blobs: string[] = [];
  for (let i = 0; i < 340; i++) {
    const cx = SPINE + random() * (W - SPINE);
    const cy = random() * H;
    const size = 0.8 + random() * 2.6;
    const corners = 5 + Math.floor(random() * 3);
    const turn = random() * Math.PI * 2;
    const points: string[] = [];
    for (let c = 0; c < corners; c++) {
      const angle = turn + (c / corners) * Math.PI * 2;
      const reach = size * (0.45 + random() * 0.9);
      points.push(`${(cx + Math.cos(angle) * reach).toFixed(2)} ${(cy + Math.sin(angle) * reach).toFixed(2)}`);
    }
    blobs.push(`M${points.join(' L')} Z`);
  }
  return blobs;
}

// Built once when the file loads; every cover shares the same marble.
const MARBLE = makeMarble();

type Props = {
  width: number;
  /** The young person's nickname, shown on the label at larger sizes. */
  name?: string;
};

export function NotebookCover({ width, name }: Props) {
  const height = (width * H) / W;
  const scale = width / W;
  const showText = Boolean(name) && width >= SHOW_TEXT_FROM_WIDTH;

  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height} viewBox={`0 0 ${W} ${H}`}>
        <Rect x={0} y={0} width={W} height={H} rx={3} fill={notebookCover.cover} />
        {MARBLE.map((d, index) => (
          <Path key={index} d={d} fill={notebookCover.marble} fillOpacity={0.82} />
        ))}
        {/* Cloth spine */}
        <Rect x={0} y={0} width={SPINE} height={H} rx={2} fill={notebookCover.spine} />
        {/* Label */}
        <Rect
          x={LABEL.x}
          y={LABEL.y}
          width={LABEL.width}
          height={LABEL.height}
          rx={3}
          fill={notebookCover.label}
        />
        {!showText && (
          <>
            <Rect x={LABEL.x + 8} y={LABEL.y + 14} width={LABEL.width - 16} height={1.2} fill={notebookCover.labelRule} />
            <Rect x={LABEL.x + 8} y={LABEL.y + 22} width={LABEL.width - 16} height={1.2} fill={notebookCover.labelRule} />
          </>
        )}
      </Svg>

      {showText && (
        <View
          style={[
            styles.labelText,
            {
              left: LABEL.x * scale,
              top: LABEL.y * scale,
              width: LABEL.width * scale,
              height: LABEL.height * scale,
            },
          ]}
        >
          <Text
            style={[styles.name, { fontSize: 11 * scale }]}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {name}
          </Text>
          <Text style={[styles.kind, { fontSize: 4.6 * scale }]}>NOTEBOOK</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  labelText: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  name: {
    fontFamily: fonts.noteBold,
    color: notebookCover.cover,
  },
  kind: {
    fontFamily: fonts.labelMedium,
    color: notebookCover.cover,
    letterSpacing: 1.5,
    marginTop: 2,
  },
});
