import React from 'react';
import Svg, { Circle } from 'react-native-svg';
import { FCIcon } from '@/ui/icons/icons.typedefs';
import { Colors } from '@/ui/theme/colors';

export const RadioButton: FCIcon = (props) => {
  const { color = Colors.CurrentColor, ...rest } = props;

  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 16 16"
      fill="none"
      {...rest}
    >
      <Circle
        cx="8"
        cy="8"
        r="8"
        fill={color}
      />
      <Circle
        cx="8"
        cy="8"
        r="4"
        fill="white"
      />
    </Svg>

  );
};
