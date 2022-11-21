import React from 'react';
import cn from 'classnames';
import typography from '@/ui/typography/typography.module.scss';
import { IconCheck } from '@/ui/icons/general/IconCheck';
import { Image } from '@/components/Base/Image/Image';
import { LandingSignUpModule, SignUpModuleMode } from '@/components/Authentication/LandingSignUpModule/LandingSignUpModule';
import styles from '@/components/Engineers/Engineers.module.scss';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useGetNewRecruiterInformation } from '@/components/Engineers/useGetNewRecruiterInformation';
import { ENGINEERS_DATA } from './constants';

export const EngineersLanding = () => {
  const { t } = useTranslation([Namespaces.Engineers, Namespaces.Form]);

  const {
    user, subscription, recruiter, count,
  } = useGetNewRecruiterInformation();

  let cardsCount: number;

  if (!count || count > 5) {
    cardsCount = 5;
  } else {
    cardsCount = count;
  }

  return (
    <div className={cn(styles.test, 'grid-container')}>
      <div className="grid-x grid-margin-x mt-64 small-mt-32">
        <div className={cn(styles.wrapper, 'cell large-6 grid-x grid-margin-x large-offset-0 medium-offset-2 medium-9')}>
          <h1 className={cn(styles.title, 'cell large-12 large-offset-1 mb-24')}>
            {t(`${Namespaces.Engineers}:engineers_page_title_part1`, {
              recruiterName: user?.firstName,
            })}
            <span className={styles.titleAccented}>
              {t(`${Namespaces.Engineers}:engineers_page_title_part2`, {
                candidatesCount: count,
                candidatesRole: subscription.role,
              })}
            </span>
            {t(`${Namespaces.Engineers}:engineers_page_title_part3`, {
              companyName: recruiter?.companyName,
            })}
          </h1>
          <article className={cn(typography.text, 'cell large-12 large-offset-1')}>
            <p className="mb-12">
              {t(`${Namespaces.Engineers}:requirements_title`)}
            </p>
            <div className={cn(styles.matchingRequirements)}>
              <p className={styles.requirement}>
                <IconCheck />
                {t(`${Namespaces.Engineers}:technologies_requirement`)}
              </p>
              <p className={styles.requirement}>
                <IconCheck />
                {t(`${Namespaces.Engineers}:location_requirement`)}
              </p>
              <p className={styles.requirement}>
                <IconCheck />
                {t(`${Namespaces.Engineers}:experience_requirement`)}
              </p>
            </div>
          </article>
          <div className={cn(styles.signUpContainer, 'cell large-offset-1 large-12')}>
            <LandingSignUpModule mode={SignUpModuleMode.Recruiter} />
          </div>
        </div>
        <div className={cn(styles.candidatesOuterContainer, 'cell large-6 medium-offset-2 large-offset-0', {
          [styles.withMargin]: cardsCount === 5,
        })}
        >
          <div className={cn(styles.candidatesContainer)}>
            {[...ENGINEERS_DATA.slice(0, cardsCount)].map((candidate) => (
              <div className={styles.candidateCard} key={candidate.id}>
                <div className={styles.candidatePhoto}>
                  <Image
                    priority
                    src={process.env.NODE_ENV === 'production' ? candidate.photoUrl : candidate.photoDevUrl}
                    width={80}
                    height={80}
                  />
                </div>
                <div className={cn(styles.candidateInfo)}>
                  <h3
                    className={cn(styles.candidateName, typography.underhead)}
                  >
                    {t(`${Namespaces.Engineers}:engineers_card_name-${candidate.id}`)}
                  </h3>
                  <p className={cn(styles.candidateRole, 'mb-8')}>
                    {t(`${Namespaces.Engineers}:engineers_page_candidate_description`, {
                      role: subscription.role,
                      experience: subscription.experience,
                    })}
                  </p>
                  <p className={typography.smallText}>
                    {subscription.technologies}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
