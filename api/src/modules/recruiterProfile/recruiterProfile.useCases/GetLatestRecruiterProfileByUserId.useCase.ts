import { ValidationRules } from '@mate-academy/core';
import { RecruiterProfile } from '@/models/RecruiterProfile';
import { UseCase } from '@/core';
import { RecruiterProfileRepository } from '@/modules/recruiterProfile/recruiterProfile.repository';

export type GetLatestRecruiterProfileByUserIdUseCaseOptions = {
  userId?: number;
};

export type GetLatestRecruiterProfileByUserIdUseCaseResult = (
  RecruiterProfile | null
  );

type Options = GetLatestRecruiterProfileByUserIdUseCaseOptions;
type Result = GetLatestRecruiterProfileByUserIdUseCaseResult;

export class GetLatestRecruiterProfileByUserIdUseCase extends UseCase<
  Options, Result
> {
  private readonly recruiterProfileRepository = this.makeRepository(
    RecruiterProfileRepository,
  )

  protected get validation(): ValidationRules<Options> {
    return {
      userId: ['positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    if (options.userId) {
      return this.recruiterProfileRepository.findLatestRecruiterProfile({
        userId: options.userId,
      });
    }

    return null;
  }
}
