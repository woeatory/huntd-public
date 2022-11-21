import { PasswordChangedNotification } from '@mate-academy/notifications-gateway';
import { ClientError, ValidationRules } from '@mate-academy/core';
import { UseCase } from '@/core';
import { User } from '@/models/User';
import { AccessToken } from '@/models/AccessToken';
import {
  RESET_PASSWORD_INVALID_TOKEN,
} from '@/auth/auth.constants';

import { UserEntity } from '@/modules/user/User.entity';

export type ResetPasswordUseCaseOptions = {
  token: string;
  password: string;
  repeatPassword: string;
}
export type ResetPasswordUseCaseResult = boolean;

type Options = ResetPasswordUseCaseOptions;
type Result = ResetPasswordUseCaseResult;

export class ResetPasswordUseCase extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      token: ['required', 'string'],
      password: ['required', 'string'],
      repeatPassword: ['required', 'string', { equal_to_field: 'password' }],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const user = await User.findOne({
      where: {
        resetPasswordToken: options.token,
      },
    });

    if (!user) {
      throw new ClientError({
        message: RESET_PASSWORD_INVALID_TOKEN,
      });
    }

    const userEntity = new UserEntity(user);

    await AccessToken.destroy({
      where: {
        userId: user.id,
      },
    });

    await user.update({
      password: await userEntity.generatePasswordHash(options.password),
      resetPasswordToken: null,
      confirmed: true,
      confirmEmailToken: null,
    });

    this.gateways.notifications.notify<PasswordChangedNotification>({
      notification_type: this.gateways.notifications.types.PasswordChanged,
      channel: this.gateways.notifications.channels.Email,
      user_id: user.id,
      notification_uid: `password_changed|${Date.now()}`,
      message_data: {
        subject: 'Password changed',
        destination: user.email,
        user_name: user.computedName,
      },
    });

    return true;
  }
}
