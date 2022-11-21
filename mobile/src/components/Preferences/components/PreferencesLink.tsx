import React, { FC } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { typography } from '@/ui/typography/typography.module';
import { ChevronRight } from '@/ui/icons/general/ChevronRight';
import { Colors } from '@/ui/theme/colors';

interface Props {
  text: string;
  onPress: () => void;
}

export const PreferencesLink: FC<Props> = (props) => {
  const { text, onPress } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      style={preferencesItemStyles.container}
    >
      <Text
        style={[preferencesItemStyles.text, typography.caption]}
      >
        {text}
      </Text>
      <ChevronRight
        height={16}
        width={16}
        color={Colors.Semidark}
      />
    </TouchableOpacity>
  );
};

export const preferencesItemStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(209, 204, 201, 0.4)',
  },
  text: {
    color: Colors.Semidark,
  },
});
