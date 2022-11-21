import { PasswordChangedNotification } from '@mate-academy/notifications-gateway';
import { ClientError, ValidationRules } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import { AuthErrors } from '@/auth/auth.constants';
import { UserEntity } from '@/modules/user/User.entity';

export type ChangePasswordUseCaseOptions = {
  currentPassword: string;
  password: string;
  repeatPassword: string;
}
export type ChangePasswordUseCaseResult = boolean;

type Options = ChangePasswordUseCaseOptions;
type Result = ChangePasswordUseCaseResult;

export class ChangePasswordUseCase extends AuthUseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      currentPassword: ['required', 'string'],
      password: ['required', 'string'],
      repeatPassword: ['required', 'string', { equal_to_field: 'password' }],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const user = this.authUser;

    const userEntity = new UserEntity(user);

    const isValid = await userEntity.validatePassword(options.currentPassword);

    if (!isValid) {
      throw new ClientError({
        message: AuthErrors.LoginInvalidCredentials,
      });
    }

    await user.update({
      password: await userEntity.generatePasswordHash(options.password),
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

    this.gateways.analytics.sendEvent({
      event: this.gateways.analytics.events.accountSettings
        .UserPasswordChanged,
      userEmail: user.email,
      data: {},
    });

    return true;
  }
}
