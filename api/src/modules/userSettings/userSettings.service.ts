import { Service } from '@/core/Service';
import { UserSettingsRepository } from '@/modules/userSettings/userSettings.repository';

export class UserSettingsService extends Service {
  private readonly userSettingsRepository = this.makeRepository(
    UserSettingsRepository,
  );

  getUserSettings(id: number) {
    return this.userSettingsRepository.findByUserIdOrCreate(id);
  }
}
