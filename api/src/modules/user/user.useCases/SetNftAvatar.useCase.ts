import { ValidationRules } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import { User } from '@/models/User';
import { UserService } from '@/modules/user/user.service';

export interface SetNftAvatarUseCaseOptions {
  nftId: number,
}

export type SetNftAvatarUseCaseResult = User;

type Options = SetNftAvatarUseCaseOptions;
type Result = SetNftAvatarUseCaseResult;

export class SetNftAvatarUseCase extends AuthUseCase<Options, Result> {
  private readonly userService = this.makeService(
    UserService,
  )

  protected get validation(): ValidationRules<Options> {
    return {
      nftId: ['required', 'positive_integer'],
    };
  }

  protected async run({ nftId }: Options): Promise<Result> {
    await this.userService.setNftAvatar({
      nftId,
      userId: this.authUser.id,
    });

    return this.authUser;
  }
}
