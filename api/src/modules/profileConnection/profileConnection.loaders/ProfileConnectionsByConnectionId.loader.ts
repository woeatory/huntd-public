import DataLoader from 'dataloader';
import { Op } from 'sequelize';
import { ProfileConnection } from '@/models/ProfileConnection';
import { Models } from '@/models';
import { CandidateProfile } from '@/models/CandidateProfile';
import { RecruiterProfile } from '@/models/RecruiterProfile';

interface Args {
  userId: number
  profileConnectionId: number
}
type Result = ProfileConnection | null;
type Key = string;

export class ProfileConnectionsByConnectionIdLoader extends DataLoader<
  Args, Result, Key
> {
  constructor(models: Models) {
    const cacheKeyFn = (key: { profileConnectionId: number }) => `${key.profileConnectionId}`;

    super(
      async (args) => {
        const options = args.reduce(
          (set, key) => {
            set.profileConnectionIds.add(key.profileConnectionId);
            set.userIds.add(key.userId);

            return set;
          },

          {
            profileConnectionIds: new Set<number>(),
            userIds: new Set<number>(),
          },
        );

        const profileConnections = await models.ProfileConnection.findAll({
          where: {
            id: {
              [Op.in]: [...options.profileConnectionIds],
            },
            [Op.or]: [
              {
                candidateUserId: {
                  [Op.in]: [...options.userIds],
                },
              },
              {
                recruiterUserId: {
                  [Op.in]: [...options.userIds],
                },
              },
            ],
          },
          include: [
            {
              model: CandidateProfile,
            },
            {
              model: RecruiterProfile,
            },
          ],
          order: [
            ['id', 'DESC'],
          ],
        });

        const profileConnectionsMap = profileConnections
          .reduce<Map<string, Result>>(
            (acc, cur) => {
              const key = cacheKeyFn({ profileConnectionId: cur.id });

              acc.set(key, cur);

              return acc;
            },
            new Map(),
          );

        return args.map((arg) => {
          const key = cacheKeyFn(arg);

          return profileConnectionsMap.get(key) || null;
        });
      },
    );
  }
}
