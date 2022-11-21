import { ValidationRules } from '@mate-academy/core';
import { AdminUseCase } from '@/core';
import { UserWithToken } from '@/modules/user/user.typedefs';

export type LogOutFromUserUseCaseOptions = unknown;
export type LogOutFromUserUseCaseResult = UserWithToken;

type Options = LogOutFromUserUseCaseOptions;
type Result = LogOutFromUserUseCaseResult;

export class LogOutFromUserUseCase extends AdminUseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {};
  }

  protected async run(): Promise<Result> {
    if (!this.authUser) {
      return this.adminUser;
    }

    const { id, accessToken } = this.authUser;

    const token = await this.models.AccessToken.findOne({
      where: {
        userId: id,
        token: accessToken,
      },
    });

    await token?.destroy();

    return this.adminUser;
  }
}
