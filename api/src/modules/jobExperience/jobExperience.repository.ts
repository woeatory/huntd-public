import { WhereAttributeHash, Op } from 'sequelize';
import { Repository } from '@/core/Repository';

export class JobExperienceRepository extends Repository {
  async findJobExperiences(where?: WhereAttributeHash) {
    return this.models.JobExperience.findAll({ where });
  }

  async findJobExperienceByPk(id: number) {
    return this.models.JobExperience.findByPk(id);
  }

  async findAscendingJobExperiences(id: number) {
    const passedLevel = await this.findJobExperienceByPk(id);

    const englishLevels = await this.findJobExperiences({
      order: {
        [Op.gte]: passedLevel?.order,
      },
    });

    return englishLevels;
  }
}
