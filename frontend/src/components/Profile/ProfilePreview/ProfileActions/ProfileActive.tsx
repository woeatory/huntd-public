import React, { memo } from 'react';
import cn from 'classnames';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { Link } from '@/controllers/i18n/i18n.client';
import buttons from '@/ui/buttons/buttons.module.scss';
import styles from '@/components/Profile/PublicProfile/CandidatePublicProfileModule/CandidatePublicProfileModule.module.scss';
import ProfileStatusModule from '@/components/Profile/ProfilePreview/ProfileStatus/ProfileStatus.module.scss';
import { Button } from '@/ui/buttons/Button';
import { ProfileStatus } from '@/components/Profile/ProfilePreview/ProfileStatus/ProfileStatus';
import { analytics } from '@/controllers/analytics/analytics.client';

interface Props {
  callback: () => Promise<any>;
  editProfileLink: string;
  profileType: string;
  loading: boolean;
}
export const ProfileActive = memo<Props>(
  ({
    editProfileLink,
    callback,
    loading,
    profileType,
  }) => {
    const { t } = useTranslation([Namespaces.Profile]);

    const deactivateProfile = async () => {
      await callback();

      analytics.sendEvent(
        analytics.events.userProfile.ProfileDeactivated,
        {
          reason: 'users decision',
          profileType,
        },
      );
    };

    return (
      <div>
        <ProfileStatus
          text={t(`${Namespaces.Profile}:profile_active`)}
          className={ProfileStatusModule.activeStatus}
        />

        <Link href={editProfileLink}>
          <a
            className={cn(
              'wide mb-16',
              buttons.primary,
            )}
          >
            {t(`${Namespaces.Profile}:edit_profile`)}
          </a>
        </Link>

        <Button
          type="button"
          disabled={loading}
          onClick={deactivateProfile}
          mode={Button.mode.Secondary}
          className={cn(
            'wide',
            styles.whiteButton,
          )}
          text={t(`${Namespaces.Profile}:deactivate_profile`)}
        />
      </div>
    );
  },
);
