import { ValidationRules } from '@mate-academy/core';
import { UseCase } from '@/core';
import { Nft } from '@/models/Nft';

export type GetUsersNftsUseCaseOptions = {
  userId: number;
};
export type GetUsersNftsUseCaseResult = Nft[];

type Options = GetUsersNftsUseCaseOptions;
type Result = GetUsersNftsUseCaseResult;

export class GetUsersNftsUseCase extends UseCase<
  Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      userId: ['required', 'positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    return this.dataLoaders.nftByUserId.load({
      userId: options.userId,
    });
  }
}
