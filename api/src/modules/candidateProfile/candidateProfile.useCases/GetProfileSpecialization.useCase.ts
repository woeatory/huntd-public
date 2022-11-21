import { ValidationRules } from '@mate-academy/core';
import { Specialization } from '@/models/Specialization';
import { UseCase } from '@/core';

export interface GetProfileSpecializationUseCaseOptions {
  specializationId?: number;
}
export type GetProfileSpecializationUseCaseResult = Specialization | null;

type Options = GetProfileSpecializationUseCaseOptions;
type Result = GetProfileSpecializationUseCaseResult;

export class GetProfileSpecializationUseCase extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      specializationId: ['positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    if (!options.specializationId) {
      return null;
    }

    return this.dataLoaders.specializationById.load({
      id: options.specializationId,
    });
  }
}
