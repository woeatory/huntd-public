import { ClientError, ClientErrorTypes, ValidationRules } from '@mate-academy/core';
import { FileUpload } from 'graphql-upload';
import { AuthUseCase } from '@/core';
import { initS3 } from '@/s3/initS3';
import { UploadFile } from '@/models/UploadFile';
import { User } from '@/models/User';
import { UploadFileMorph } from '@/models/UploadFileMorph';
import { UploadFileErrors } from '@/modules/uploadFile/uploadFile.constants';

export interface UploadCvUseCaseOptions {
  file: FileUpload;
  size: number;
}

export type UploadCvUseCaseResult = User;

type Options = UploadCvUseCaseOptions;
type Result = UploadCvUseCaseResult;

export class UploadCvUseCase extends AuthUseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> | null {
    return null;
  }

  protected async run(options: Options): Promise<Result> {
    const { file, size } = options;

    const { filename, createReadStream, mimetype } = await file;

    // check content type
    if (!mimetype.includes('pdf')) {
      throw new ClientError({
        message: UploadFileErrors.WrongFileFormat,
        type: ClientErrorTypes.BadRequest,
      });
    }

    const fileStream = createReadStream();
    const ext = filename.split('.').pop();
    const timestamp = new Date().getTime();
    const name = `${filename.split('.')[0]}-${timestamp}.${ext}`;
    const key = `users/${this.authUser.id}/cv/${name}`;

    // upload file to aws s3 bucket
    const result = await initS3()
      .upload({
        Bucket: process.env.FILES_HANDLER_BUCKET,
        Body: fileStream,
        Key: key,
        ContentType: mimetype,
        ACL: 'public-read',
      })
      .promise();

    const link = result.Location;

    // save file to db
    const uploadFile = await UploadFile.create({
      name: `${filename}`,
      hash: key,
      ext: `.${ext}`,
      mime: mimetype,
      url: link,
      provider: 'aws-s3',
      size: size ? (size / 1024).toFixed(2) : 0,
    });

    await UploadFileMorph.create({
      uploadFileId: uploadFile.id,
      relatedId: this.authUser.id,
      relatedType: 'users',
      field: 'cv',
    });

    return this.authUser;
  }
}
