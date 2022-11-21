import { ValidationRules } from '@mate-academy/core';
import { User } from '@/models/User';
import { ServiceUseCase } from '@/core';
import { UserRepository } from '../user.repository';

export type GetUsersByPendingConnectionsUseCaseOptions = unknown;
export type GetUsersByPendingConnectionsUseCaseResult = (
  User[]
);

type Options = GetUsersByPendingConnectionsUseCaseOptions;
type Result = GetUsersByPendingConnectionsUseCaseResult;

export class GetUsersByPendingConnectionsUseCase
  extends ServiceUseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {};
  }

  protected userRepository = this.makeRepository(
    UserRepository,
  )

  protected async run(): Promise<Result> {
    return this.userRepository
      .findUsersByPendingConnections();
  }
}
