import {
  ClientError,
  ClientErrorTypes,
  ValidationRules,
} from '@mate-academy/core';
import { User } from '@/models/User';
import { AuthUseCase } from '@/core';
import {
  ProfileConnectionErrors,
} from '@/modules/profileConnection/profileConnection.constants';
import { ProfileConnection } from '@/models/ProfileConnection';
import { ProfileConnectionEntity } from '@/modules/profileConnection/ProfileConnection.entity';

export type GetConnectionRecruiterUserUseCaseOptions = {
  profileConnection: ProfileConnection
}
export type GetConnectionRecruiterUserUseCaseResult = User;

type Options = GetConnectionRecruiterUserUseCaseOptions;
type Result = GetConnectionRecruiterUserUseCaseResult;

export class GetConnectionRecruiterUserUseCase extends AuthUseCase<
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

    if (profileConnectionEntity.isUserRecruiter) {
      return this.authUser;
    }

    if (!profileConnectionEntity.hasAccessToRecruiterUser) {
      throw new ClientError({
        message: ProfileConnectionErrors.ConnectionUserForbidden,
        type: ClientErrorTypes.Forbidden,
        fields: options,
      });
    }

    const user = await this.dataLoaders.userById.load({
      id: options.profileConnection.recruiterUserId,
    });

    if (!user) {
      throw new ClientError({
        message: ProfileConnectionErrors.ConnectionUserNotFound,
        type: ClientErrorTypes.NotFound,
        fields: options,
      });
    }

    return user;
  }
}
