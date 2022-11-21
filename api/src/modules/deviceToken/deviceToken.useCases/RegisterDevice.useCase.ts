import { ValidationRules } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import { DeviceTokenPlatform } from '@/modules/deviceToken/deviceToken.typedefs';
import { DeviceTokenRepository } from '@/modules/deviceToken/deviceToken.repository';
import { DeviceToken } from '@/models/DeviceToken';

export type RegisterDeviceUseCaseOptions = {
  token: string;
  devicePlatform: DeviceTokenPlatform;
  deviceYear?: string;
  systemVersion: string;
  deviceName?: string;
};
export type RegisterDeviceUseCaseResult = DeviceToken | null;

type Options = RegisterDeviceUseCaseOptions;
type Result = RegisterDeviceUseCaseResult;

export class RegisterDeviceUseCase extends AuthUseCase<Options, Result> {
  private readonly deviceTokenRepository = this.makeRepository(
    DeviceTokenRepository,
  )

  protected get validation(): ValidationRules<Options> {
    return {
      token: ['required', 'string'],
      devicePlatform: ['required', { one_of: Object.values(DeviceTokenPlatform) }],
      deviceYear: ['string'],
      systemVersion: ['string'],
      deviceName: ['string'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const existingToken = await this.deviceTokenRepository.findOne({
      token: options.token,
      userId: this.authUser.id,
    });

    if (!existingToken) {
      return this.deviceTokenRepository.createOne({
        ...options,
        userId: this.authUser.id,
      });
    }

    return existingToken;
  }
}
