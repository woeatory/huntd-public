import DataLoader from 'dataloader';
import { Op } from 'sequelize';
import { EnglishLevel } from '@/models/EnglishLevel';
import { Models } from '@/models';

interface Args {
  id: number
}

type Result = EnglishLevel[];
type Key = string;

export class EnglishLevelByIdLoader extends DataLoader<
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

        const englishLevels = await models.EnglishLevel.findAll({
          where: {
            id: {
              [Op.in]: [...options.id],
            },
          },
        });

        const englishLevelsMap = englishLevels
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

          return englishLevelsMap[key] || null;
        });
      },
    );
  }
}
