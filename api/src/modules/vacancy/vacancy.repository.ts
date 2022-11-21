import { Op, WhereOptions } from 'sequelize';
import { Repository } from '@/core/Repository';
import { Vacancy } from '@/models/Vacancy';
import {
  HOT_VACANCIES_COUNT,
  SourcedVacancy,
  VacanciesByCompanyOptions,
  VacanciesOptions,
  VacancyStatusEnum,
} from '@/modules/vacancy/vacancy.typedefs';
import { FEATURES } from '@/modules/feature/initFeatures';

type AddVacanciesLogoOptions = {
  companyNames: string[];
}

type CategorySalaryData = Pick<Vacancy, 'id' | 'salaryFrom' | 'salaryTo'>[]

export interface FindAllVacanciesOptions {
  vacanciesOptions: VacanciesOptions,
  offset?: number,
  limit?: number,
}

export class VacancyRepository extends Repository {
  async findVacanciesSalaryInfo(
    where: WhereOptions,
  ): Promise<CategorySalaryData> {
    return this.models.Vacancy.findAll({
      where,
      attributes: ['id', 'salaryFrom', 'salaryTo'],
      raw: true,
    });
  }

  async findAllVacancies(
    options: FindAllVacanciesOptions,
    where: WhereOptions,
  ) {
    const { limit, offset } = options;

    const vacancies = await this.models.Vacancy.findAll({
      limit: limit ? limit + 1 : limit,
      offset,
      raw: true,
      where,
      order: [
        ['isTop', 'DESC'],
        ['sourceId', 'DESC'],
        ['updatedAt', 'DESC'],
        ['id', 'DESC'],
      ],
    });

    let hasMore = ((limit || 0) + 1) === vacancies.length;

    if (!this.features.isEnabled(FEATURES.jobsPagination)) {
      hasMore = false;
    }

    const rows = hasMore
      ? vacancies.slice(0, -1)
      : vacancies;

    return {
      rows,
      hasMore,
    };
  }

  async findVacanciesByCompany(options: VacanciesByCompanyOptions) {
    const where: WhereOptions = {
      status: VacancyStatusEnum.Active,
    };

    const company = options.companyName.split('-').join(' ');

    if (company) {
      Object.assign(
        where,
        {
          companyName: {
            [Op.iLike]: `%${company}%`,
          },
        },
      );
    }

    return this.models.Vacancy.findAll({
      raw: true,
      where,
      order: [
        ['isTop', 'DESC'],
        ['sourceId', 'DESC'],
        ['updatedAt', 'DESC'],
        ['id', 'DESC'],
      ],
    });
  }

  async getCompanyLogoId(companyName: string) {
    const editedCompanyName = companyName.toLowerCase().split(' ').join('-');

    const logo = await this.models.UploadFile.findOne({
      where: {
        name: {
          [Op.iLike]: `%${editedCompanyName}-company-logo%`,
        },
      },
      attributes: ['id'],
    });

    return logo
      ? logo.getDataValue('id')
      : null;
  }

  async getVacanciesId(companyName: string) {
    const where: WhereOptions = {
      companyName: {
        [Op.iLike]: `%${companyName}%`,
      },
    };

    const vacancies = await this.models.Vacancy.findAll({
      where,
      attributes: ['id'],
    });

    return vacancies.map((vacancy) => vacancy.getDataValue('id'));
  }

  async addVacanciesLogo(options: AddVacanciesLogoOptions) {
    const companyNames = options?.companyNames as string[];

    const addLogos = await Promise.all(
      companyNames.map(async (name: string) => {
        const logoId = await this.getCompanyLogoId(name);

        let vacanciesIds: number[] = [];

        if (logoId) {
          vacanciesIds = await this.getVacanciesId(name);
        }

        if (vacanciesIds.length) {
          vacanciesIds.forEach(async (id) => {
            const values = {
              uploadFileId: logoId,
              relatedId: id,
              relatedType: 'vacancies',
              field: 'logo',
            };

            const foundItem = await this.models.UploadFileMorph.findOne({
              where: {
                relatedId: id,
                relatedType: 'vacancies',
                field: 'logo',
              },
            });

            if (foundItem) {
              return null;
            }

            return this.models.UploadFileMorph.create(
              values,
            );
          });
        }

        return null;
      }),
    );

    return addLogos.length;
  }

  async findHotVacancies() {
    return this.models.Vacancy.findAll({
      where: {
        status: VacancyStatusEnum.Active,
        isTop: true,
      },
      raw: true,
      limit: HOT_VACANCIES_COUNT,
      order: [
        ['updatedAt', 'DESC'],
      ],
    });
  }

  async createSourcedVacancies(vacancies: SourcedVacancy[]) {
    const createdVacancies = await this.models.Vacancy.bulkCreate(
      vacancies,
      {
        returning: true,
        updateOnDuplicate: ['updatedAt', 'jobTitle', 'jobDescription'],
      },
    );

    return createdVacancies.length;
  }

  async deleteOutdatedSourcedVacancies() {
    const date = new Date();

    date.setDate(date.getDate() - 1);

    const count = await this.models.Vacancy.destroy({
      where: {
        sourceId: {
          [Op.ne]: null,
        },
        deletedAt: null,
        updatedAt: {
          [Op.lt]: date,
        },
      },
    });

    return count;
  }
}
