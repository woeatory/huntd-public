import React, {
  FC, useCallback, useEffect, useRef,
} from 'react';
import cn from 'classnames';
import { MessageDate } from '@/components/ChatsModule/ChatMessage/MessageDate';
import { Button } from '@/ui/buttons/Button';
import { UnreadMark } from '@/components/Base/UnreadMark';
import { useUpdateConnectionLastActionTime } from '@/controllers/buddyChat/buddyChat.hooks/useUpdateConnectionLastActionTime';
import { Avatar } from '@/components/Profile/HeaderUserBlock/Avatar/Avatar';
import {
  MessageUserRole,
  UploadedFile,
  useAdminUserQuery,
  ProfileConnectionInitiator, Nft,
} from '@/controllers/graphql/generated';
import { MessageStatus } from '@/components/ChatsModule/ChatMessage/MessageStatus';
import { ChatContacts } from '@/components/ChatsModule/ChatMessage/ChatContacts';
import { IconEditMessage } from '@/ui/icons/general/IconEditMessage';
import { useBuddyChatContext } from '@/controllers/buddyChat/buddyChat.context';
import { useFeature } from '@/controllers/features/features.hooks/useFeature';
import { Features } from '@/controllers/features/features.constants';
import { NftAvatar } from '@/components/Profile/ProfileContactsModule/NftAvatarPicker/NftAvatar';
import { CandidateAvatar } from './CandidateAvatar';
import styles from './ChatMessage.module.scss';

enum ChatMessagePosition {
  Left = 'left',
  Right = 'right',
  Center = 'center',
}

enum ChatMessageRenderMode {
  Border = 'border',
  Background = 'background',
  System = 'system'
}

interface Props {
  avatar: UploadedFile | undefined | null;
  nfts?: Nft[] | null;
  position: ChatMessagePosition;
  mode: ChatMessageRenderMode;
  createdAt: string;
  updatedAt: string;
  id: string;
  unreadByUser: boolean;
  unreadByBuddy: boolean;
  profileConnectionId: number;
  unreadMessagesCount: number;
  authUserRole: MessageUserRole;
  buddyType?: ProfileConnectionInitiator;
  withContactsPreview: boolean;
  areContactsOpened: boolean;
  messageText: string | undefined;
  messageId: number;
}

interface ChatMessageProps extends FC<Props>{
  position: typeof ChatMessagePosition;
  mode: typeof ChatMessageRenderMode;
}

export const ChatMessage: ChatMessageProps = (props) => {
  const {
    position = ChatMessagePosition.Left,
    mode = ChatMessageRenderMode.Border,
    children,
    id,
    createdAt,
    updatedAt,
    unreadByUser,
    unreadByBuddy,
    profileConnectionId,
    avatar,
    nfts,
    unreadMessagesCount,
    authUserRole,
    buddyType,
    withContactsPreview,
    areContactsOpened,
    messageText,
    messageId,
  } = props;

  const { Left, Right, Center } = ChatMessagePosition;
  const { Border, Background, System } = ChatMessageRenderMode;

  const { data: adminData } = useAdminUserQuery();

  const updateActionTime = useUpdateConnectionLastActionTime();

  const messageElement = useRef<HTMLDivElement | null>(null);

  const {
    setIsMessageEditing,
    setMessage,
    setEditedMessageId,
  } = useBuddyChatContext();

  const editMessage = () => {
    setIsMessageEditing(true);
    setEditedMessageId(messageId);

    if (messageText) {
      setMessage(messageText);
    }
  };

  useEffect(() => {
    const element = messageElement.current;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];

      if (entry.isIntersecting
        && unreadByUser
        && !adminData?.adminUser) {
        updateActionTime({
          time: createdAt,
          id: profileConnectionId,
        });
      }
    });

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [
    adminData,
    createdAt,
    updateActionTime,
    profileConnectionId,
    unreadMessagesCount,
    unreadByUser,
  ]);

  const withCandidateContacts = mode === System
    && withContactsPreview;

  const isCandidateMessage = (
    authUserRole === MessageUserRole.Sender
    && buddyType === ProfileConnectionInitiator.Recruiter) || (
    authUserRole === MessageUserRole.Recipient
    && buddyType === ProfileConnectionInitiator.Candidate
  );

  const nftAvatar = nfts ? nfts[0] : null;

  const nftAvatarFeature = useFeature(Features.NftAvatars);

  const candidateAvatarGenerator = useCallback(() => {
    if (nftAvatar && nftAvatarFeature.isEnabled()) {
      return (
        <NftAvatar
          resolution={70}
          url={nftAvatar.entity.url}
          iconClass={styles.nftIcon}
          hexagonClass={styles.nftHexagon}
        />
      );
    }

    return (
      <CandidateAvatar
        avatar={avatar}
        areContactsOpened={areContactsOpened}
      />
    );
  }, [areContactsOpened, nftAvatar, nftAvatarFeature, avatar]);

  return (
    <>
      <div
        data-message-id={id}
        data-unread={unreadByUser || undefined}
        ref={messageElement}
        className={cn(styles.chatMessage, {
          [styles.chatMessageLeft]: position === Left,
          [styles.chatMessageRight]: position === Right,
          [styles.chatMessageCenter]: position === Center,
          [styles.chatMessageBorder]: mode === Border,
          [styles.chatMessageBackground]: mode === Background,
          [styles.chatMessageSystem]: mode === System,
        })}
      >
        {authUserRole === MessageUserRole.Sender && (
        <div className={styles.messageStatus}>
          <MessageStatus unread={unreadByBuddy} />
        </div>
        )}
        {mode !== System && (
        <div className={styles.messageMeta}>
            {isCandidateMessage
              ? (
                candidateAvatarGenerator()
              )
              : (
                <Avatar
                  avatar={avatar}
                  className={styles.chatAvatar}
                />
              )}
        </div>
        )}
        <div className={styles.messageContent}>
          {children}
          <div className={styles.messageData}>
            <MessageDate createdAt={createdAt} updatedAt={updatedAt} />

            {authUserRole === MessageUserRole.Sender && (
              <div
                className={styles.editBox}
              >
                <Button
                  type="button"
                  className={cn(styles.editMessageButton)}
                  onClick={editMessage}
                  LeftIcon={IconEditMessage}
                />
              </div>
            )}
          </div>
          <UnreadMark active={unreadByUser} />
        </div>
      </div>

      {withCandidateContacts && (
        <ChatContacts
          createdAt={createdAt}
          updatedAt={updatedAt}
        />
      )}
    </>

  );
};

ChatMessage.position = ChatMessagePosition;
ChatMessage.mode = ChatMessageRenderMode;
