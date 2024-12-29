import { useCallback, useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { 
  GystVariable_100Thin,
  GystVariable_300Light,
  GystVariable_400Regular,
  GystVariable_500Medium,
  GystVariable_600SemiBold,
  GystVariable_700Bold,
  GystVariable_900Black,
} from '@expo-google-fonts/gyst-variable';

export function useLoadFonts() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = useCallback(async () => {
    try {
      await Font.loadAsync({
        'GystVariable-Thin': GystVariable_100Thin,
        'GystVariable-Light': GystVariable_300Light,
        'GystVariable-Regular': GystVariable_400Regular,
        'GystVariable-Medium': GystVariable_500Medium,
        'GystVariable-SemiBold': GystVariable_600SemiBold,
        'GystVariable-Bold': GystVariable_700Bold,
        'GystVariable-Black': GystVariable_900Black,
      });
      setFontsLoaded(true);
    } catch (error) {
      console.error('Error loading fonts:', error);
    }
  }, []);

  useEffect(() => {
    loadFonts();
  }, [loadFonts]);

  return fontsLoaded;
}