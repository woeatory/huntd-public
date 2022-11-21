import {
  ClientError,
  ClientErrorLevels,
  ClientErrorTypes,
  ValidationRules,
} from '@mate-academy/core';
import { UseCase } from '@/core';
import { SignUpNotification } from '@/modules/user/user.notificationTypes';
import { UserEventsPayload } from '@/modules/user/user.events';
import { UserEntity } from '@/modules/user/User.entity';

export type SendSignUpEmailUseCaseOptions = UserEventsPayload;
export type SendSignUpEmailUseCaseResult = void;

type Options = SendSignUpEmailUseCaseOptions;
type Result = SendSignUpEmailUseCaseResult;

export class SendSignUpEmailUseCase extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return { id: ['required', 'positive_integer'] };
  }

  protected async run(options: Options): Promise<Result> {
    const user = await this.models.User.findByPk(options.id);

    if (!user) {
      throw new ClientError({
        message: 'User not found',
        fields: options,
        level: ClientErrorLevels.Error,
        type: ClientErrorTypes.NotFound,
      });
    }

    const userEntity = new UserEntity(user);
    const confirmEmailLink = await userEntity.getConfirmEmailLink();

    this.gateways.notifications.notify<SignUpNotification>({
      channel: this.gateways.notifications.channels.Email,
      user_id: user.id,
      notification_uid: 'sign_up',
      notification_type: this.gateways.notifications.types.SignedUp,
      message_data: {
        subject: `Confirm your email on Huntd`,
        destination: user.email,
        confirm_email_link: confirmEmailLink,
      },
    });
  }
}
