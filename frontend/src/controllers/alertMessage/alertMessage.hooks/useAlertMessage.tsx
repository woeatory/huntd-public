import { useLatestCandidateProfile } from '@/controllers/candidateProfile/candidateProfile.hooks/useLatestCandidateProfile';
import { CandidateProfileStatus } from '@/controllers/graphql/generated';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { Routes } from '@/controllers/router/router.constants';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { AlertMessageType } from '@/controllers/alertMessage/alertMessage.typedefs';

export const useAlertMessage = () => {
  const [candidate] = useLatestCandidateProfile();

  const { t } = useTranslation(Namespaces.Profile);

  const status = candidate?.status;

  switch (status) {
    case CandidateProfileStatus.Draft:
    case CandidateProfileStatus.Inactive:
      return {
        type: AlertMessageType.Info,
        heading: t(`${Namespaces.Profile}:${status.toLowerCase()}_alert`),
        text: t(`${Namespaces.Profile}:${status.toLowerCase()}_alert_message`),
        cta: { title: t(`${Namespaces.Profile}:activate_profile`), link: `${Routes.ProfilePreview}/candidate` },
      };

    case CandidateProfileStatus.Rejected:
      return {
        type: AlertMessageType.Error,
        heading: t(`${Namespaces.Profile}:${status.toLowerCase()}_alert`),
        text: t(`${Namespaces.Profile}:${status.toLowerCase()}_alert_message`),
        cta: { title: t(`${Namespaces.Profile}:edit_profile`), link: `${Routes.ProfilePreview}/candidate` },
      };
    default: {
      return null;
    }
  }
};
