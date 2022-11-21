import DataLoader from 'dataloader';
import { Op } from 'sequelize';
import { Models } from '@/models';
import { JobExperience } from '@/models/JobExperience';

interface Args {
    id: number
  }
type Result = JobExperience[] | null;
type Key = string;

export class JobExperienceByIdLoader extends DataLoader<
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

        const JobExperiences = await models.JobExperience.findAll({
          where: {
            id: {
              [Op.in]: [...options.id],
            },
          },
        });

        const jobExperiencesMap = JobExperiences
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

          return jobExperiencesMap[key] || null;
        });
      },
    );
  }
}
