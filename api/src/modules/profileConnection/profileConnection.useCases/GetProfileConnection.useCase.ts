import { ValidationRules } from '@mate-academy/core';
import { Op } from 'sequelize';
import { ProfileConnection } from '@/models/ProfileConnection';
import { AuthUseCase } from '@/core';

export interface GetProfileConnectionUseCaseOptions {
  id: number;
}
export type GetProfileConnectionUseCaseResult = ProfileConnection | null;

type Options = GetProfileConnectionUseCaseOptions;
type Result = GetProfileConnectionUseCaseResult;

export class GetProfileConnectionUseCase extends AuthUseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      id: ['required', 'positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    return this.models.ProfileConnection.findOne({
      where: {
        id: options.id,
        [Op.or]: [
          { candidateUserId: this.authUser.id },
          { recruiterUserId: this.authUser.id },
        ],
      },
    });
  }
}
