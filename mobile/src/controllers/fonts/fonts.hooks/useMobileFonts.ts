import { useFonts } from 'expo-font';

import {
  Inter_400Regular,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

interface UsePrimaryFontResult {
  fontsLoaded: boolean;
}

export const useMobileFonts = (): UsePrimaryFontResult => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  return { fontsLoaded };
};
