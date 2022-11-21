import { ValidationRules } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import { OAuthToken } from '@/models/OAuthToken';

export type UsersOAuthProvidersUseCaseOptions = unknown;
export type UsersOAuthProvidersUseCaseResult = OAuthToken[];

type Options = UsersOAuthProvidersUseCaseOptions;
type Result = UsersOAuthProvidersUseCaseResult;

export class UsersOAuthProvidersUseCase extends AuthUseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {};
  }

  protected async run(): Promise<Result> {
    return this.models.OAuthToken.findAll({
      where: {
        userId: this.authUser.id,
      },
    });
  }
}
