import React, { FC } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BackButton } from '@/components/Header/BackButton';
import { typography } from '@/ui/typography/typography.module';
import { Colors } from '@/ui/theme/colors';

interface Props {
  text: string;
}

export const HeaderBackButton: FC<Props> = (props) => {
  const { text } = props;

  return (
    <View style={styles.container}>
      <BackButton style={{ marginLeft: 14 }} />
      <Text style={[styles.text, typography.heading]}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 16,
    color: Colors.ExtraDark,
  },
});
