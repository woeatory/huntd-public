import { Animated } from 'react-native';
import { useCallback, useRef } from 'react';

interface UseScaleAnimation {
  (toValue?: number): [
    Animated.Value,
    () => void,
    () => void,
  ]
}

export const useScaleAnimation: UseScaleAnimation = (toValue = 0.96) => {
  const scaleAnimation = useRef(new Animated.Value(1)).current;

  const onPressIn = useCallback(() => {
    Animated.spring(scaleAnimation, {
      toValue,
      friction: 2,
      useNativeDriver: true,
    }).start();
  }, [scaleAnimation, toValue]);

  const onPressOut = useCallback(() => {
    Animated.spring(scaleAnimation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();

  }, [scaleAnimation]);

  return [scaleAnimation, onPressIn, onPressOut];
};
