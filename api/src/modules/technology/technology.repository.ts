import { Op, Sequelize } from 'sequelize';
import { Repository } from '@/core/Repository';
import { Where } from '@/modules/technology/technology.useCases/GetTechnologies.useCase';

interface Options {
  where: Where
  limit: number
  ids: number[]
}

interface CreateTechnologiesOption {
  name: string;
  creatorId: number;
}

export class TechnologyRepository extends Repository {
  async getTechnologies(options: Options) {
    const { where, limit, ids } = options;

    return this.models.Technology.findAll({
      where,
      attributes: [
        'id',
        'name',
        [Sequelize.literal(`(
          SELECT COALESCE(COUNT(*), 0)
          FROM candidate_profile_technologies cpt
          WHERE
            cpt.technology_id = "${this.models.Technology.name}".id
        )`), 'rating'],
        [Sequelize.literal(`(
          SELECT "${this.models.Technology.name}".id in (${ids.length ? ids.join(',') : 0})
        )`), 'required'],
      ],
      include: [
        {
          model: this.models.CandidateProfileTechnology,
          attributes: [],
        },
      ],
      order: [
        [Sequelize.literal('required'), 'DESC'],
        [Sequelize.literal('rating'), 'DESC'],
      ],
      limit,
    });
  }

  async createTechnologies(technologies: CreateTechnologiesOption[]) {
    const createdTechnologies = await this.models.Technology.bulkCreate(
      technologies,
      {
        returning: true,
        updateOnDuplicate: ['updatedAt'],
      },
    );

    return createdTechnologies;
  }

  async getTechnologiesByNames(names: string[]) {
    return this.models.Technology.findAll({
      where: {
        name: {
          [Op.in]: names,
        },
      },
    });
  }
}
