import React, { FC, useCallback } from 'react';
import {
  StyleSheet, Text, TouchableWithoutFeedback, View,
} from 'react-native';
import { Colors } from '@/ui/theme/colors';
import { typography } from '@/ui/typography/typography.module';
import { MessageDate } from '@/components/ChatsModule/ChatBox/MessageBox/components/MessageDate';
import { ProfileIconLocked } from '@/ui/icons/general/ProfileIconLocked';
import { Image } from '@/components/Base/Image';
import { NoAvatar } from '@/components/Base/NoAvatar';
import { useNavigation } from '@/controllers/router/router.hooks/useNagivation';
import { MessageUserRole, ProfileConnectionInitiator } from '@/controllers/graphql/generated';
import { StackRoutes } from '@/controllers/router/router.constants';
import { MessageStatus } from '@/components/ChatsModule/ChatBox/MessageBox/components/MessageStatus/MessageStatus';
import { normalize } from '@/ui/theme/normalize';

enum ChatMessagePosition {
  Left = 'left',
  Right = 'right',
  Center = 'center',
}

enum ChatMessageRenderMode {
  Border = 'border',
  Background = 'background',
  System = 'system',
}

interface Props {
  position: ChatMessagePosition;
  mode: ChatMessageRenderMode;
  date: string;
  message: string;
  hidden: boolean;
  profileSlug: string | undefined | null;
  type: ProfileConnectionInitiator | undefined | null;
  avatar?: string;
  unreadByBuddy: boolean;
  authUserRole: MessageUserRole;
}

interface ChatMessageInterface extends FC<Props>{
  position: typeof ChatMessagePosition;
  mode: typeof ChatMessageRenderMode;
}

export const ChatMessage: ChatMessageInterface = (props) => {
  const {
    mode, position, date, message, type, unreadByBuddy,
    hidden, avatar, profileSlug, authUserRole,
  } = props;

  const navigation = useNavigation();

  const flexDirection = position === ChatMessagePosition.Left
    ? 'row'
    : 'row-reverse';

  const renderAvatar = useCallback(() => {
    if (hidden) {
      return <ProfileIconLocked color={Colors.Citrus} />;
    }

    if (avatar) {
      return <Image src={avatar} borderRadius={12} size={28} />;
    }

    return <NoAvatar />;

  }, [avatar, hidden]);

  const onPress = useCallback(() => {
    if (profileSlug) {
      navigation.navigate(
        type === ProfileConnectionInitiator.Candidate
          ? StackRoutes.Candidate
          : StackRoutes.Recruiter,
        { slug: profileSlug },
      );
    }
  }, [navigation, profileSlug, type]);

  return (
    <View style={[styles.container, { flexDirection }]}>
      <View style={[styles.content, { flexDirection }]}>
        <TouchableWithoutFeedback onPress={onPress}>
          <View
            style={[
              position === ChatMessagePosition.Left
                ? { marginRight: normalize(10) }
                : { marginLeft: normalize(10) },
              styles.avatarSection,
            ]}
          >
            {renderAvatar()}
            <MessageDate date={date} />
          </View>
        </TouchableWithoutFeedback>
        <Text
          style={[
            mode === ChatMessageRenderMode.Background
              ? styles.backgroundMessage
              : styles.borderMessage,
          ]}
        >
          {message}
        </Text>
        {authUserRole === MessageUserRole.Sender && (
          <MessageStatus unread={unreadByBuddy} />
        )}
      </View>
    </View>
  );
};

ChatMessage.position = ChatMessagePosition;
ChatMessage.mode = ChatMessageRenderMode;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    maxWidth: '75%',
  },
  avatarSection: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  borderMessage: {
    ...typography.text,
    padding: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.Peach,
    borderRadius: 4,
  },
  backgroundMessage: {
    ...typography.text,
    padding: 10,
    backgroundColor: Colors.LightPeach,
    borderRadius: 4,
    overflow: 'hidden',
  },
});
