import { ValidationRules } from '@mate-academy/core';
import { FileUpload } from 'graphql-upload';
import { AuthUseCase } from '@/core';
import { User } from '@/models/User';
import { UserService } from '@/modules/user/user.service';

export interface UploadAvatarUseCaseOptions {
  file: FileUpload;
  size: number;
}

export type UploadAvatarUseCaseResult = User;

type Options = UploadAvatarUseCaseOptions;
type Result = UploadAvatarUseCaseResult;

export class UploadAvatarUseCase extends AuthUseCase<Options, Result> {
  private readonly userService = this.makeService(
    UserService,
  )

  protected get validation(): ValidationRules<Options> | null {
    return null;
  }

  protected async run(options: Options): Promise<Result> {
    const { file, size } = options;

    await this.userService.uploadAvatar({ file, size });

    return this.authUser;
  }
}
