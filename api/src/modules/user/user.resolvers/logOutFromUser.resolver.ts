import { idX } from '@mate-academy/core';
import {
  LogOutFromUserUseCase,
  LogOutFromUserUseCaseArgs,
  LogOutFromUserUseCaseResult,
} from '@/modules/user/user.useCases/LogOutFromUser.useCase';
import {
  deleteAdminHeaders,
  setAuthHeaders,
} from '@/auth/setAuthHeaders';
import { makeAdminResolver } from '@/core/makeResolver/makeAdminResolver';

export const logOutFromUserResolver = makeAdminResolver<
  LogOutFromUserUseCaseArgs, LogOutFromUserUseCaseResult
>(
  LogOutFromUserUseCase,
  idX,
  [],
  (user, ctx) => {
    deleteAdminHeaders(ctx.res);

    setAuthHeaders(ctx.res, user.accessToken);

    Object.assign(ctx, { authUser: user, adminUser: null });

    return user;
  },
);
