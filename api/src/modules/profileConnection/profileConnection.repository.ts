import { Op } from 'sequelize';
import { Repository } from '@/core/Repository';
import { OfferStatusEnum } from './profileConnection.typedefs';

interface ProfileConnectionByConnectionIdOptions {
  profileConnectionId: number
  userId: number
}

interface ProfileConnectionsWithOfferOptions {
  userId: number;
}

export class ProfileConnectionRepository extends Repository {
  async findProfileConnection(options: {
    recruiterProfileId: number;
    candidateProfileId: number;
  }) {
    const { recruiterProfileId, candidateProfileId } = options;

    return this.dataLoaders.profileConnectionByProfilesId.load({
      recruiterProfileId,
      candidateProfileId,
    });
  }

  async findProfileConnectionByConnectionId(
    options: ProfileConnectionByConnectionIdOptions,
  ) {
    return this.dataLoaders.profileConnectionsByConnectionId.load(options);
  }

  async findProfileConnectionsWithOffer(
    { userId }: ProfileConnectionsWithOfferOptions,
  ) {
    return this.models.ProfileConnection.findAll({
      where: {
        [Op.and]: [
          { recruiterUserId: userId },
          {
            recruiterReportedStatus: OfferStatusEnum.Offer,
            candidateReportedStatus: {
              [Op.or]: [OfferStatusEnum.Offer, null],
            },
          },
        ],
      },
      order: [
        ['paidAt', 'DESC'],
        ['recruiterReportedAt', 'DESC'],
        ['candidateReportedAt', 'DESC'],
      ],
      include: [
        {
          model: this.models.ProfileConnectionUserMeta,
          required: true,
          where: {
            userId,
          },
        },
      ],
    });
  }
}
