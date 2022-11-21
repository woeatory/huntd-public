import { ValidationRules } from '@mate-academy/core';
import { ProfileConnectionRepository } from '@/modules/profileConnection/profileConnection.repository';
import { ProfileConnection } from '@/models/ProfileConnection';
import { AuthUseCase } from '@/core';

export type GetActiveProfileConnectionUseCaseOptions = {
  recruiterProfileId: number;
  candidateProfileId: number;
};
export type GetActiveProfileConnectionUseCaseResult = ProfileConnection | null;

type Options = GetActiveProfileConnectionUseCaseOptions;
type Result = GetActiveProfileConnectionUseCaseResult;

export class GetActiveProfileConnectionUseCase extends AuthUseCase<
  Options, Result
  > {
  private readonly profileConnectionRepository = this.makeRepository(
    ProfileConnectionRepository,
  )

  protected get validation(): ValidationRules<Options> {
    return {
      recruiterProfileId: ['required', 'positive_integer'],
      candidateProfileId: ['required', 'positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const { recruiterProfileId, candidateProfileId } = options;

    return this.profileConnectionRepository.findProfileConnection({
      recruiterProfileId,
      candidateProfileId,
    });
  }
}
