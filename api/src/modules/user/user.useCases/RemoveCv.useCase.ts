import { ValidationRules } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import { UploadFile } from '@/models/UploadFile';
import { User } from '@/models/User';
import { initS3 } from '@/s3/initS3';

export type RemoveСvUseCaseOptions = unknown;
export type RemoveСvUseCaseResult = User;

type Options = RemoveСvUseCaseOptions;
type Result = RemoveСvUseCaseResult;

export class RemoveСvUseCase extends AuthUseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {};
  }

  protected async run(): Promise<Result> {
    const previousCvs = await this.models.UploadFileMorph.findAll({
      where: {
        relatedType: 'users',
        relatedId: this.authUser.id,
        field: 'cv',
      },
      include: [
        { model: UploadFile },
      ],
    });

    previousCvs.forEach((cv) => {
      // remove cv from S3 bucket
      initS3().deleteObject({
        Bucket: process.env.FILES_HANDLER_BUCKET,
        Key: `${cv.uploadFile.hash}`,
      }).promise();

      // remove cv from database
      cv.uploadFile.destroy()
        .then(() => cv.destroy());
    });

    return this.authUser;
  }
}
