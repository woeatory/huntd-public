import { ForgotPasswordNotification } from '@mate-academy/notifications-gateway';
import { ClientError, ValidationRules } from '@mate-academy/core';
import { UseCase } from '@/core';
import { User } from '@/models/User';

import { UserEntity } from '@/modules/user/User.entity';
import {
  FORGOT_PASSWORD_INVALID_EMAIL,
} from '@/auth/auth.constants';

export type ForgotPasswordUseCaseOptions = {
  email: string;
}
export type ForgotPasswordUseCaseResult = boolean;

type Options = ForgotPasswordUseCaseOptions;
type Result = ForgotPasswordUseCaseResult;

export class ForgotPasswordUseCase extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      email: ['required', 'email', 'to_lc'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const { email } = options;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new ClientError({
        message: FORGOT_PASSWORD_INVALID_EMAIL,
      });
    }

    const userEntity = new UserEntity(user);

    const resetPasswordLink = await userEntity.getResetPasswordLink();

    this.gateways.notifications.notify<ForgotPasswordNotification>({
      notification_type: this.gateways.notifications.types.ForgotPassword,
      channel: this.gateways.notifications.channels.Email,
      user_id: user.id,
      notification_uid: `forgot_password|${Date.now()}`,
      message_data: {
        subject: 'Forgot password?',
        destination: user.email,
        user_name: user.computedName,
        reset_password_link: resetPasswordLink,
      },
    });

    return true;
  }
}
