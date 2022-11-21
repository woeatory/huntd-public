import { StyleSheet } from 'react-native';
import { FontFamilies } from '@/ui/theme/fonts';

export const typography = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontFamily: FontFamilies.Bold,
  },
  text: {
    fontSize: 14,
    fontFamily: FontFamilies.Regular,
    lineHeight: 20,
  },
  mediumText: {
    fontSize: 16,
    fontFamily: FontFamilies.Regular,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    fontFamily: FontFamilies.Bold,
    lineHeight: 20,
  },
  smallText: {
    fontSize: 12,
    fontFamily: FontFamilies.Regular,
  },
  smallCaption: {
    fontSize: 12,
    fontFamily: FontFamilies.Bold,
  },
});
