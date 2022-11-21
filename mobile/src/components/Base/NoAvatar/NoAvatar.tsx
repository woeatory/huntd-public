import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '@/ui/theme/colors';

interface Props {
  size?: number;
  borderRadius?: number;
}

export const NoAvatar: FC<Props> = (props) => {
  const { size = 24, borderRadius = size / 2 } = props;

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Citrus,
  },
});
