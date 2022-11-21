import { WhereAttributeHash, Op } from 'sequelize';
import { Repository } from '@/core/Repository';

export class EnglishLevelRepository extends Repository {
  async findEnglishLevels(where?: WhereAttributeHash) {
    return this.models.EnglishLevel.findAll({ where });
  }

  async findEnglishLevelByPk(id: number) {
    return this.models.EnglishLevel.findByPk(id);
  }

  async findAscendingEnglishLevels(id: number) {
    const passedLevel = await this.findEnglishLevelByPk(id);

    const englishLevels = await this.findEnglishLevels({
      order: {
        [Op.gte]: passedLevel?.order,
      },
    });

    return englishLevels;
  }
}
