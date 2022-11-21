import React, { FC } from 'react';
import { Text, View, Switch } from 'react-native';
import { preferencesItemStyles } from '@/components/Preferences/components/PreferencesLink';
import { typography } from '@/ui/typography/typography.module';
import { Colors } from '@/ui/theme/colors';

interface Props {
  text: string;
  onPress: () => void;
  isEnabled: boolean;
}

export const PreferencesItem: FC<Props> = (props) => {
  const { text, onPress, isEnabled } = props;

  return (
    <View style={preferencesItemStyles.container}>
      <Text style={[preferencesItemStyles.text, typography.caption]}>
        {text}
      </Text>
      <Switch
        style={{ transform: [{ scale: 0.8 }] }}
        trackColor={{ false: Colors.Gray, true: Colors.Citrus }}
        ios_backgroundColor={Colors.Gray}
        onValueChange={onPress}
        value={isEnabled}
      />
    </View>
  );
};
