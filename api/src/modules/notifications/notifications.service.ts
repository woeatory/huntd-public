import { Service } from '@/core/Service';
import {
  SendPushNotificationsOptions,
  SendUserPushNotificationsOptions,
} from '@/modules/notifications/notifications.typedefs';
import { DeviceTokenService } from '@/modules/deviceToken/deviceToken.service';
import { UserSettingsService } from '@/modules/userSettings/userSettings.service';
import { UserRepository } from '@/modules/user/user.repository';

export class NotificationsService extends Service {
  private readonly deviceTokenService = this.makeService(
    DeviceTokenService,
  );

  private readonly userSettingsService = this.makeService(
    UserSettingsService,
  );

  private readonly userRepository = this.makeRepository(
    UserRepository,
  );

  async sendUserPushNotification(options: SendUserPushNotificationsOptions) {
    const userSettings = await this.userSettingsService
      .getUserSettings(options.userId);

    if (!userSettings.pushNotificationsPermission) {
      return;
    }

    const tokens = await this.deviceTokenService
      .findUserPushTokens(options.userId);

    if (tokens.length > 0) {
      await this.gateways.notifications.notify({
        user_id: options.userId,
        notification_uid: `push_notifications|${Date.now()}`,
        channel: this.gateways.notifications.channels.Push,
        notification_type: 'PUSH_NOTIFICATION',
        message_data: {
          tokens,
          destination: 'token',
          subject: options.title,
          message: options.body,
          payload: options.payload,
        },
      });
    }
  }

  async sendPushNotifications(options: SendPushNotificationsOptions) {
    const targetUsers = await this.userRepository
      .findNotificationsTargetUsers(options.target);

    const targetUsersIds = targetUsers.map((user) => user.id);

    const tokens = await this.deviceTokenService
      .findTokensByUserIds(targetUsersIds);

    if (tokens.length > 0) {
      await this.gateways.notifications.notify({
        user_id: 0,
        notification_uid: `push_notifications|${Date.now()}`,
        channel: this.gateways.notifications.channels.Push,
        notification_type: 'PUSH_NOTIFICATION',
        message_data: {
          tokens,
          destination: 'token',
          subject: options.title,
          message: options.body,
          payload: options.payload,
        },
      });
    }
  }
}
