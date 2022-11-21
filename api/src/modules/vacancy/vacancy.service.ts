import { Op, WhereOptions } from 'sequelize';
import { Service } from '@/core/Service';
import { FindAllVacanciesOptions, VacancyRepository } from './vacancy.repository';
import { VacanciesOptions, VacancyStatusEnum } from './vacancy.typedefs';
import { WEB3_JOB_TITLE } from './vacancy.constants';

export class VacancyService extends Service {
  private readonly vacancyRepository = this.makeRepository(
    VacancyRepository,
  )

  getVacanciesWhereClause(
    options: VacanciesOptions,
  ): WhereOptions {
    const where: WhereOptions = {
      status: VacancyStatusEnum.Active,
    };

    const keywords = options?.keywords?.filter(
      (word) => word !== WEB3_JOB_TITLE,
    );

    if (options?.keywords?.length) {
      Object.assign(
        where,
        {
          jobTitle: {
            [Op.iLike]: `%${WEB3_JOB_TITLE}%`,
          },
        },
      );
    }

    if (keywords?.length) {
      Object.assign(
        where,
        {
          jobDescription: {
            [Op.iLike]: {
              [Op.any]: keywords.map((keyword) => `%${keyword}%`),
            },
          },
        },
      );
    }

    return where;
  }

  async getSalariesDataByCategory(options: VacanciesOptions) {
    const where = this.getVacanciesWhereClause(options);

    const vacanciesSalaryInfo = await this.vacancyRepository
      .findVacanciesSalaryInfo(where);

    const vacanciesWithSalaries = vacanciesSalaryInfo
      .filter((vacancy) => vacancy.salaryTo && vacancy.salaryFrom);
    const maxSalaries = vacanciesWithSalaries
      .map((vacancy) => +vacancy.salaryTo);
    const minSalaries = vacanciesWithSalaries
      .map((vacancy) => +vacancy.salaryFrom);

    if (!minSalaries.length || !maxSalaries.length) {
      return { maxSalary: 0, averageMinSalary: 0, averageSalary: 0 };
    }

    const maxSalary = Math.ceil(Math.max(...maxSalaries));
    const averageMinSalary = Math.ceil(minSalaries
      .reduce((sum, salary) => sum + salary, 0) / minSalaries.length);
    const averageSalary = Math.ceil(maxSalaries
      .reduce((sum, salary) => sum + salary, 0) / maxSalaries.length);

    return {
      maxSalary: maxSalary * 12,
      averageMinSalary: averageMinSalary * 12,
      averageSalary: averageSalary * 12,
    };
  }

  async findVacancies(options: FindAllVacanciesOptions) {
    const where = this.getVacanciesWhereClause(options.vacanciesOptions);

    return this.vacancyRepository.findAllVacancies(options, where);
  }
}
