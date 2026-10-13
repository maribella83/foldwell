/**
 * One child's page, seen by the parent.
 *
 * The main action is handing the phone over: "Open Sam's Note Box"
 * switches to the kid view. Below that, what's in the box, an honest note
 * about what's coming next, and a way to edit the child's details.
 */
import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GATE_LABEL } from '@/components/kid/grown-ups-gate';
import { ContainerThumb } from '@/components/parent/container-thumb';
import { ParentButton } from '@/components/parent/parent-button';
import { ageBandInfo, containerNames } from '@/constants/age-bands';
import { useChild } from '@/data/family';
import { notesForChild } from '@/data/sample-notes';
import { envelopeColors, fonts, fontSize, palette, radius, space } from '@/theme/tokens';

export default function ChildScreen() {
  const { childId } = useLocalSearchParams<{ childId: string }>();
  const child = useChild(childId);

  if (!child) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
        <View style={styles.content}>
          <Text style={styles.missing}>This child isn’t in your family list.</Text>
          <ParentButton label="Back to your family" onPress={() => router.dismissTo('/')} />
        </View>
      </SafeAreaView>
    );
  }

  const band = ageBandInfo[child.ageBand];
  const isNoteBox = band.container === 'noteBox';
  const container = containerNames[band.container];
  const notes = isNoteBox ? notesForChild(child.id) : [];

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <ContainerThumb ageBand={child.ageBand} width={isNoteBox ? 104 : 150} name={child.nickname} />
          <View style={styles.heroText}>
            <Text style={styles.nickname} accessibilityRole="header" numberOfLines={2}>
              {child.nickname}
            </Text>
            <Text style={styles.meta} accessibilityLabel={`${band.spoken}, ${container}`}>
              {band.label} · {container}
            </Text>
          </View>
        </View>

        <View style={styles.handOff}>
          <ParentButton
            label={`Open ${child.nickname}’s ${container}`}
            accessibilityHint="Switches to the kid view"
            onPress={() =>
              router.push({ pathname: '/kid/[childId]', params: { childId: child.id } })
            }
          />
          <Text style={styles.handOffHelp}>
            Hand the phone to {child.nickname}. To come back, press and hold “{GATE_LABEL}” at the
            top of the screen.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle} accessibilityRole="header">
            In the {container}
          </Text>
          {notes.length > 0 ? (
            <View style={styles.noteList}>
              {notes.map((note) => {
                const colors = envelopeColors[note.envelope];
                return (
                  <View
                    key={note.id}
                    style={[styles.noteRow, { backgroundColor: colors.paper }]}
                    accessible
                    accessibilityLabel={`From ${note.from}: ${note.text}`}
                  >
                    <Text style={[styles.noteFrom, { color: colors.ink }]}>From {note.from}</Text>
                    <Text style={[styles.noteText, { color: colors.ink }]} numberOfLines={2}>
                      {note.text}
                    </Text>
                  </View>
                );
              })}
            </View>
          ) : (
            <Text style={styles.empty}>
              {isNoteBox
                ? `Nothing in ${child.nickname}’s box yet.`
                : `${child.nickname}’s Notebook is waiting for its first page.`}
            </Text>
          )}
        </View>

        <View style={styles.comingSoon}>
          <Text style={styles.comingSoonTitle}>Writing notes comes next</Text>
          <Text style={styles.comingSoonBody}>
            {isNoteBox
              ? 'Typing a note, photographing a handwritten one, and recording your voice are on the way in a coming update.'
              : 'Typing a note and photographing a handwritten one are on the way in a coming update.'}
          </Text>
        </View>

        <ParentButton
          variant="secondary"
          label={`Edit ${child.nickname}’s details`}
          onPress={() =>
            router.push({ pathname: '/child/[childId]/edit', params: { childId: child.id } })
          }
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
    gap: space.xl,
    maxWidth: 560,
    width: '100%',
    alignSelf: 'center',
  },
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.lg,
  },
  heroText: {
    flex: 1,
    gap: space.xs,
  },
  nickname: {
    fontFamily: fonts.noteBold,
    fontSize: 34,
    color: palette.ink,
  },
  meta: {
    fontFamily: fonts.uiSemiBold,
    fontSize: fontSize.body,
    color: palette.softInk,
  },
  handOff: {
    gap: space.sm + 2,
  },
  handOffHelp: {
    fontFamily: fonts.ui,
    fontSize: 15,
    lineHeight: 21,
    color: palette.softInk,
    textAlign: 'center',
    paddingHorizontal: space.sm,
  },
  section: {
    gap: space.sm + 4,
  },
  sectionTitle: {
    fontFamily: fonts.uiExtraBold,
    fontSize: 20,
    color: palette.ink,
  },
  noteList: {
    gap: space.sm,
  },
  noteRow: {
    borderRadius: radius.md,
    padding: space.md,
    gap: 2,
  },
  noteFrom: {
    fontFamily: fonts.uiExtraBold,
    fontSize: 15,
  },
  noteText: {
    fontFamily: fonts.note,
    fontSize: fontSize.body,
    lineHeight: 24,
  },
  empty: {
    fontFamily: fonts.ui,
    fontSize: fontSize.body,
    color: palette.softInk,
  },
  comingSoon: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: palette.line,
    borderRadius: radius.md,
    padding: space.md,
    gap: space.xs,
  },
  comingSoonTitle: {
    fontFamily: fonts.uiExtraBold,
    fontSize: 16,
    color: palette.ink,
  },
  comingSoonBody: {
    fontFamily: fonts.ui,
    fontSize: 15,
    lineHeight: 21,
    color: palette.softInk,
  },
  missing: {
    fontFamily: fonts.uiBold,
    fontSize: 20,
    color: palette.ink,
  },
});
