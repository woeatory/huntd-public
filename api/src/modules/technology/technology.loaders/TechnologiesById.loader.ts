import DataLoader from 'dataloader';
import { Op } from 'sequelize';
import { Technology } from '@/models/Technology';
import { Models } from '@/models';

interface Args {
  id: number;
}

type Result = Technology[];
type Key = string;

export class TechnologiesByIdLoader extends DataLoader<
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

        const technologies = await models.Technology.findAll({
          where: {
            id: {
              [Op.in]: [...options.id],
            },
          },
        });

        const technologiesMap = technologies
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

          return technologiesMap[key];
        });
      },
    );
  }
}
