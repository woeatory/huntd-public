import { ValidationRules } from '@mate-academy/core';
import { ProfileConnection } from '@/models/ProfileConnection';
import { AuthUseCase } from '@/core';
import { ProfileConnectionRepository } from '@/modules/profileConnection/profileConnection.repository';

export type GetUserHiresUseCaseOptions = {
  userId: number;
};
export type GetUserHiresUseCaseResult = ProfileConnection[];

type Options = GetUserHiresUseCaseOptions;
type Result = GetUserHiresUseCaseResult;

export class GetUserHiresUseCase extends AuthUseCase<
  Options, Result
> {
  private readonly profileConnectionRepository = this.makeRepository(
    ProfileConnectionRepository,
  );

  protected get validation(): ValidationRules<Options> {
    return {
      userId: ['required', 'positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const { userId } = options;

    if (this.authUser.id !== userId) {
      return [];
    }

    return this.profileConnectionRepository.findProfileConnectionsWithOffer({
      userId,
    });
  }
}
