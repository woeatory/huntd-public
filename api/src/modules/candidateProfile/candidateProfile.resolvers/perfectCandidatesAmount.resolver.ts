import { makeAuthResolver } from '@/core';
import {
  GetPerfectCandidatesAmountUseCase,
  GetPerfectCandidatesAmountUseCaseOptions,
  GetPerfectCandidatesAmountUseCaseResult,
} from '@/modules/candidateProfile/candidateProfile.useCases/GetPerfectCandidatesAmount.useCase';

export const perfectCandidatesAmountResolver = makeAuthResolver<
  GetPerfectCandidatesAmountUseCaseOptions,
  GetPerfectCandidatesAmountUseCaseResult
>(
  GetPerfectCandidatesAmountUseCase,
);
