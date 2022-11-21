import { idX } from '@mate-academy/core';
import { makeAuthResolver } from '@/core';
import {
  LogOutUseCase,
  LogOutUseCaseOptions,
  LogOutUseCaseResult,
} from '@/modules/user/user.useCases/LogOut.useCase';
import { deleteAuthHeaders } from '@/auth/setAuthHeaders';

export const logOutResolver = makeAuthResolver<
  LogOutUseCaseOptions, LogOutUseCaseResult
>(
  LogOutUseCase,
  idX,
  [],
  (result, ctx) => {
    deleteAuthHeaders(ctx.res);

    return result;
  },
);
