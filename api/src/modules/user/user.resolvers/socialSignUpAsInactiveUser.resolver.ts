import { idX } from '@mate-academy/core';
import { makeResolver } from '@/core';
import { setAuthHeaders } from '@/auth/setAuthHeaders';
import {
  SocialSignUpAsInactiveUserUseCase,
  SocialSignUpAsInactiveUserUseCaseOptions,
  SocialSignUpAsInactiveUserUseCaseResult,
} from '@/modules/user/user.useCases/SocialSignUpAsInactiveUser.useCase';

export const socialSignUpAsInactiveUserResolver = makeResolver<
  SocialSignUpAsInactiveUserUseCaseOptions,
  SocialSignUpAsInactiveUserUseCaseResult
>(
  SocialSignUpAsInactiveUserUseCase,
  idX,
  [],
  (authUser, ctx) => {
    setAuthHeaders(ctx.res, authUser.accessToken);

    Object.assign(ctx, { authUser });

    return authUser;
  },
);
