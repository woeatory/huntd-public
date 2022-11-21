import { ValidationRules } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import { CandidateProfileRepository } from '@/modules/candidateProfile/candidateProfile.repository';

export type DeactivateCandidateProfilesUseCaseOptions = unknown;
export type DeactivateCandidateProfilesUseCaseResult = boolean;

type Options = DeactivateCandidateProfilesUseCaseOptions;
type Result = DeactivateCandidateProfilesUseCaseResult;

export class DeactivateCandidateProfilesUseCase extends AuthUseCase<
  Options, Result
> {
  private readonly candidateProfileRepository = this.makeRepository(
    CandidateProfileRepository,
  )

  protected get validation(): ValidationRules<Options> {
    return {};
  }

  protected async run(): Promise<Result> {
    const profile = await this.candidateProfileRepository
      .getLatestCandidateProfile({ userId: this.authUser.id });

    await this.candidateProfileRepository.deactivateCandidateProfilesByUserId({
      userId: this.authUser.id,
      deactivationStatus: profile?.status,
    });

    this.gateways.analytics.sendEvent({
      userEmail: this.authUser.email,
      event: this.gateways.analytics.events.candidateProfile
        .CandidateProfileDeactivated,
      data: {},
    });

    return true;
  }
}
