import React, { memo, useCallback, useState } from 'react';
import cn from 'classnames';
import { CandidateProfile } from '@/controllers/graphql/generated';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import typography from '@/ui/typography/typography.module.scss';
import { getPublicHost } from '@/lib/getApiLink';
import { Link } from '@/controllers/i18n/i18n.client';
import { Button } from '@/ui/buttons/Button';
import { IconCheck } from '@/ui/icons/general/IconCheck';
import { Routes } from '@/controllers/router/router.constants';
import { IconLinkRotate } from '@/ui/icons/general/IconLinkRotate';
import styles from './CandidateProfilePreviewModule.module.scss';

interface Props {
  profile: CandidateProfile
}

export const CandidateProfilePublicLink = memo<Props>(
  ({ profile }) => {
    const [copied, setCopied] = useState(false);
    const { t } = useTranslation([Namespaces.Profile]);
    const profilePublicLink = `${getPublicHost()}${Routes.Candidate}/${profile.slug}`;

    const copyLink = useCallback((e) => {
      e.preventDefault();
      navigator.clipboard.writeText(profilePublicLink);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    }, [profilePublicLink]);

    return (
      <div className={cn(typography.smallCaption, 'mb-8')}>
        <Link href={profilePublicLink}>
          <a
            href={profilePublicLink}
            className={cn(typography.smallText, typography.grayLink)}
            onClick={copyLink}
          >
            {profilePublicLink}
          </a>
        </Link>

        <div className="mt-16">
          {copied
            ? (
              <p className="flex-container align-middle">
                <IconCheck />
                <span className="ml-8">
                  {t(`${Namespaces.Profile}:link_copied`)}
                </span>
              </p>
            )
            : (
              <Button
                className={styles.publicProfileButton}
                mode={Button.mode.Secondary}
                size={Button.size.Small}
                onClick={copyLink}
                text={t(`${Namespaces.Profile}:copy_profile_link`)}
                RightIcon={IconLinkRotate}
              />
            )}
        </div>

      </div>
    );
  },
);
