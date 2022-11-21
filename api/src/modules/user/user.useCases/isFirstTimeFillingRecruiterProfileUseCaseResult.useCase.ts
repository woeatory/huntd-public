import { ValidationRules } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import { RecruiterProfileRepository } from '@/modules/recruiterProfile/recruiterProfile.repository';
import { RecruiterProfileStatusEnum } from '@/modules/recruiterProfile/recruiterProfile.typedefs';

export interface IsFirstTimeFillingRecruiterProfileUseCaseOptions {
  userId: number;
}
export type IsFirstTimeFillingRecruiterProfileUseCaseResult = boolean;

type Options = IsFirstTimeFillingRecruiterProfileUseCaseOptions;
type Result = IsFirstTimeFillingRecruiterProfileUseCaseResult;

export class IsFirstTimeFillingRecruiterProfileUseCase extends AuthUseCase<
  Options, Result
> {
  private readonly recruiterProfileRepository = this.makeRepository(
    RecruiterProfileRepository,
  )

  protected get validation(): ValidationRules<Options> {
    return {
      userId: ['required', 'positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const count = await this.recruiterProfileRepository.count({
      userId: options.userId,
    });

    if (count === 0) {
      return true;
    }

    const profile = await this.recruiterProfileRepository
      .getLatestRecruiterProfile({
        userId: options.userId,
      });

    if (count === 1 && profile?.status === RecruiterProfileStatusEnum.Draft) {
      return true;
    }

    return false;
  }
}
