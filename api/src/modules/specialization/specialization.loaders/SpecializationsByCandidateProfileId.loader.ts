import DataLoader from 'dataloader';
import { Op } from 'sequelize';
import { Specialization } from '@/models/Specialization';
import { Models } from '@/models';

interface Args {
  candidateProfileId: number
}

type Result = Specialization[];
type Key = string;

export class SpecializationsByCandidateProfileIdLoader extends DataLoader<
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

        const specializations = await models.CandidateProfileSpecialization
          .findAll({
            where: {
              candidateProfileId: {
                [Op.in]: [...options.candidateProfileIds],
              },
            },
            order: ['id'],
            include: [
              { model: models.Specialization },
            ],
          });

        const specializationsMap = specializations
          .reduce<Record<Key, Result>>(
            (acc, cur) => {
              const key = cacheKeyFn({
                candidateProfileId: cur.candidateProfileId,
              });

              if (!acc[key]) {
                Object.assign(acc, { [key]: [] });
              }

              acc[key].push(cur.specialization);

              return acc;
            },
            {},
          );

        return args.map((arg) => {
          const key = cacheKeyFn(arg);

          return specializationsMap[key];
        });
      },
    );
  }
}
