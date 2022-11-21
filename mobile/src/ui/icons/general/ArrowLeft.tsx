import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { FCIcon } from '@/ui/icons/icons.typedefs';
import { Colors } from '@/ui/theme/colors';

export const ArrowLeft: FCIcon = (props) => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.1844 15.2987C8.73371 17.2654 9.59939 19.5445 9.93008 21.0743L7.98103 21.5C7.70387 20.2178 6.95113 18.2321 5.62072 16.5433C4.30185 14.8691 2.46908 13.5466 7.09622e-07 13.3829L8.84699e-07 11.3802C1.73256 11.3802 6.27256 9.87852 7.98823 3L9.92288 3.48754C8.94854 7.39389 7.12937 9.87775 5.22234 11.3802L24 11.3802L24 13.385L5.28856 13.385C6.01369 13.9573 6.64386 14.6126 7.1844 15.2987Z"
        fill={color}
      />
    </Svg>
  );
};
