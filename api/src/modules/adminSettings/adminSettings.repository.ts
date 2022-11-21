import { Repository } from '@/core/Repository';
import { UserErrors } from '@/modules/user/user.constants';
import { AdminSettings } from '@/models/AdminSettings';

interface UpdateOptions {
  contactsVisibilityPermission?: boolean;
  silentProfileUpdate?: boolean;
}

export class AdminSettingsRepository extends Repository {
  async findOrCreateByUserId(userId: number) {
    const [adminSettings] = await this.models.AdminSettings.findOrCreate({
      where: {
        userId,
      },
      defaults: {
        userId,
      },
    });

    return adminSettings;
  }

  async findByUserId(userId: number) {
    return this.models.AdminSettings.findOne({
      where: {
        userId,
      },
    });
  }

  async updatePermissions(userId: number, options: UpdateOptions) {
    const [count, updatedRows] = await this.models.AdminSettings.update(
      options,
      {
        where: { userId },
        returning: true,
      },
    );

    if (count === 0) {
      this.throwNotFoundError(UserErrors.NotFound);
    }

    return updatedRows[0].get() as AdminSettings;
  }
}
