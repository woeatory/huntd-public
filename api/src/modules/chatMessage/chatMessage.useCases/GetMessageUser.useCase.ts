import { ValidationRules } from '@mate-academy/core';
import { User } from '@/models/User';
import { UseCase } from '@/core';

export interface GetMessageUserUseCaseOptions {
  id: number;
}
export type GetMessageUserUseCaseResult = User | null;

type Options = GetMessageUserUseCaseOptions;
type Result = GetMessageUserUseCaseResult;

export class GetMessageUserUseCase extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      id: ['positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    if (!options.id) {
      return null;
    }

    return this.dataLoaders.userById.load({
      id: options.id,
    });
  }
}
