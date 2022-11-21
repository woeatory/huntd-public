import { ValidationRules } from '@mate-academy/core';
import { Technology } from '@/models/Technology';
import { AuthUseCase } from '@/core';

export interface CreateTechnologyUseCaseOptions {
  name: string;
}
export type CreateTechnologyUseCaseResult = Technology;

type Options = CreateTechnologyUseCaseOptions;
type Result = CreateTechnologyUseCaseResult;

export class CreateTechnologyUseCase extends AuthUseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      name: ['required', 'string'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const [technology] = await this.models.Technology.findOrCreate({
      where: {
        name: options.name,
      },
      defaults: {
        name: options.name,
        creatorId: this.authUser.id,
      },
    });

    return technology;
  }
}
