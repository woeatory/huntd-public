import { ValidationRules } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import { AdminSettings } from '@/models/AdminSettings';
import { AdminSettingsRepository } from '@/modules/adminSettings/adminSettings.repository';

export type GetAdminSettingsUseCaseOptions = unknown;
export type GetAdminSettingsUseCaseResult = AdminSettings | null;

type Options = GetAdminSettingsUseCaseOptions;
type Result = GetAdminSettingsUseCaseResult;

export class GetAdminSettingsUseCase extends AuthUseCase<Options, Result> {
  private readonly adminSettingsRepository = this.makeRepository(
    AdminSettingsRepository,
  );

  protected get validation(): ValidationRules<Options> | null {
    return {};
  }

  protected async run(): Promise<Result> {
    let settings = null;

    if (this.authUser.isAdminUser) {
      settings = await this.adminSettingsRepository.findOrCreateByUserId(
        this.authUser.id,
      );
    }

    return settings;
  }
}
