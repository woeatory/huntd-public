import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { FCIcon } from '@/ui/icons/icons.typedefs';
import { Colors } from '@/ui/theme/colors';

export const ChevronDown: FCIcon = (props) => {
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
        d="M12 16.5L4.5 9.00001L5.55 7.95001L12 14.4L18.45 7.95001L19.5 9.00001L12 16.5Z"
        fill={color}
      />
    </Svg>
  );
};
