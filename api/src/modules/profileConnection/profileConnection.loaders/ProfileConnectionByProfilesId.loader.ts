import DataLoader from 'dataloader';
import { Op } from 'sequelize';
import { ProfileConnection } from '@/models/ProfileConnection';
import { Models } from '@/models';

interface Args {
  recruiterProfileId: number;
  candidateProfileId: number;
}
type Result = ProfileConnection;
type Key = string;

export class ProfileConnectionByProfilesIdLoader extends DataLoader<
  Args, Result, Key
  > {
  constructor(models: Models) {
    const cacheKeyFn = (key: Args) => `${key.recruiterProfileId}${key.candidateProfileId}`;

    super(
      async (args) => {
        const options = args.reduce(
          (set, key) => {
            set.recruiterProfileIds.add(key.recruiterProfileId);
            set.candidateProfileIds.add(key.candidateProfileId);

            return set;
          },
          {
            recruiterProfileIds: new Set<number>(),
            candidateProfileIds: new Set<number>(),
          },
        );

        const profileConnections = await models.ProfileConnection.findAll({
          where: {
            recruiterProfileId: {
              [Op.in]: [...options.recruiterProfileIds],
            },
            candidateProfileId: {
              [Op.in]: [...options.candidateProfileIds],
            },
          },
        });

        const profileConnectionsMap = profileConnections
          .reduce<Record<Key, Result>>(
            (acc, cur) => {
              const key = cacheKeyFn({
                candidateProfileId: cur.candidateProfileId,
                recruiterProfileId: cur.recruiterProfileId,
              });

              Object.assign(acc, {
                [key]: cur,
              });

              return acc;
            },
            {},
          );

        return args.map((arg) => {
          const key = cacheKeyFn(arg);

          return profileConnectionsMap[key] || null;
        });
      },
    );
  }
}
