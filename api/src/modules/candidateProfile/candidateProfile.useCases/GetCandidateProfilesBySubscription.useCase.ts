import { ValidationRules } from '@mate-academy/core';
import { CandidateProfile } from '@/models/CandidateProfile';
import { UseCase } from '@/core';
import { CandidateProfileSearchParams } from '@/modules/candidateProfile/candidateProfile.typedefs';
import { CandidateProfileService } from '@/modules/candidateProfile/candidateProfile.service';
import { CandidateProfileRepository } from '@/modules/candidateProfile/candidateProfile.repository';

export type GetCandidateProfilesBySubscriptionUseCaseOptions = {
  subscriptionLastInteract: Date;
  where: CandidateProfileSearchParams;
}
export type GetCandidateProfilesBySubscriptionUseCaseResult =
  CandidateProfile[];

type Options = GetCandidateProfilesBySubscriptionUseCaseOptions;
type Result = GetCandidateProfilesBySubscriptionUseCaseResult;

export class GetCandidateProfilesBySubscriptionUseCase extends UseCase<
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
      subscriptionLastInteract: ['required'],
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

  protected async run({
    where, subscriptionLastInteract,
  }: Options): Promise<Result> {
    const params = await this.candidateProfileService
      .getPublicProfilesWhereClause(
        where, null,
      );

    const { whereObj, having } = params;

    return this.candidateProfileRepository.findCandidatesBySubscription({
      whereObj,
      having,
      subscriptionLastInteract,
    });
  }
}
