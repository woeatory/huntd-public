import { StyleSheet } from 'react-native';
import { Colors } from '@/ui/theme/colors';
import { FontFamilies } from '@/ui/theme/fonts';

export const formStyles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    fontFamily: FontFamilies.Regular,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 4,
    height: 48,
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.LightGray,
    borderRadius: 4,
  },
  inputTransparent: {
    fontSize: 16,
    fontFamily: FontFamilies.Regular,
    paddingVertical: 8,
    height: 48,
    backgroundColor: Colors.Background,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputError: {
    borderColor: Colors.Error,
  },
  label: {
    marginBottom: 4,
    fontFamily: FontFamilies.Regular,
    fontSize: 14,
    color: Colors.Gray,
  },
  error: {
    color: Colors.Error,
  },
});
