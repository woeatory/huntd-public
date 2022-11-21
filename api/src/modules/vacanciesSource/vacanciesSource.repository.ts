import { Repository } from '@/core/Repository';

interface CreateVacanciesSourceOptions {
  url: string;
  userId: number;
}

export class VacanciesSourcesRepository extends Repository {
  async findAllVacanciesSources() {
    return this.models.VacanciesSource.findAll({
      raw: true,
      order: [
        ['createdAt', 'DESC'],
      ],
    });
  }

  async checkIfUserHasVacanciesSource(userId: number) {
    const result = !!(await this.models.VacanciesSource.findOne({
      raw: true,
      where: {
        userId,
      },
      attributes: ['id'],
    }));

    return result;
  }

  async createVacanciesSource({ url, userId }: CreateVacanciesSourceOptions) {
    return this.models.VacanciesSource.create({
      url,
      userId,
    });
  }
}
