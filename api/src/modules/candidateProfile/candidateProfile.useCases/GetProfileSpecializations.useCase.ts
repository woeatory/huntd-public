import { ValidationRules } from '@mate-academy/core';
import { Specialization } from '@/models/Specialization';
import { UseCase } from '@/core';

export interface GetProfileSpecializationsUseCaseOptions {
  candidateProfileId: number;
}
export type GetProfileSpecializationsUseCaseResult = Specialization[]

type Options = GetProfileSpecializationsUseCaseOptions;
type Result = GetProfileSpecializationsUseCaseResult;

export class GetProfileSpecializationsUseCase extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      candidateProfileId: ['required', 'positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    return this.dataLoaders.specializationsByCandidateProfileId.load({
      candidateProfileId: options.candidateProfileId,
    });
  }
}
