import { Op } from 'sequelize';
import { ValidationRules } from '@mate-academy/core';
import { Technology } from '@/models/Technology';
import { WhereObject } from '@/modules/technology/technology.constants';
import { TechnologyRepository } from '@/modules/technology/technology.repository';
import { UseCase } from '@/core';

const RESULT_LIMIT = 25;

export interface GetTechnologiesUseCaseOptions {
  query?: string
  requiredTechnologiesIds?: number[]
}
export type GetTechnologiesUseCaseResult = Technology[];

type Options = GetTechnologiesUseCaseOptions;
type Result = GetTechnologiesUseCaseResult;

export type Where = {
  [Op.or]: WhereObject
} | undefined;

export class GetTechnologiesUseCase extends UseCase<Options, Result> {
  private readonly technologyRepository = this.makeRepository(
    TechnologyRepository,
  )

  static getTechnologiesLimit(requiredTechnologiesIds: number[]) {
    const limit = RESULT_LIMIT + Number(requiredTechnologiesIds?.length);

    return limit;
  }

  private static getTechnologiesWhereObject(
    options: GetTechnologiesUseCaseOptions,
  ) {
    const { query, requiredTechnologiesIds } = options;

    let where: Where = {
      [Op.or]: [],
    };

    if (query) {
      where[Op.or].push({
        name: {
          [Op.iLike]: `%${query}%`,
        },
      });
    }

    if (requiredTechnologiesIds?.length) {
      where[Op.or].push({
        id: {
          [Op.in]: requiredTechnologiesIds,
        },
      });
    }

    if (!where[Op.or].length) {
      where = undefined;
    } else if (!query || !query.length) {
      where[Op.or].push({
        deletedAt: {
          [Op.is]: null,
        },
      });
    }

    return where;
  }

  protected get validation(): ValidationRules<Options> {
    return {
      query: ['string'],
      requiredTechnologiesIds: [{ list_of: 'positive_integer' }],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const { requiredTechnologiesIds } = options;

    const where = GetTechnologiesUseCase.getTechnologiesWhereObject(options);
    const limit = GetTechnologiesUseCase.getTechnologiesLimit(
      options.requiredTechnologiesIds ?? [],
    );

    return this.technologyRepository.getTechnologies({
      where,
      limit,
      ids: requiredTechnologiesIds || [],
    });
  }
}
