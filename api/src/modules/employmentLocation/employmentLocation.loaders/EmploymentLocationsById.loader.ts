import DataLoader from 'dataloader';
import { Op } from 'sequelize';
import { EmploymentLocation } from '@/models/EmploymentLocation';
import { Models } from '@/models';

interface Args {
  id: number;
}

type Result = EmploymentLocation[];
type Key = string;

export class EmploymentLocationsByIdLoader extends DataLoader<
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

        const employmentLocations = await models.EmploymentLocation.findAll({
          where: {
            id: {
              [Op.in]: [...options.id],
            },
          },
        });

        const employmentLocationsMap = employmentLocations
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

          return employmentLocationsMap[key];
        });
      },
    );
  }
}
