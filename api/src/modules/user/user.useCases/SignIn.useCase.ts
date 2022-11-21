import { ClientError, ValidationRules } from '@mate-academy/core';
import { UseCase } from '@/core';
import { User } from '@/models/User';
import { AccessToken } from '@/models/AccessToken';
import { UserWithToken } from '@/modules/user/user.typedefs';

import { UserEntity } from '@/modules/user/User.entity';
import { AuthErrors } from '@/auth/auth.constants';

export interface SignInUseCaseOptions {
  email: string;
  password: string;
}
export type SignInUseCaseResult = UserWithToken;

type Options = SignInUseCaseOptions;
type Result = SignInUseCaseResult;

export class SignInUseCase extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      email: ['required', 'email', 'to_lc'],
      password: ['required', 'string'],
    };
  }

  protected async run({ email, password }: Options): Promise<Result> {
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      throw new ClientError({
        message: AuthErrors.LoginInvalidCredentials,
        fields: {
          email,
        },
      });
    }

    const userEntity = new UserEntity(user);

    const isValid = await userEntity.validatePassword(password);

    if (!isValid) {
      throw new ClientError({
        message: AuthErrors.LoginInvalidCredentials,
        fields: {
          email,
        },
      });
    }

    const accessToken = userEntity.generateAccessToken();

    await user.$create(AccessToken.name, { token: accessToken });

    Object.assign(user, { accessToken });

    return user as UserWithToken;
  }
}
