import { literal, Op, WhereAttributeHash } from 'sequelize';
import { Repository } from '@/core/Repository';
import {
  CandidateProfileErrors,
} from '@/modules/candidateProfile/candidateProfile.constants';
import { CandidateProfileStatusEnum, PublicProfilesWhere, TopCandidatesParams } from '@/modules/candidateProfile/candidateProfile.typedefs';
import { CandidateProfile } from '@/models/CandidateProfile';
import { EmploymentTypes } from '@/modules/employmentType/employmentType.typedefs';
import { CandidateProfileEmploymentType } from '@/models/CandidateProfileEmploymentType';
import { FEATURES } from '@/modules/feature/initFeatures';

interface CandidatesBySubscriptionOptions {
  whereObj: PublicProfilesWhere,
  having: string,
  subscriptionLastInteract: Date,
}

export class CandidateProfileRepository extends Repository {
  async count(options: {userId: number}) {
    return this.models.CandidateProfile.count({
      where: { userId: options.userId },
    });
  }

  async findLatestCandidateProfile(options: {userId: number}) {
    return this.dataLoaders.latestCandidateProfileByUserId.load({
      userId: options.userId,
    });
  }

  async getLatestCandidateProfile(options: {userId: number}) {
    const profile = await this.dataLoaders.latestCandidateProfileByUserId.load({
      userId: options.userId,
    });

    if (!profile) {
      this.throwNotFoundError(CandidateProfileErrors.ProfileNotExists);
    }

    return profile;
  }

  async updateProfile(
    id: number,
    details: {
      status: CandidateProfileStatusEnum
    },
  ) {
    const [count, updatedValues] = await this.models.CandidateProfile.update(
      details,
      {
        where: { id },
        returning: true,
      },
    );

    if (count === 0) {
      this.throwNotFoundError(CandidateProfileErrors.ProfileNotExists);
    }

    // TODO: return plain object from the repository
    // return updatedValues[0].get() as CandidateProfile;

    return updatedValues[0];
  }

  async findLatestActiveCandidateProfile(options:{
    userId: number,
  }) {
    const activeCandidateProfiles = await this.models.CandidateProfile.findAll({
      where: {
        status: CandidateProfileStatusEnum.Active,
        userId: options.userId,
      },
      order: [
        ['id', 'DESC'],
      ],
      include: [{
        model: this.models.CandidateProfileWorkPlace,
      }],
      subQuery: false,
    });

    return (
      activeCandidateProfiles.length > 0 ? activeCandidateProfiles[0] : null
    );
  }

  async deactivateCandidateProfilesByUserId(options:{
    userId: number,
    deactivationStatus: CandidateProfileStatusEnum,
  }) {
    await this.models.CandidateProfile.update(
      {
        status: CandidateProfileStatusEnum.Inactive,
        deactivationStatus: options.deactivationStatus,
      }, {
        where: {
          userId: options.userId,
          status: {
            [Op.in]: [
              CandidateProfileStatusEnum.Draft,
              CandidateProfileStatusEnum.Active,
              CandidateProfileStatusEnum.OnReview,
            ],
          },
        },
      },
    );
  }

  async deactivateCandidateProfilesByUserIds(options:{
    userIds: number[],
  }) {
    const [count, updatedValues] = await this.models.CandidateProfile.update(
      {
        status: CandidateProfileStatusEnum.Inactive,
        deactivationStatus: CandidateProfileStatusEnum.Active,
      }, {
        where: {
          userId: {
            [Op.in]: [...options.userIds],
          },
          status: {
            [Op.in]: [
              CandidateProfileStatusEnum.Draft,
              CandidateProfileStatusEnum.Active,
              CandidateProfileStatusEnum.OnReview,
            ],
          },
        },
        returning: true,
      },
    );

    if (count === 0) {
      return [];
    }

    return updatedValues as CandidateProfile[];
  }

  async findPublicCandidateProfiles(options: {
    whereObj: PublicProfilesWhere,
    limit?: number,
    offset?: number,
    having: string,
  }) {
    const {
      whereObj, limit,
      offset, having,
    } = options;

    const { candidateProfileCities, ...where } = whereObj;

    const candidates = await this.models.CandidateProfile.findAndCountAll({
      where: {
        status: CandidateProfileStatusEnum.Active,
        ...where as WhereAttributeHash,
      },
      // TODO: consider publish date
      order: [
        ['updatedAt', 'desc'],
      ],
      include: [
        {
          attributes: [],
          model: this.models.CandidateProfileCity,
          where: candidateProfileCities,
        },
        {
          attributes: [],
          model: this.models.Specialization,
        },
        {
          attributes: [],
          model: this.models.CandidateProfileSpecialization,
          include: [{
            attributes: [],
            model: this.models.Specialization,
          }],
        },
        {
          attributes: [],
          model: this.models.CandidateProfileTechnology,
        },
        {
          attributes: [],
          model: this.models.CandidateProfileEmploymentType,
        },
        {
          attributes: [],
          model: this.models.CandidateProfileEmploymentLocation,
        },
      ],
      having: literal(having),
      limit: limit ? limit + 1 : limit,
      offset,
      raw: true,
      subQuery: false,
      group: [
        `${this.models.CandidateProfile.name}.id`,
      ],
    });

    const countedElements = candidates.count as unknown as Array<{
      count: number
    }>;

    let hasMore = ((limit || 0) + 1) === candidates.rows.length;

    if (!this.features.isEnabled(FEATURES.candidatesPagination)) {
      hasMore = false;
    }

    const rows = hasMore
      ? candidates.rows.slice(0, -1)
      : candidates.rows;

    return {
      rows,
      hasMore,
      count: countedElements.length,
    };
  }

  async createFulltimeEmploymentType(profile: CandidateProfile) {
    const fullTimeEmploymentType = await this.models.EmploymentType.findOne({
      where: {
        slug: EmploymentTypes.FullTime,
      },
      attributes: ['id'],
    });

    profile.$create(CandidateProfileEmploymentType.name, {
      employmentTypeId: fullTimeEmploymentType?.id,
    });
  }

  async findTopCandidateProfiles() {
    const candidates = await this.models.CandidateProfile.findAll({
      where: {
        status: CandidateProfileStatusEnum.Active,
        achievements: {
          [Op.iLike]: TopCandidatesParams.achievementsIlikeQuery,
        },
      },
      order: [
        ['updatedAt', 'desc'],
      ],
      raw: true,
      subQuery: false,
      limit: TopCandidatesParams.limit as number,
    });

    const totalCandidatesCount = await this.models.CandidateProfile.count({
      where: {
        status: CandidateProfileStatusEnum.Active,
      },
    });

    return {
      rows: candidates,
      hasMore: false,
      count: totalCandidatesCount,
    };
  }

  async findCandidatesBySubscription({
    whereObj,
    having,
    subscriptionLastInteract,
  }: CandidatesBySubscriptionOptions) {
    const { candidateProfileCities, ...where } = whereObj;

    return this.models.CandidateProfile.findAll({
      where: {
        status: CandidateProfileStatusEnum.Active,
        updatedAt: {
          [Op.gte]: subscriptionLastInteract,
        },
        ...where as WhereAttributeHash,
      },
      order: [
        ['updatedAt', 'desc'],
      ],
      include: [
        {
          attributes: [],
          model: this.models.CandidateProfileCity,
          where: candidateProfileCities,
        },
        {
          attributes: [],
          model: this.models.Specialization,
        },
        {
          attributes: [],
          model: this.models.CandidateProfileTechnology,
        },
        {
          attributes: [],
          model: this.models.CandidateProfileSpecialization,
          include: [
            {
              attributes: [],
              model: this.models.Specialization,
            },
          ],
        },
        {
          attributes: [],
          model: this.models.CandidateProfileEmploymentType,
        },
      ],
      having: literal(having),
      group: [
        `${this.models.CandidateProfile.name}.id`,
      ],
      subQuery: false,
    });
  }

  async findPerfectCandidatesAmount(
    whereObj: PublicProfilesWhere,
    having: string,
  ) {
    const { candidateProfileCities, ...where } = whereObj;

    const candidates = await this.models.CandidateProfile.findAndCountAll({
      where: {
        status: CandidateProfileStatusEnum.Active,
        ...where as WhereAttributeHash,
      },
      attributes: ['id'],
      order: [
        ['updatedAt', 'desc'],
      ],
      include: [
        {
          attributes: [],
          model: this.models.CandidateProfileCity,
          where: candidateProfileCities,
        },
        {
          attributes: [],
          model: this.models.Specialization,
        },
        {
          attributes: [],
          model: this.models.CandidateProfileSpecialization,
          include: [{
            attributes: [],
            model: this.models.Specialization,
          }],
        },
        {
          attributes: [],
          model: this.models.CandidateProfileTechnology,
        },
        {
          attributes: [],
          model: this.models.CandidateProfileEmploymentType,
        },
        {
          attributes: [],
          model: this.models.CandidateProfileEmploymentLocation,
        },
      ],
      having: literal(having),
      raw: true,
      subQuery: false,
      group: [
        `${this.models.CandidateProfile.name}.id`,
      ],
    });

    const countedElements = candidates.count as unknown as Array<{
      count: number
    }>;

    return countedElements.length;
  }
}
