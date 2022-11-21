import {
  Op, literal, col,
} from 'sequelize';
import { Repository } from '@/core/Repository';
import { UserErrors } from '@/modules/user/user.constants';
import { PushNotificationTarget } from '@/modules/notifications/notifications.typedefs';
import { CandidateProfileStatusEnum } from '@/modules/candidateProfile/candidateProfile.typedefs';
import { CHURNED_RECRUITER_PERIOD, RecruiterProfileStatusEnum } from '../recruiterProfile/recruiterProfile.typedefs';

export class UserRepository extends Repository {
  async findById(id: number) {
    return this.models.User.findByPk(id);
  }

  async getById(id: number) {
    const user = await this.findById(id);

    if (!user) {
      this.throwNotFoundError(UserErrors.NotFound);
    }

    return user;
  }

  async findByUsername(username: string) {
    return this.models.User.findOne({
      where: {
        username,
      },
    });
  }

  async findUserMessageTemplates(options: {
    userId: number,
    messageType: string,
  }) {
    return this.models.UserMessagesTemplate.findAll({
      where: {
        userId: options.userId,
        messageType: options.messageType,
      },
      order: [
        ['created_at', 'DESC'],
      ],
    });
  }

  async findUsersByUserIds(options: {
    userIds: number[],
  }) {
    return this.models.User.findAll({
      where: {
        id: {
          [Op.in]: [...options.userIds],
        },
      },
      raw: true,
    });
  }

  async findNotificationsTargetUsers(target: PushNotificationTarget = {}) {
    const include = [];

    if (target.candidates) {
      include.push({
        model: this.models.CandidateProfile,
        required: true,
        attributes: [],
      });
    } else if (target.recruiters) {
      include.push({
        model: this.models.RecruiterProfile,
        required: true,
        attributes: [],
      });
    }

    return this.models.User.findAll({
      attributes: ['id'],
      raw: true,
      include,
    });
  }

  async findUsersWithChurnedCandidateProfiles() {
    return this.models.User.findAll({
      where: {
        lastActionTime: {
          [Op.lt]: literal(`(now() - INTERVAL '15 min')`),
        },
      },
      attributes: [
        [literal(`(
          SELECT count(id)
          FROM candidate_profiles as cp
          WHERE cp.user_id="${this.models.User.name}".id
        )`), 'profilesCount',
        ],
        'id',
        'email',
        'firstName',
        // TODO: fix using method sequelize.col for attributes option (upgrade to sequelize v6)
        [col('candidateProfiles.id') as any, 'profileId'],
        [col('candidateProfiles.position') as any, 'position'],
        [col('candidateProfiles.slug') as any, 'slug'],
        [col('candidateProfiles.status') as any, 'status'],
        [col('candidateProfiles.created_at') as any, 'profileCreatedAt'],
      ],
      include: [
        {
          model: this.models.CandidateProfile,
          where: {
            id: {
              [Op.eq]: literal(`(
                SELECT MAX(id)
                FROM candidate_profiles as cp
                WHERE cp.user_id="${this.models.User.name}".id
              )`),
            },
            status: CandidateProfileStatusEnum.Draft,
            createdAt: {
              [Op.gte]: literal(`(now() - INTERVAL '2 DAY')`),
            },
          },
          required: true,
        },
      ],
      group: [
        `${this.models.User.name}.id`,
        `candidateProfiles.id`,
        `candidateProfiles.position`,
        `candidateProfiles.slug`,
        `candidateProfiles.status`,
        `candidateProfiles.created_at`,
      ],
      raw: true,
      subQuery: false,
    });
  }

  async findUsersByPendingConnections() {
    const lastActionDate = new Date();
    const lastNotifiedDate = new Date();

    lastActionDate.setDate(lastActionDate.getDate() - (
      CHURNED_RECRUITER_PERIOD * 2
    ));

    lastNotifiedDate.setDate(
      lastNotifiedDate.getDate() - CHURNED_RECRUITER_PERIOD,
    );

    return this.models.User.findAll({
      where: {
        lastActionTime: {
          [Op.gte]: lastActionDate,
        },
      },
      attributes: ['id', 'email', 'lastActionTime', 'firstName', 'lastName'],
      include: [
        {
          required: true,
          model: this.models.RecruiterProfile,
          where: {
            status: RecruiterProfileStatusEnum.Active,
            statusesNotificationSentAt: {
              [Op.or]: {
                [Op.lte]: lastNotifiedDate,
                [Op.is]: null,
              },
            },
          },
          include: [
            {
              required: true,
              model: this.models.ProfileConnection,
              where: {
                recruiterReportedStatus: null,
              },
            },
          ],
        },
      ],
    });
  }
}
