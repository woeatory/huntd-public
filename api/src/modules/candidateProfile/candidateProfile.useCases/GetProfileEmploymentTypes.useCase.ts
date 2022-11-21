import { ValidationRules } from '@mate-academy/core';
import { UseCase } from '@/core';
import { EmploymentType } from '@/models/EmploymentType';

export interface GetProfileEmploymentTypesUseCaseOptions {
  candidateProfileId: number;
}
export type GetProfileEmploymentTypesUseCaseResult = EmploymentType[]

type Options = GetProfileEmploymentTypesUseCaseOptions;
type Result = GetProfileEmploymentTypesUseCaseResult;

export class GetProfileEmploymentTypesUseCase extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      candidateProfileId: ['required', 'positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    return this.dataLoaders.employmentTypeByCandidateProfileId.load({
      candidateProfileId: options.candidateProfileId,
    });
  }
}
