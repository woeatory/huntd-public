import { ValidationRules } from '@mate-academy/core';
import { ProfileConnectionUserMeta } from '@/models/ProfileConnectionUserMeta';
import { UseCase } from '@/core';

export interface GetConnectionUserMetaUseCaseOptions {
  profileConnectionId: number
}
export type GetConnectionUserMetaUseCaseResult =
  ProfileConnectionUserMeta | null;

type Options = GetConnectionUserMetaUseCaseOptions;
type Result = GetConnectionUserMetaUseCaseResult;

export class GetConnectionUserMetaUseCase extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      profileConnectionId: ['required', 'positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    if (!this.authUser) {
      return null;
    }

    return this.dataLoaders.profileConnectionUserMetaByConnectionAndUserId
      .load({
        profileConnectionId: options.profileConnectionId,
        userId: this.authUser.id,
      });
  }
}
