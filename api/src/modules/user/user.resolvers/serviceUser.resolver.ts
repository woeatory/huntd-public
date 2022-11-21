import { makeResolver } from '@/core';
import { GetServiceUserUseCase } from '@/modules/user/user.useCases/GetServiceUser.useCase';

export const serviceUserResolver = makeResolver(GetServiceUserUseCase);
