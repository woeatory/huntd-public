import { ValidationRules } from '@mate-academy/core';
import { Feature } from '@/models/Feature';
import { UseCase } from '@/core';
import { FeatureRepository } from '@/modules/feature/feature.repository';

export type GetFeaturesUseCaseOptions = unknown;
export type GetFeaturesUseCaseResult = Feature[];

type Options = GetFeaturesUseCaseOptions;
type Result = GetFeaturesUseCaseResult;

export class GetFeaturesUseCase extends UseCase<
   Options, Result
> {
  private readonly featureRepository = this.makeRepository(
    FeatureRepository,
  )

  protected get validation(): ValidationRules<Options> | null {
    return null;
  }

  protected async run(): Promise<Result> {
    return this.featureRepository.findAllFeatures();
  }
}
