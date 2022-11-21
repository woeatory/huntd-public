import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import typography from '@/ui/typography/typography.module.scss';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';
import { Selectors } from '@/lib/selectors';
import { useClickOutside } from '@/hooks/useClickOutside';
import { Button } from '@/ui/buttons/Button';
import { ProfileStatus } from '@/components/Profile/HeaderUserBlock/ProfileLinkModule/ProfileStatus';
import { CandidateProfileStatus } from '@/controllers/graphql/generated';
import { useLatestCandidateProfile } from '@/controllers/candidateProfile/candidateProfile.hooks/useLatestCandidateProfile';
import { useLatestRecruiterProfile } from '@/controllers/recruiterProfile/recruiterProfile.hooks.ts/useLatestRecruiterProfile';
import { NftAvatar } from '@/components/Profile/ProfileContactsModule/NftAvatarPicker/NftAvatar';
import { useFeature } from '@/controllers/features/features.hooks/useFeature';
import { Features } from '@/controllers/features/features.constants';
import styles from './ProfileLinkModule.module.scss';
import { Avatar } from '../Avatar/Avatar';
import { MenuLinks } from '../MenuLinks';

export const ProfileLinkModule = () => {
  const [shouldHandle, setShouldHandle] = useState(false);
  const { ref, active, setActive } = useClickOutside(false, shouldHandle);
  const { t } = useTranslation([Namespaces.Common]);
  const router = useRouter();

  const [user] = useAuthUser();
  const [candidate] = useLatestCandidateProfile();
  const [recruiter] = useLatestRecruiterProfile();

  const nftAvatarFeature = useFeature(Features.NftAvatars);

  const nftAvatar = useMemo(() => (user && user.nfts ? user.nfts[0] : null),
    [user]);

  useEffect(() => {
    const routerHandler = () => {
      setActive(false);
    };

    router.events.on('routeChangeStart', routerHandler);

    return () => {
      router.events.off('routeChangeStart', routerHandler);
    };
  }, [router.events, setActive]);

  useEffect(() => {
    setShouldHandle(active);
  }, [setShouldHandle, active]);

  return (
    <div
      className={styles.profileLink}
      ref={ref}
    >
      {(nftAvatar && nftAvatarFeature.isEnabled())
        ? (
          <NftAvatar
            resolution={70}
            url={nftAvatar.entity.url}
            iconClass={styles.nftIcon}
            toggleMenu={() => setActive(!active)}
            hexagonClass={styles.nftHexagon}
          />
        )
        : (
          <Avatar
            avatar={user?.avatar}
            toggleMenu={() => setActive(!active)}
            status={candidate?.status ?? recruiter?.status}
          />
        )}

      <div className={styles.profile}>
        <Button
          text={t(`${Namespaces.Common}:my_profile`)}
          className={cn(
            typography.link,
            styles.profileLinkText,
            { [styles.profileLinkOnly]: !candidate },
          )}
          onClick={() => setActive(!active)}
        />

        {candidate && (
          <ProfileStatus
            status={candidate.status}
            clickHandler={() => setActive(!active)}
            className={cn(
              styles.profileStatus,
              {
                [styles.profileStatusDraft]: (
                  candidate.status === CandidateProfileStatus.Draft
                ),
                [styles.profileStatusActive]: (
                  candidate.status === CandidateProfileStatus.Active
                ),
                [styles.profileStatusRejected]: (
                  candidate.status === CandidateProfileStatus.Rejected
                ),
                [styles.profileStatusInactive]: (
                  candidate.status === CandidateProfileStatus.Inactive
                ),
              },
            )}
          />
        )}
      </div>

      <div
        className={cn(styles.menuWrapper, {
          [Selectors.Active]: active,
        })}
      >
        <MenuLinks />
      </div>
    </div>
  );
};
