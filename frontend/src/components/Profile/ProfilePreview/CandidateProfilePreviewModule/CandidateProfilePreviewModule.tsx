import React, { FC } from 'react';
import cn from 'classnames';
import Error from 'next/error';
import { useLatestCandidateProfile } from '@/controllers/candidateProfile/candidateProfile.hooks/useLatestCandidateProfile';
import ProfilePreview
  from '@/components/Profile/ProfilePreview/ProfilePreview.module.scss';
import typography from '@/ui/typography/typography.module.scss';
import { ProfileMeta } from '@/components/Profile/ProfilePreview/ProfileMeta';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { ProfileInfo } from '@/components/Profile/ProfilePreview/ProfileInfo';
import { getFilledValue } from '@/lib/getFilledValue';
import { useCandidateProfileMetaItems } from '@/controllers/candidateProfile/candidateProfile.hooks/useCandidateProfileMetaItems';
import { useCandidateProfileInfoItems } from '@/controllers/candidateProfile/candidateProfile.hooks/useCandidateProfileInfoItems';
import { CandidateProfilePreviewActions } from '@/components/Profile/ProfilePreview/CandidateProfilePreviewModule/CandidateProfilePreviewActions';
import { Loader } from '@/ui/Loader';
import { CandidateProfilePublicLink } from '@/components/Profile/ProfilePreview/CandidateProfilePreviewModule/CandidateProfilePublicLink';
import { AttachedCV } from '@/components/Profile/ProfileContactsModule/CVInputBlock/AttachedCV/AttachedCV';
import { IconArrowLeft } from '@/ui/icons/general/IconArrowLeft';
import { CandidateProfileStatus } from '@/controllers/graphql/generated';
import { useCandidateProfileWorkPlacesInfo } from '@/controllers/candidateProfile/candidateProfile.hooks/useCandidateProfileWorkPlacesInfo';
import { SocialProviders } from '@/components/Profile/profile.constants';
import styles from './CandidateProfilePreviewModule.module.scss';
import { ProfileSocialLink } from './ProfileSocialLink';
import { NftAvatar } from '../../ProfileContactsModule/NftAvatarPicker/NftAvatar';

interface Props {
  isModalPreview?: boolean;
}

export const CandidateProfilePreviewModule: FC<Props> = (props) => {
  const { isModalPreview } = props;
  const [profile, { loading, subscribeToMore }] = useLatestCandidateProfile();
  const { t } = useTranslation([Namespaces.Common, Namespaces.Profile]);

  const profileMetaItems = useCandidateProfileMetaItems(profile);
  const profileInfoItems = useCandidateProfileInfoItems(profile);
  const profileWorkPlacesItems = useCandidateProfileWorkPlacesInfo(profile);

  if (loading) {
    return <Loader active={loading} />;
  }

  if (!profile) {
    return <Error statusCode={404} />;
  }

  const { user } = profile;

  const candidateHasNft = !!(user?.nfts);
  const nft = user?.nfts?.length ? user?.nfts[0] : null;

  const isActive = profile.status === CandidateProfileStatus.Active;

  return (
    <>
      <div className={cn(
        ProfilePreview.profileHeader,
        { [ProfilePreview.profileHeaderActive]: isActive },
      )}
      >
        <div className="grid-container">
          <div className="grid-x grid-margin-x">
            <div className="cell large-8">
              <h1
                className={cn(typography.h1, styles.title, 'mb-16')}
              >
                {getFilledValue(profile.position)}
              </h1>

              <div className={cn(ProfilePreview.profileMeta, 'mb-16')}>
                <ProfileMeta items={profileMetaItems} />
              </div>
            </div>
            {!isModalPreview && (
              <div className="cell large-3 align-self-bottom">
                <CandidateProfilePreviewActions
                  profile={profile}
                  subscribeToProfileUpdates={subscribeToMore}
                />
              </div>
            )}
          </div>
        </div>

      </div>
      <div className={ProfilePreview.profileContent}>
        <div className="grid-container">
          <div className="grid-x grid-margin-x">
            <div className="cell large-7">
              <ProfileInfo
                items={profileInfoItems}
                workPlaces={profileWorkPlacesItems}
                areContactsHidden={false}
                preview
              />
            </div>

            <div className="cell large-4 large-offset-1 c-semidark-chocolate medium-mt-40">
              <p className={cn(typography.overheadRegular, 'c-gray mb-24')}>
                {t(`${Namespaces.Profile}:contacts_are_hidden`)}
              </p>

              {candidateHasNft && (
                <NftAvatar
                  resolution={240}
                  hexagonClass='mb-24'
                  url={nft?.entity.url}
                />
              )}

              <p className={cn(typography.smallHeading, 'mb-8')}>
                {user?.computedName}
              </p>

              {user?.cv && (
                <div className={cn(typography.smallCaption, 'mb-8')}>
                  <p className="mb-4">
                    <AttachedCV
                      user={user}
                      userCv={user.cv}
                      className={styles.attachedCv}
                      iconClassName={styles.arrowLink}
                      linkClassName={styles.cvLink}
                    >
                      <IconArrowLeft />
                    </AttachedCV>
                  </p>
                </div>
              )}

              <div className={cn(typography.smallText, 'mb-24')}>
                <a href={`mailto:${getFilledValue(user?.email)}`} className={cn(typography.grayLink)}>
                  {getFilledValue(user?.email)}
                </a>
              </div>

              {user?.linkedinUrl && (
                <div className="mb-16">
                  <ProfileSocialLink
                    link={user.linkedinUrl}
                    title={SocialProviders.Linkedin}
                    className={styles.socialLink}
                  />
                </div>
              )}

              {user?.behanceUrl && (
                <div className="mb-16">
                  <ProfileSocialLink
                    link={user.behanceUrl}
                    title={SocialProviders.Behance}
                    className={styles.socialLink}
                  />
                </div>
              )}

              {user?.githubUrl && (
                <div className="mb-24">
                  <ProfileSocialLink
                    link={user.githubUrl}
                    title={SocialProviders.Github}
                    className={styles.socialLink}
                  />
                </div>
              )}

              <CandidateProfilePublicLink profile={profile} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
