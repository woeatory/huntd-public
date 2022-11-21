import { ValidationRules } from '@mate-academy/core';
import { EnglishLevel } from '@/models/EnglishLevel';
import { UseCase } from '@/core';

export interface GetProfileEnglishLevelUseCaseOptions {
  englishLevelId?: number;
}
export type GetProfileEnglishLevelUseCaseResult = EnglishLevel[] | null;

type Options = GetProfileEnglishLevelUseCaseOptions;
type Result = GetProfileEnglishLevelUseCaseResult;

export class GetProfileEnglishLevelUseCase extends UseCase<Options, Result> {
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
