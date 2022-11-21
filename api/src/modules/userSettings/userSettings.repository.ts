import { Repository } from '@/core/Repository';
import { UserSettings } from '@/models/UserSettings';
import { UserSettingsErrors } from '@/modules/userSettings/userSettings.constants';

interface UpdateOptions {
  pushNotificationsPermission?: boolean;
}

export class UserSettingsRepository extends Repository {
  async findByUserIdOrCreate(userId: number) {
    const [userSettings] = await this.models.UserSettings.findOrCreate({
      where: {
        userId,
      },
      defaults: {
        userId,
      },
    });

    return userSettings;
  }

  async getByUserId(userId: number) {
    const userSettings = await this.findByUserIdOrCreate(userId);

    if (!userSettings) {
      this.throwNotFoundError(UserSettingsErrors.NotFound);
    }

    return userSettings;
  }

  async create(values: Partial<UserSettings>) {
    return this.models.UserSettings.create(values);
  }

  async update(userId: number, options: UpdateOptions) {
    const userSettings = await this.getByUserId(userId);

    await userSettings.update(options);

    return userSettings;
  }
}
