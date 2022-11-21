import React, { FC } from 'react';
import cn from 'classnames';
import { Button } from '@/ui/buttons/Button';
import {
  CandidateProfile,
  useLatestActiveCandidateProfileQuery,
} from '@/controllers/graphql/generated';
import { Routes } from '@/controllers/router/router.constants';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { ProfileStatus } from '@/components/Profile/ProfilePreview/ProfileStatus/ProfileStatus';
import styles from '@/components/Profile/PublicProfile/CandidatePublicProfileActions/CandidateInactiveProfileActions.module.scss';
import { useLatestRecruiterProfile } from '@/controllers/recruiterProfile/recruiterProfile.hooks.ts/useLatestRecruiterProfile';

interface Props {
  isModalOpened: boolean;
  closeModal: () => void;
  openModal: () => void;
  profile: CandidateProfile;
}

export const CandidateInactiveProfileActions: FC<Props> = ({
  profile,
}) => {
  const { t } = useTranslation([Namespaces.Profile]);

  const { data } = useLatestActiveCandidateProfileQuery({
    variables: {
      userId: profile.userId,
    },
  });

  const activeProfile = data?.latestActiveCandidateProfile || null;

  const [recruiterProfile] = useLatestRecruiterProfile();

  return (
    <>
      <div className={cn(styles.container, 'cell large-3 large-offset-1')}>
        <ProfileStatus
          text={t(`${Namespaces.Profile}:profile_inactive`)}
        />

        {recruiterProfile && (
          <Button
            mode={Button.mode.Primary}
            href={activeProfile?.slug
              ? `${Routes.Candidate}/${activeProfile.slug}`
              : Routes.Candidates}
            text={activeProfile?.slug
              ? t(`${Namespaces.Profile}:open_actual_profile`)
              : t(`${Namespaces.Profile}:search_active_candidates`)}
          />
        )}
      </div>
    </>
  );
};
