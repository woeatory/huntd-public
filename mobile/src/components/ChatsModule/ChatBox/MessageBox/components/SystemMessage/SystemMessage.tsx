import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { MessageDate } from '@/components/ChatsModule/ChatBox/MessageBox/components/MessageDate';
import { normalize } from '@/ui/theme/normalize';
import { Colors } from '@/ui/theme/colors';
import { typography } from '@/ui/typography/typography.module';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';

interface Props {
  message: string;
  messageDate: string;
}

export const SystemMessage: FC<Props> = (props) => {
  const { t } = useTranslation([Namespaces.Chat]);
  const { message, messageDate } = props;

  return (
    <View style={styles.container}>
      <MessageDate color={Colors.Gray} date={messageDate} />
      <Text style={styles.message}>
        {t(`${Namespaces.Chat}:${message}`)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: normalize(8, 'height'),
  },
  message: {
    ...typography.text,
    color: Colors.Gray,
  },
});
