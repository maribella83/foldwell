/**
 * Loads the app's fonts. Each weight is imported from its own path so only
 * the weights we use end up in the app (not all ~30 files per family).
 *
 * All three families use the SIL Open Font License, which allows use in the
 * app and in printed keepsakes.
 */
import { useFonts } from 'expo-font';

import { DMMono_400Regular } from '@expo-google-fonts/dm-mono/400Regular';
import { DMMono_500Medium } from '@expo-google-fonts/dm-mono/500Medium';
import { Lora_400Regular } from '@expo-google-fonts/lora/400Regular';
import { Lora_400Regular_Italic } from '@expo-google-fonts/lora/400Regular_Italic';
import { Lora_600SemiBold } from '@expo-google-fonts/lora/600SemiBold';
import { Nunito_400Regular } from '@expo-google-fonts/nunito/400Regular';
import { Nunito_600SemiBold } from '@expo-google-fonts/nunito/600SemiBold';
import { Nunito_700Bold } from '@expo-google-fonts/nunito/700Bold';
import { Nunito_800ExtraBold } from '@expo-google-fonts/nunito/800ExtraBold';

/** Returns [loaded, error]. Keep the splash screen up until loaded is true. */
export function useAppFonts() {
  return useFonts({
    Lora_400Regular,
    Lora_400Regular_Italic,
    Lora_600SemiBold,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    DMMono_400Regular,
    DMMono_500Medium,
  });
}
