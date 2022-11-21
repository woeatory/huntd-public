import { ValidationRules } from '@mate-academy/core';
import { UseCase } from '@/core';

export interface IsAuthUserUseCaseOptions {
  userId: number;
}
export type IsAuthUserUseCaseResult = boolean;

type Options = IsAuthUserUseCaseOptions;
type Result = IsAuthUserUseCaseResult;

export class IsAuthUserUseCase extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return { userId: ['required', 'positive_integer'] };
  }

  protected async run(options: Options): Promise<Result> {
    return this.authUser?.id === options.userId;
  }
}
