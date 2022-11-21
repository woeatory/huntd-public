import React, { memo } from 'react';
import cn from 'classnames';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import buttons from '@/ui/buttons/buttons.module.scss';
import { Link } from '@/controllers/i18n/i18n.client';
import styles
  from '@/components/Profile/PublicProfile/CandidatePublicProfileModule/CandidatePublicProfileModule.module.scss';
import { ProfileStatus } from '@/components/Profile/ProfilePreview/ProfileStatus/ProfileStatus';

interface Props {
  editProfileLink: string;
}
export const ProfileOnReview = memo<Props>(
  ({ editProfileLink }) => {
    const { t } = useTranslation([Namespaces.Profile]);

    return (
      <div>
        <ProfileStatus
          text={t(`${Namespaces.Profile}:profile_on_moderation`)}
        />

        <div className={cn(styles.profileStatusInfo, 'mb-32')}>
          {t(`${Namespaces.Profile}:profile_moderation_time`)}
        </div>

        <Link href={editProfileLink}>
          <a
            className={cn(
              'wide',
              buttons.secondary,
              styles.whiteButton,
            )}
          >
            {t(`${Namespaces.Profile}:edit_profile`)}
          </a>
        </Link>
      </div>
    );
  },
);
