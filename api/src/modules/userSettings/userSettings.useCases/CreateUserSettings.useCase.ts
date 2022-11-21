import { ValidationRules } from '@mate-academy/core';
import { UserEventsPayload } from '@/modules/user/user.events';
import { UseCase } from '@/core';
import { UserSettingsRepository } from '@/modules/userSettings/userSettings.repository';
import { UserRepository } from '@/modules/user/user.repository';

export type CreateUserSettingsUseCaseOptions = UserEventsPayload;
export type CreateUserSettingsUseCaseResult = void;

type Options = CreateUserSettingsUseCaseOptions;
type Result = CreateUserSettingsUseCaseResult;

export class CreateUserSettingsUseCase extends UseCase<Options, Result> {
  private readonly userRepository = this.makeRepository(
    UserRepository,
  );

  private readonly userSettingsRepository = this.makeRepository(
    UserSettingsRepository,
  );

  protected get validation(): ValidationRules<Options> | null {
    return {
      id: ['required', 'positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const user = await this.userRepository.getById(options.id);

    await this.userSettingsRepository.create({
      userId: user.id,
    });
  }
}
