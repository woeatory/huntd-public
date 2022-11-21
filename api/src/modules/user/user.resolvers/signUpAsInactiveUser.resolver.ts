import { idX } from '@mate-academy/core';
import { makeResolver } from '@/core';
import { setAuthHeaders } from '@/auth/setAuthHeaders';
import {
  SignUpAsInactiveUserUseCase,
  SignUpAsInactiveUserUseCaseOptions,
  SignUpAsInactiveUserUseCaseResult,
} from '@/modules/user/user.useCases/SignUpAsInactiveUser.useCase';

export const signUpAsInactiveUserResolver = makeResolver<
  SignUpAsInactiveUserUseCaseOptions,
  SignUpAsInactiveUserUseCaseResult
>(
  SignUpAsInactiveUserUseCase,
  idX,
  [],
  (authUser, ctx) => {
    setAuthHeaders(ctx.res, authUser.accessToken);

    Object.assign(ctx, { authUser });

    return authUser;
  },
);
