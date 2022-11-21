import { ValidationRules } from '@mate-academy/core';
import { CandidateProfileWorkPlace } from '@/models/CandidateProfileWorkPlace';
import { AuthUseCase } from '@/core';
import { WorkPlaceService } from '@/modules/workPlace/workPlace.service';

export interface UpdateWorkPlaceUseCaseOptions {
  id: number;
  companyName: string;
  companyUrl: string | null;
  companySizeFrom: number | null;
  companySizeTo: number | null;
  companyIndustry: string | null;
  companyCategories: string | null;
  companySpecialities: string | null;
  companyFundingType: string | null;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}
export type UpdateWorkPlaceUseCaseResult = CandidateProfileWorkPlace;

type Options = UpdateWorkPlaceUseCaseOptions;
type Result = UpdateWorkPlaceUseCaseResult;

export class UpdateWorkPlaceUseCase extends AuthUseCase<Options, Result> {
  private readonly workPlaceProfileService = this.makeService(
    WorkPlaceService,
  )

  protected get validation(): ValidationRules<Options> {
    return {
      id: ['required', 'positive_integer'],
      companyName: ['required', 'string'],
      companyUrl: ['string'],
      companySizeFrom: ['positive_integer'],
      companySizeTo: ['positive_integer'],
      companyIndustry: ['string'],
      companyCategories: ['string'],
      companySpecialities: ['string'],
      companyFundingType: ['string'],
      title: ['string'],
      description: ['string'],
      startDate: ['string'],
      endDate: ['string'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const {
      startDate, endDate, ...updateOptions
    } = options;

    return this.workPlaceProfileService.updateWorkExperience({
      ...updateOptions,
      endDate: endDate ? new Date(endDate) : undefined,
      startDate: startDate ? new Date(startDate) : undefined,
    });
  }
}
