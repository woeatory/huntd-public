import React, { FC } from 'react';
import {
  TouchableWithoutFeedback, Animated, StyleProp, ViewStyle,
} from 'react-native';
import { useScaleAnimation } from '@/controllers/animation/animation.hooks/useScaleAnimation';

interface Props {
  onPress?: () => void;
  toValue?: number;
  styles?: StyleProp<ViewStyle>[]
}

export const ScaleTouchableView: FC<Props> = (props) => {
  const {
    children, toValue, onPress, styles = [],
  } = props;

  const [scale, onPressIn, onPressOut] = useScaleAnimation(toValue);

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View
        style={[
          ...styles,
          { transform: [{ scale }] },
        ]}
      >
        {children}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
