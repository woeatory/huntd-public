import React from 'react';
import cn from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper/core';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { analytics } from '@/controllers/analytics/analytics.client';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import 'swiper/swiper-bundle.css';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { Routes } from '@/controllers/router/router.constants';
import { Selectors } from '@/lib/selectors';
import { Button } from '@/ui/buttons/Button';
import typography from '@/ui/typography/typography.module.scss';
import { IconCheck } from '@/ui/icons/general/IconCheck';
import styles from './CompareBlock.module.scss';
import { Competitors, REVIEW_LIST, swiperOptions } from './constants';

SwiperCore.use([Pagination]);

export const CompareBlock = () => {
  const { t } = useTranslation([Namespaces.CompaniesLanding]);

  const clickHandler = () => {
    analytics.sendEvent(
      analytics.events.companiesLanding.CompaniesComparisonClick,
      {},
    );
  };

  return (
    <div className={cn(styles.wrapper)}>
      <div className='grid-x grid-margin-x'>
        <ReactMarkdown
          className={cn(
            'cell large-6 large-offset-3 c-semidark-chocolate mb-24',
            typography.smallBoldHeading,
            styles.title,
          )}
          rehypePlugins={[rehypeRaw]}
        >
          {t(`${Namespaces.CompaniesLanding}:compare_huntd_title`)}
        </ReactMarkdown>

        <h3 className={cn(
          'cell large-6 large-offset-3 c-semidark-chocolate mb-40',
          typography.alertText,
          styles.title,
        )}
        >
          {t(`${Namespaces.CompaniesLanding}:compare_huntd_subtitle`)}
        </h3>
      </div>

      <div className='grid-x grid-margin-x mb-16'>
        <div className={cn(styles.headings, 'cell small-5 medium-4 large-3 c-semidark-chocolate')}>
          <ul className={cn(typography.underhead, styles.headingsBlock)}>
            {REVIEW_LIST.map(({ key }) => (
              <li className={styles.heading} key={key}>
                {t(`${Namespaces.CompaniesLanding}:${key}`)}
              </li>
            ))}
          </ul>
        </div>

        <div className='cell small-7 medium-8 large-9 c-semidark-chocolate'>
          <Swiper
            {...swiperOptions}
            className={styles.swiperContainer}
          >
            {Object.values(Competitors).map((competitor) => (
              <SwiperSlide
                className={cn(styles.slide, 'cell medium-6 large-3', {
                  [Selectors.Accent]: competitor === Competitors.Huntd,
                })}
                key={competitor}
              >
                <h4 className={cn(
                  typography.underhead,
                  styles.reviewTitle,
                )}
                >
                  {t(`${Namespaces.CompaniesLanding}:competitor_title_${competitor}`)}
                </h4>

                <ul className={styles.reviewerWrapper}>
                  {REVIEW_LIST.map(({ key }) => (
                    <li className={styles.reviewItem} key={key}>
                      <span className={styles.reviewText}>
                        {competitor === Competitors.Huntd && <IconCheck />}
                        {t(`${Namespaces.CompaniesLanding}:${key}_${competitor}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <Button
          className='cell medium-4 medium-offset-4 large-3 large-offset-5 xxlarge-2 mt-16'
          mode={Button.mode.Primary}
          size={Button.size.LargeWide}
          href={Routes.Candidates}
          text={t(`${Namespaces.CompaniesLanding}:hire_top_engineers`)}
          onClick={clickHandler}
        />
      </div>
    </div>
  );
};
