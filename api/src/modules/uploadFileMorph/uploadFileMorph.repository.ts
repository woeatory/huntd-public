import { Repository } from '@/core/Repository';
import { UploadFile } from '@/models/UploadFile';
import { RelatedTypes } from './uploadFileMorph.typedefs';

export class UploadFileMorphRepository extends Repository {
  async findByRelatedTypeAndId(relatedType: RelatedTypes, relatedId: number) {
    const entity = await this.models.UploadFileMorph.findOne({
      where: {
        relatedType,
        relatedId,
      },
      include: [
        { model: UploadFile },
      ],
      order: [
        ['id', 'DESC'],
      ],
    });

    return entity?.uploadFile;
  }
}
