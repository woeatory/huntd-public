import { makeResolver } from '@/core';
import {
  GetJobExperiencesUseCase,
  GetJobExperiencesUseCaseOptions,
  GetJobExperiencesUseCaseResult,
} from '@/modules/jobExperience/jobExperience.useCases/GetJobExperiences.useCase';

export const jobExperiencesResolver = makeResolver<
  GetJobExperiencesUseCaseOptions,
  GetJobExperiencesUseCaseResult
>(
  GetJobExperiencesUseCase,
);
