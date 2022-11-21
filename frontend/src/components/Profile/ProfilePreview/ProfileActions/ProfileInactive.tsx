import React, { memo, useCallback } from 'react';
import cn from 'classnames';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { Button } from '@/ui/buttons/Button';
import { useFlashMessage } from '@/controllers/flashMessage/flashMesage.hooks/useFlashMessage';
import { Link } from '@/controllers/i18n/i18n.client';
import buttons from '@/ui/buttons/buttons.module.scss';
import { analytics } from '@/controllers/analytics/analytics.client';
import styles
  from '@/components/Profile/PublicProfile/CandidatePublicProfileModule/CandidatePublicProfileModule.module.scss';
import { ProfileStatus } from '@/components/Profile/ProfilePreview/ProfileStatus/ProfileStatus';

interface Props {
  callback: () => Promise<any>;
  loading: boolean;
  editProfileLink: string;
  profileType: string;
}
export const ProfileInactive = memo<Props>(
  ({
    callback, loading, editProfileLink, profileType,
  }) => {
    const { t } = useTranslation([Namespaces.Profile]);
    const flashMessage = useFlashMessage();

    const sendAnalytics = useCallback(
      () => {
        analytics.sendEvent(
          analytics.events.userProfile.ActivateProfileClick,
          { profileType },
        );
      },
      [profileType],
    );

    const clickHandler = useCallback(async () => {
      try {
        await callback();
        sendAnalytics();
      } catch (error) {
        flashMessage.postMessage({
          variables: {
            type: flashMessage.messageTypes.Error,
            heading: t(`${Namespaces.Profile}:profile_review_error`),
            text: t(`${Namespaces.Profile}:${error.message}`),
          },
        });
      }
    }, [callback, flashMessage, t, sendAnalytics]);

    return (
      <div>
        <ProfileStatus
          text={t(`${Namespaces.Profile}:profile_inactive`)}
        />

        <Button
          onClick={clickHandler}
          disabled={loading}
          mode={Button.mode.Primary}
          type="button"
          className="wide mb-16"
          text={t(`${Namespaces.Profile}:activate_profile`)}
        />

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
