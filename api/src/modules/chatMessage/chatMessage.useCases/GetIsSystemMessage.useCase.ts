import { ValidationRules } from '@mate-academy/core';
import { UseCase } from '@/core';

export interface GetIsSystemMessageUseCaseOptions {
  recipientUserId?: number
  senderUserId?: number
}
export type GetIsSystemMessageUseCaseResult = boolean;

type Options = GetIsSystemMessageUseCaseOptions;
type Result = GetIsSystemMessageUseCaseResult;

export class GetIsSystemMessageUseCase extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      recipientUserId: ['positive_integer'],
      senderUserId: ['positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    return !(options.recipientUserId && options.senderUserId);
  }
}
