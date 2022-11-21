import { ValidationRules } from '@mate-academy/core';
import { PrimaryProfileEnum } from '@/modules/user/user.typedefs';
import { CandidateProfileStatusEnum } from '@/modules/candidateProfile/candidateProfile.typedefs';
import { RecruiterProfileStatusEnum } from '@/modules/recruiterProfile/recruiterProfile.typedefs';
import { UseCase } from '@/core';
import { CandidateProfile } from '@/models/CandidateProfile';
import { RecruiterProfile } from '@/models/RecruiterProfile';

export interface GetPrimaryProfileUseCaseOptions {
  userId: number
}
export type GetPrimaryProfileUseCaseResult = PrimaryProfileEnum;

type Options = GetPrimaryProfileUseCaseOptions;
type Result = GetPrimaryProfileUseCaseResult;

export class GetPrimaryProfileUseCase extends UseCase<Options, Result> {
  candidateProfile: CandidateProfile | null;

  recruiterProfile: RecruiterProfile | null;

  protected get validation(): ValidationRules<Options> {
    return {
      userId: ['required', 'positive_integer'],
    };
  }

  private isRecruiter() {
    if (!this.recruiterProfile) {
      return false;
    }

    return this.recruiterProfile.status !== RecruiterProfileStatusEnum.Inactive;
  }

  private isCandidate() {
    if (!this.candidateProfile) {
      return false;
    }

    return this.candidateProfile.status !== CandidateProfileStatusEnum.Inactive;
  }

  protected async run(options: Options): Promise<Result> {
    await this.loadData(options);

    if (this.isCandidate()) {
      return PrimaryProfileEnum.Candidate;
    }

    if (this.isRecruiter()) {
      return PrimaryProfileEnum.Recruiter;
    }

    return PrimaryProfileEnum.NotDefined;
  }

  private async loadData(options: Options) {
    const [candidateProfile, recruiterProfile] = await Promise.all([
      this.dataLoaders.latestCandidateProfileByUserId.load({
        userId: options.userId,
      }),
      this.dataLoaders.latestRecruiterProfileByUserId.load({
        userId: options.userId,
      }),
    ]);

    this.candidateProfile = candidateProfile;
    this.recruiterProfile = recruiterProfile;
  }
}
