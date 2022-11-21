import React, { useCallback, useState } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { ActiveNavLink } from '@/components/Base/ActiveNavLink';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useLogOut } from '@/controllers/user/user.hooks/useLogOut';
import {
  CandidateProfileRoutes,
  HiringManagementRoutes,
  ProfileRoutes,
  RecruiterProfileRoutes,
  Routes,
  SettingsRoutes,
} from '@/controllers/router/router.constants';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';
import { Tabs } from '@/components/Profile/HeaderUserBlock/Tabs';
import { Button } from '@/ui/buttons/Button';
import { Avatar } from '@/components/Profile/HeaderUserBlock/Avatar/Avatar';
import { PrimaryProfile } from '@/controllers/graphql/generated';
import styles from '@/components/Profile/HeaderUserBlock/MenuLinks.module.scss';
import { useLatestCandidateProfile } from '@/controllers/candidateProfile/candidateProfile.hooks/useLatestCandidateProfile';
import { useLatestRecruiterProfile } from '@/controllers/recruiterProfile/recruiterProfile.hooks.ts/useLatestRecruiterProfile';
import { DashedLineHorizontal } from '@/ui/icons/general/DashedLineHorizontal';
import { NftAvatar } from '@/components/Profile/ProfileContactsModule/NftAvatarPicker/NftAvatar';
import { useFeature } from '@/controllers/features/features.hooks/useFeature';
import { Features } from '@/controllers/features/features.constants';
import { getShouldNavLinksBeVisible } from '@/components/Base/Header/getShouldNavLinksBeVisible';

export const MenuLinks = () => {
  const [user] = useAuthUser();
  const [candidate] = useLatestCandidateProfile();
  const [recruiter] = useLatestRecruiterProfile();
  const { pathname } = useRouter();

  const shouldMenuItemsBeVisible = getShouldNavLinksBeVisible(user, pathname);

  const hasBothProfiles = candidate && recruiter;

  const nftAvatar = user && user.nfts ? user.nfts[0] : null;

  const [
    selectedProfile,
    setSelectedProfile,
  ] = useState<PrimaryProfile>(user?.primaryProfile
    ? user.primaryProfile
    : PrimaryProfile.Candidate);

  const [logOutMutation, { loading }] = useLogOut();

  const nftAvatarFeature = useFeature(Features.NftAvatars);

  const logOut = useCallback(async () => {
    try {
      await logOutMutation();
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert(e.message);
    }
  }, [logOutMutation]);

  const { t } = useTranslation([
    Namespaces.Common,
    Namespaces.Profile,
  ]);

  return (
    <nav className={styles.wrapper}>
      {hasBothProfiles && (
        <Tabs
          type={selectedProfile}
          setType={setSelectedProfile}
        />
      )}

      {selectedProfile !== PrimaryProfile.NotDefined && (
        <div className={styles.profileLinkWrapper}>
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
                avatar={user?.avatar}
                status={candidate?.status ?? recruiter?.status}
                className={styles.avatar}
              />
            )}

          <ActiveNavLink href={`${Routes.ProfilePreview}/${selectedProfile.toLowerCase()}`}>
            <a className={cn(styles.profileNavLink, styles.profileLink)}>
              {t(`${Namespaces.Profile}:profile_preview`)}
            </a>
          </ActiveNavLink>
        </div>
      )}

      {selectedProfile === PrimaryProfile.Recruiter
        && shouldMenuItemsBeVisible && (
        <ActiveNavLink href={RecruiterProfileRoutes.CompanyInfo}>
          <a className={cn(styles.profileNavLink, styles.shiftedLink, {
            [styles.activeLink]: pathname.includes(ProfileRoutes.Recruiter),
          })}
          >
            {t(`${Namespaces.Profile}:edit_profile`)}
          </a>
        </ActiveNavLink>
      )}

      {shouldMenuItemsBeVisible && (
        <>
          <ActiveNavLink href={selectedProfile === PrimaryProfile.Recruiter
            ? HiringManagementRoutes.Hirings
            : CandidateProfileRoutes.Speciality}
          >
            <a className={cn(styles.profileNavLink, styles.shiftedLink, {
              [styles.activeLink]: pathname
                .includes(ProfileRoutes.HiringManagement)
                || pathname.includes(ProfileRoutes.Candidate),
            })}
            >
              {selectedProfile === PrimaryProfile.Recruiter
                ? t(`${Namespaces.Profile}:hiring_management`)
                : t(`${Namespaces.Profile}:edit_profile`)}
            </a>
          </ActiveNavLink>

          <ActiveNavLink href={SettingsRoutes.SocialProfiles}>
            <a className={cn(styles.profileNavLink, styles.shiftedLink, {
              [styles.activeLink]: pathname.includes(Routes.Settings),
            })}
            >
              {t(`${Namespaces.Profile}:account_settings`)}
            </a>
          </ActiveNavLink>

          <ActiveNavLink href={Routes.Candidates}>
            <a className={cn(styles.profileNavLink, styles.mobileOnlyLink)}>
              {t(`${Namespaces.Common}:candidates_link`)}
            </a>
          </ActiveNavLink>

          <div className={styles.dividerContainer}>
            <DashedLineHorizontal imageWidth="130" />
          </div>

          <ActiveNavLink href={Routes.Vacancies}>
            <a className={cn(styles.profileNavLink, styles.mobileOnlyLink)}>
              {t(`${Namespaces.Common}:vacancies_page_title`)}
            </a>
          </ActiveNavLink>
        </>
      )}

      <Button
        className={styles.logOut}
        disabled={loading}
        isLoading={loading}
        text={t(`${Namespaces.Common}:sign_out`)}
        onClick={logOut}
      />
    </nav>
  );
};
