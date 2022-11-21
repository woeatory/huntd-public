import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { ChatAction, ChatActionType } from '@/components/ChatsModule/ChatBox/ChatActions/ChatAction';
import { normalize } from '@/ui/theme/normalize';
import { Spacer } from '@/components/Base/Spacer';

interface Props {
  setMessage: (value: string) => void;
}

export const FastAnswersButtons: FC<Props> = (props) => {
  const { setMessage } = props;
  const { t } = useTranslation([Namespaces.Chat]);

  return (
    <View style={styles.container}>
      <ChatAction
        type={ChatActionType.Bordered}
        onPress={() => setMessage(t(`${Namespaces.Chat}:interested_fast_answer`))}
        title={t(`${Namespaces.Chat}:interested_button`)}
      />
      <Spacer width={normalize(12)} />
      <ChatAction
        type={ChatActionType.Bordered}
        onPress={() => setMessage(t(`${Namespaces.Chat}:not_interested_fast_answer`))}
        title={t(`${Namespaces.Chat}:not_interested_button`)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: normalize(8),
  },
});
