import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { FCIcon } from '@/ui/icons/icons.typedefs';
import { Colors } from '@/ui/theme/colors';

export const ChevronRight: FCIcon = (props) => {
  const { color = Colors.CurrentColor, ...rest } = props;

  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 16 16"
      fill="none"
      {...rest}
    >
      <Path
        d="M10.9998 8L5.9998 13L5.2998 12.3L9.5998 8L5.2998 3.7L5.9998 3L10.9998 8Z"
        fill={color}
      />
    </Svg>
  );
};
