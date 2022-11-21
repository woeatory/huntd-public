import { ValidationRules } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import { CandidateProfileRepository } from '@/modules/candidateProfile/candidateProfile.repository';
import { CandidateProfileStatusEnum } from '@/modules/candidateProfile/candidateProfile.typedefs';

export interface IsFirstTimeFillingCandidateProfileUseCaseOptions {
  userId: number;
}
export type IsFirstTimeFillingCandidateProfileUseCaseResult = boolean;

type Options = IsFirstTimeFillingCandidateProfileUseCaseOptions;
type Result = IsFirstTimeFillingCandidateProfileUseCaseResult;

export class IsFirstTimeFillingCandidateProfileUseCase extends AuthUseCase<
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

  protected async run(options: Options): Promise<Result> {
    const count = await this.candidateProfileRepository.count({
      userId: options.userId,
    });

    if (count === 0) {
      return true;
    }

    const profile = await this.candidateProfileRepository
      .getLatestCandidateProfile({
        userId: options.userId,
      });

    if (count === 1 && profile?.status === CandidateProfileStatusEnum.Draft) {
      return true;
    }

    return false;
  }
}
