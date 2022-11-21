import { ValidationRules } from '@mate-academy/core';
import { Op } from 'sequelize';
import { ServiceUseCase } from '@/core';
import { UsersSearchSubscription } from '@/models/UsersSearchSubscription';

export type GetUsersSearchSubscriptionsUseCaseOptions = unknown;
export type GetUsersSearchSubscriptionsUseCaseResult
  = UsersSearchSubscription[];

type Options = GetUsersSearchSubscriptionsUseCaseOptions;
type Result = GetUsersSearchSubscriptionsUseCaseResult;

export class GetUsersSearchSubscriptionsUseCase extends ServiceUseCase<
  Options, Result
> {
  protected get validation(): ValidationRules<Options> {
    return {};
  }

  protected async run(): Promise<Result> {
    return this.models.UsersSearchSubscription.findAll({
      include: [
        {
          model: this.models.User,
          attributes: ['email'],
          where: {
            inactive: {
              [Op.is]: false,
            },
          },
        },
      ],
    });
  }
}
