import DataLoader from 'dataloader';
import { Op } from 'sequelize';
import { Models } from '@/models';
import { Specialization } from '@/graphql/generated';

interface Args {
  vacancyId: number
}

type Result = Specialization[];
type Key = string;

export class SpecializationByVacancyIdLoader extends DataLoader<
  Args, Result, Key
  > {
  constructor(models: Models) {
    const cacheKeyFn = (key: Args) => `${key.vacancyId}`;

    super(
      async (args) => {
        const options = args.reduce(
          (set, key) => {
            set.vacancyIds.add(key.vacancyId);

            return set;
          },

          { vacancyIds: new Set<number>() },
        );

        const Specializations = await models.VacancySpecialization
          .findAll({
            where: {
              vacancyId: {
                [Op.in]: [...options.vacancyIds],
              },
            },
            include: [
              { model: models.Specialization },
            ],
          });

        const SpecializationsMap = Specializations
          .reduce<Record<Key, Result>>(
            (acc, cur) => {
              const key = cacheKeyFn({
                vacancyId: cur.vacancyId,
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

          return SpecializationsMap[key];
        });
      },
    );
  }
}
