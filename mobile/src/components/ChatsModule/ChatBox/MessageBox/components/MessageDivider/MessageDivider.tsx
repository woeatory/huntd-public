import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native';
import { typography } from '@/ui/typography/typography.module';
import { Colors } from '@/ui/theme/colors';

interface Props {
  createdAt: string;
}

export const MessageDivider = memo<Props>(({ createdAt }) => {
  const { i18n } = useTranslation();

  const formatter = new Intl.DateTimeFormat(i18n.language, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weekday: 'long',
  });

  return (
    <View style={styles.container}>
      <Text style={[typography.smallText, styles.divider]}>
        {formatter.format(new Date(createdAt))}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 8,
  },
  divider: {
    color: Colors.LightGray,
  },
});
