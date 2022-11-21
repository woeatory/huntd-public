import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/ui/theme/colors';

interface Props {
  onClick: () => void;
  disabled?: boolean;
}

export const SocialButton: FC<Props> = (props) => {
  const { onClick, children, disabled = false } = props;

  return (
    <TouchableOpacity
      onPress={onClick}
      style={styles.container}
      disabled={disabled}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderColor: Colors.LightGray,
    borderRadius: 4,
  },
});
