import { ValidationRules } from '@mate-academy/core';
import { Op } from 'sequelize';
import { UseCase } from '@/core';
import { UploadFile } from '@/models/UploadFile';
import { RelatedFields } from '@/modules/uploadFileMorph/uploadFileMorph.typedefs';

export interface GetUserAvatarUseCaseOptions {
  userId: number;
}
export type GetUserAvatarUseCaseResult = any;

type Options = GetUserAvatarUseCaseOptions;
type Result = GetUserAvatarUseCaseResult;

export class GetUserAvatarUseCase extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      userId: ['required', 'positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const avatar = await this.models.UploadFileMorph.findOne({
      where: {
        relatedType: 'users',
        relatedId: options.userId,
        field: {
          [Op.or]: [RelatedFields.Avatar, RelatedFields.NftAvatar],
        },
      },
      include: [
        { model: UploadFile },
      ],
      order: [
        ['id', 'DESC'],
      ],
    });

    return avatar?.uploadFile;
  }
}
