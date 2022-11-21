import { ValidationRules } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import { VacanciesOptions, VacancySalaryData } from '@/modules/vacancy/vacancy.typedefs';
import { VacancyService } from '../vacancy.service';

export type GetSalariesDataByCategoryUseCaseOptions = VacanciesOptions;
export type GetSalariesDataByCategoryUseCaseResult = VacancySalaryData;

type Options = GetSalariesDataByCategoryUseCaseOptions;
type Result = GetSalariesDataByCategoryUseCaseResult;

export class GetSalariesDataByCategoryUseCase extends AuthUseCase<
  Options, Result
  > {
  private readonly vacancyService = this.makeService(
    VacancyService,
  )

  protected get validation(): ValidationRules<Options> {
    return {
      keywords: [{
        list_of: ['required', 'string'],
      }],
    };
  }

  protected async run(options: Options): Promise<Result> {
    return this.vacancyService.getSalariesDataByCategory(options);
  }
}
