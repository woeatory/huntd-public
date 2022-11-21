import { StyleSheet } from 'react-native';
import { Colors } from '@/ui/theme/colors';
import { FontFamilies } from '@/ui/theme/fonts';
import { normalize } from '@/ui/theme/normalize';

export const buttonStyles = StyleSheet.create({
  button: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.Citrus,
  },
  title: {
    color: Colors.White,
    fontFamily: FontFamilies.Bold,
    fontSize: normalize(12),
    textTransform: 'uppercase',
  },
  primary: {
    backgroundColor: Colors.Citrus,
    color: Colors.White,
  },
  secondary: {
    backgroundColor: Colors.White,
    color: Colors.Citrus,
  },
  switcher: {
    width: '50%',
    height: 24,
    paddingVertical: 4,
    color: Colors.Citrus,
    fontFamily: FontFamilies.Regular,
    borderRadius: 2,
    borderWidth: 0,
    textAlign: 'center',
  },
});
