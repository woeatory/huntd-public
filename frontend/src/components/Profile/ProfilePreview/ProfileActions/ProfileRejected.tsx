import React, { memo } from 'react';
import cn from 'classnames';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { Link } from '@/controllers/i18n/i18n.client';
import buttons from '@/ui/buttons/buttons.module.scss';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import typography from '@/ui/typography/typography.module.scss';
import ProfilePreviewStyles from '@/components/Profile/ProfilePreview/ProfilePreview.module.scss';

interface Props {
  editProfileLink: string;
  rejectReason: string;
}
export const ProfileRejected = memo<Props>(
  ({ editProfileLink, rejectReason }) => {
    const { t } = useTranslation([Namespaces.Profile]);

    return (
      <div>
        <p className={cn(typography.smallText, 'mb-16')}>
          {t(`${Namespaces.Profile}:profile_status_rejected_message`)}
        </p>
        <p className={cn('mb-16', ProfilePreviewStyles.profileRejectMessage)}>
          {rejectReason}
        </p>

        <Link href={editProfileLink}>
          <a
            className={cn(
              'wide',
              buttons.primary,
              buttons.small,
              'button-small',
            )}
          >
            {t(`${Namespaces.Profile}:edit_profile`)}
          </a>
        </Link>
      </div>
    );
  },
);
