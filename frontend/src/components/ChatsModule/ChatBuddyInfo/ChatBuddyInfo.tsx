import React, { memo, useMemo } from 'react';
import cn from 'classnames';
import { IconLockLocked } from '@/ui/icons/general/IconLockLocked';
import {
  ProfileConnectionInitiator,
  useProfileConnectionMetaQuery,
} from '@/controllers/graphql/generated';
import { RecruiterTitle } from '@/components/ChatsModule/ChatBuddyInfo/RecruiterTitle';
import { CandidateTitle } from '@/components/ChatsModule/ChatBuddyInfo/CandidateTitle';
import { getChatBuddyMeta } from '@/controllers/buddyChat/buddyChat.utils/getChatBuddyMeta';
import { Routes } from '@/controllers/router/router.constants';
import { Link } from '@/controllers/i18n/i18n.client';
import { Selectors } from '@/lib/selectors';
import { IconArrowLeft } from '@/ui/icons/general/IconArrowLeft';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { ChatActions } from '@/components/ChatsModule/ChatActions';
import { Image } from '@/components/Base/Image/Image';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';
import { NftAvatar } from '@/components/Profile/ProfileContactsModule/NftAvatarPicker/NftAvatar';
import { useFeature } from '@/controllers/features/features.hooks/useFeature';
import { Features } from '@/controllers/features/features.constants';
import styles from './ChatBuddyInfo.module.scss';

interface Props {
  profileConnectionId: number;
  setActiveConnectionId: (id: number) => void;
}
export const ChatBuddyInfo = memo<Props>(
  ({ profileConnectionId, setActiveConnectionId }) => {
    const [authUser] = useAuthUser();
    const { data } = useProfileConnectionMetaQuery({
      variables: {
        profileConnectionId,
      },
      ssr: true,
    });

    const { t } = useTranslation([Namespaces.Chat]);

    const nftAvatarFeature = useFeature(Features.NftAvatars);

    const isDisabled = useMemo(
      () => profileConnectionId === 0,
      [profileConnectionId],
    );

    if (!data?.profileConnection) {
      return null;
    }

    const { type, user, profile } = getChatBuddyMeta(data?.profileConnection);

    const { candidateUser, recruiterProfile } = data.profileConnection;

    const nftAvatar = user && user.nfts
      ? user.nfts[0]
      : null;

    const companyName = authUser?.id === candidateUser?.id
      ? `${recruiterProfile.companyName} | `
      : null;

    const profileLastActionTime = profile?.lastActionTime ?? null;

    const baseRoute = type === ProfileConnectionInitiator.Candidate
      ? Routes.Candidate
      : Routes.Recruiter;

    return (
      <div className={styles.buddyInfoWrapper}>
        <Link href={Routes.Chats}>
          <a
            className={cn(styles.chatBackLink, 'hide-for-large')}
            href={Routes.Chats}
            onClick={() => setActiveConnectionId(0)}
            title={t(`${Namespaces.Chat}:back_link`)}
            aria-label={t(`${Namespaces.Chat}:back_link`)}
          >
            <IconArrowLeft />
          </a>
        </Link>

        <Link href={`${baseRoute}/${profile.slug}?source=chats`}>

          <a className={styles.chatBuddyInfo}>
            {(nftAvatar && nftAvatarFeature.isEnabled())
              ? (
                <NftAvatar
                  resolution={112}
                  url={nftAvatar.entity.url}
                  iconClass={styles.nftIcon}
                  hexagonClass={styles.nftHexagon}
                />
              )
              : (
                <div className={cn(styles.buddyAvatar, {
                  [Selectors.Active]: !!user,
                })}
                >
                  {user?.avatar && (
                  <Image
                    src={user?.avatar.url}
                    width={112}
                    height={112}
                    objectFit="cover"
                  />
                    )}
                  {!user && (
                  <IconLockLocked />
                  )}
                </div>
              )}

            {companyName
              ? (
                <RecruiterTitle
                  companyName={companyName}
                  position={profile.position ?? ''}
                  profileLastActionTime={profileLastActionTime}
                  computedName={user?.computedName ?? ''}
                />
              )
              : (
                <CandidateTitle
                  position={profile.position ?? ''}
                  profileLastActionTime={profileLastActionTime}
                  computedName={user?.computedName ?? ''}
                />
              )}
          </a>
        </Link>

        {!isDisabled && (
          <ChatActions profileConnectionId={profileConnectionId} />
        )}
      </div>
    );
  },
);
