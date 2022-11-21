import { ValidationRules } from '@mate-academy/core';
import { CandidateProfileWorkPlace } from '@/models/CandidateProfileWorkPlace';
import { AuthUseCase } from '@/core';
import { WorkPlaceService } from '@/modules/workPlace/workPlace.service';

export interface FetchWorkPlacesUseCaseOptions {
  linkedinUrl: string;
  candidateProfileId: number;
  liveScrape: boolean;
}
export type FetchWorkPlacesUseCaseResult = CandidateProfileWorkPlace[];

type Options = FetchWorkPlacesUseCaseOptions;
type Result = FetchWorkPlacesUseCaseResult;

export class FetchWorkPlacesUseCase extends AuthUseCase<Options, Result> {
  private readonly workPlaceProfileService = this.makeService(
    WorkPlaceService,
  )

  protected get validation(): ValidationRules<Options> {
    return {
      linkedinUrl: ['required', 'string'],
      candidateProfileId: ['required', 'positive_integer'],
      liveScrape: [{ default: false }],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const { linkedinUrl, candidateProfileId, liveScrape } = options;

    return this.workPlaceProfileService.fetchLinkedinWorkExperience({
      linkedinUrl,
      candidateProfileId,
      liveScrape,
    });
  }
}
