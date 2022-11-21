import DataLoader from 'dataloader';
import { Op } from 'sequelize';
import { EmploymentType } from '@/models/EmploymentType';
import { Models } from '@/models';

interface Args {
  id: number;
}

type Result = EmploymentType[];
type Key = string;

export class EmploymentTypesByIdLoader extends DataLoader<
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

        const employmentTypes = await models.EmploymentType.findAll({
          where: {
            id: {
              [Op.in]: [...options.id],
            },
          },
        });

        const employmentTypesMap = employmentTypes
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

          return employmentTypesMap[key];
        });
      },
    );
  }
}
