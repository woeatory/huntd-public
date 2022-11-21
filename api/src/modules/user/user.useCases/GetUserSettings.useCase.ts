import { ValidationRules } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import { UserSettings } from '@/models/UserSettings';
import { UserSettingsRepository } from '@/modules/userSettings/userSettings.repository';

export type GetUserSettingsUseCaseOptions = {
  userId: number;
};
export type GetUserSettingsUseCaseResult = UserSettings;

type Options = GetUserSettingsUseCaseOptions;
type Result = GetUserSettingsUseCaseResult;

export class GetUserSettingsUseCase extends AuthUseCase<Options, Result> {
  private readonly userSettingsRepository = this.makeRepository(
    UserSettingsRepository,
  );

  protected get validation(): ValidationRules<Options> | null {
    return {
      userId: ['required', 'positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    return this.userSettingsRepository.findByUserIdOrCreate(options.userId);
  }
}
