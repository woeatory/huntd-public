import { ValidationRules } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import { WorkPlaceService } from '@/modules/workPlace/workPlace.service';

export interface DeleteWorkPlaceUseCaseOptions {
  id: number;
}
export type DeleteWorkPlaceUseCaseResult = boolean;

type Options = DeleteWorkPlaceUseCaseOptions;
type Result = DeleteWorkPlaceUseCaseResult;

export class DeleteWorkPlaceUseCase extends AuthUseCase<Options, Result> {
  private readonly workPlaceProfileService = this.makeService(
    WorkPlaceService,
  )

  protected get validation(): ValidationRules<Options> {
    return {
      id: ['required', 'positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    await this.workPlaceProfileService.deleteWorkExperience(options);

    return true;
  }
}
