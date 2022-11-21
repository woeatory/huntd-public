import { ValidationRules } from '@mate-academy/core';
import { EmploymentType } from '@/models/EmploymentType';
import { UseCase } from '@/core';

export type GetEmploymentTypesUseCaseOptions = unknown;
export type GetEmploymentTypesUseCaseResult = EmploymentType[];

type Options = GetEmploymentTypesUseCaseOptions;
type Result = GetEmploymentTypesUseCaseResult;

export class GetEmploymentTypesUseCase extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {};
  }

  protected async run(): Promise<Result> {
    return this.models.EmploymentType.findAll({
      order: [
        ['order', 'ASC'],
      ],
    });
  }
}
