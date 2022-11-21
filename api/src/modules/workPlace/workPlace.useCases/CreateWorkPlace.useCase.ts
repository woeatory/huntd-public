import { ValidationRules } from '@mate-academy/core';
import { CandidateProfileWorkPlace } from '@/models/CandidateProfileWorkPlace';
import { AuthUseCase } from '@/core';
import { WorkPlaceService } from '@/modules/workPlace/workPlace.service';

export interface CreateWorkPlaceUseCaseOptions {
  candidateProfileId: number;
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
export type CreateWorkPlaceUseCaseResult = CandidateProfileWorkPlace;

type Options = CreateWorkPlaceUseCaseOptions;
type Result = CreateWorkPlaceUseCaseResult;

export class CreateWorkPlaceUseCase extends AuthUseCase<Options, Result> {
  private readonly workPlaceProfileService = this.makeService(
    WorkPlaceService,
  )

  protected get validation(): ValidationRules<Options> {
    return {
      candidateProfileId: ['required', 'positive_integer'],
      companyName: ['required', 'string'],
      companyUrl: ['string'],
      companySizeFrom: ['positive_integer'],
      companySizeTo: ['positive_integer'],
      companyIndustry: ['string'],
      companyCategories: ['string'],
      companySpecialities: ['string'],
      companyFundingType: ['string'],
      title: ['required', 'string'],
      description: ['string'],
      startDate: ['required', 'string'],
      endDate: ['string'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const {
      startDate, endDate, ...updateFields
    } = options;

    return this.workPlaceProfileService.addSingleWorkExperience({
      ...updateFields,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
    });
  }
}
