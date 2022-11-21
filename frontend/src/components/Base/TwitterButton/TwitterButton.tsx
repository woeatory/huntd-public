import React from 'react';
import cn from 'classnames';
import typography from '@/ui/typography/typography.module.scss';
import { Button } from '@/ui/buttons/Button';
import styles from '@/components/Base/TwitterButton/TwitterButton.module.scss';
import { IconTwitter } from '@/ui/icons/custom/IconTwitter';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';

const shareTwitterLink = 'https://twitter.com/intent/tweet?url=https://www.producthunt.com/posts/hunted&text=Folks, on Hunted Web3 startups apply to hire you at your desired salary. You\'re anonymous, and we both get $1k-worth NFTs if you\'re hired. Take a look:';

export const TwitterButton = () => {
  const { t } = useTranslation([Namespaces.Common]);

  return (
    <div className={styles.container}>
      <Button
        mode={Button.mode.IconOnly}
        className={styles.twitterButton}
        LeftIcon={IconTwitter}
        href={shareTwitterLink}
        target='_blank'
        title={t(`${Namespaces.Common}:twitter_bonus_description`)}
      />
      <p className={cn(styles.containerText, typography.overhead, 'c-citrus')}>
        {t(`${Namespaces.Common}:twitter_bonus`)}
      </p>
    </div>
  );
};
