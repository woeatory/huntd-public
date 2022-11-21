import { ConfirmEmailNotification } from '@mate-academy/notifications-gateway';
import { ValidationRules } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import { UserEntity } from '@/modules/user/User.entity';

export type SendConfirmEmailLinkUseCaseOptions = unknown;
export type SendConfirmEmailLinkUseCaseResult = boolean;

type Options = SendConfirmEmailLinkUseCaseOptions;
type Result = SendConfirmEmailLinkUseCaseResult;

export class SendConfirmEmailLinkUseCase extends AuthUseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {};
  }

  protected async run(): Promise<Result> {
    const userEntity = new UserEntity(this.authUser);

    const confirmEmailLink = await userEntity.getConfirmEmailLink();

    this.gateways.notifications.notify<ConfirmEmailNotification>({
      user_id: this.authUser.id,
      notification_uid: `confirm_email|${Date.now()}`,
      notification_type: this.gateways.notifications.types.ConfirmEmail,
      channel: this.gateways.notifications.channels.Email,
      message_data: {
        user_name: this.authUser.computedName,
        subject: 'Confirm your email on Huntd',
        destination: this.authUser.email,
        confirm_email_link: confirmEmailLink,
      },
    });

    return true;
  }
}
