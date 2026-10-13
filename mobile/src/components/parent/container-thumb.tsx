/**
 * A small picture of a child's container, so a parent can tell at a glance
 * who gets a Note Box and who gets a Notebook. Decorative: screen readers
 * skip it, because the card's label already says which one it is.
 */
import { View } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

import { NotebookCover } from '@/components/notebook/notebook-cover';
import { containerFor, type AgeBand } from '@/constants/age-bands';
import { envelopeColors, palette } from '@/theme/tokens';

type Props = {
  ageBand: AgeBand;
  width: number;
  /** Shown on the Notebook label when the thumbnail is big enough. */
  name?: string;
};

export function ContainerThumb({ ageBand, width, name }: Props) {
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      {containerFor(ageBand) === 'noteBox' ? (
        <NoteBoxThumb width={width} />
      ) : (
        <NotebookCover width={width} name={name} />
      )}
    </View>
  );
}

/** A tiny kraft box with three envelopes peeking out, same shape as the real Note Box. */
function NoteBoxThumb({ width }: { width: number }) {
  const height = width * 1.3;
  const envelopes = [
    { color: envelopeColors.butter, y: 18, tilt: -5 },
    { color: envelopeColors.mint, y: 30, tilt: 4 },
    { color: envelopeColors.blush, y: 42, tilt: -2 },
  ];

  return (
    <Svg width={width} height={height} viewBox="0 0 100 130">
      {/* Inside back wall */}
      <Rect x={4} y={26} width={92} height={60} rx={6} fill={palette.kraftLid} />
      {envelopes.map(({ color, y, tilt }) => (
        <Rect
          key={y}
          x={14}
          y={y}
          width={72}
          height={70}
          rx={5}
          fill={color.paper}
          stroke={color.ink}
          strokeOpacity={0.2}
          strokeWidth={1.5}
          transform={`rotate(${tilt} 50 ${y + 35})`}
        />
      ))}
      {/* Box front with its darker top edge and paper label */}
      <Rect x={2} y={70} width={96} height={58} rx={7} fill={palette.kraft} />
      <Rect x={2} y={70} width={96} height={6} rx={3} fill={palette.kraftLid} fillOpacity={0.45} />
      <Rect x={28} y={92} width={44} height={16} rx={3} fill={palette.paper} />
    </Svg>
  );
}
