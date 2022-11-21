import { ClientError, ClientErrorTypes, ValidationRules } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import {
  ATSUrlTypes,
  VacanciesSourceErrors,
} from '@/modules/vacanciesSource/vacanciesSource.typedefs';
import { VacanciesSource } from '@/models/VacanciesSource';
import { VacanciesSourcesRepository } from '@/modules/vacanciesSource/vacanciesSource.repository';
import { VacancySourceService } from '@/modules/vacanciesSource/vacanciesSource.service';
import { QueueEventTypes } from '@/core/queue';

export type CreateVacanciesSourceUseCaseOptions = {
  atsId: string;
  type: ATSUrlTypes;
};

export type CreateVacanciesSourceUseCaseResult = VacanciesSource | null;

type Options = CreateVacanciesSourceUseCaseOptions;
type Result = CreateVacanciesSourceUseCaseResult;

export class CreateVacanciesSourceUseCase extends AuthUseCase<
  Options, Result
> {
  private readonly vacanciesSourcesRepository = this.makeRepository(
    VacanciesSourcesRepository,
  )

  private readonly vacanciesSourceService = this.makeService(
    VacancySourceService,
  )

  protected get validation(): ValidationRules<Options> {
    return {
      atsId: ['required', 'string'],
      type: ['required', 'to_uc', { one_of: Object.values(ATSUrlTypes) }],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const url = this.vacanciesSourceService.getVacanciesSourceUrl(
      options.type,
      options.atsId,
    );

    const isUrlValid = await this.vacanciesSourceService.checkUrlValidity(url);

    if (!isUrlValid) {
      throw new ClientError({
        message: VacanciesSourceErrors.NotFound,
        type: ClientErrorTypes.NotFound,
        fields: options,
      });
    }

    let result = null;

    try {
      result = await this.vacanciesSourcesRepository.createVacanciesSource({
        userId: this.authUser.id,
        url,
      });

      await this.gateways.queue.add(
        {
          type: QueueEventTypes.GetSingleSourceVacancies,
          payload: {
            id: result.id,
            userId: this.authUser.id,
            url: result.url,
          },
        },
      );
    } catch (e) {
      throw new ClientError({
        message: VacanciesSourceErrors.BadInput,
        type: ClientErrorTypes.BadRequest,
        fields: options,
      });
    }

    return result;
  }
}
