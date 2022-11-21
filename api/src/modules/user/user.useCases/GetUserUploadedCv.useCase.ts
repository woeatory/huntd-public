import { ValidationRules } from '@mate-academy/core';
import { UseCase } from '@/core';
import { UploadFile } from '@/models/UploadFile';

export interface GetUserUploadedCvUseCaseOptions {
  userId: number;
}
export type GetUserUploadedCvUseCaseResult = any;

type Options = GetUserUploadedCvUseCaseOptions;
type Result = GetUserUploadedCvUseCaseResult;

export class GetUserUploadedCvUseCase extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      userId: ['required', 'positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const cv = await this.models.UploadFileMorph.findOne({
      where: {
        relatedType: 'users',
        relatedId: options.userId,
        field: 'cv',
      },
      include: [
        { model: UploadFile },
      ],
      order: [
        ['id', 'DESC'],
      ],
    });

    return cv?.uploadFile;
  }
}
