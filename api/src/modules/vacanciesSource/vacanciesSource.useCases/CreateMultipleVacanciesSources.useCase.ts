import { ClientError, ClientErrorTypes, ValidationRules } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import {
  ATSUrlTypes,
  VacanciesSourceErrors,
} from '@/modules/vacanciesSource/vacanciesSource.typedefs';
import { VacanciesSourcesRepository } from '@/modules/vacanciesSource/vacanciesSource.repository';
import { VacancySourceService } from '@/modules/vacanciesSource/vacanciesSource.service';
import { QueueEventTypes } from '@/core/queue';

export type CreateMultipleVacanciesSourcesUseCaseOptions = {
  options: {
    atsIds: string;
    companyNames: string;
    salaryRanges: string;
    type: ATSUrlTypes;
  }
};

export type CreateMultipleVacanciesSourcesUseCaseResult = number;

type Options = CreateMultipleVacanciesSourcesUseCaseOptions;
type Result = CreateMultipleVacanciesSourcesUseCaseResult;

export class CreateMultipleVacanciesSourcesUseCase extends AuthUseCase<
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
      options: [{
        nested_object: [{
          atsIds: ['required', 'string'],
          companyNames: ['required', 'string'],
          salaryRanges: ['required', 'string'],
          type: ['required', 'to_uc', { one_of: Object.values(ATSUrlTypes) }],
        }],
      }],
    };
  }

  protected getMappedValues(value: string) {
    return value.split(',').map((el: string) => el.trim());
  }

  protected async run({ options }: Options): Promise<Result> {
    const atsIdList = this.getMappedValues(options.atsIds);
    const companyNamesList = this.getMappedValues(options.companyNames);

    const salariesRangesList = this.getMappedValues(options.salaryRanges)
      .map((range: string) => {
        const salaryRange = range.split('-');

        return {
          from: Number(salaryRange[0]),
          to: Number(salaryRange[1]),
        };
      });

    const result = await Promise.allSettled(
      atsIdList.map(async (id: string, i: number) => {
        const companyName = companyNamesList[i];
        const salaryRange = salariesRangesList[i];

        const url = this.vacanciesSourceService.getVacanciesSourceUrl(
          options.type, id,
        );

        const isUrlValid = await this.vacanciesSourceService.checkUrlValidity(
          url,
        );

        if (!isUrlValid) {
          throw new ClientError({
            message: VacanciesSourceErrors.NotFound,
            type: ClientErrorTypes.NotFound,
            fields: options,
          });
        }

        let createdSource = null;

        try {
          createdSource = await this.vacanciesSourcesRepository
            .createVacanciesSource({
              userId: this.authUser.id,
              url,
            });

          await this.gateways.queue.add(
            {
              type: QueueEventTypes.GetSingleSourceVacancies,
              payload: {
                id: createdSource.id,
                userId: this.authUser.id,
                url: createdSource.url,
                companyName,
                salaryFrom: salaryRange.from,
                salaryTo: salaryRange.to,
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

        return createdSource;
      }),
    );

    return result.length;
  }
}
