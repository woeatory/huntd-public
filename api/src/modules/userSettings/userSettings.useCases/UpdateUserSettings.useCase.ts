import { ValidationRules } from '@mate-academy/core';
import { UserSettings } from '@/models/UserSettings';
import { AuthUseCase } from '@/core';
import { UserSettingsRepository } from '@/modules/userSettings/userSettings.repository';

export type UpdateUserSettingsUseCaseOptions = {
  pushNotificationsPermission?: boolean;
};

export type UpdateUserSettingsUseCaseResult = UserSettings | null;

type Options = UpdateUserSettingsUseCaseOptions;
type Result = UpdateUserSettingsUseCaseResult;

export class UpdateUserSettingsUseCase extends AuthUseCase<Options, Result> {
  private readonly userSettingsRepository = this.makeRepository(
    UserSettingsRepository,
  );

  protected get validation(): ValidationRules<Options> | null {
    return {
      pushNotificationsPermission: ['string'],
    };
  }

  protected run(options: Options): Promise<Result> {
    return this.userSettingsRepository.update(
      this.authUser.id,
      options,
    );
  }
}
