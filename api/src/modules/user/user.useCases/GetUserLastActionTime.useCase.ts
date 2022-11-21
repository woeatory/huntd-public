import { ValidationRules } from '@mate-academy/core';
import { UseCase } from '@/core';

export interface GetUserLastActionTimeUseCaseOptions {
  userId: number
}
export type GetUserLastActionTimeUseCaseResult = Date | null;

type Options = GetUserLastActionTimeUseCaseOptions;
type Result = GetUserLastActionTimeUseCaseResult;

export class GetUserLastActionTimeUseCase extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      userId: ['required', 'positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const user = await this.dataLoaders.userById.load({
      id: options.userId,
    });

    if (!user) {
      return null;
    }

    return user.lastActionTime;
  }
}
