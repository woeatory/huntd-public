import {
  ClientError,
  ClientErrorTypes,
  ValidationRules,
} from '@mate-academy/core';
import { UserWithToken } from '@/modules/user/user.typedefs';
import { AuthUseCase } from '@/core';
import { UserEntity } from '@/modules/user/User.entity';
import { AuthErrors } from '@/auth/auth.constants';
import { AccessToken } from '@/models/AccessToken';

export interface SignInAsUserUseCaseOptions {
  email: string;
}
export interface SignInAsUserUseCaseResult {
  admin: UserWithToken;
  user: UserWithToken;
}

type Options = SignInAsUserUseCaseOptions;
type Result = SignInAsUserUseCaseResult;

export class SignInAsUserUseCase extends AuthUseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      email: ['required', 'email', 'to_lc'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const admin = this.adminUser || this.authUser;

    if (!admin.isAdminUser) {
      throw new ClientError({
        message: AuthErrors.UserNotAdmin,
        type: ClientErrorTypes.Forbidden,
      });
    }

    const user = await this.models.User.findOne({
      where: {
        email: options.email,
      },
    });

    if (!user) {
      throw new ClientError({
        message: AuthErrors.LoginInvalidCredentials,
      });
    }

    const userEntity = new UserEntity(user);

    const accessToken = userEntity.generateAccessToken();

    await user.$create(AccessToken.name, { token: accessToken });

    Object.assign(user, { accessToken });

    return {
      admin,
      user: user as UserWithToken,
    };
  }
}
