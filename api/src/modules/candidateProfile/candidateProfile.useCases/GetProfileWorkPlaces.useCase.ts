import { ValidationRules } from '@mate-academy/core';
import { UseCase } from '@/core';
import { CandidateProfileWorkPlace } from '@/models/CandidateProfileWorkPlace';

export interface GetProfileWorkPlacesUseCaseOptions {
  candidateProfileId: number;
}
export type GetProfileWorkPlacesUseCaseResult = CandidateProfileWorkPlace[]

type Options = GetProfileWorkPlacesUseCaseOptions;
type Result = GetProfileWorkPlacesUseCaseResult;

export class GetProfileWorkPlacesUseCase extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      candidateProfileId: ['required', 'positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    return this.dataLoaders.candidateProfileWorkPlaceByCandidateProfileId.load({
      candidateProfileId: options.candidateProfileId,
    });
  }
}
