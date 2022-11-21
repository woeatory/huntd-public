import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '@/ui/theme/colors';
import { FCIcon } from '@/ui/icons/icons.typedefs';

export const CheckboxCheckedIcon: FCIcon = (props) => {
  const { color = Colors.Citrus, ...rest } = props;

  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...rest}
    >
      <Path
        d="M19.5 3H4.5C4.10218 3 3.72064 3.15804 3.43934 3.43934C3.15804 3.72064 3 4.10218 3 4.5V19.5C3 19.8978 3.15804 20.2794 3.43934 20.5607C3.72064 20.842 4.10218 21 4.5 21H19.5C19.8978 21 20.2794 20.842 20.5607 20.5607C20.842 20.2794 21 19.8978 21 19.5V4.5C21 4.10218 20.842 3.72064 20.5607 3.43934C20.2794 3.15804 19.8978 3 19.5 3Z"
        fill={color}
      />
      <Path
        d="M10.4763 16L6.66675 12.2232L7.87818 11.0476L10.4763 13.597L16.1212 8L17.3334 9.20152L10.4763 16Z"
        fill="white"
      />
    </Svg>
  );
};
