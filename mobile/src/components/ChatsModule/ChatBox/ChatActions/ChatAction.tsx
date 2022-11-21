import React, { FC } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/ui/theme/colors';
import { typography } from '@/ui/typography/typography.module';

export enum ChatActionType {
  Primary = 'primary',
  Bordered = 'bordered',
}

interface Props {
  type?: ChatActionType;
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export const ChatAction: FC<Props> = (props) => {
  const {
    type = ChatActionType.Primary,
    title,
    onPress,
    disabled = false,
  } = props;

  const isPrimary = type === ChatActionType.Primary;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.container,
        styles[type],
        (isPrimary ? styles.primary : styles.bordered),
      ]}
    >
      <Text
        style={[
          styles.text,
          typography.smallCaption,
          (isPrimary ? styles.primaryText : styles.borderedText),
        ]}
      >
        {title.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 4,
  },
  primary: {
    backgroundColor: Colors.Citrus,
  },
  bordered: {
    borderWidth: 1,
    borderColor: Colors.Citrus,
  },
  text: {
    textAlign: 'center',
  },
  primaryText: {
    color: Colors.White,
  },
  borderedText: {
    color: Colors.Citrus,
  },
});
