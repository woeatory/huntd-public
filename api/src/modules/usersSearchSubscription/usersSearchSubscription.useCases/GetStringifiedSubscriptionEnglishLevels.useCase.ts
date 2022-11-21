import { ValidationRules } from '@mate-academy/core';
import { EnglishLevel } from '@/models/EnglishLevel';
import { UseCase } from '@/core';

export interface GetStringifiedSubscriptionEnglishLevelsUseCaseOptions {
  subscriptionId: number;
}
export type GetStringifiedSubscriptionEnglishLevelsUseCaseResult =
EnglishLevel[] | null;

type Options = GetStringifiedSubscriptionEnglishLevelsUseCaseOptions;
type Result = GetStringifiedSubscriptionEnglishLevelsUseCaseResult;

export class GetStringifiedSubscriptionEnglishLevelsUseCase
  extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      subscriptionId: ['required', 'positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const subscription = await this.dataLoaders.subscriptionsById.load({
      id: options.subscriptionId,
    });

    const englishLevelsIds = subscription?.searchParams.englishLevelIds;

    if (englishLevelsIds) {
      const englishLevels = await this.dataLoaders
        .englishLevelById.loadMany(englishLevelsIds.map(
          (id) => ({ id }),
        ));

      const levelsWithoutErrors = englishLevels
        .filter((result) => !(result instanceof Error)) as EnglishLevel[][];

      return levelsWithoutErrors.flat();
    }

    return null;
  }
}
