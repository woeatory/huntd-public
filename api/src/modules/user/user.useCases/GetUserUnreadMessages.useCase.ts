import { ValidationRules } from '@mate-academy/core';
import { fn, literal, Op } from 'sequelize';
import { UseCase } from '@/core';

export interface GetUserUnreadMessagesUseCaseOptions {
  userId: number;
}
export type GetUserUnreadMessagesUseCaseResult = number;

type Options = GetUserUnreadMessagesUseCaseOptions;
type Result = GetUserUnreadMessagesUseCaseResult;

export class GetUserUnreadMessagesUseCase extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      userId: ['required', 'positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const data = await this.models.ProfileConnection.findAll({
      where: {
        [Op.or]: [
          { candidateUserId: options.userId },
          { recruiterUserId: options.userId },
        ],
      },
      attributes: [
        [fn('COUNT', this.models.ChatMessage.name), 'MessagesCount'],
      ],
      include: [
        {
          model: this.models.ProfileConnectionUserMeta,
          attributes: [],
          required: true,
          where: {
            userId: options.userId,
          },
        },
        {
          model: this.models.ChatMessage,
          attributes: [],
          where: {
            [Op.or]: [
              {
                senderUserId: {
                  [Op.not]: options.userId,
                },
              },
              {
                senderUserId: null,
              },
            ],
            createdAt: {
              [Op.gt]: literal(`(SELECT CASE WHEN last_action_time IS NOT null THEN last_action_time ELSE '1970-01-01' END)`),
            },
          },
        },
      ],
      group: [
        `${this.models.ProfileConnection.name}.id`,
      ],
    });

    return data.reduce((acc, cur) => acc + Number(cur.get('MessagesCount')), 0);
  }
}
