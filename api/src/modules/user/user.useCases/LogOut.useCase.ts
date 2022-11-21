import { ValidationRules } from '@mate-academy/core';
import { AuthUseCase } from '@/core';

export type LogOutUseCaseOptions = unknown;
export type LogOutUseCaseResult = boolean;

type Options = LogOutUseCaseOptions;
type Result = LogOutUseCaseResult;

export class LogOutUseCase extends AuthUseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {};
  }

  protected async run(): Promise<Result> {
    const { id, accessToken } = this.authUser;

    const token = await this.models.AccessToken.findOne({
      where: {
        userId: id,
        token: accessToken,
      },
    });

    await token?.destroy();

    return true;
  }
}
