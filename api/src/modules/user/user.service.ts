import { ClientError, ClientErrorTypes } from '@mate-academy/core';
import { Op } from 'sequelize';
import { FileUpload } from 'graphql-upload';
import { AuthService } from '@/core/Service';
import { UploadFile } from '@/models/UploadFile';
import { NftErrors } from '@/modules/nft/nft.constants';
import { initS3 } from '@/s3/initS3';
import { RelatedTypes, RelatedFields } from '@/modules/uploadFileMorph/uploadFileMorph.typedefs';
import { UploadFileMorph } from '@/models/UploadFileMorph';

export class UserService extends AuthService {
  async removeOldAvatars(options: {
    previousAvatars: UploadFileMorph[];
  }) {
    options.previousAvatars.forEach((avatar) => {
      if (avatar.field === RelatedFields.Avatar) {
        // remove avatar from S3 bucket
        initS3().deleteObject({
          Bucket: process.env.FILES_HANDLER_BUCKET,
          Key: `${avatar.uploadFile.hash}`,
        }).promise();

        // remove avatar from database
        avatar.uploadFile.destroy()
          .then(() => avatar.destroy());
      } else if (avatar.field === RelatedFields.NftAvatar) {
        avatar.destroy();
      }
    });

    return true;
  }

  async setNftAvatar(options: {
    nftId: number;
    userId: number;
  }) {
    const { nftId, userId } = options;

    // find all previous avatars
    const previousAvatars = await this.models.UploadFileMorph.findAll({
      where: {
        relatedId: userId,
        relatedType: RelatedTypes.Users,
        field: {
          [Op.or]: [RelatedFields.Avatar, RelatedFields.NftAvatar],
        },
      },
      include: [
        { model: UploadFile },
      ],
    });

    const selectedNft = await this.models.Nft.findOne({
      where: { id: nftId },
      raw: true,
    });

    if (!selectedNft) {
      throw new ClientError({
        message: NftErrors.NotFound,
        type: ClientErrorTypes.NotFound,
      });
    }

    const fileMorph = await this.models.UploadFileMorph.findOne({
      where: {
        relatedId: selectedNft.id,
        relatedType: RelatedTypes.Nfts,
        field: RelatedFields.Entity,
      },
    });

    if (!fileMorph) {
      throw new ClientError({
        message: NftErrors.NotFound,
        type: ClientErrorTypes.NotFound,
      });
    }

    try {
      await this.models.UploadFileMorph.create({
        uploadFileId: fileMorph.uploadFileId,
        relatedId: userId,
        relatedType: RelatedTypes.Users,
        field: RelatedFields.NftAvatar,
      });

      // remove previous avatars from database
      if (previousAvatars.length > 0) {
        await this.removeOldAvatars({ previousAvatars });
      }
    } catch (e) {
      throw new ClientError({
        message: e,
        type: ClientErrorTypes.BadRequest,
      });
    }
  }

  async uploadAvatar(options: {
    file: FileUpload;
    size: number;
  }) {
    const { file, size } = options;

    const { filename, createReadStream, mimetype } = await file;

    const fileStream = createReadStream();
    const ext = filename.split('.').pop();
    const timestamp = new Date().getTime();
    const name = `${filename.split('.')[0]}-${timestamp}.${ext}`;
    const key = `users/${this.authUser.id}/avatar/${name}`;

    // find all previous avatars
    const previousAvatars = await this.models.UploadFileMorph.findAll({
      where: {
        relatedId: this.authUser.id,
        relatedType: RelatedTypes.Users,
        field: {
          [Op.or]: [RelatedFields.Avatar, RelatedFields.NftAvatar],
        },
      },
      include: [
        { model: UploadFile },
      ],
    });

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
      name: `${name}`,
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
      relatedType: RelatedTypes.Users,
      field: RelatedFields.Avatar,
    });

    if (previousAvatars.length > 0) {
      await this.removeOldAvatars({ previousAvatars });
    }
  }
}
