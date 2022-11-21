import DataLoader from 'dataloader';
import { Op } from 'sequelize';
import { Specialization } from '@/models/Specialization';
import { Models } from '@/models';

interface Args {
    id: number
  }

type Result = Specialization | null;
type Key = string;

export class SpecializationByIdLoader extends DataLoader<
  Args, Result, Key
> {
  constructor(models: Models) {
    const cacheKeyFn = (key: Args) => `${key.id}`;

    super(
      async (args) => {
        const options = args.reduce(
          (set, key) => {
            set.id.add(key.id);

            return set;
          },

          { id: new Set<number>() },
        );

        const Specializations = await models.Specialization.findAll({
          where: {
            id: {
              [Op.in]: [...options.id],
            },
          },
        });

        const SpecializationsMap = Specializations
          .reduce<Record<Key, Result>>(
            (acc, cur) => {
              const key = cacheKeyFn(cur);

              Object.assign(acc, { [key]: cur });

              return acc;
            },
            {},
          );

        return args.map((arg) => {
          const key = cacheKeyFn(arg);

          return SpecializationsMap[key] || null;
        });
      },
    );
  }
}
