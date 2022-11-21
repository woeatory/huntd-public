import React, { FC } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { Colors } from '@/ui/theme/colors';

interface Props {
  message: string;
}

export const Error: FC<Props> = (props) => {
  const { message } = props;
  const { t } = useTranslation([Namespaces.Common]);

  return (
    <View style={styles.container}>
      <Text>{t(`${Namespaces.Common}:${message}`)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Background,
  },
});
