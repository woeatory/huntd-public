import { ValidationRules } from '@mate-academy/core';
import { Technology } from '@/models/Technology';
import { TechnologyRepository } from '@/modules/technology/technology.repository';
import { AuthUseCase } from '@/core';

export interface CreateTechnologiesUseCaseOptions {
  slugs: string[];
}
export type CreateTechnologiesUseCaseResult = Technology[];

type Options = CreateTechnologiesUseCaseOptions;
type Result = CreateTechnologiesUseCaseResult;

export class CreateTechnologiesUseCase extends AuthUseCase<Options, Result> {
  private readonly technologyRepository = this.makeRepository(
    TechnologyRepository,
  )

  protected get validation(): ValidationRules<Options> {
    return {
      slugs: [{ list_of: 'string' }],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const { slugs } = options;

    const technologiesOptions = slugs.map((slug) => ({
      name: slug,
      creatorId: this.authUser.id,
    }));

    return this.technologyRepository.createTechnologies(technologiesOptions);
  }
}
