import { ValidationRules } from '@mate-academy/core';
import { CandidateProfile } from '@/models/CandidateProfile';
import { UseCase } from '@/core';
import { CandidateProfileRepository } from '@/modules/candidateProfile/candidateProfile.repository';

export type GetLatestActiveCandidateProfileUseCaseOptions = {
  userId: number
};
export type GetLatestActiveCandidateProfileUseCaseResult = (
  CandidateProfile | null
);

type Options = GetLatestActiveCandidateProfileUseCaseOptions;
type Result = GetLatestActiveCandidateProfileUseCaseResult;

export class GetLatestActiveCandidateProfileUseCase extends UseCase<
  Options, Result
> {
  private readonly candidateProfileRepository = this.makeRepository(
    CandidateProfileRepository,
  )

  protected get validation(): ValidationRules<Options> {
    return {
      userId: ['required', 'positive_integer'],
    };
  }

  protected async run({ userId }: Options): Promise<Result> {
    if (!this.authUser) {
      return null;
    }

    return this.candidateProfileRepository.findLatestActiveCandidateProfile({
      userId,
    });
  }
}
