import { idX } from '@mate-academy/core';
import { makeResolver } from '@/core';
import { SocialSignUpUseCase, SocialSignUpUseCaseOptions, SocialSignUpUseCaseResult } from '@/modules/user/user.useCases/SocialSignUp.useCase';
import { setAuthHeaders } from '@/auth/setAuthHeaders';

export const socialSignUpResolver = makeResolver<
  SocialSignUpUseCaseOptions,
  SocialSignUpUseCaseResult
  >(
    SocialSignUpUseCase,
    idX,
    [],
    (authUser, ctx) => {
      setAuthHeaders(ctx.res, authUser.accessToken);

      Object.assign(ctx, { authUser });

      return authUser;
    },
  );
