import { ValidationRules } from '@mate-academy/core';
import { User } from '@/models/User';
import { AuthUseCase } from '@/core';
import { ProfileConnection } from '@/models/ProfileConnection';
import { ProfileConnectionEntity } from '@/modules/profileConnection/ProfileConnection.entity';

export type GetConnectionCandidateUserUseCaseOptions = {
  profileConnection: ProfileConnection
}
export type GetConnectionCandidateUserUseCaseResult = User | null;

type Options = GetConnectionCandidateUserUseCaseOptions;
type Result = GetConnectionCandidateUserUseCaseResult;

export class GetConnectionCandidateUserUseCase extends AuthUseCase<
  Options, Result
> {
  protected get validation(): ValidationRules<Options> {
    return {
      profileConnection: ['required'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const profileConnectionEntity = new ProfileConnectionEntity(
      options.profileConnection,
      this.authUser,
    );

    if (!profileConnectionEntity.hasAccessToCandidateUser) {
      return null;
    }

    if (profileConnectionEntity.isUserCandidate) {
      return this.authUser;
    }

    return this.dataLoaders.userById.load({
      id: options.profileConnection.candidateUserId,
    });
  }
}
