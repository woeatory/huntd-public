import { ValidationRules } from '@mate-academy/core';
import { ProfileConnectionUserMeta } from '@/models/ProfileConnectionUserMeta';
import { UseCase } from '@/core';
import { ProfileConnection } from '@/models/ProfileConnection';
import { ProfileConnectionEntity } from '@/modules/profileConnection/ProfileConnection.entity';

export interface GetConnectionBuddyMetaUseCaseOptions {
  profileConnection: ProfileConnection;
}
export type GetConnectionBuddyMetaUseCaseResult =
  ProfileConnectionUserMeta | null;

type Options = GetConnectionBuddyMetaUseCaseOptions;
type Result = GetConnectionBuddyMetaUseCaseResult;

export class GetConnectionBuddyMetaUseCase extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      profileConnection: ['required'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    if (!this.authUser) {
      return null;
    }

    const profileConnectionEntity = new ProfileConnectionEntity(
      options.profileConnection, this.authUser,
    );

    if (!(
      profileConnectionEntity.isUserRecruiter
      || profileConnectionEntity.isUserCandidate
    )) {
      return null;
    }

    return this.dataLoaders.profileConnectionUserMetaByConnectionAndUserId
      .load({
        profileConnectionId: options.profileConnection.id,
        userId: profileConnectionEntity.isUserCandidate
          ? options.profileConnection.recruiterUserId
          : options.profileConnection.candidateUserId,
      });
  }
}
