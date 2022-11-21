import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { FCIcon } from '@/ui/icons/icons.typedefs';
import { Colors } from '@/ui/theme/colors';

export const SendIcon: FCIcon = (props) => {
  const { color = Colors.Gray, ...rest } = props;

  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...rest}
    >
      <Path
        d="M2 21L23 12L2 3V10L17 12L2 14V21Z"
        fill={color}
      />
    </Svg>
  );
};
