import React, { FC, useCallback } from 'react';
import cn from 'classnames';
import {
  CandidateProfile,
  CandidateProfileStatus,
  User,
  useSendNewVacancyApplicationMutation,
  Vacancy,
  VacancyCategory,
  VacancyType,
} from '@/controllers/graphql/generated';
import typography from '@/ui/typography/typography.module.scss';
import { IconChevronDown } from '@/ui/icons/general/IconChevronDown';
import { IconChevronUp } from '@/ui/icons/general/IconChevronUp';
import { DashedLineHorizontal } from '@/ui/icons/general/DashedLineHorizontal';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { VacancyDetailed } from '@/components/Vacancies/VacancyDetailed/VacancyDetailed';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { analytics } from '@/controllers/analytics/analytics.client';
import { AppliedVacanciesStorage } from '@/controllers/vacancy/vacancy.typedefs';
import { ApplyButton } from '@/components/Vacancies/VacancyCard/ApplyButton/ApplyButton';
import { Selectors } from '@/lib/selectors';
import { Image } from '@/components/Base/Image/Image';
import styles from './VacancyCard.module.scss';
import { SourcedApplyButton } from './ApplyButton/SourcedApplyButton';

const insertJobCategory = (
  category?: string | null,
) => {
  switch (category) {
    case VacancyCategory.UsOnly:
      return `job_category_us_only`;
    case VacancyCategory.EuropeOnly:
      return `job_category_europe_only`;
    default:
      return `job_category_worldwide`;
  }
};

const insertJobType = (
  category?: string | null,
) => {
  if (category === VacancyType.PartTime) {
    return `job_type_part_time`;
  }

  return `job_type_full_time`;
};

interface Props {
  vacancy: Vacancy;
  selectedVacancy: number | null;
  setVacancy: (id: number) => void;
  appliedVacancies: AppliedVacanciesStorage;
  setAppliedVacancies: (value: AppliedVacanciesStorage) => void;
  openApplyModal: () => void;
  setCompanyName: (value: string) => void;
  authUser: User | null;
  candidateProfile: CandidateProfile | null,
}

export const VacancyCard: FC<Props> = (props) => {
  const {
    vacancy,
    selectedVacancy,
    setVacancy,
    setAppliedVacancies,
    appliedVacancies,
    openApplyModal,
    setCompanyName,
    authUser,
    candidateProfile,
  } = props;

  const { t } = useTranslation([Namespaces.Vacancy]);

  const [mutate] = useSendNewVacancyApplicationMutation();

  const shouldLinkBeVisible = !!authUser?.id
    && !!candidateProfile?.id
    && !!(candidateProfile?.status === CandidateProfileStatus.Active);

  const handleVacancyApply = useCallback(async () => {
    setCompanyName(vacancy.companyName);
    openApplyModal();
    if (candidateProfile?.status === CandidateProfileStatus.Active) {
      setAppliedVacancies({
        ...appliedVacancies,
        [vacancy.id]: true,
      });
      await mutate({
        variables: {
          jobTitle: vacancy.jobTitle,
          companyName: vacancy.companyName,
        },
      });

      analytics.sendEvent(
        analytics.events.vacancies.VacancyApplicationRequested,
        {
          vacancyId: vacancy.id,
          jobTitle: vacancy.jobTitle,
          companyName: vacancy.companyName,
        },
      );
    }
  }, [
    appliedVacancies,
    candidateProfile,
    mutate,
    openApplyModal,
    setAppliedVacancies,
    vacancy,
    setCompanyName,
  ]);

  const handleSourcedVacancyApply = () => {
    if (!shouldLinkBeVisible) {
      setCompanyName(vacancy.companyName);
      openApplyModal();

      analytics.sendEvent(
        analytics.events.vacancies.SourcedVacancyApply,
        {
          vacancyId: vacancy.id,
          jobTitle: vacancy.jobTitle,
          companyName: vacancy.companyName,
        },
      );
    }
  };

  const openVacancyDetails = useCallback(() => {
    setVacancy(vacancy.id);
  }, [setVacancy, vacancy.id]);

  return (
    <>
      <div
        id={`${vacancy.id}`}
        className={cn(styles.vacancyCardWrapper, 'mb-16')}
      >
        <div
          aria-hidden
          className={styles.vacancyCard}
          onClick={openVacancyDetails}
        >
          <div className={cn(styles.companyInfo)}>
            {vacancy.companyLogo?.url
              ? (
                <div className={cn(styles.logoContainer, 'mr-16')}>
                  <Image
                    className={styles.logo}
                    priority
                    src={vacancy.companyLogo.url}
                    width={48}
                    height={48}
                  />
                </div>
              )
              : (
                <div className={cn(styles.logoContainer, 'mr-16', { [styles.sourced]: !!vacancy.sourceId })} />
              )}
            <div className={styles.position}>
              <p className={cn(styles.companyName, 'mb-4')}>{vacancy.companyName}</p>
              <p>{vacancy.jobTitle}</p>
            </div>
          </div>
          <div className={cn(styles.details, typography.smallCaption)}>
            <div className={styles.jobDetails}>
              <p className={styles.detailsItem}>
                {`${t(`${Namespaces.Vacancy}:${insertJobCategory(vacancy.jobCategory)}`)}`}
              </p>
              <span className={styles.divider} />
              <p className={styles.detailsItem}>
                {`${t(`${Namespaces.Vacancy}:${insertJobType(vacancy.jobType)}`)}`}
              </p>
            </div>
            {(vacancy.salaryTo || vacancy.salaryFrom) && (
              <p className={cn(styles.salary, 'mt-4')}>
                {vacancy.salaryFrom && (<span>{`$${vacancy.salaryFrom} `}</span>)}
                {(vacancy.salaryFrom && vacancy.salaryTo) && (<span>-</span>)}
                {vacancy.salaryTo && (<span>{` $${vacancy.salaryTo}`}</span>)}
              </p>
            )}
          </div>
          <div className={styles.detailsButton}>
            {t(`${Namespaces.Vacancy}:job_details`)}
            {selectedVacancy === vacancy.id
              ? <IconChevronUp />
              : <IconChevronDown />}
          </div>
          <div className={styles.status}>
            {
              vacancy.sourceId
                ? (
                  <SourcedApplyButton
                    href={shouldLinkBeVisible ? vacancy.applyLink : undefined}
                    handleVacancyApply={handleSourcedVacancyApply}
                  />
                )
                : (
                  <ApplyButton
                    appliedVacancies={appliedVacancies}
                    vacancyId={vacancy.id}
                    handleVacancyApply={handleVacancyApply}
                  />
                )
            }

          </div>
        </div>
        <article className={cn(styles.detailedInfo, {
          [Selectors.Active]: selectedVacancy === vacancy.id,
        })}
        >
          <DashedLineHorizontal imageWidth="1063" />
          <VacancyDetailed
            vacancy={vacancy}
            callback={handleVacancyApply}
            appliedVacancies={appliedVacancies}
          />
        </article>
      </div>
    </>
  );
};
