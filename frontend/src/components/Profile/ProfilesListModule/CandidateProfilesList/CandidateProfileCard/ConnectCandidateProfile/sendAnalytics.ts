import { analytics } from '@/controllers/analytics/analytics.client';
import { CandidateProfile } from '@/controllers/graphql/generated';

export const useSendAnalytics = (
  candidateProfile: CandidateProfile,
) => {
  const specializations = candidateProfile
    .specializations?.map((el) => el.name);

  return () => {
    analytics.sendEvent(
      analytics.events.pageInteraction.ConnectCandidateProfile,
      {
        // TODO: add connectInitiator (now it's recruiter by default)
        candidateSlug: candidateProfile.slug,
        candidateSalary: candidateProfile.salary,
        candidateEnglishLevel: candidateProfile?.englishLevel?.slug,
        candidateSpecialization: specializations,
      },
    );

    analytics.sendEvent(
      analytics.events.chatInteraction.MessageSent,
      {},
    );
  };
};
