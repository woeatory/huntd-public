import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { FCIcon } from '@/ui/icons/icons.typedefs';
import { Colors } from '@/ui/theme/colors';

export const ProfileIconLocked: FCIcon = (props) => {
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
        r="11.5"
        stroke={color}
      />
      <Path
        d="M15 10.6875V9.375C15 8.57935 14.6839 7.81629 14.1213 7.25368C13.5587 6.69107 12.7956 6.375 12 6.375C11.2044 6.375 10.4413 6.69107 9.87868 7.25368C9.31607 7.81629 9 8.57935 9 9.375V10.6875H8.0625V13.6875C8.0625 15.8586 9.82884 17.625 12 17.625C14.1712 17.625 15.9375 15.8586 15.9375 13.6875V10.6875H15ZM9.75 9.375C9.75 8.77826 9.98705 8.20597 10.409 7.78401C10.831 7.36205 11.4033 7.125 12 7.125C12.5967 7.125 13.169 7.36205 13.591 7.78401C14.0129 8.20597 14.25 8.77826 14.25 9.375V10.6875H9.75V9.375ZM15.1875 13.6875C15.1875 15.4451 13.7576 16.875 12 16.875C10.2424 16.875 8.8125 15.4451 8.8125 13.6875V11.4375H15.1875V13.6875Z"
        fill="#726E6C"
      />
      <Circle
        cx="12"
        cy="13.5"
        r="0.75"
        fill="#726E6C"
      />
    </Svg>
  );
};
