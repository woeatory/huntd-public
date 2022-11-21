import { ValidationRules } from '@mate-academy/core';
import { CandidateProfile } from '@/models/CandidateProfile';
import { UseCase } from '@/core';
import { CandidateProfileRepository } from '@/modules/candidateProfile/candidateProfile.repository';

export type GetLatestCandidateProfileUseCaseOptions = unknown;
export type GetLatestCandidateProfileUseCaseResult = CandidateProfile | null;

type Options = GetLatestCandidateProfileUseCaseOptions;
type Result = GetLatestCandidateProfileUseCaseResult;

export class GetLatestCandidateProfileUseCase extends UseCase<
  Options, Result
> {
  private readonly candidateProfileRepository = this.makeRepository(
    CandidateProfileRepository,
  )

  protected get validation(): ValidationRules<Options> {
    return {};
  }

  protected async run(): Promise<Result> {
    if (!this.authUser) {
      return null;
    }

    return this.candidateProfileRepository.findLatestCandidateProfile({
      userId: this.authUser.id,
    });
  }
}
