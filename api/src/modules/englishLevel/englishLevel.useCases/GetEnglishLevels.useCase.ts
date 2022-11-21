import { ValidationRules } from '@mate-academy/core';
import { EnglishLevel } from '@/models/EnglishLevel';
import { UseCase } from '@/core';

export type GetEnglishLevelsUseCaseOptions = unknown;
export type GetEnglishLevelsUseCaseResult = EnglishLevel[];

type Options = GetEnglishLevelsUseCaseOptions;
type Result = GetEnglishLevelsUseCaseResult;

export class GetEnglishLevelsUseCase extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {};
  }

  protected async run(): Promise<Result> {
    return this.models.EnglishLevel.findAll({
      order: [
        ['order', 'ASC'],
      ],
    });
  }
}
