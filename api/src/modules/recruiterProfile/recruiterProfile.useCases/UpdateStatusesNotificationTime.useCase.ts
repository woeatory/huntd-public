import { ValidationRules } from '@mate-academy/core';
import { ServiceUseCase } from '@/core';
import { RecruiterProfileRepository } from '../recruiterProfile.repository';

export interface UpdateStatusesNotificationTimeUseCaseOptions {
  profileIds: number[];
}

export type UpdateStatusesNotificationTimeUseCaseResult = boolean;

type Options = UpdateStatusesNotificationTimeUseCaseOptions;
type Result = UpdateStatusesNotificationTimeUseCaseResult;

export class UpdateStatusesNotificationTimeUseCase extends ServiceUseCase<
  Options, Result
> {
  private recruiterProfileRepository = this.makeRepository(
    RecruiterProfileRepository,
  )

  protected get validation(): ValidationRules<Options> {
    return {
      profileIds: ['required', { list_of: 'positive_integer' }],
    };
  }

  protected async run({ profileIds }: Options): Promise<Result> {
    return this.recruiterProfileRepository
      .updateStatusesNotificationTime(profileIds);
  }
}
