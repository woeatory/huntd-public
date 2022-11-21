import { ValidationRules } from '@mate-academy/core';
import { CandidateProfile } from '@/models/CandidateProfile';
import { UseCase } from '@/core';
import { FEATURES } from '@/modules/feature/initFeatures';
import { CandidateProfileRepository } from '@/modules/candidateProfile/candidateProfile.repository';
import {
  CANDIDATE_PROFILES_QUERY_LIMIT,
} from '@/modules/candidateProfile/candidateProfile.constants';
import {
  CandidateProfileSearchParams,
  PublicProfilesWhere,
} from '@/modules/candidateProfile/candidateProfile.typedefs';
import { CandidateProfileService } from '@/modules/candidateProfile/candidateProfile.service';
import { RecruiterProfileRepository } from '@/modules/recruiterProfile/recruiterProfile.repository';
import { UserRepository } from '@/modules/user/user.repository';

export type GetPublicCandidateProfilesUseCaseOptions = {
  where?: CandidateProfileSearchParams;
  options: {
    offset?: number;
    username?: string;
    forceRealList?: boolean;
  }
}

export type GetPublicCandidateProfilesUseCaseResult = {
  rows: CandidateProfile[];
  hasMore: boolean;
  count: number;
};

type Options = GetPublicCandidateProfilesUseCaseOptions;
type Result = GetPublicCandidateProfilesUseCaseResult;

export class GetPublicCandidateProfilesUseCase extends UseCase<
  Options, Result
> {
  private readonly candidateProfileService = this.makeService(
    CandidateProfileService,
  )

  private readonly userRepository = this.makeRepository(
    UserRepository,
  )

  private readonly candidateProfileRepository = this.makeRepository(
    CandidateProfileRepository,
  )

  private readonly recruiterProfileRepository = this.makeRepository(
    RecruiterProfileRepository,
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
      options: [{
        nested_object: {
          offset: ['positive_integer'],
          username: ['string'],
          forceRealList: { default: false },
        },
      }],
    };
  }

  protected async run(options: Options): Promise<Result> {
    let limit;
    let offset;
    let having = '';
    let whereObj: PublicProfilesWhere = {};
    const { options: listOptions } = options;

    if (this.features.isEnabled(FEATURES.candidatesPagination)) {
      limit = CANDIDATE_PROFILES_QUERY_LIMIT;
      offset = listOptions?.offset;
    }

    let user;
    let candidateProfile;
    let recruiterProfile;

    if (this.authUser) {
      candidateProfile = await this.candidateProfileRepository
        .findLatestCandidateProfile({ userId: this.authUser?.id });

      recruiterProfile = await this.recruiterProfileRepository
        .findLatestRecruiterProfile({ userId: this.authUser?.id });
    }

    if (listOptions?.username) {
      user = await this.userRepository.findByUsername(listOptions.username);
    }

    const params = options.where
      ? await this.candidateProfileService
        .getPublicProfilesWhereClause(
          options.where, candidateProfile,
        )
      : undefined;

    if (params) {
      having = params.having;
      whereObj = params.whereObj;
    }

    const shouldLoadTopCandidates = ((
      !candidateProfile?.jobExperienceId && !recruiterProfile
    ) || !this.authUser) && !user && !listOptions.forceRealList;

    if (shouldLoadTopCandidates) {
      return this.candidateProfileRepository.findTopCandidateProfiles();
    }

    return this.candidateProfileRepository.findPublicCandidateProfiles({
      whereObj,
      having,
      limit,
      offset,
    });
  }
}
