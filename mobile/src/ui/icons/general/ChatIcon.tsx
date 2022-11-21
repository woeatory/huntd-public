import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '@/ui/theme/colors';
import { FCIcon } from '@/ui/icons/icons.typedefs';

export const ChatIcon: FCIcon = (props) => {
  const { color = Colors.CurrentColor, ...rest } = props;

  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...rest}
    >
      <Path
        d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z"
        fill={color}
      />
    </Svg>
  );
};
