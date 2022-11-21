import { skip } from 'graphql-resolvers';
import { ForbiddenError } from 'apollo-server';
import { idX } from '@mate-academy/core';
import { makeResolver } from '@/core';
import {
  GetAuthUser,
  GetAuthUserUseCaseOptions,
  GetAuthUserUseCaseResult,
} from '@/modules/user/user.useCases/GetAuthUser.useCase';
import { AuthErrors } from '@/auth/auth.constants';

export const isUserAuthenticatedGuard = makeResolver<
    GetAuthUserUseCaseOptions,
    GetAuthUserUseCaseResult,
    GetAuthUserUseCaseOptions,
    unknown,
    typeof skip | ForbiddenError
    >(
      GetAuthUser,
      idX,
      [],
      (user) => (
        user
          ? skip
          : new ForbiddenError(AuthErrors.LoginNotAuthorized)
      ),
    );
