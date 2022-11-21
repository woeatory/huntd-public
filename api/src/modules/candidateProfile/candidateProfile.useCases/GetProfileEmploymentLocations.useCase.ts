import { ValidationRules } from '@mate-academy/core';
import { UseCase } from '@/core';
import { EmploymentLocation } from '@/models/EmploymentLocation';

export interface GetProfileEmploymentLocationsUseCaseOptions {
  candidateProfileId: number;
}
export type GetProfileEmploymentLocationsUseCaseResult = EmploymentLocation[]

type Options = GetProfileEmploymentLocationsUseCaseOptions;
type Result = GetProfileEmploymentLocationsUseCaseResult;

export class GetProfileEmploymentLocationsUseCase extends UseCase<
  Options, Result
> {
  protected get validation(): ValidationRules<Options> {
    return {
      candidateProfileId: ['required', 'positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    return this.dataLoaders.employmentLocationByCandidateProfileId.load({
      candidateProfileId: options.candidateProfileId,
    });
  }
}
