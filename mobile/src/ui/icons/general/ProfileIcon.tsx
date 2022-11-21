import React from 'react';
import Svg, { Circle } from 'react-native-svg';
import { Colors } from '@/ui/theme/colors';
import { FCIcon } from '@/ui/icons/icons.typedefs';

export const ProfileIcon: FCIcon = (props) => {
  const { color = Colors.CurrentColor, ...rest } = props;

  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...rest}
    >
      <Circle
        cx="12"
        cy="12"
        r="12"
        fill={color}
      />
    </Svg>

  );
};
