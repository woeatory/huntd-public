import React from 'react';
import cn from 'classnames';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import typography from '@/ui/typography/typography.module.scss';
import styles from '@/components/Homepage/HowItWorks/HowItWorks.module.scss';
import { Image } from '@/components/Base/Image/Image';
import { CANDIDATES } from './constants';

const BLOCKS = [
  `${Namespaces.Home}:candidate_create_nft_step`,
  `${Namespaces.Home}:candidate_chat_nft_step`,
  `${Namespaces.Home}:candidate_nft_offer_step`,
];

export const Blocks = React.memo(() => {
  const { t } = useTranslation([Namespaces.Home]);

  return (
    <>
      <div className={cn(styles.blocks, typography.underhead, 'cell grid-x mb-48')}>
        {BLOCKS.map((block, index) => (
          <div
            key={block}
            className={cn(styles.block, 'cell large-3')}
          >
            <span>{`0${index + 1}.`}</span>
            {t(block)}
          </div>
        ))}
      </div>
      <div className={cn(styles.blocks, styles.stepsShowcase, 'cell grid-x')}>
        <div className={cn(styles.candidatesBlock, 'cell large-3')}>
          {CANDIDATES.map((candidate) => (
            <div className={styles.candidate} key={candidate.avatarUrl}>
              <span className={styles.avatar}>
                <Image
                  layout='fill'
                  className={styles.avatar__image}
                  src={process.env.NODE_ENV === 'production'
                    ? candidate.avatarUrl
                    : candidate.avatarDevUrl}
                />
              </span>
              <div className={styles.candidateInfo}>
                <h5 className={typography.caption}>
                  {t(`${Namespaces.Home}:${candidate.position}`)}
                </h5>
                <h6
                  className={cn(
                    styles.candidateDescription,
                    typography.smallText,
                  )}
                >
                  <span className={styles.descriptionItem}>
                    {t(`${Namespaces.Home}:${candidate.salary}`)}
                  </span>
                  <span className={styles.descriptionItem}>
                    {t(`${Namespaces.Home}:${candidate.remote}`)}
                  </span>
                  <span className={styles.descriptionItem}>
                    {t(`${Namespaces.Home}:${candidate.techs}`)}
                  </span>
                </h6>
              </div>
            </div>
          ))}
        </div>
        <div className={cn(styles.chatBlock, 'cell large-3')}>
          <div className={cn(styles.chatBubble, styles['chatBubble--left'], typography.smallText)}>
            {t(`${Namespaces.Home}:nft_chat_first_message`)}
          </div>
          <div className={cn(styles.chatBubble, styles['chatBubble--right'], typography.smallText)}>
            {t(`${Namespaces.Home}:nft_chat_second_message`)}
          </div>
        </div>
        <div className='cell large-3'>
          <div className={cn(styles.chatBubble, styles['chatBubble--left'], typography.smallText)}>
            {t(`${Namespaces.Home}:nft_chat_offer`)}
          </div>
        </div>
      </div>
      <div className={styles.wavesContainer} />
    </>
  );
});
