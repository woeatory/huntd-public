import { Service } from '@/core/Service';
import { DeviceTokenRepository } from '@/modules/deviceToken/deviceToken.repository';
import { DeviceTokenPlatform } from '@/modules/deviceToken/deviceToken.typedefs';

interface UserPushToken {
  token: string;
  platform: DeviceTokenPlatform;
}

export class DeviceTokenService extends Service {
  private readonly deviceTokenRepository = this.makeRepository(
    DeviceTokenRepository,
  )

  async findUserPushTokens(userId: number): Promise<UserPushToken[]> {
    const deviceTokens = await this.deviceTokenRepository.findAllByUser(userId);

    return deviceTokens.map((deviceToken) => ({
      token: deviceToken.token,
      platform: deviceToken.devicePlatform,
    }));
  }

  async findTokensByUserIds(userIds: number[]) {
    const tokens = await this.deviceTokenRepository.findByUserIds(userIds);

    return tokens.map((deviceToken) => ({
      token: deviceToken.token,
      platform: deviceToken.devicePlatform,
    }));
  }
}
