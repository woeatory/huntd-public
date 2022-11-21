import React from 'react';
import { Avatar } from '@/components/Profile/HeaderUserBlock/Avatar/Avatar';
import { UploadedFile } from '@/controllers/graphql/generated';
import { IconLockLocked } from '@/ui/icons/general/IconLockLocked';
import styles from '@/components/ChatsModule/ChatMessage/ChatMessage.module.scss';

interface Props {
  areContactsOpened: boolean;
  avatar: UploadedFile | null | undefined;
}

export const CandidateAvatar = (props: Props) => {
  const { areContactsOpened, avatar } = props;

  return (areContactsOpened
    ? (
      <Avatar
        avatar={avatar}
        className={styles.chatAvatar}
      />
    )
    : (
      <div className={styles.chatAvatarLock}>
        <IconLockLocked />
      </div>
    )
  );
};
