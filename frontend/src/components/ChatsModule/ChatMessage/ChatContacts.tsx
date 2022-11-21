import React, { FC } from 'react';
import cn from 'classnames';
import { MessageDate } from '@/components/ChatsModule/ChatMessage/MessageDate';
import { Avatar } from '@/components/Profile/HeaderUserBlock/Avatar/Avatar';
import { AttachedCV } from '@/components/Profile/ProfileContactsModule/CVInputBlock/AttachedCV/AttachedCV';
import { ProfileSocialLink } from '@/components/Profile/ProfilePreview/CandidateProfilePreviewModule/ProfileSocialLink';
import { IconArrowLeft } from '@/ui/icons/general/IconArrowLeft';
import { SocialProviders } from '@/components/Profile/profile.constants';
import { useBuddyChatContext } from '@/controllers/buddyChat/buddyChat.context';
import { NftAvatar } from '@/components/Profile/ProfileContactsModule/NftAvatarPicker/NftAvatar';
import { useFeature } from '@/controllers/features/features.hooks/useFeature';
import { Features } from '@/controllers/features/features.constants';
import styles from './ChatMessage.module.scss';

interface Props {
  createdAt: string;
  updatedAt: string;
}

export const ChatContacts: FC<Props> = (props) => {
  const {
    createdAt,
    updatedAt,
  } = props;

  const {
    candidateUser,
    isUserCandidate,
  } = useBuddyChatContext();

  const nftAvatarFeature = useFeature(Features.NftAvatars);

  const nftAvatar = candidateUser && candidateUser.nfts
    ? candidateUser.nfts[0]
    : null;

  return (
    <div className={cn({
      [styles.chatMessageLeft]: !isUserCandidate,
      [styles.chatMessageRight]: isUserCandidate,
    })}
    >
      <div className={cn({
        [styles.contactsMessageRight]: isUserCandidate,
      })}
      >
        <div className={cn(styles.contactsTitle, 'mb-8', {
          [styles.contactsTitleRight]: isUserCandidate,
        })}
        >
          <div className={styles.messageMeta}>
            {(nftAvatar && nftAvatarFeature.isEnabled())
              ? (
                <NftAvatar
                  resolution={70}
                  url={nftAvatar.entity.url}
                  iconClass={styles.nftIcon}
                  hexagonClass={styles.nftHexagon}
                />
              )
              : (
                <Avatar
                  avatar={candidateUser?.avatar}
                  className={styles.chatAvatar}
                />
              )}
            <MessageDate createdAt={createdAt} updatedAt={updatedAt} />
          </div>

          <p className={cn(styles.contactName, {
            [styles.contactNameRight]: isUserCandidate,
          })}
          >
            {candidateUser?.computedName}
          </p>
        </div>
        {candidateUser?.cv && (
          <div className={cn('mb-24', {
            [styles.contactRight]: isUserCandidate,
            [styles.contactLeft]: !isUserCandidate,
          })}
          >
            <AttachedCV
              user={candidateUser}
              className={styles.cvBlock}
              linkClassName={styles.cvLink}
              iconClassName={styles.cvIcon}
              userCv={candidateUser.cv}
            >
              <IconArrowLeft />
            </AttachedCV>
          </div>
        )}

        <div className={cn('mb-16', {
          [styles.contactRight]: isUserCandidate,
          [styles.contactLeft]: !isUserCandidate,
        })}
        >
          {candidateUser?.phone && (
            <p className={styles.contactsField}>{candidateUser.phone}</p>
          )}

          {candidateUser?.email && (
            <p className={styles.contactsField}>{candidateUser.email}</p>
          )}
        </div>

        {candidateUser?.linkedinUrl && (
          <div className={cn('mb-16', {
            [styles.contactRight]: isUserCandidate,
            [styles.contactLeft]: !isUserCandidate,
          })}
          >
            <ProfileSocialLink
              link={candidateUser.linkedinUrl}
              title={SocialProviders.Linkedin}
              className={styles.socialLink}
            />
          </div>
        )}

        {candidateUser?.behanceUrl && (
          <div className={cn('mb-16', {
            [styles.contactRight]: isUserCandidate,
            [styles.contactLeft]: !isUserCandidate,
          })}
          >
            <ProfileSocialLink
              link={candidateUser.behanceUrl}
              title={SocialProviders.Behance}
              className={styles.socialLink}
            />
          </div>
        )}

        {candidateUser?.githubUrl && (
          <div className={cn({
            [styles.contactRight]: isUserCandidate,
            [styles.contactLeft]: !isUserCandidate,
          })}
          >
            <ProfileSocialLink
              link={candidateUser.githubUrl}
              title={SocialProviders.Github}
              className={styles.socialLink}
            />
          </div>
        )}
      </div>
    </div>
  );
};
