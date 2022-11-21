import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { FontFamilies } from '@/ui/theme/fonts';
import { Colors } from '@/ui/theme/colors';

interface Props {
  date: string;
  color?: Colors;
}

export const MessageDate = memo<Props>((props) => {
  const { date, color = Colors.Semidark } = props;

  const messageDate = new Date(date);
  const { i18n } = useTranslation([Namespaces.Common]);

  const formatter = new Intl.DateTimeFormat(i18n.language, {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });

  return (
    <Text style={[styles.time, { color }]}>
      {formatter.format(messageDate)}
    </Text>
  );
});

const styles = StyleSheet.create({
  time: {
    fontFamily: FontFamilies.Regular,
    fontSize: 10,
  },
});
