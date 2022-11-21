import React, { FC, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { VacancyCard } from '@/components/Vacancies/VacancyCard';
import { Vacancy } from '@/controllers/graphql/generated';
import { useLocalStorage } from '@/controllers/localStorage/localStorage.hooks/useLocalStorage';
import { AppliedVacanciesStorage } from '@/controllers/vacancy/vacancy.typedefs';
import { Routes } from '@/controllers/router/router.constants';
import { Button } from '@/ui/buttons/Button';
import { useModalState } from '@/controllers/modal/modal.hooks/useModalState';
import { VacanciesModal } from '@/components/Vacancies/VacanciesModal';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { analytics } from '@/controllers/analytics/analytics.client';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';
import { useLatestCandidateProfile } from '@/controllers/candidateProfile/candidateProfile.hooks/useLatestCandidateProfile';
import { useFeature } from '@/controllers/features/features.hooks/useFeature';
import { Features } from '@/controllers/features/features.constants';
import { VACANCIES_VIEW_MORE_COUNT } from '@/components/Vacancies/vacancies.constants';
import { VacanciesSubscriptionForm } from '@/components/Vacancies/VacanciesSubscriptionForm';
import { VacancyApplyModals } from '../VacanciesModal/VacancyApplyModals';

const Modal = dynamic(
  async () => {
    const mod = await import('@/components/Base/Modal/Modal');

    return mod.Modal;
  },
  {
    ssr: false,
  },
);

const getJobId = (route: string) => {
  const result = route.match(/(?!#)\d+/) as Array<string>;

  return result?.length ? +result[0] : null;
};

interface Props {
  vacancies: Vacancy[];
  isAnonymous: boolean;
  fetchMore?: (props: any) => void;
  hasMore?: boolean;
}

export const VacancyList: FC<Props> = (props) => {
  const {
    vacancies, isAnonymous, fetchMore, hasMore,
  } = props;
  const router = useRouter();

  const [candidateProfile] = useLatestCandidateProfile();
  const [authUser] = useAuthUser();

  const jobsSubscriptionsFeature = useFeature(Features.JobsSubscriptions);

  const jobsPaginationFeature = useFeature(Features.JobsPagination);
  const withPaginationButton = jobsPaginationFeature.isEnabled()
    && hasMore
    && !isAnonymous;

  const [fetching, setFetching] = useState(false);

  const handleFetchMore = useCallback(
    async () => {
      if (fetchMore) {
        setFetching(true);
        await fetchMore({
          variables: {
            offset: vacancies.length,
          },
        });
        setFetching(false);
      }
    }, [fetchMore, vacancies],
  );

  const { t } = useTranslation([
    Namespaces.Vacancy,
    Namespaces.Auth,
    Namespaces.Common,
  ]);

  const [modalData, setModalData] = useState({
    title: '',
    text: '',
    link: Routes.SignUp,
    linkLabel: t(`${Namespaces.Auth}:sign_up_link`),
  });
  const [companyName, setCompanyName] = useState('');
  const { isModalOpened, openModal, closeModal } = useModalState(false);

  const {
    isModalOpened: isApplyModalOpened,
    openModal: openApplyModal,
    closeModal: closeApplyModal,
  } = useModalState(false);

  const [
    selectedVacancy,
    setSelectedVacancy,
  ] = useState<number | null>(getJobId(router.asPath));
  const [appliedVacancies, setAppliedVacancies] = useLocalStorage<AppliedVacanciesStorage>('vacancies', {});

  const setVacancy = async (id: number) => {
    if (id === selectedVacancy) {
      setSelectedVacancy(null);

      return;
    }

    setSelectedVacancy(id);
  };

  const handleModal = () => {
    analytics.sendEvent(
      analytics.events.cta.ViewMoreJobsClick,
      {},
    );

    setModalData({
      title: t(`${Namespaces.Vacancy}:create_account`),
      text: t(`${Namespaces.Vacancy}:sign_up_to_see_more_jobs`),
      link: Routes.SignUp,
      linkLabel: t(`${Namespaces.Vacancy}:ok_button`),
    });

    openModal();
  };

  return (
    <>
      <ul className="cell">
        {vacancies.map((vacancy) => (
          <li key={vacancy.id}>
            <VacancyCard
              vacancy={vacancy}
              selectedVacancy={selectedVacancy}
              setVacancy={setVacancy}
              appliedVacancies={appliedVacancies}
              setAppliedVacancies={setAppliedVacancies}
              openApplyModal={openApplyModal}
              setCompanyName={setCompanyName}
              authUser={authUser}
              candidateProfile={candidateProfile}
            />
          </li>
        ))}
      </ul>
      {withPaginationButton && (
        <div className="cell large-2 large-offset-5 medium-3 medium-offset-5 small-4 small-offset-4 mt-40">
          <Button
            type='button'
            onClick={handleFetchMore}
            className='wide'
            mode={Button.mode.Secondary}
            text={t(`${Namespaces.Common}:view_more_jobs`, { count: VACANCIES_VIEW_MORE_COUNT })}
            disabled={fetching}
          />
        </div>
      )}
      {isAnonymous && (
        <div className="cell large-2 large-offset-5 medium-3 medium-offset-5 small-4 small-offset-4 mt-40">
          <Button
            type='button'
            className='small'
            onClick={handleModal}
            mode={Button.mode.Secondary}
            text="View more"
          />
        </div>
      )}

      {jobsSubscriptionsFeature.isEnabled() && (
        <VacanciesSubscriptionForm />
      )}

      <Modal
        isOpen={isModalOpened}
        closeModal={closeModal}
      >
        <VacanciesModal data={modalData} />
      </Modal>
      <Modal
        isOpen={isApplyModalOpened}
        closeModal={closeApplyModal}
      >
        <VacancyApplyModals
          isAnonymous={!authUser?.id}
          candidateProfileId={candidateProfile?.id}
          candidateProfileStatus={candidateProfile?.status}
          companyName={companyName}
        />
      </Modal>
    </>
  );
};
