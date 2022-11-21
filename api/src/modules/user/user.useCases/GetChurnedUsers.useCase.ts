import { ValidationRules } from '@mate-academy/core';
import { UseCase } from '@/core';
import { UserRepository } from '@/modules/user/user.repository';

export type GetChurnedUsersUseCaseOptions = unknown;
export type GetChurnedUsersUseCaseResult = unknown;

type Options = GetChurnedUsersUseCaseOptions;
type Result = GetChurnedUsersUseCaseResult;

export class GetChurnedUsersUseCase extends UseCase<Options, Result> {
  private readonly userRepository = this.makeRepository(
    UserRepository,
  )

  protected get validation(): ValidationRules<Options> {
    return {};
  }

  protected async run(): Promise<Result> {
    return this.userRepository.findUsersWithChurnedCandidateProfiles();
  }
}
