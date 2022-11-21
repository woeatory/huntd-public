import React, { FC } from 'react';
import {
  TouchableOpacity, Text, GestureResponderEvent, StyleProp, ViewStyle,
} from 'react-native';
import { buttonStyles } from '@/ui/buttons';

export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
  Switcher = 'switcher',
}

interface Props {
  onPress: (e: GestureResponderEvent) => void;
  title: string;
  type?: ButtonType;
  disabled?: boolean;
  activeOpacity?: number;
  style?: StyleProp<ViewStyle>;
}

interface ButtonInterface extends FC<Props> {
  type: typeof ButtonType;
}

export const Button: ButtonInterface = (props) => {
  const {
    type = ButtonType.Primary,
    onPress,
    title,
    disabled = false,
    activeOpacity = 0.7,
    style,
  } = props;

  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      disabled={disabled}
      style={[buttonStyles.button, buttonStyles[type], style]}
      onPress={onPress}
    >
      <Text style={[buttonStyles.title, buttonStyles[type]]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

Button.type = ButtonType;
