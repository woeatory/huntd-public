import { Models } from '@/models';
import { initCandidateProfileLoaders } from '@/modules/candidateProfile/candidateProfile.loaders';
import { initRecruiterProfileLoaders } from '@/modules/recruiterProfile/recruiterProfile.loaders';
import { initUserLoaders } from '@/modules/user/user.loaders';
import { initProfileConnectionLoaders } from '@/modules/profileConnection/profileConnection.loaders';
import { initEnglishLevelLoaders } from '@/modules/englishLevel/englishLevel.loaders';
import { initJobExperienceLoaders } from '@/modules/jobExperience/jobExperience.loaders';
import { initSpecializationLoaders } from '@/modules/specialization/specialization.loaders';
import { initProfileConnectionUserMetaLoaders } from '@/modules/profileConnectionUserMeta/profileConnectionUserMeta.loaders';
import { initEmploymentTypeLoaders } from '@/modules/employmentType/employmentType.loaders';
import { initTechnologyLoaders } from '@/modules/technology/technology.loaders';
import { initCandidateProfileCityLoaders } from '@/modules/candidateProfileCity/candidateProfileCity.loaders';
import { initEmploymentLocationLoaders } from '@/modules/employmentLocation/employmentLocation.loaders';
import { initUsersSearchSubscriptionLoaders } from '@/modules/usersSearchSubscription/usersSearchSubscription.loaders';
import { initVacancyTechnologyLoaders } from '@/modules/vacancyTechnology/vacancyTechnology.loaders';
import { initVacancySpecializationLoaders } from '@/modules/vacancySpecialization/vacancySpecialization.loaders';
import { initCandidateProfileWorkPlaceLoaders } from '@/modules/workPlace/workPlace.loaders';
import { initNftLoaders } from '@/modules/nft/nft.loaders';

export const initLoaders = (models: Models) => ({
  ...initCandidateProfileLoaders(models),
  ...initRecruiterProfileLoaders(models),
  ...initUserLoaders(models),
  ...initProfileConnectionLoaders(models),
  ...initEnglishLevelLoaders(models),
  ...initJobExperienceLoaders(models),
  ...initSpecializationLoaders(models),
  ...initEmploymentTypeLoaders(models),
  ...initProfileConnectionUserMetaLoaders(models),
  ...initTechnologyLoaders(models),
  ...initCandidateProfileCityLoaders(models),
  ...initEmploymentLocationLoaders(models),
  ...initUsersSearchSubscriptionLoaders(models),
  ...initVacancyTechnologyLoaders(models),
  ...initVacancySpecializationLoaders(models),
  ...initCandidateProfileWorkPlaceLoaders(models),
  ...initNftLoaders(models),
});

export type DataLoaders = ReturnType<typeof initLoaders>
