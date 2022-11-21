import { ValidationRules } from '@mate-academy/core';
import { RecruiterProfile } from '@/models/RecruiterProfile';
import { UseCase } from '@/core';

export type GetLatestRecruiterProfileUseCaseOptions = unknown;
export type GetLatestRecruiterProfileUseCaseResult = RecruiterProfile | null;

type Options = GetLatestRecruiterProfileUseCaseOptions;
type Result = GetLatestRecruiterProfileUseCaseResult;

export class GetLatestRecruiterProfileUseCase extends UseCase<
  Options, Result
> {
  protected get validation(): ValidationRules<Options> {
    return {};
  }

  protected async run(): Promise<Result> {
    if (!this.authUser) {
      return null;
    }

    return this.dataLoaders.latestRecruiterProfileByUserId.load({
      userId: this.authUser.id,
    });
  }
}
