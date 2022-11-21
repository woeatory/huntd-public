import { Op } from 'sequelize';
import { Repository } from '@/core/Repository';
import { DeviceToken } from '@/models/DeviceToken';

type FindOneValues = {
  token: string;
  userId: number;
}

type CreateOneValues = Partial<DeviceToken>;

export class DeviceTokenRepository extends Repository {
  async findOne(values: FindOneValues) {
    return this.models.DeviceToken.findOne({
      where: values,
      raw: true,
    });
  }

  async findByToken(token: string) {
    return this.models.DeviceToken.findOne({
      where: { token },
      raw: true,
    });
  }

  async createOne(values: CreateOneValues) {
    return this.models.DeviceToken.create(values);
  }

  async findAllByUser(userId: number) {
    return this.models.DeviceToken.findAll({
      where: { userId },
      raw: true,
    });
  }

  async removeByToken(token: string) {
    const deviceToken = await this.models.DeviceToken.findOne({
      where: { token },
    });

    if (deviceToken) {
      deviceToken.destroy();
    }
  }

  async findByUserIds(userIds: number[]) {
    return this.models.DeviceToken.findAll({
      where: {
        userId: { [Op.in]: [...userIds] },
      },
      raw: true,
    });
  }
}
