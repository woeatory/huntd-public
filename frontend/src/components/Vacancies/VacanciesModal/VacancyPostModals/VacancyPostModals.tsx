import React, { memo, useEffect, useState } from 'react';
import { RecruiterProfileStatus } from '@/controllers/graphql/generated';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { VacanciesModal } from '@/components/Vacancies/VacanciesModal/VacanciesModal';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { Routes } from '@/controllers/router/router.constants';

interface Props {
  recruiterProfileStatus?: RecruiterProfileStatus;
  handleVacancyPost: (vacancyLink: string, contactEmail: string) => void;
  isAnonymous: boolean;
}
export const VacancyPostModals = memo<Props>(
  (props) => {
    const { recruiterProfileStatus, handleVacancyPost, isAnonymous } = props;

    const { t } = useTranslation([
      Namespaces.Profile,
      Namespaces.Vacancy,
      Namespaces.Auth,
    ]);

    const isRecruiterProfileActive = (
      recruiterProfileStatus === RecruiterProfileStatus.Active
    );

    const [modalData, setModalData] = useState({
      title: t(`${Namespaces.Vacancy}:new_job_form`),
      text: t(`${Namespaces.Vacancy}:please_leave_job_details`),
      linkLabel: '',
      link: '',
    });

    useEffect(() => {
      if (isAnonymous) {
        setModalData({
          title: t(`${Namespaces.Profile}:sign_up_to_account`),
          text: t(`${Namespaces.Vacancy}:sign_up_to_post`),
          link: Routes.SignUp,
          linkLabel: t(`${Namespaces.Auth}:sign_up_link`),
        });
      } else if (!isRecruiterProfileActive) {
        setModalData({
          title: t(`${Namespaces.Profile}:activate_recruiter_profile`),
          text: t(`${Namespaces.Vacancy}:active_recruiter_profile_required`),
          link: `${Routes.ProfilePreview}/recruiter`,
          linkLabel: t(`${Namespaces.Profile}:review_recruiter_profile`),
        });
      }
    }, [recruiterProfileStatus, t, isAnonymous, isRecruiterProfileActive]);

    return (
      <VacanciesModal
        data={modalData}
        handleVacancyPost={handleVacancyPost}
        addNewJob={isRecruiterProfileActive}
      />
    );
  },
);
