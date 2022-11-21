import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '@/ui/theme/colors';

interface Props {
  active: boolean;
}

export const UnreadMark: FC<Props> = (props) => {
  const { active } = props;

  return (
    <View style={[styles.mark, { opacity: active ? 1 : 0 }]} />
  );
};

const styles = StyleSheet.create({
  mark: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.Citrus,
  },
});
