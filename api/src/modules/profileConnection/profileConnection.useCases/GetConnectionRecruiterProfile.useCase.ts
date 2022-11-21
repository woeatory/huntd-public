import {
  ClientError,
  ClientErrorTypes,
  ValidationRules,
} from '@mate-academy/core';
import { RecruiterProfile } from '@/models/RecruiterProfile';
import { AuthUseCase } from '@/core';
import { ProfileConnectionErrors } from '@/modules/profileConnection/profileConnection.constants';

export interface GetConnectionRecruiterProfileUseCaseOptions {
  recruiterProfileId: number;
}
export type GetConnectionRecruiterProfileUseCaseResult = RecruiterProfile;

type Options = GetConnectionRecruiterProfileUseCaseOptions;
type Result = GetConnectionRecruiterProfileUseCaseResult;

export class GetConnectionRecruiterProfileUseCase extends AuthUseCase<
  Options, Result
> {
  protected get validation(): ValidationRules<Options> {
    return {
      recruiterProfileId: ['required', 'positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const profile = await this.dataLoaders.recruiterProfileById.load({
      id: options.recruiterProfileId,
    });

    if (!profile) {
      throw new ClientError({
        message: ProfileConnectionErrors.RecruiterProfileNotFound,
        type: ClientErrorTypes.NotFound,
        fields: options,
      });
    }

    return profile;
  }
}
