/**
 * "Your family": the parent's home screen and the first thing the app shows.
 *
 * Each child is a card showing their nickname, age range, and whether they
 * get a Note Box or a Notebook. No counts, no "unread", no reminders: this
 * screen should feel like opening a drawer of letters, not an inbox.
 */
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AddChildCard, ChildCard } from '@/components/parent/child-card';
import { APP_NAME } from '@/constants/app';
import { useFamily } from '@/data/family';
import { strings } from '@/strings';
import { fonts, fontSize, palette, space } from '@/theme/tokens';

export default function FamilyScreen() {
  const { kids } = useFamily();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.brand}>{APP_NAME}</Text>
        <Text style={styles.title} accessibilityRole="header">
          {strings.family.title}
        </Text>
        <Text style={styles.subtitle}>
          {kids.length > 0 ? strings.family.subtitleWithKids : strings.family.subtitleEmpty}
        </Text>

        <View style={styles.list}>
          {kids.map((child) => (
            <ChildCard
              key={child.id}
              child={child}
              onPress={() =>
                router.push({ pathname: '/child/[childId]', params: { childId: child.id } })
              }
            />
          ))}
          <AddChildCard onPress={() => router.push('/add-child')} />
        </View>

        <Text style={styles.privacy}>{strings.family.privacy}</Text>
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
    paddingHorizontal: space.lg,
    paddingTop: space.lg,
    paddingBottom: space.xxl,
    maxWidth: 560,
    width: '100%',
    alignSelf: 'center',
  },
  brand: {
    fontFamily: fonts.labelMedium,
    fontSize: fontSize.label,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: palette.softInk,
  },
  title: {
    fontFamily: fonts.noteBold,
    fontSize: 34,
    color: palette.ink,
    marginTop: space.sm,
  },
  subtitle: {
    fontFamily: fonts.uiSemiBold,
    fontSize: fontSize.body,
    color: palette.softInk,
    marginTop: space.xs,
    marginBottom: space.lg,
  },
  list: {
    gap: space.sm + 4,
  },
  privacy: {
    fontFamily: fonts.ui,
    fontSize: fontSize.small,
    color: palette.softInk,
    textAlign: 'center',
    marginTop: space.xl,
  },
});
