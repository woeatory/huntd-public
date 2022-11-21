import { ValidationRules } from '@mate-academy/core';
import { EmploymentLocation } from '@/models/EmploymentLocation';
import { UseCase } from '@/core';

export type GetEmploymentLocationsUseCaseOptions = unknown;
export type GetEmploymentLocationsUseCaseResult = EmploymentLocation[];

type Options = GetEmploymentLocationsUseCaseOptions;
type Result = GetEmploymentLocationsUseCaseResult;

export class GetEmploymentLocationsUseCase extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {};
  }

  protected async run(): Promise<Result> {
    return this.models.EmploymentLocation.findAll();
  }
}
