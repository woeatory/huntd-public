import DataLoader from 'dataloader';
import { Op } from 'sequelize';
import { Models } from '@/models';
import { CandidateProfileWorkPlace } from '@/models/CandidateProfileWorkPlace';

interface Args {
  candidateProfileId: number
}

type Result = CandidateProfileWorkPlace[];
type Key = string;

export class ProfileWorkPlaceByCandidateProfileIdLoader extends DataLoader<
  Args, Result, Key
  > {
  constructor(models: Models) {
    const cacheKeyFn = (key: Args) => `${key.candidateProfileId}`;

    super(
      async (args) => {
        const options = args.reduce(
          (set, key) => {
            set.candidateProfileIds.add(key.candidateProfileId);

            return set;
          },

          { candidateProfileIds: new Set<number>() },
        );

        const CandidateProfileWorkPlaces = await models
          .CandidateProfileWorkPlace.findAll({
            where: {
              candidateProfileId: {
                [Op.in]: [...options.candidateProfileIds],
              },
            },
          });

        const CandidateProfileWorkPlacesMap = CandidateProfileWorkPlaces
          .reduce<Record<Key, Result>>(
            (acc, cur) => {
              const key = cacheKeyFn({
                candidateProfileId: cur.candidateProfileId,
              });

              if (!acc[key]) {
                Object.assign(acc, { [key]: [] });
              }

              acc[key].push(cur);

              return acc;
            },
            {},
          );

        return args.map((arg) => {
          const key = cacheKeyFn(arg);

          return CandidateProfileWorkPlacesMap[key];
        });
      },
    );
  }
}
