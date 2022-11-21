import React from 'react';
import Svg, {
  Line, Defs, LinearGradient, Stop,
} from 'react-native-svg';
import { FCIcon } from '@/ui/icons/icons.typedefs';

export const BreakLine: FCIcon = () => (
  <Svg
    width="336"
    height="1"
    viewBox="0 0 336 1"
    fill="none"
  >
    <Line
      x1="-4.83126e-08"
      y1="0.500031"
      x2="336"
      y2="0.500004"
      stroke="url(#paint0_linear)"
      strokeDasharray="3 5"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear"
        x1="336"
        y1="1"
        x2="0"
        y2="1.00009"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#726E6C" stopOpacity="0" />
        <Stop offset="0.494792" stopColor="#726E6C" />
        <Stop offset="1" stopColor="#726E6C" stopOpacity="0" />
      </LinearGradient>
    </Defs>
  </Svg>
);
