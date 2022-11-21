import { ValidationRules } from '@mate-academy/core';
import { Technology } from '@/models/Technology';
import { UseCase } from '@/core';

export interface GetProfileTechnologiesUseCaseOptions {
  candidateProfileId: number;
}
export type GetProfileTechnologiesUseCaseResult = Technology[]

type Options = GetProfileTechnologiesUseCaseOptions;
type Result = GetProfileTechnologiesUseCaseResult;

export class GetProfileTechnologiesUseCase extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      candidateProfileId: ['required', 'positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    return this.dataLoaders.technologyByCandidateProfileId.load({
      candidateProfileId: options.candidateProfileId,
    });
  }
}
