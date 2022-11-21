import { GetAuthUser } from '@/modules/user/user.useCases/GetAuthUser.useCase';
import { makeResolver } from '@/core';

export const authUserResolver = makeResolver(GetAuthUser);
