import React, {
  useCallback, useEffect, useMemo, FC,
} from 'react';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { VacancyList } from '@/components/Vacancies/VacancyList';
import { VacancyHeading } from '@/components/Vacancies/VacancyHeading/VacancyHeading';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import typography from '@/ui/typography/typography.module.scss';
import {
  FlashMessageType,
  RecruiterProfileStatus,
  useSendNewVacancyRequestMutation,
  Vacancy,
} from '@/controllers/graphql/generated';
import { Button } from '@/ui/buttons/Button';
import { VacancyPostModals } from '@/components/Vacancies/VacanciesModal/VacancyPostModals';
import { useModalState } from '@/controllers/modal/modal.hooks/useModalState';
import { useLatestRecruiterProfile } from '@/controllers/recruiterProfile/recruiterProfile.hooks.ts/useLatestRecruiterProfile';
import { analytics } from '@/controllers/analytics/analytics.client';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';
import { useFlashMessage } from '@/controllers/flashMessage/flashMesage.hooks/useFlashMessage';
import { Routes, VacanciesRoutes } from '@/controllers/router/router.constants';
import hoverMenuStyles from '@/components/Base/HoverMenu/HoverMenu.module.scss';
import { HoverMenu } from '@/components/Base/HoverMenu/HoverMenu';
import { Loader } from '@/ui/Loader';
import { VACANCIES_SALARIES_CATEGORIES } from '@/components/Vacancies/vacancies.constants';
import { VacanciesNav } from '@/components/Vacancies/VacanciesNav';
import styles from './Vacancies.module.scss';
import { VacanciesLogosPanel } from './VacanciesLogosPanel/VacanciesLogosModal';

interface Props {
  vacancies: Vacancy[];
  loading: boolean;
  companyName?: string;
  fetchMore?: (props: any) => void;
  hasMore?: boolean;
  isSalariesPage?: boolean;
}

const Modal = dynamic(
  async () => {
    const mod = await import('@/components/Base/Modal/Modal');

    return mod.Modal;
  },
  {
    ssr: false,
  },
);

export const formatCategory = (category = '') => category.split('-')
  .map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');

export const Vacancies: FC<Props> = ({
  vacancies, loading, companyName, isSalariesPage,
  fetchMore, hasMore,
}) => {
  const { t } = useTranslation([Namespaces.Common, Namespaces.Vacancy]);

  const [sendNewVacancyRequest] = useSendNewVacancyRequestMutation();

  const flashMessage = useFlashMessage();

  const [authUser] = useAuthUser();

  const { isModalOpened, openModal, closeModal } = useModalState(false);

  const [recruiterProfile] = useLatestRecruiterProfile();

  const hasRecruiterProfile = !!recruiterProfile;
  const isAnonymous = !authUser;

  const isRecruiterProfileActive = (
    recruiterProfile?.status === RecruiterProfileStatus.Active
  );

  const router = useRouter();

  const hasCategory = !!router?.query?.category;

  const isWrongSalaryCategory = router?.query?.category
    && !VACANCIES_SALARIES_CATEGORIES.has(router?.query?.category as string);

  const categoriesTitle = router?.query?.category
    ? formatCategory(router?.query?.category as string)
    : '';

  const vacanciesTitle = useMemo(() => {
    if (companyName) {
      return (
        <h1 className={styles.jobsTitle}>
          {t(`${Namespaces.Vacancy}:company_jobs_title`)}
          <span className={styles.companyName}>
            {companyName}
          </span>
        </h1>
      );
    }

    if (categoriesTitle && isSalariesPage) {
      return (
        <div className={styles.salaryJobsTitle}>
          <p className={cn(typography.overhead, 'mb-8')}>
            {t(`${Namespaces.Vacancy}:latest_jobs`)}
          </p>
          <h1 className={typography.h2}>
            {`${categoriesTitle} ${t(`${Namespaces.Vacancy}:jobs_with_salaries_title`)}`}
          </h1>
        </div>
      );
    }

    return (
      <h1 className={typography.h1}>
        {`${categoriesTitle} ${t(`${Namespaces.Common}:vacancies_page_title`)}`}
      </h1>
    );
  }, [categoriesTitle, isSalariesPage, companyName, t]);

  const handleVacancyPost = useCallback(async (
    vacancyLink: string,
    contactEmail: string,
  ) => {
    if (recruiterProfile?.status === RecruiterProfileStatus.Active) {
      await sendNewVacancyRequest({
        variables: {
          vacancyLink,
          contactEmail,
        },
      });

      flashMessage.postMessage({
        variables: {
          type: FlashMessageType.Success,
          heading: t(`${Namespaces.Vacancy}:post_vacancy_success`),
          text: t(`${Namespaces.Vacancy}:new_vacancy_posted`),
        },
      });

      analytics.sendEvent(
        analytics.events.vacancies.VacancyPostRequested,
        {},
      );
      closeModal();
    }
  }, [t, sendNewVacancyRequest, flashMessage, closeModal, recruiterProfile]);

  const handleAtsSetup = useCallback(
    () => {
      if (!isAnonymous && isRecruiterProfileActive) {
        router.push(VacanciesRoutes.AtsSetup);
      } else {
        openModal();
      }
    },
    [router, isAnonymous, isRecruiterProfileActive, openModal],
  );

  useEffect(() => {
    if (companyName) {
      analytics.sendEvent(
        analytics.events.pageInteraction.VisitJobsPage,
        {
          company: companyName,
        },
      );
    } else if (hasCategory && !isWrongSalaryCategory) {
      analytics.sendEvent(
        analytics.events.pageInteraction.VisitJobsPage,
        {
          category: router?.query?.category,
        },
      );
    } else {
      analytics.sendEvent(
        analytics.events.pageInteraction.VisitJobsPage,
        {},
      );
    }
  }, [
    companyName,
    hasCategory,
    isWrongSalaryCategory,
    router?.query?.category,
  ]);

  return (
    <div className="grid-container mt-60">
      <div className="grid-x grid-margin-x mb-60 c-semidark-chocolate">
        <div className="cell">
          <div className={cn(styles.heading, 'mb-8')}>
            {vacanciesTitle}

            {((hasRecruiterProfile || isAnonymous) && !isSalariesPage) && (
            <div className={cn('ml-56', hoverMenuStyles.actionsContainer, styles.headerButtonContainer)}>
              <Button
                mode={Button.mode.Secondary}
                size={Button.size.SmallWide}
                className={styles.postBtn}
                onClick={() => {
                  if (authUser?.hasVacanciesSource) {
                    openModal();
                  }
                }}
                type="button"
                text={t(`${Namespaces.Vacancy}:post_a_job`)}
              />

              <HoverMenu>
                <li className={hoverMenuStyles.actionsListItem}>
                  <Button
                    onClick={openModal}
                    className={hoverMenuStyles.actionItem}
                    type="button"
                    text={t(`${Namespaces.Vacancy}:add_job_manually`)}
                  />
                </li>
                <li className={hoverMenuStyles.actionsListItem}>
                  <Button
                    onClick={handleAtsSetup}
                    className={hoverMenuStyles.actionItem}
                    type="button"
                    text={t(`${Namespaces.Vacancy}:import_jobs_ats`)}
                  />
                </li>
              </HoverMenu>
            </div>
            )}

            {(authUser?.isAdminUser && !isSalariesPage) && (
              <div className="ml-32">
                <VacanciesLogosPanel />
              </div>
            )}

            {(!hasRecruiterProfile || isAnonymous) && (
            <div className={cn(styles.web3Buttons)}>
              {(!isSalariesPage && !isWrongSalaryCategory
                && hasCategory && !companyName) && (
                <div className="ml-24">
                  <Button
                    mode={Button.mode.Primary}
                    size={Button.size.SmallWide}
                    href={router?.query?.category
                      ? `${Routes.Salaries}/${router?.query?.category}`
                      : ''}
                    text={t(`${Namespaces.Vacancy}:web3_salaries`)}
                  />
                </div>
              )}
              <div className="ml-24">
                <Button
                  mode={Button.mode.Secondary}
                  size={Button.size.SmallWide}
                  href={Routes.Web3Companies}
                  text={t(`${Namespaces.Vacancy}:web3_top_companies`)}
                />
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
      <div className="grid-x grid-margin-x">
        <Loader active={loading} />
        <VacanciesNav isSalariesPage={isSalariesPage} />
        {vacancies.length > 0 && (
          <>
            <VacancyHeading />
            <VacancyList
              vacancies={vacancies}
              isAnonymous={isAnonymous}
              fetchMore={fetchMore}
              hasMore={hasMore}
            />
          </>
        )}
      </div>
      <Modal
        isOpen={isModalOpened}
        closeModal={closeModal}
      >
        <VacancyPostModals
          isAnonymous={isAnonymous}
          recruiterProfileStatus={recruiterProfile?.status}
          handleVacancyPost={handleVacancyPost}
        />
      </Modal>
    </div>
  );
};
