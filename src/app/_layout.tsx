/**
 * Root layout: wraps every screen in the app.
 *
 * It keeps the splash screen up until our fonts have loaded, so nobody
 * ever sees a flash of the wrong font. Then it shows a plain Stack
 * navigator (screens slide in on top of each other) on paper-colored
 * backgrounds, with no default header bar.
 */
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { useAppFonts } from '@/theme/fonts';
import { palette } from '@/theme/tokens';

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

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: palette.paper },
        }}
      />
    </>
  );
}
