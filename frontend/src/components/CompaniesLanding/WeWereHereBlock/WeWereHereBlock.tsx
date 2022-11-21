import React from 'react';
import cn from 'classnames';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import typography from '@/ui/typography/typography.module.scss';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { Image } from '@/components/Base/Image/Image';
import { IconCurvedArrowLeft } from '@/ui/icons/general/IconCurvedArrowLeft';
import { IconArrowUp } from '@/ui/icons/general/IconArrowUp';
import { IconTallStar } from '@/ui/icons/general/IconTallStar';
import { IconTallFilledStar } from '@/ui/icons/general/IconTallFilledStar';
import styles from './WeWereHereBlock.module.scss';
import { founderPhoto } from './constants';

export const WeWereHereBlock = () => {
  const { t } = useTranslation([Namespaces.CompaniesLanding]);

  return (
    <div className='grid-x grid-margin-x'>
      <div className={cn(styles.orangeBlock, 'cell mb-160')}>
        <div className={styles.starsContainer}>
          <IconTallStar />
          <IconTallFilledStar />
        </div>
        <p className={cn(typography.overhead, 'mb-16')}>
          {t(`${Namespaces.CompaniesLanding}:we_were_here_question`)}
        </p>
        <p className={styles.orangeSubtitle}>
          {t(`${Namespaces.CompaniesLanding}:we_were_here_fact`)}
        </p>
        <IconCurvedArrowLeft />
      </div>

      <div className={cn(styles.founderText, 'cell large-4 large-offset-1 medium-6 c-semidark-chocolate')}>
        <h2 className={cn(typography.h2, styles.title, 'mb-24')}>
          {t(`${Namespaces.CompaniesLanding}:founder_title`)}
        </h2>
        <p className={cn(typography.alertText, styles.story, 'mb-24')}>
          {t(`${Namespaces.CompaniesLanding}:founder_story_first_paragraph`)}
        </p>
        <ReactMarkdown
          className={cn(typography.alertText, styles.story, 'mb-24')}
          rehypePlugins={[rehypeRaw]}
        >
          {t(`${Namespaces.CompaniesLanding}:founder_story_second_paragraph`)}
        </ReactMarkdown>
        <ReactMarkdown
          className={cn(typography.alertText, styles.story, 'mb-24')}
          rehypePlugins={[rehypeRaw]}
        >
          {t(`${Namespaces.CompaniesLanding}:founder_story_third_paragraph`)}
        </ReactMarkdown>
      </div>

      <div className='cell medium-6 large-4 large-offset-1'>
        <div className={styles.founderPhoto}>
          <Image
            src={process.env.NODE_ENV === 'production' ? founderPhoto.url : founderPhoto.devUrl}
            layout='fill'
            objectFit='cover'
            objectPosition='top'
            className='mb-16'
          />
        </div>
        <div className={cn(styles.bio, 'c-semidark-chocolate')}>
          <p className={cn(typography.smallCaption, styles.position, 'mb-8')}>
            {t(`${Namespaces.CompaniesLanding}:founder_name`)}
          </p>
          <p>
            <ReactMarkdown
              className={cn(typography.smallText, styles.position)}
              rehypePlugins={[rehypeRaw]}
            >
              {t(`${Namespaces.CompaniesLanding}:founder_titles`)}
            </ReactMarkdown>
          </p>
        </div>
      </div>

      <p className={cn(typography.alertText, styles.founderMission, 'cell large-4 large-offset-1 medium-6')}>
        <IconArrowUp />
        {t(`${Namespaces.CompaniesLanding}:founder_mission`)}
      </p>
    </div>
  );
};
