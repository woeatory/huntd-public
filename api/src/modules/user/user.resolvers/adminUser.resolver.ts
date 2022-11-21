import { makeResolver } from '@/core';
import { GetAdminUserUseCase } from '@/modules/user/user.useCases/GetAdminUser.useCase';

export const adminUserResolver = makeResolver(GetAdminUserUseCase);
