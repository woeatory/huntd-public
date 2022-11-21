import React from 'react';
import cn from 'classnames';
import typography from '@/ui/typography/typography.module.scss';
import { analytics } from '@/controllers/analytics/analytics.client';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { Button } from '@/ui/buttons/Button';
import { Routes } from '@/controllers/router/router.constants';
import { Image } from '@/components/Base/Image/Image';
import { IconLocation } from '@/ui/icons/general/IconLocation';
import { IconHuntdWeb } from '@/ui/icons/general/IconHuntdWeb';
import styles from './GlobeBlock.module.scss';
import { CandidateTitles, SENIOR_CANDIDATES_PHOTOS, GLOBE_PHOTO } from './constants';

export const GlobeBlock = () => {
  const { t } = useTranslation([Namespaces.CompaniesLanding]);

  const clickHandler = () => {
    analytics.sendEvent(
      analytics.events.companiesLanding.CompaniesTopButtonClick,
      {},
    );
  };

  return (
    <div className='grid-x grid-margin-x'>
      <div className={cn(styles.heroText, 'cell medium-10 large-5 grid-x')}>
        <h2 className={cn(typography.h2, styles.title, 'mb-24 c-extradark-chocolate')}>
          {t(`${Namespaces.CompaniesLanding}:hero_title`)}
        </h2>
        <p className={cn(typography.alertText, styles.subTitle, 'c-gray mb-40')}>
          {t(`${Namespaces.CompaniesLanding}:hero_sub_title`)}
        </p>

        <Button
          className={cn(styles.heroButton, 'cell medium-4 large-5')}
          size={Button.size.LargeWide}
          mode={Button.mode.Primary}
          text={t(`${Namespaces.CompaniesLanding}:hire_engineers`)}
          href={Routes.Candidates}
          onClick={clickHandler}
        />
      </div>
      <div className={cn(styles.globeWrapper, 'cell medium-offset-1 medium-10 large-7 large-offset-0 mb-16')}>
        <div className={styles.globeContainer}>
          <Image
            priority
            src={process.env.NODE_ENV === 'production' ? GLOBE_PHOTO.url : GLOBE_PHOTO.devUrl}
            layout='fill'
          />
          <IconHuntdWeb />
          <p className={styles.myCompanyBadge}>{t(`${Namespaces.CompaniesLanding}:my_company`)}</p>
        </div>
        {SENIOR_CANDIDATES_PHOTOS.map((photo) => (
          <div
            key={photo.id}
            className={cn(styles.candidateCard, {
              [styles.candidateCard_big]: (
                photo.title === CandidateTitles.Frontend
              ),
            })}
          >
            <div className={styles.candidatePhoto}>
              <Image
                priority
                src={process.env.NODE_ENV === 'production' ? photo.url : photo.devUrl}
                width={256}
                height={256}
                className='mb-16'
              />
            </div>
            <div className={styles.candidateDescription}>
              <p className={cn(styles.candidateTitle, 'c-semidark-chocolate')}>
                {t(`${Namespaces.CompaniesLanding}:${photo.title}_candidate_title`)}
              </p>
              <div className={cn(styles.candidateParameters, 'c-semidark-chocolate')}>
                <IconLocation />
                <span className={styles.candidateParameter}>
                  {t(`${Namespaces.CompaniesLanding}:${photo.title}_candidate_location`)}
                </span>
                <span
                  className={cn(
                    styles.candidateParameter, styles.candidateExperience,
                  )}
                >
                  {t(`${Namespaces.CompaniesLanding}:${photo.title}_candidate_experience`)}
                </span>
                <span className={styles.candidateParameter}>
                  {t(`${Namespaces.CompaniesLanding}:${photo.title}_candidate_salary`)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
