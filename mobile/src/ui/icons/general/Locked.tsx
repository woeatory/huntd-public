import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { FCIcon } from '@/ui/icons/icons.typedefs';
import { Colors } from '@/ui/theme/colors';

export const Locked: FCIcon = (props) => {
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
        d="M18 9.375V6.75C18 5.1587 17.3679 3.63258 16.2426 2.50736C15.1174 1.38214 13.5913 0.75 12 0.75C10.4087 0.75 8.88258 1.38214 7.75736 2.50736C6.63214 3.63258 6 5.1587 6 6.75V9.375H4.125V15.375C4.125 19.7173 7.65769 23.25 12 23.25C16.3423 23.25 19.875 19.7173 19.875 15.375V9.375H18ZM7.5 6.75C7.5 5.55653 7.97411 4.41193 8.81802 3.56802C9.66193 2.72411 10.8065 2.25 12 2.25C13.1935 2.25 14.3381 2.72411 15.182 3.56802C16.0259 4.41193 16.5 5.55653 16.5 6.75V9.375H7.5V6.75ZM18.375 15.375C18.375 18.8902 15.5152 21.75 12 21.75C8.48484 21.75 5.625 18.8902 5.625 15.375V10.875H18.375V15.375Z"
        fill={color}
      />
      <Circle
        cx="12"
        cy="15"
        r="1.5"
        fill={color}
      />
    </Svg>

  );
};
