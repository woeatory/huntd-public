import { ValidationRules } from '@mate-academy/core';
import { Op } from 'sequelize';
import { ProfileConnection } from '@/models/ProfileConnection';
import { AuthUseCase } from '@/core';

export type GetUserProfileConnectionsUseCaseOptions = {
  userId: number;
  archived: boolean;
};
export type GetUserProfileConnectionsUseCaseResult = ProfileConnection[];

type Options = GetUserProfileConnectionsUseCaseOptions;
type Result = GetUserProfileConnectionsUseCaseResult;

export class GetUserProfileConnectionsUseCase extends AuthUseCase<
  Options, Result
> {
  protected get validation(): ValidationRules<Options> {
    return {
      userId: ['required', 'positive_integer'],
      archived: ['required'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const { userId, archived } = options;

    if (this.authUser.id !== userId) {
      return [];
    }

    return this.models.ProfileConnection.findAll({
      where: {
        [Op.or]: [
          {
            candidateUserId: userId,
          },
          {
            recruiterUserId: userId,
          },
        ],
      },
      order: [
        ['id', 'DESC'],
      ],
      include: [
        {
          model: this.models.ProfileConnectionUserMeta,
          required: true,
          where: {
            userId,
            archivedAt: archived
              ? { [Op.ne]: null }
              : null,
          },
        },
      ],
    });
  }
}
