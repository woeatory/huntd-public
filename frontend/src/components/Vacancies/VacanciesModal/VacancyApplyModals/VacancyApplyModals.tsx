import React, { memo, useEffect, useState } from 'react';
import { CandidateProfileStatus } from '@/controllers/graphql/generated';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { ProfileRoutes, Routes } from '@/controllers/router/router.constants';
import { VacanciesModal } from '@/components/Vacancies/VacanciesModal/VacanciesModal';

interface Props {
  isAnonymous: boolean;
  candidateProfileId?: number;
  candidateProfileStatus?: CandidateProfileStatus;
  companyName: string;
}
export const VacancyApplyModals = memo<Props>((props) => {
  const {
    isAnonymous,
    candidateProfileId,
    candidateProfileStatus,
    companyName,
  } = props;

  const { t } = useTranslation([
    Namespaces.Profile,
    Namespaces.Vacancy,
    Namespaces.Auth,
  ]);

  const [modalData, setModalData] = useState({
    title: t(`${Namespaces.Vacancy}:application_created`),
    text: t(`${Namespaces.Vacancy}:applied_successfully`, {
      companyName,
    }),
    linkLabel: '',
    link: '',
  });

  useEffect(() => {
    if (isAnonymous) {
      setModalData({
        title: t(`${Namespaces.Profile}:sign_up_to_account`),
        text: t(`${Namespaces.Vacancy}:sign_up_to_apply`),
        link: Routes.SignUp,
        linkLabel: t(`${Namespaces.Auth}:sign_up_link`),
      });
    } else if (!candidateProfileId) {
      setModalData({
        title: t(`${Namespaces.Vacancy}:create_candidate_profile`),
        text: t(`${Namespaces.Vacancy}:candidate_profile_required`),
        link: ProfileRoutes.Candidate,
        linkLabel: t(`${Namespaces.Vacancy}:create_candidate_profile`),
      });
    } else if (candidateProfileStatus !== CandidateProfileStatus.Active) {
      setModalData({
        title: t(`${Namespaces.Vacancy}:activate_candidate_profile`),
        text: t(`${Namespaces.Vacancy}:active_candidate_profile_required`),
        link: `${Routes.ProfilePreview}/candidate`,
        linkLabel: t(`${Namespaces.Profile}:review_recruiter_profile`),
      });
    }
  }, [candidateProfileId, candidateProfileStatus, isAnonymous, t]);

  return (
    <VacanciesModal data={modalData} />
  );
});
