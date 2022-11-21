import { Platform, StyleSheet } from 'react-native';
import { Colors } from '@/ui/theme/colors';

export const GlobalStyles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
});
