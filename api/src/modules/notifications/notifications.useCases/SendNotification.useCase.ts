import { ValidationRules } from '@mate-academy/core';
import { NotificationChannel } from '@mate-academy/notifications-gateway';
import { ServiceUseCase } from '@/core';
import { NotificationsService } from '@/modules/notifications/notifications.service';
import { PushNotificationTypes } from '@/modules/notifications/notifications.typedefs';

export type SendNotificationUseCaseOptions = {
  channel: NotificationChannel;
  title: string;
  body: string;
  target: string;
  payload?: string;
};
export type SendNotificationUseCaseResult = boolean;

type Options = SendNotificationUseCaseOptions;
type Result = SendNotificationUseCaseResult;

export class SendNotificationUseCase extends ServiceUseCase<Options, Result> {
  private readonly notificationsService = this.makeService(
    NotificationsService,
  )

  protected get validation(): ValidationRules<Options> | null {
    return {
      channel: ['required'],
      title: ['required', 'string'],
      body: ['required', 'string'],
      target: ['required', 'string'],
      payload: ['string'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    switch (options.channel) {
      case NotificationChannel.Push: {
        await this.notificationsService.sendPushNotifications({
          target: JSON.parse(options.target),
          title: options.title,
          body: options.body,
          payload: {
            type: PushNotificationTypes.Custom,
            ...(options.payload ? JSON.parse(options.payload) : {}),
          },
        });
        break;
      }

      default: {
        this.logger.warning(`Channel not specified`, options.channel);
      }
    }

    return true;
  }
}
