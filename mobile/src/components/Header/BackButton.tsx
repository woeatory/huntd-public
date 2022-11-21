import React, { FC } from 'react';
import {
  StyleProp, TouchableOpacity, ViewStyle, Text, StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from '@/ui/icons/general/ArrowLeft';
import { Colors } from '@/ui/theme/colors';
import { typography } from '@/ui/typography/typography.module';

interface Props {
  style?: StyleProp<ViewStyle>
  color?: Colors;
  callback?: () => void;
  label?: string;
}

export const BackButton: FC<Props> = (props) => {
  const navigation = useNavigation();

  const {
    color = Colors.Gray,
    callback = () => navigation.goBack(),
    label,
    ...rest
  } = props;

  return (
    <TouchableOpacity onPress={callback} {...rest}>
      <ArrowLeft color={color} />
      {label && (
        <Text style={styles.label}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  label: {
    ...typography.heading,
    marginLeft: 16,
    color: Colors.Citrus,
  },
});
