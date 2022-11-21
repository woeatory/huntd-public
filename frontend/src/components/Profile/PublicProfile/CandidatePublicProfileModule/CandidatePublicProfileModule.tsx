import React, {
  memo, useCallback, useEffect, useMemo, useState,
} from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import Error from 'next/error';
import { NextSeo } from 'next-seo';
import ProfilePreview from '@/components/Profile/ProfilePreview/ProfilePreview.module.scss';
import typography from '@/ui/typography/typography.module.scss';
import { ProfileMeta } from '@/components/Profile/ProfilePreview/ProfileMeta';
import { getFilledValue } from '@/lib/getFilledValue';
import { useCandidateProfileMetaItems } from '@/controllers/candidateProfile/candidateProfile.hooks/useCandidateProfileMetaItems';
import { useCandidateProfileInfoItems } from '@/controllers/candidateProfile/candidateProfile.hooks/useCandidateProfileInfoItems';
import {
  CandidateProfile,
  CandidateProfileStatus,
  useRecruiterProfileActiveConnectionLazyQuery,
} from '@/controllers/graphql/generated';
import { useCandidateProfileSEOInfo } from '@/controllers/candidateProfile/candidateProfile.hooks/useCandidateProfileSEOInfo';
import { Loader } from '@/ui/Loader';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useModalState } from '@/controllers/modal/modal.hooks/useModalState';
import { createLink } from '@/controllers/buddyChat/buddyChat.utils/createLink';
import { getPublicHost } from '@/lib/getApiLink';
import { Routes } from '@/controllers/router/router.constants';
import { ActiveProfileActions } from '@/components/Profile/PublicProfile/CandidatePublicProfileModule/ActiveProfileActions/ActiveProfileActions';
import { analytics } from '@/controllers/analytics/analytics.client';
import { ProfileInfo } from '@/components/Profile/ProfilePreview/ProfileInfo';
import { PublicProfileContacts } from '@/components/Profile/PublicProfile/PublicProfileContacts';
import { useCandidateProfileWorkPlacesInfo } from '@/controllers/candidateProfile/candidateProfile.hooks/useCandidateProfileWorkPlacesInfo';
import { CandidateInactiveProfileActions } from '../CandidatePublicProfileActions/CandidateInactiveProfileActions';
import styles from './CandidatePublicProfileModule.module.scss';

interface Props {
  profile?: CandidateProfile | null;
  loading: boolean;
}
export const CandidatePublicProfileModule = memo<Props>(
  ({ profile, loading }) => {
    const { t } = useTranslation([Namespaces.Common, Namespaces.Form]);

    const router = useRouter();

    const profileMetaItems = useCandidateProfileMetaItems(profile);
    const profileInfoItems = useCandidateProfileInfoItems(profile);
    const profileSEOInfo = useCandidateProfileSEOInfo(profile);
    const profileWorkPlaces = useCandidateProfileWorkPlacesInfo(profile);
    const { isModalOpened, openModal, closeModal } = useModalState(false);
    const [
      IsSendMessageButtonClicked,
      setIsSendMessageButtonClicked,
    ] = useState(false);

    const [
      getProfileConnection, { data, loading: isLoading, called },
    ] = useRecruiterProfileActiveConnectionLazyQuery();

    const activeConnection = useMemo(
      () => data?.latestRecruiterProfile?.activeConnectionWithCandidate ?? null,
      [data],
    );

    useEffect(() => {
      const { query, pathname } = router;

      const withUtmParams = Boolean(query.utm_campaign);

      if (profile) {
        const specializationTitle = profileInfoItems.find(
          (el) => el.title === t(`${Namespaces.Form}:specialization_label`),
        )?.content;

        const source = withUtmParams ? query.utm_campaign : pathname;

        analytics.sendEvent(
          analytics.events.pageInteraction.VisitCandidateProfile,
          {
            slug: profile.slug,
            salary: profile.salary,
            specialization: specializationTitle,
            englishLevel: profile.englishLevel,
            source,
          },
        );
      }

      if (withUtmParams) {
        router.replace(
          `${Routes.Candidate}/${query.slug}`,
          undefined,
          { shallow: true },
        );
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      if (activeConnection) {
        window.open(
          createLink(activeConnection.id, activeConnection.candidateProfile.slug || ''),
        );
      } else if (called && !isLoading) {
        openModal();
      }
    }, [
      called,
      isLoading,
      activeConnection,
      openModal,
      IsSendMessageButtonClicked,
    ]);

    const handleClick = useCallback(async () => {
      if (!profile) {
        return;
      }

      await getProfileConnection({
        variables: {
          candidateProfileId: profile.id,
        },
      });

      setIsSendMessageButtonClicked(!IsSendMessageButtonClicked);
    }, [
      profile,
      getProfileConnection,
      IsSendMessageButtonClicked,
    ]);

    if (loading) {
      return <Loader active={loading} />;
    }

    if (!profile) {
      return <Error statusCode={404} />;
    }

    const isActive = profile.status === CandidateProfileStatus.Active;
    const areContactsHidden = !profile.user || !profile.user.email;

    return (
      <>
        <NextSeo
          title={profileSEOInfo.title}
          description={profileSEOInfo.description}
          openGraph={{
            type: 'website',
            title: profileSEOInfo.title,
            description: profileSEOInfo.description,
            url: `${getPublicHost()}/candidate/${profile.slug}`,
            site_name: 'Huntd.tech',
          }}
        />
        <div className={cn(
          ProfilePreview.profileHeader,
          { [ProfilePreview.profileHeaderActive]: isActive },
        )}
        >
          <div className="grid-container">
            <div className="grid-x grid-margin-x">
              <div className="cell large-7 medium-mb-24">
                <h1
                  className={cn(typography.h1, styles.publicProfileHeading, 'mb-16')}
                >
                  {getFilledValue(profile.position)}
                </h1>

                <div className={ProfilePreview.profileMeta}>
                  <ProfileMeta items={profileMetaItems} />
                </div>
              </div>
              {isActive
                ? (
                  <ActiveProfileActions
                    isModalOpened={isModalOpened}
                    closeModal={closeModal}
                    handleClick={handleClick}
                    profile={profile}
                  />
                )
                : (
                  <CandidateInactiveProfileActions
                    isModalOpened={isModalOpened}
                    openModal={openModal}
                    closeModal={closeModal}
                    profile={profile}
                  />
                )}
            </div>
          </div>
        </div>

        <div className={ProfilePreview.profileContent}>
          <div className="grid-container">
            <div className="grid-x grid-margin-x">
              <div className="cell large-7 small-mb-80 medium-mb-64">
                <ProfileInfo
                  items={profileInfoItems}
                  preview
                  workPlaces={profileWorkPlaces}
                  areContactsHidden={areContactsHidden}
                />
              </div>

              <div className="cell large-4 large-offset-1 c-semidark-chocolate">
                <PublicProfileContacts
                  user={profile.user}
                  isActive={isActive}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  },
);
