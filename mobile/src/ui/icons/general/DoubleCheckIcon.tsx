import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { FCIcon } from '@/ui/icons/icons.typedefs';
import { Colors } from '@/ui/theme/colors';

export const DoubleCheckIcon: FCIcon = (props) => {
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
        d="M1.59595 9.1612L4.75795 11.5745L9.83528 5.77186L8.83128 4.89453L4.57528 9.75853L2.40395 8.1012L1.59595 9.1612ZM14.5019 5.77186L13.4979 4.89453L9.25195 9.7472L8.74995 9.34586L7.91661 10.3872L9.41461 11.5859L14.5019 5.77186Z"
        fill={color}
      />
    </Svg>
  );
};
