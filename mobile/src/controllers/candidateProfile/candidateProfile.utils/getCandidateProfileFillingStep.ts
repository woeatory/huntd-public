import { CandidateProfile } from '@/controllers/graphql/generated';

export const isSpecialityFilled = (candidateProfile: CandidateProfile) => {
  const specialityFields = [
    candidateProfile.position,
    candidateProfile.specialization,
  ];

  return specialityFields.every(Boolean);
};

export const isJobExperienceFilled = (candidateProfile: CandidateProfile) => {
  const jobExperienceFields = [
    candidateProfile.salary,
    candidateProfile.jobExperience,
    candidateProfile.englishLevel,
  ];

  return jobExperienceFields.every(Boolean);
};

export const isExperienceFilled = (candidateProfile: CandidateProfile) => {
  const jobExperienceFields = [
    candidateProfile.experienceDescription,
    candidateProfile.achievements,
  ];

  return jobExperienceFields.every(Boolean);
};

export const isContactsFilled = (candidateProfile: CandidateProfile) => {
  const contactsFields = [
    candidateProfile.user?.firstName,
    candidateProfile.user?.lastName,
  ];

  return contactsFields.every(Boolean);
};

export const getCandidateProfileFillingStep = (
  candidateProfile: CandidateProfile | null,
) => {
  if (!candidateProfile) {
    return 0;
  }

  if (!isSpecialityFilled(candidateProfile)) {
    return 0;
  }

  if (!isJobExperienceFilled(candidateProfile)) {
    return 1;
  }

  if (!isExperienceFilled(candidateProfile)) {
    return 2;
  }

  return 0;
};

export const isCandidateProfileFilled = (
  candidateProfile: CandidateProfile,
) => {
  const checkers = [
    isSpecialityFilled(candidateProfile),
    isJobExperienceFilled(candidateProfile),
    isExperienceFilled(candidateProfile),
    isContactsFilled(candidateProfile),
  ];

  return checkers.every(Boolean);
};
