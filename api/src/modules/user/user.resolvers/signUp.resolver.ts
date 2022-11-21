import { idX } from '@mate-academy/core';
import { makeResolver } from '@/core';
import { SignUpUseCase, SignUpUseCaseOptions, SignUpUseCaseResult } from '@/modules/user/user.useCases/SignUp.useCase';
import { setAuthHeaders } from '@/auth/setAuthHeaders';

export const signUpResolver = makeResolver<
  SignUpUseCaseOptions,
  SignUpUseCaseResult
>(
  SignUpUseCase,
  idX,
  [],
  (authUser, ctx) => {
    setAuthHeaders(ctx.res, authUser.accessToken);

    Object.assign(ctx, { authUser });

    return authUser;
  },
);
