import { ValidationRules } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import { DeviceTokenRepository } from '@/modules/deviceToken/deviceToken.repository';

export type UnregisterDeviceUseCaseOptions = {
  token: string;
};
export type UnregisterDeviceUseCaseResult = boolean;

type Options = UnregisterDeviceUseCaseOptions;
type Result = UnregisterDeviceUseCaseResult;

export class UnregisterDeviceUseCase extends AuthUseCase<Options, Result> {
  private readonly deviceTokenRepository = this.makeRepository(
    DeviceTokenRepository,
  )

  protected get validation(): ValidationRules<Options> {
    return {
      token: ['required', 'string'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    await this.deviceTokenRepository.removeByToken(options.token);

    return true;
  }
}
