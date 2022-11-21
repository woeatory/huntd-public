import { ValidationRules } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import { UsersSearchSubscription } from '@/models/UsersSearchSubscription';
import { CandidateProfileSearchParams } from '@/modules/candidateProfile/candidateProfile.typedefs';

export interface SubscribeToCandidatesSearchUseCaseOptions {
  searchParams: CandidateProfileSearchParams;
  title: string;
  userId?: number;
}
export type SubscribeToCandidatesSearchUseCaseResult = UsersSearchSubscription;

type Options = SubscribeToCandidatesSearchUseCaseOptions;
type Result = SubscribeToCandidatesSearchUseCaseResult;

export class SubscribeToCandidatesSearchUseCase extends AuthUseCase<
  Options, Result
> {
  protected get validation(): ValidationRules<Options> {
    return {
      title: ['string', 'required'],
      userId: ['positive_integer'],
      searchParams: [{
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
    const { title, searchParams, userId } = options;

    return this.models.UsersSearchSubscription.create({
      title,
      searchParams,
      userId: userId ?? this.authUser.id,
    });
  }
}
