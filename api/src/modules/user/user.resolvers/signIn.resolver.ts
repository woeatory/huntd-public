import { idX } from '@mate-academy/core';
import { SignInUseCase, SignInOptions, SignInResult } from '@/modules/user/user.useCases/SignIn.useCase';
import { setAuthHeaders } from '@/auth/setAuthHeaders';
import { makeResolver } from '@/core';

export const signInResolver = makeResolver<SignInOptions, SignInResult>(
  SignInUseCase,
  idX,
  [],
  (authUser, ctx) => {
    setAuthHeaders(ctx.res, authUser.accessToken);

    Object.assign(ctx, { authUser });

    return authUser;
  },
);
