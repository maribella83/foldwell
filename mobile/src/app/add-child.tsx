/**
 * Add a child. Slides up as a sheet over "Your family".
 *
 * Saved in memory only for now (see src/data/family.tsx).
 */
import { router } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChildForm } from '@/components/parent/child-form';
import { ModalTopBar, SHEET_EDGES } from '@/components/parent/modal-top-bar';
import { useFamily } from '@/data/family';
import { palette, space } from '@/theme/tokens';

export default function AddChildScreen() {
  const { addChild } = useFamily();

  return (
    <SafeAreaView style={styles.safeArea} edges={SHEET_EDGES}>
      <ModalTopBar title="Add a child" onCancel={() => router.back()} />
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets
      >
        <ChildForm
          submitLabel="Add to my family"
          onSubmit={(input) => {
            addChild(input);
            router.back();
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.paper,
  },
  content: {
    padding: space.lg,
    paddingBottom: space.xxl,
    maxWidth: 560,
    width: '100%',
    alignSelf: 'center',
  },
});
