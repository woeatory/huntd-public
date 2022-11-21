import React, { memo, useCallback } from 'react';
import cn from 'classnames';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { Button } from '@/ui/buttons/Button';
import { useFlashMessage } from '@/controllers/flashMessage/flashMesage.hooks/useFlashMessage';
import { Link } from '@/controllers/i18n/i18n.client';
import buttons from '@/ui/buttons/buttons.module.scss';
import { analytics } from '@/controllers/analytics/analytics.client';
import { ProfileRoutes } from '@/controllers/router/router.constants';
import { CandidateProfileErrors, RecruiterProfileErrors } from '@/components/Base/FlashMessage/FlashMessage.constants';
import styles
  from '@/components/Profile/PublicProfile/CandidatePublicProfileModule/CandidatePublicProfileModule.module.scss';
import { ProfileStatus } from '@/components/Profile/ProfilePreview/ProfileStatus/ProfileStatus';

interface Props {
  callback: () => Promise<any>;
  loading: boolean;
  editProfileLink: string;
  profileType: string;
}
export const ProfileDraft = memo<Props>(
  ({
    callback, loading, editProfileLink, profileType,
  }) => {
    const flashMessage = useFlashMessage();

    const { t } = useTranslation([Namespaces.Profile]);

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
        switch (error.message) {
          case RecruiterProfileErrors.ContactsNotFilled:
            flashMessage.postMessage({
              variables: {
                type: flashMessage.messageTypes.Error,
                heading: t(`${Namespaces.Profile}:profile_review_error`),
                text: t(`${Namespaces.Profile}:${error.message}`),
                cta: { title: t(`${Namespaces.Profile}:edit_profile`), link: ProfileRoutes.Contacts },
              },
            });
            break;

          case CandidateProfileErrors.CandidateContactsNotFilled:
            flashMessage.postMessage({
              variables: {
                type: flashMessage.messageTypes.Error,
                heading: t(`${Namespaces.Profile}:profile_review_error`),
                text: t(`${Namespaces.Profile}:${error.message}`),
                cta: { title: t(`${Namespaces.Profile}:edit_profile`), link: ProfileRoutes.Contacts },
              },
            });
            break;

          default:
            flashMessage.postMessage({
              variables: {
                type: flashMessage.messageTypes.Error,
                heading: t(`${Namespaces.Profile}:profile_review_error`),
                text: t(`${Namespaces.Profile}:${error.message}`),
              },
            });
        }
      }
    }, [callback, flashMessage, t, sendAnalytics]);

    return (
      <div>
        <ProfileStatus
          text={t(`${Namespaces.Profile}:profile_not_published`)}
        />

        <Button
          onClick={clickHandler}
          disabled={loading}
          mode={Button.mode.Primary}
          type="button"
          className={cn(
            'wide mb-16',
          )}
          text={t(`${Namespaces.Profile}:send_and_post`)}
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
