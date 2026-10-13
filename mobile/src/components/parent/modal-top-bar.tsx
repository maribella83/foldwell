/**
 * Top bar for screens that slide up as a sheet (Add a child, Edit details):
 * "Cancel" on the left, the title in the middle.
 */
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import type { Edge } from 'react-native-safe-area-context';

import { fonts, palette, space, touchTarget } from '@/theme/tokens';

/**
 * Safe-area edges for a sheet screen. On iOS the sheet already sits below
 * the status bar, so adding the top safe area again would leave a big
 * empty gap. Android shows the sheet full screen, so it needs the top.
 */
export const SHEET_EDGES: Edge[] =
  Platform.OS === 'ios' ? ['bottom', 'left', 'right'] : ['top', 'bottom', 'left', 'right'];

type Props = {
  title: string;
  onCancel: () => void;
};

export function ModalTopBar({ title, onCancel }: Props) {
  return (
    <View style={styles.bar}>
      <Pressable
        onPress={onCancel}
        accessibilityRole="button"
        accessibilityLabel="Cancel"
        accessibilityHint="Closes without saving"
        hitSlop={8}
        style={({ pressed }) => [styles.side, pressed && styles.pressed]}
      >
        <Text style={styles.cancel}>Cancel</Text>
      </Pressable>
      <Text style={styles.title} accessibilityRole="header" numberOfLines={1}>
        {title}
      </Text>
      {/* Balances the Cancel button so the title stays centered. */}
      <View style={styles.side} />
    </View>
  );
}

const SIDE_WIDTH = 72;

const styles = StyleSheet.create({
  bar: {
    minHeight: touchTarget.standard + space.sm,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: space.md,
    borderBottomWidth: 1,
    borderBottomColor: palette.line,
  },
  side: {
    width: SIDE_WIDTH,
    minHeight: touchTarget.standard,
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.6,
  },
  cancel: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 17,
    color: palette.ink,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fonts.uiExtraBold,
    fontSize: 17,
    color: palette.ink,
  },
});
