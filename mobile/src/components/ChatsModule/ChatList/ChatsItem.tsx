import React, {
  FC, useCallback, useMemo,
} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import * as Haptics from 'expo-haptics';
import { typography } from '@/ui/typography/typography.module';
import { Colors } from '@/ui/theme/colors';
import { FontFamilies } from '@/ui/theme/fonts';
import { UnreadMark } from '@/components/Base/UnreadMark';
import { StackRoutes } from '@/controllers/router/router.constants';
import { getUserActionTime } from '@/controllers/user/user.utils/getUserActionTime';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { ChatsItemWrapper } from '@/components/ChatsModule/ChatList/ChatsItemWrapper';
import { useChatsContext } from '@/controllers/chat/chat.context';
import { useNavigation } from '@/controllers/router/router.hooks/useNagivation';

interface Props {
  chatId: number;
  position: string;
  title: string;
  lastActionTime: string;
  unread: boolean;
  hidden: boolean;
  openModal: () => void;
}

export const ChatsItem: FC<Props> = (props) => {
  const {
    position, title, unread, lastActionTime, chatId, hidden, openModal,
  } = props;

  const { setSelectedChat } = useChatsContext();
  const { t } = useTranslation([Namespaces.Profile, Namespaces.Chat]);
  const navigation = useNavigation();

  const positionFontFamily = unread
    ? FontFamilies.Bold
    : FontFamilies.Regular;

  const onPress = useCallback(() => {
    navigation.navigate(StackRoutes.Chat, { chatId });
  }, [chatId, navigation]);

  const onLongPress = useCallback(() => {
    Haptics.impactAsync();
    openModal();
    setSelectedChat(chatId);
  }, [chatId, setSelectedChat, openModal]);

  const actionTime = useMemo(
    () => getUserActionTime(lastActionTime, t),
    [t, lastActionTime],
  );

  return (
    <ChatsItemWrapper
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <View style={styles.container}>
        <View>
          <View style={styles.positionContainer}>
            <UnreadMark active={unread} />
            <Text style={[styles.position, { fontFamily: positionFontFamily }]}>
              {position}
            </Text>
          </View>
          <View>
            <Text style={styles.title}>
              {hidden
                ? t(`${Namespaces.Chat}:contacts_hidden`)
                : title}
            </Text>
          </View>
        </View>
        <Text style={styles.actionTime}>
          {lastActionTime && actionTime}
        </Text>
      </View>
    </ChatsItemWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  positionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  position: {
    fontSize: 14,
    color: Colors.Semidark,
    marginLeft: 8,
  },
  title: {
    ...typography.text,
    color: Colors.Gray,
    marginLeft: 24,
  },
  actionTime: {
    ...typography.text,
    color: Colors.Gray,
  },
});
