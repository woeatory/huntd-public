import { Op } from 'sequelize';
import { Repository } from '@/core/Repository';
import { UsersSearchSubscription } from '@/models/UsersSearchSubscription';
import { UsersSearchSubscriptionErrors } from '@/modules/usersSearchSubscription/usersSearchSubscription.constants';

type Values = Partial<Pick<UsersSearchSubscription, 'title' | 'lastUsed'>>;

type UpdateLastNotifiedProps = Pick<UsersSearchSubscription, 'lastNotified'>;

export class UsersSearchSubscriptionRepository extends Repository {
  async updateSubscription(
    id: number,
    values: Values,
  ) {
    const [
      count, updatedSubscriptions,
    ] = await this.models.UsersSearchSubscription
      .update(
        values,
        {
          where: { id },
          returning: true,
        },
      );

    if (count === 0) {
      this.throwNotFoundError(
        UsersSearchSubscriptionErrors.SubscriptionNotFound,
      );
    }

    return updatedSubscriptions[0].get() as UsersSearchSubscription;
  }

  async updateSubscriptionsLastNotified(
    subscriptionsIds: number[],
    { lastNotified }: UpdateLastNotifiedProps,
  ) {
    const [
      count,
    ] = await this.models.UsersSearchSubscription
      .update(
        {
          lastNotified,
        },
        {
          where: { id: { [Op.in]: subscriptionsIds } },
          returning: true,
        },
      );

    if (count === 0) {
      this.throwNotFoundError(
        UsersSearchSubscriptionErrors.SubscriptionNotFound,
      );
    }

    return true;
  }

  async deleteSubscription(
    id: number,
  ) {
    const count = await this.models.UsersSearchSubscription
      .destroy(
        {
          where: { id },
        },
      );

    if (count === 0) {
      this.throwNotFoundError(
        UsersSearchSubscriptionErrors.SubscriptionNotFound,
      );
    }

    return true;
  }

  async findSubscriptionById(
    userId: number,
  ) {
    return this.models.UsersSearchSubscription.findAll({
      where: {
        userId,
      },
    });
  }
}
