import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { FCIcon } from '@/ui/icons/icons.typedefs';
import { Colors } from '@/ui/theme/colors';

export const CheckIcon: FCIcon = (props) => {
  const { color = Colors.CurrentColor, ...rest } = props;

  return (
    <Svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      {...rest}
    >
      <Path
        d="M6.47627 12L2.66675 8.22324L3.87818 7.04762L6.47627 9.59695L12.1212 4L13.3334 5.20152L6.47627 12Z"
        fill={color}
      />
    </Svg>
  );
};
