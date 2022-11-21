import { ClientError, ClientErrorLevels } from '@mate-academy/core';
import { Repository } from '@/core/Repository';
import {
  WorkPlaceFull, DeleteOptions, UpdateOptions, CreateOptions,
} from '@/modules/workPlace/workPlace.typedefs';
import { CandidateProfileWorkPlace } from '@/models/CandidateProfileWorkPlace';

type WorkPlace = Omit<WorkPlaceFull, 'id'>

export class WorkPlaceRepository extends Repository {
  async createWorkPlaces(
    workPlaces: WorkPlace[],
    candidateProfileId: number,
  ) {
    this.models.CandidateProfileWorkPlace.destroy({
      where: {
        candidateProfileId,
      },
    });

    return this.models.CandidateProfileWorkPlace
      .bulkCreate(workPlaces, { returning: true });
  }

  async createWorkPlace(experience: CreateOptions) {
    const [workPlace] = await this.models.CandidateProfileWorkPlace
      .findOrCreate({
        where: {
          candidateProfileId: experience.candidateProfileId,
          companyName: experience.companyName,
          title: experience.title,
        },
        defaults: experience,
      });

    return workPlace;
  }

  async deleteWorkPlace(options: DeleteOptions) {
    return this.models.CandidateProfileWorkPlace
      .destroy({
        where: {
          id: options.id,
        },
      });
  }

  async updateWorkPlace(options: UpdateOptions) {
    const {
      id, ...updateFields
    } = options;

    const [
      count,
      updatedWorkPlaces,
    ] = await this.models.CandidateProfileWorkPlace
      .update(
        updateFields,
        {
          where: { id },
          returning: true,
        },
      );

    if (count === 0) {
      throw new ClientError({
        level: ClientErrorLevels.Error,
        message: 'Can\'t update work place',
      });
    }

    return updatedWorkPlaces[0].get() as CandidateProfileWorkPlace;
  }
}
