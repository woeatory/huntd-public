import { ValidationRules } from '@mate-academy/core';
import { Technology } from '@/models/Technology';
import { AuthUseCase } from '@/core';
import { TechnologyRepository } from '../technology.repository';

export interface GetTechnologiesByNamesUseCaseOptions {
  names: string[];
}
export type GetTechnologiesByNamesUseCaseResult = Technology[];

type Options = GetTechnologiesByNamesUseCaseOptions;
type Result = GetTechnologiesByNamesUseCaseResult;

export class GetTechnologiesByNamesUseCase extends AuthUseCase<
  Options, Result
> {
  private technologiesRepository = this.makeRepository(
    TechnologyRepository,
  );

  protected get validation(): ValidationRules<Options> {
    return {
      names: ['required', { list_of: ['string', 'required'] }],
    };
  }

  protected async run({ names }: Options): Promise<Result> {
    const technologies = await this.technologiesRepository
      .getTechnologiesByNames(names);

    return technologies;
  }
}
