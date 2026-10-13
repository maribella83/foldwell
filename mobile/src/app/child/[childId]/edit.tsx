/**
 * Edit a child's nickname or age range, or remove them. Slides up as a sheet.
 *
 * Removing asks first, right here on the screen (not a pop-up), and says
 * plainly what happens: the child's box and every note in it go away.
 */
import { router, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChildForm } from '@/components/parent/child-form';
import { ModalTopBar, SHEET_EDGES } from '@/components/parent/modal-top-bar';
import { ParentButton } from '@/components/parent/parent-button';
import { containerFor, containerNames } from '@/constants/age-bands';
import { useChild, useFamily } from '@/data/family';
import { useReduceMotion } from '@/hooks/use-reduce-motion';
import { fonts, palette, radius, space } from '@/theme/tokens';

export default function EditChildScreen() {
  const { childId } = useLocalSearchParams<{ childId: string }>();
  const { updateChild, removeChild } = useFamily();
  const child = useChild(childId);
  const [confirmingRemove, setConfirmingRemove] = useState(false);
  const removed = useRef(false);
  const scrollRef = useRef<ScrollView>(null);
  const reduceMotion = useReduceMotion();

  if (!child) {
    return (
      <SafeAreaView style={styles.safeArea} edges={SHEET_EDGES}>
        <ModalTopBar title="Edit details" onCancel={() => router.back()} />
        <View style={styles.content}>
          <Text style={styles.missing}>This child isn’t in your family list.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const container = containerNames[containerFor(child.ageBand)];

  function handleRemove() {
    if (!child || removed.current) return;
    removed.current = true;
    removeChild(child.id);
    router.dismissTo('/');
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={SHEET_EDGES}>
      <ModalTopBar title="Edit details" onCancel={() => router.back()} />
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets
      >
        <ChildForm
          initial={{ nickname: child.nickname, ageBand: child.ageBand }}
          editingId={child.id}
          submitLabel="Save changes"
          onSubmit={(input) => {
            updateChild(child.id, input);
            router.back();
          }}
        />

        <View style={styles.removeArea}>
          {confirmingRemove ? (
            <View
              style={styles.confirm}
              accessibilityLiveRegion="polite"
              // Bring the question into view; it opens near the bottom.
              onLayout={() => scrollRef.current?.scrollToEnd({ animated: !reduceMotion })}
            >
              <Text style={styles.confirmTitle}>Remove {child.nickname}?</Text>
              <Text style={styles.confirmBody}>
                {child.nickname}’s {container} and every note in it will be deleted from this
                phone. This can’t be undone.
              </Text>
              <View style={styles.confirmButtons}>
                <ParentButton
                  variant="secondary"
                  label={`Keep ${child.nickname}`}
                  onPress={() => setConfirmingRemove(false)}
                />
                <ParentButton variant="danger" label="Remove" onPress={handleRemove} />
              </View>
            </View>
          ) : (
            <ParentButton
              variant="dangerQuiet"
              label={`Remove ${child.nickname} from Foldwell`}
              onPress={() => setConfirmingRemove(true)}
            />
          )}
        </View>
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
    gap: space.xl,
    maxWidth: 560,
    width: '100%',
    alignSelf: 'center',
  },
  removeArea: {
    borderTopWidth: 1,
    borderTopColor: palette.line,
    paddingTop: space.lg,
  },
  confirm: {
    gap: space.sm,
    padding: space.md,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: palette.danger,
    backgroundColor: palette.white,
  },
  confirmTitle: {
    fontFamily: fonts.uiExtraBold,
    fontSize: 18,
    color: palette.danger,
  },
  confirmBody: {
    fontFamily: fonts.ui,
    fontSize: 15,
    lineHeight: 21,
    color: palette.ink,
  },
  confirmButtons: {
    gap: space.sm,
    marginTop: space.sm,
  },
  missing: {
    fontFamily: fonts.uiBold,
    fontSize: 20,
    color: palette.ink,
  },
});
