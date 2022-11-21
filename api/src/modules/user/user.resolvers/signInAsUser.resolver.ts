import { idX } from '@mate-academy/core';
import { setAuthHeaders } from '@/auth/setAuthHeaders';
import { makeAuthResolver } from '@/core';
import {
  SignInAsUserUseCase,
  SignInAsUserUseCaseOptions,
  SignInAsUserUseCaseResult,
} from '@/modules/user/user.useCases/SignInAsUser.useCase';
import { UserWithToken } from '@/modules/user/user.typedefs';

export const signInAsUserResolver = makeAuthResolver<
  SignInAsUserUseCaseOptions,
  SignInAsUserUseCaseResult,
  SignInAsUserUseCaseOptions,
  unknown,
  UserWithToken
  >(
    SignInAsUserUseCase,
    idX,
    [],
    ({ user, admin }, ctx) => {
      setAuthHeaders(ctx.res, user.accessToken, admin.accessToken);

      Object.assign(ctx, { authUser: user, adminUser: admin });

      return user;
    },
  );
