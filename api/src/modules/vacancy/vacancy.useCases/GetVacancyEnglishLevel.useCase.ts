import { ValidationRules } from '@mate-academy/core';
import { EnglishLevel } from '@/models/EnglishLevel';
import { UseCase } from '@/core';

export interface GetVacancyEnglishLevelUseCaseOptions {
  englishLevelId?: number;
}
export type GetVacancyEnglishLevelUseCaseResult = EnglishLevel[] | null;

type Options = GetVacancyEnglishLevelUseCaseOptions;
type Result = GetVacancyEnglishLevelUseCaseResult;

export class GetVacancyEnglishLevelUseCase extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      englishLevelId: ['positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    if (!options.englishLevelId) {
      return null;
    }

    return this.dataLoaders.englishLevelById.load({
      id: options.englishLevelId,
    });
  }
}
