import { ValidationRules } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import { User } from '@/models/User';
import { UserRepository } from '@/modules/user/user.repository';

export type GetUserByUsernameUseCaseOptions = {
  username?: string;
};
export type GetUserByUsernameUseCaseResult = User | null;

type Options = GetUserByUsernameUseCaseOptions;
type Result = GetUserByUsernameUseCaseResult;

export class GetUserByUsernameUseCase extends AuthUseCase<Options, Result> {
  private readonly userRepository = this.makeRepository(
    UserRepository,
  );

  protected get validation(): ValidationRules<Options> | null {
    return {
      username: ['string'],
    };
  }

  protected async run({ username }: Options): Promise<Result> {
    let user = null;

    if (username) {
      user = await this.userRepository.findByUsername(username);
    }

    return user;
  }
}
