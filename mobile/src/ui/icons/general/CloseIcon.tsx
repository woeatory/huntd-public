import React from 'react';
import Svg, {
  G, Defs, ClipPath, Rect, Path,
} from 'react-native-svg';
import { FCIcon } from '@/ui/icons/icons.typedefs';
import { Colors } from '@/ui/theme/colors';

export const CloseIcon: FCIcon = (props) => {
  const { color = Colors.CurrentColor, ...rest } = props;

  return (
    <Svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      {...rest}
    >
      <G clip-path="url(#clip0)">
        <Path
          d="M12 10.2322L5.81286 4.04505L4.04509 5.81282L10.2323 12L4.04509 18.1872L5.81286 19.955L12 13.7678L18.1872 19.955L19.955 18.1872L13.7678 12L19.955 5.81282L18.1872 4.04505L12 10.2322Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0">
          <Rect
            width="16"
            height="16"
            fill="white"
          />
        </ClipPath>
      </Defs>
    </Svg>

  );
};
