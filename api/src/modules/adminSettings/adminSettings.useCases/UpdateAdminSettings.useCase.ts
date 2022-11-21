import { ValidationRules } from '@mate-academy/core';
import { AdminSettings } from '@/models/AdminSettings';
import { AuthUseCase } from '@/core';
import { AdminSettingsRepository } from '@/modules/adminSettings/adminSettings.repository';

export type UpdateAdminSettingsUseCaseOptions = {
  permissions: {
    contactsVisibilityPermission: boolean;
    silentProfileUpdate: boolean;
  }
};

export type UpdateAdminSettingsUseCaseResult = AdminSettings;

type Options = UpdateAdminSettingsUseCaseOptions;
type Result = UpdateAdminSettingsUseCaseResult;

export class UpdateAdminSettingsUseCase extends AuthUseCase<Options, Result> {
  private readonly adminSettingsRepository = this.makeRepository(
    AdminSettingsRepository,
  );

  protected get validation(): ValidationRules<Options> | null {
    return {
      permissions: [{
        nested_object: {
          contactsVisibilityPermission: ['required'],
          silentProfileUpdate: ['required'],
        },
      }],
    };
  }

  protected run(options: Options): Promise<Result> {
    return this.adminSettingsRepository.updatePermissions(
      this.authUser.id,
      options.permissions,
    );
  }
}
