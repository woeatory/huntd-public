import React, { FC } from 'react';
import { StyleSheet, Animated, TouchableHighlight } from 'react-native';
import { useScaleAnimation } from '@/controllers/animation/animation.hooks/useScaleAnimation';

interface Props {
  onPress: () => void;
  onLongPress: () => void;
}

export const ChatsItemWrapper: FC<Props> = (props) => {
  const { children, onPress, onLongPress } = props;

  const [scale, onPressIn, onPressOut] = useScaleAnimation(0.97);

  return (
    <TouchableHighlight
      delayLongPress={200}
      underlayColor="rgba(209, 204, 201, 0.2)"
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onLongPress={onLongPress}
    >
      <Animated.View
        style={[
          styles.container,
          { transform: [{ scale }] },
        ]}
      >
        {children}
      </Animated.View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
});
