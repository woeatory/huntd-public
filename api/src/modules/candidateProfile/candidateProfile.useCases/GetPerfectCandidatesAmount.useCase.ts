import { ValidationRules } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import { CandidateProfileRepository } from '@/modules/candidateProfile/candidateProfile.repository';
import {
  CandidateProfileSearchParams,
  PublicProfilesWhere,
} from '@/modules/candidateProfile/candidateProfile.typedefs';
import { CandidateProfileService } from '@/modules/candidateProfile/candidateProfile.service';

export type GetPerfectCandidatesAmountUseCaseOptions = {
  where?: CandidateProfileSearchParams;
}

export type GetPerfectCandidatesAmountUseCaseResult = number;

type Options = GetPerfectCandidatesAmountUseCaseOptions;
type Result = GetPerfectCandidatesAmountUseCaseResult;

export class GetPerfectCandidatesAmountUseCase extends AuthUseCase<
  Options, Result
> {
  private readonly candidateProfileService = this.makeService(
    CandidateProfileService,
  )

  private readonly candidateProfileRepository = this.makeRepository(
    CandidateProfileRepository,
  )

  protected get validation(): ValidationRules<Options> {
    return {
      where: [{
        nested_object: {
          cities: { list_of: ['string', 'required'] },
          countries: { list_of: ['string', 'required'] },
          specializations: { list_of: ['string', 'required', 'to_uc'] },
          salaryFrom: ['positive_integer'],
          salaryTo: ['positive_integer'],
          timezoneFrom: ['integer'],
          timezoneTo: ['integer'],
          timezoneReverseMode: { default: false },
          searchQuery: ['string', 'to_lc'],
          experienceIds: { list_of: ['positive_integer', 'required'] },
          englishLevelIds: { list_of: ['positive_integer', 'required'] },
          employmentTypesIds: { list_of: ['positive_integer', 'required'] },
          technologiesIds: { list_of: ['positive_integer', 'required'] },
        },
      }],
    };
  }

  protected async run(options: Options): Promise<Result> {
    let having = '';
    let whereObj: PublicProfilesWhere = {};

    const params = options.where
      ? await this.candidateProfileService
        .getPublicProfilesWhereClause(
          options.where, null,
        )
      : undefined;

    if (params) {
      having = params.having;
      whereObj = params.whereObj;
    }

    return this.candidateProfileRepository.findPerfectCandidatesAmount(
      whereObj,
      having,
    );
  }
}
