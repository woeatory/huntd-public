import { ValidationRules } from '@mate-academy/core';
import { Op } from 'sequelize';
import { Specialization } from '@/models/Specialization';
import { UseCase } from '@/core';

export interface GetSpecializationsUseCaseOptions {
  query?: string
}
export type GetSpecializationsUseCaseResult = Specialization[];

type Options = GetSpecializationsUseCaseOptions;
type Result = GetSpecializationsUseCaseResult;

export class GetSpecializationsUseCase extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      query: ['string'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    return this.models.Specialization.findAll({
      where: {
        ...(
          options.query
            ? {
              name: {
                [Op.iLike]: `%${options.query}%`,
              },
              deletedAt: {
                [Op.not]: null,
              },
            }
            : {}
        ),
      },
    });
  }
}
