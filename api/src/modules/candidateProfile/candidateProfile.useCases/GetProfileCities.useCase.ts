import { ValidationRules } from '@mate-academy/core';
import { CandidateProfileCity } from '@/models/CandidateProfileCity';
import { UseCase } from '@/core';

export interface GetProfileCitiesUseCaseOptions {
  candidateProfileId: number;
}
export type GetProfileCitiesUseCaseResult = CandidateProfileCity[]

type Options = GetProfileCitiesUseCaseOptions;
type Result = GetProfileCitiesUseCaseResult;

export class GetProfileCitiesUseCase extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      candidateProfileId: ['required', 'positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    return this.dataLoaders.candidateProfileCityByCandidateProfileId.load({
      candidateProfileId: options.candidateProfileId,
    });
  }
}
