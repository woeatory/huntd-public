import { ValidationRules } from '@mate-academy/core';
import { Feature } from '@/models/Feature';
import { UseCase } from '@/core';
import { FeatureRepository } from '@/modules/feature/feature.repository';

export type GetFeatureUseCaseOptions = {
  name: string;
}
export type GetFeatureUseCaseResult = Feature | null;

type Options = GetFeatureUseCaseOptions;
type Result = GetFeatureUseCaseResult;

export class GetFeatureUseCase extends UseCase<
  Options, Result
  > {
  private readonly featureRepository = this.makeRepository(
    FeatureRepository,
  )

  protected get validation(): ValidationRules<Options> {
    return {
      name: ['required', 'string'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    return this.featureRepository.findFeatureByName(options.name);
  }
}
