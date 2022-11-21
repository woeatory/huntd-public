import cn from 'classnames';
import React, { memo } from 'react';
import typography from '@/ui/typography/typography.module.scss';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { getFilledValue } from '@/lib/getFilledValue';
import { User } from '@/controllers/graphql/generated';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Selectors } from '@/lib/selectors';
import ProfilePreview from '@/components/Profile/ProfilePreview/ProfilePreview.module.scss';
import { AttachedCV } from '@/components/Profile/ProfileContactsModule/CVInputBlock/AttachedCV/AttachedCV';
import { ProfileSocialLink } from '@/components/Profile/ProfilePreview/CandidateProfilePreviewModule/ProfileSocialLink';
import CandidateProfilePreview
  from '@/components/Profile/ProfilePreview/CandidateProfilePreviewModule/CandidateProfilePreviewModule.module.scss';
import { IconArrowLeft } from '@/ui/icons/general/IconArrowLeft';
import { IconIncognito } from '@/ui/icons/general/IconIncognito';
import { SocialProviders } from '@/components/Profile/profile.constants';
import { NftAvatar } from '../../ProfileContactsModule/NftAvatarPicker/NftAvatar';

interface Props {
  user?: User | null;
  isActive: boolean;
}
export const PublicProfileContacts = memo<Props>(
  ({ user, isActive }) => {
    const { t } = useTranslation([Namespaces.Profile]);

    const contactsHidden = !user || !user.email;

    const candidateHasNft = !!(user?.nfts);
    const nft = user?.nfts?.length ? user?.nfts[0] : null;

    return (
      <div className={cn(
        ProfilePreview.contactsOverlay,
        {
          [Selectors.Hidden]: contactsHidden,
          [ProfilePreview.inactiveOverlay]: !isActive,
        },
      )}
      >
        {contactsHidden && (
          <div className={ProfilePreview.contactsHiddenMessage}>
            {candidateHasNft && (
              <NftAvatar
                resolution={240}
                className='mb-24'
                url={nft?.entity.url}
              />
            )}
            <IconIncognito />
            <span className="mt-16">
              {t(`${Namespaces.Profile}:profile_contacts_are_hidden`)}
            </span>
          </div>
        )}
        <div className={ProfilePreview.contactsContent}>
          <p className={cn(typography.overhead, 'c-gray mb-16')}>
            {t(`${Namespaces.Profile}:contacts_overhead`)}
          </p>

          {candidateHasNft && (
            <NftAvatar
              className={cn('mb-24', ProfilePreview.nftAvatar, {
                [Selectors.Hidden]: contactsHidden,
              })}
              resolution={240}
              url={nft?.entity.url}
            />
          )}

          <p className={cn(typography.smallHeading, 'mb-24')}>
            {user
              ? user.computedName
              : t(`${Namespaces.Profile}:captain_anonymous`)}

          </p>

          <div className={cn(typography.smallCaption, 'mb-8')}>
            <p className="mb-4">
              {user?.cv && (
                <div className="mb-8">
                  <AttachedCV
                    user={user}
                    userCv={user.cv}
                    className={CandidateProfilePreview.attachedCv}
                    iconClassName={CandidateProfilePreview.arrowLink}
                    linkClassName={CandidateProfilePreview.cvLink}
                  >
                    <IconArrowLeft />
                  </AttachedCV>
                </div>
              )}

              <div className={cn(typography.smallCaption, 'mb-24')}>
                <a href={`mailto:${getFilledValue(user?.email)}`} className={CandidateProfilePreview.emailLink}>
                  {getFilledValue(user?.email)}
                </a>
              </div>

              {user?.linkedinUrl && (
                <div className="mb-16">
                  <ProfileSocialLink
                    link={user.linkedinUrl}
                    title={SocialProviders.Linkedin}
                    className={CandidateProfilePreview.socialLink}
                  />
                </div>
              )}

              {user?.behanceUrl && (
                <div className="mb-16">
                  <ProfileSocialLink
                    link={user.behanceUrl}
                    title={SocialProviders.Behance}
                    className={CandidateProfilePreview.socialLink}
                  />
                </div>
              )}

              {user?.githubUrl && (
                <div className="mb-24">
                  <ProfileSocialLink
                    link={user.githubUrl}
                    title={SocialProviders.Github}
                    className={CandidateProfilePreview.socialLink}
                  />
                </div>
              )}
            </p>
          </div>
        </div>
      </div>
    );
  },
);
