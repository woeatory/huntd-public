import { makeServiceResolver } from '@/core/makeResolver/makeServiceResolver';
import {
  DeactivateUnresponsiveProfilesUseCase,
  DeactivateUnresponsiveProfilesUseCaseOptions,
  DeactivateUnresponsiveProfilesUseCaseResult,
} from '@/modules/candidateProfile/candidateProfile.useCases/DeactivateUnresponsiveProfiles.useCase';

export const deactivateUnresponsiveProfilesResolver = makeServiceResolver<
  DeactivateUnresponsiveProfilesUseCaseOptions,
  DeactivateUnresponsiveProfilesUseCaseResult
  >(
    DeactivateUnresponsiveProfilesUseCase,
  );
