/**
 * Root layout: wraps every screen in the app.
 *
 * It keeps the splash screen up until our fonts have loaded, so nobody
 * ever sees a flash of the wrong font. Then it shows a Stack navigator
 * (screens slide in on top of each other) on paper-colored backgrounds.
 *
 * How the screens fit together:
 *   index                    "Your family" (parent home)
 *   child/[childId]          one child's parent page
 *   add-child, .../edit,     slide up as sheets
 *   .../new-note, .../edit-note
 *   kid/[childId]/...        the kid view (its own little stack). The
 *                            swipe-back gesture is off here, so a child
 *                            can't swipe into the parent screens; grown-ups
 *                            leave with the hold-to-leave button.
 */
import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { Suspense, useEffect } from 'react';
import { View } from 'react-native';

import { DATABASE_NAME, migrateDatabase } from '@/data/database';
import { FamilyProvider } from '@/data/family';
import { useAppFonts } from '@/theme/fonts';
import { fonts, palette } from '@/theme/tokens';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useAppFonts();

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hide();
    }
  }, [fontsLoaded, fontError]);

  // If a font fails to load we still show the app (in the system font)
  // rather than leaving the splash screen up forever.
  if (!fontsLoaded && !fontError) {
    return null;
  }

  // The database opens (and builds or updates its tables) before any screen
  // shows. This takes a split second, so the wait is just a paper-colored
  // screen, never a spinner or a flash of the wrong color.
  return (
    <Suspense fallback={<View style={{ flex: 1, backgroundColor: palette.paper }} />}>
      <SQLiteProvider databaseName={DATABASE_NAME} onInit={migrateDatabase} useSuspense>
        <FamilyProvider>
          <StatusBar style="dark" />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: palette.paper },
              headerStyle: { backgroundColor: palette.paper },
              headerShadowVisible: false,
              headerTintColor: palette.ink,
              headerTitleStyle: { fontFamily: fonts.uiExtraBold, fontSize: 17 },
              headerBackTitleStyle: { fontFamily: fonts.uiSemiBold },
            }}
          >
            {/* "Family" is the back-button label on the child page. */}
            <Stack.Screen name="index" options={{ title: 'Family' }} />
            <Stack.Screen name="child/[childId]/index" options={{ headerShown: true, title: '' }} />
            <Stack.Screen name="add-child" options={{ presentation: 'modal' }} />
            <Stack.Screen name="child/[childId]/edit" options={{ presentation: 'modal' }} />
            <Stack.Screen name="child/[childId]/new-note" options={{ presentation: 'modal' }} />
            <Stack.Screen name="child/[childId]/edit-note" options={{ presentation: 'modal' }} />
            <Stack.Screen
              name="kid/[childId]"
              options={{
                gestureEnabled: false,
                contentStyle: { backgroundColor: palette.kidBackground },
              }}
            />
          </Stack>
        </FamilyProvider>
      </SQLiteProvider>
    </Suspense>
  );
}
