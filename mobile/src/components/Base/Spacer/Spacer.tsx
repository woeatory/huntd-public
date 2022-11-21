import React, { FC } from 'react';
import { View } from 'react-native';
import { Colors } from '@/ui/theme/colors';

interface Props {
  width?: number;
  height?: number;
  color?: Colors;
}

export const Spacer: FC<Props> = (props) => {
  const {
    height = 0,
    width = 0,
    color: backgroundColor = Colors.White,
  } = props;

  return <View style={{ height, width, backgroundColor }} />;
};
