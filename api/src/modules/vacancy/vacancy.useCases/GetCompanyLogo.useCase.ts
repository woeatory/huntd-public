import { ValidationRules } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import { UploadFile } from '@/models/UploadFile';

export interface GetCompanyLogoUseCaseOptions {
  vacancyId: number;
}
export type GetCompanyLogoUseCaseResult = any;

type Options = GetCompanyLogoUseCaseOptions;
type Result = GetCompanyLogoUseCaseResult;

export class GetCompanyLogoUseCase extends AuthUseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      vacancyId: ['required', 'positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const logo = await this.models.UploadFileMorph.findOne({
      where: {
        relatedType: 'vacancies',
        relatedId: options.vacancyId,
      },
      include: [
        { model: UploadFile },
      ],
      order: [
        ['id', 'DESC'],
      ],
    });

    return logo?.uploadFile;
  }
}
