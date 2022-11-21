import {
  ClientError,
  ClientErrorTypes,
  ValidationRules,
} from '@mate-academy/core';
import { CandidateProfile } from '@/models/CandidateProfile';
import { AuthUseCase } from '@/core';
import { ProfileConnectionErrors } from '@/modules/profileConnection/profileConnection.constants';

export interface GetConnectionCandidateProfileUseCaseOptions {
  candidateProfileId: number;
}

export type GetConnectionCandidateProfileUseCaseResult = CandidateProfile;

type Options = GetConnectionCandidateProfileUseCaseOptions;
type Result = GetConnectionCandidateProfileUseCaseResult;

export class GetConnectionCandidateProfileUseCase extends AuthUseCase<
  Options, Result
> {
  protected get validation(): ValidationRules<Options> {
    return {
      candidateProfileId: ['required', 'positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const profile = await this.dataLoaders.candidateProfileById.load({
      id: options.candidateProfileId,
    });

    if (!profile) {
      throw new ClientError({
        message: ProfileConnectionErrors.CandidateProfileNotFound,
        type: ClientErrorTypes.NotFound,
        fields: options,
      });
    }

    return profile;
  }
}
