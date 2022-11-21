import { makeServiceResolver } from '@/core/makeResolver/makeServiceResolver';
import {
  GetUsersByPendingConnectionsUseCase,
  GetUsersByPendingConnectionsUseCaseOptions,
  GetUsersByPendingConnectionsUseCaseResult,
} from '@/modules/user/user.useCases/UserByPendingConnections.useCase';

export const userByPendingConnectionsResolver = makeServiceResolver<
  GetUsersByPendingConnectionsUseCaseOptions,
  GetUsersByPendingConnectionsUseCaseResult
>(
  GetUsersByPendingConnectionsUseCase,
);
