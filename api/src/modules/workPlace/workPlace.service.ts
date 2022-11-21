/* eslint-disable camelcase */
import fetch from 'node-fetch';
import { ClientError, ClientErrorTypes } from '@mate-academy/core';
import { Service } from '@/core/Service';
import { WorkPlaceRepository } from '@/modules/workPlace/workPlace.repository';
import { LinkedinErrors } from '@/modules/workPlace/workPlace.constants';
import {
  CreateOptions, DeleteOptions, UpdateOptions,
} from '@/modules/workPlace/workPlace.typedefs';
import { FEATURES } from '../feature/initFeatures';

type Datetime = {
  day: number;
  month: number;
  year: number;
}

export interface ExperienceResponse {
  company: string;
  company_linkedin_profile_url: string;
  title: string;
  description: string;
  starts_at: Datetime;
  ends_at: Datetime;
  candidateProfileId: number;
}

export interface CompanyResponse {
  company_size: (number | null)[],
  industry: string,
  categories: string[] | null,
  specialities: string[] | null,
  funding_data: {
    funding_type: string,
  }[] | null,
}

export interface CompanyInfo {
  companySizeFrom: number | null,
  companySizeTo: number | null,
  companyIndustry: string | null,
  companyCategories: string | null,
  companySpecialities: string | null,
  companyFundingType: string | null,
}

export interface Experience {
  companyName: string,
  companyUrl: string,
  title: string,
  description: string | null,
  startDate: Date,
  endDate: Date | null,
  candidateProfileId: number,
}

interface ProfileInfo {
  experiences: ExperienceResponse[];
}

export class WorkPlaceService extends Service {
  private readonly workPlaceRepository = this.makeRepository(
    WorkPlaceRepository,
  )

  async getMappedWorkPlaces(
    experiences: ExperienceResponse[],
    candidateProfileId: number,
  ) {
    return experiences
      .filter((experience) => !!experience.starts_at)
      .map((experience) => {
        const startDate = new Date(
          experience.starts_at.year,
          experience.starts_at.month - 1,
          experience.starts_at.day,
        );

        let endDate: Date | undefined;

        if (experience.ends_at) {
          endDate = new Date(
            experience.ends_at.year,
            experience.ends_at.month - 1,
            experience.ends_at.day,
          );
        }

        return ({
          companyName: experience.company.trim(),
          companyUrl: experience.company_linkedin_profile_url,
          title: experience.title.trim(),
          description: experience.description
            ? experience.description.trim()
            : null,
          startDate,
          endDate: endDate && (endDate > startDate)
            ? endDate
            : null,
          candidateProfileId,
        });
      });
  }

  async getMappedCompanyInfo(company: CompanyResponse | null) {
    if (!company) {
      return {
        companySizeFrom: null,
        companySizeTo: null,
        companyIndustry: null,
        companyCategories: null,
        companySpecialities: null,
        companyFundingType: null,
      };
    }

    return {
      companySizeFrom: company.company_size
        ? company.company_size[0]
        : null,
      companySizeTo: company.company_size
        ? company.company_size[1]
        : null,
      companyIndustry: company.industry ?? null,
      companyCategories: company.categories?.join(',') ?? null,
      companySpecialities: company.specialities?.join(',') ?? null,
      companyFundingType: company.funding_data
        ? company.funding_data[company.funding_data.length - 1].funding_type
        : null,
    };
  }

  async getMergedWorkPlace(
    experiences: Omit<Experience, 'id'>[],
    companyInfoList?: CompanyInfo[],
  ) {
    if (!companyInfoList) {
      return experiences.map((experience) => ({
        ...experience,
        companySizeFrom: null,
        companySizeTo: null,
        companyIndustry: null,
        companyCategories: null,
        companySpecialities: null,
        companyFundingType: null,
      }));
    }

    return experiences.map((experience, i: number) => ({
      ...experience,
      ...companyInfoList[i],
    }));
  }

  async getCompanyInfo(companyUrl: string | null) {
    if (!companyUrl) {
      return this.getMappedCompanyInfo(null);
    }

    const companyInfoResponse = await fetch(
      `${process.env.PROXYCURL_API_COMPANIES_ENDPOINT}?url=${companyUrl}`, {
        headers: {
          Authorization: `Bearer ${process.env.PROXYCURL_API_KEY}`,
        },
      },
    );

    const companyProfileInfo = await companyInfoResponse.json();

    const companyInfo = await this.getMappedCompanyInfo(companyProfileInfo);

    return companyInfo;
  }

  async fetchLinkedinWorkExperience(options: {
    linkedinUrl: string,
    candidateProfileId: number,
    liveScrape: boolean,
  }) {
    const { linkedinUrl, candidateProfileId, liveScrape } = options;

    const liveScrapeParam = liveScrape ? '&_live_scrape=force' : '';

    try {
      const linkedinProfileInfoResponse = await fetch(
        `${process.env.PROXYCURL_API_ENDPOINT}?url=${linkedinUrl}${liveScrapeParam}`, {
          headers: {
            Authorization: `Bearer ${process.env.PROXYCURL_API_KEY}`,
          },
        },
      );

      const profileInfo: ProfileInfo = await linkedinProfileInfoResponse.json();

      const experiences = await this.getMappedWorkPlaces(
        profileInfo.experiences,
        candidateProfileId,
      );

      let companiesInfo;

      if (this.features.isEnabled(FEATURES.companyInfo)) {
        companiesInfo = await Promise.all(
          experiences.map((place) => this.getCompanyInfo(place.companyUrl)),
        );
      }

      const workPlaces = await this.getMergedWorkPlace(
        experiences, companiesInfo,
      );

      return this.workPlaceRepository.createWorkPlaces(
        workPlaces, candidateProfileId,
      );
    } catch (error) {
      throw new ClientError({
        error,
        message: LinkedinErrors.ProfileNotFound,
        type: ClientErrorTypes.BadRequest,
      });
    }
  }

  async addSingleWorkExperience(options: CreateOptions) {
    try {
      return this.workPlaceRepository.createWorkPlace(
        options,
      );
    } catch (error) {
      throw new ClientError({
        error,
        message: LinkedinErrors.CannotCreateWorkPlace,
        type: ClientErrorTypes.BadRequest,
      });
    }
  }

  async deleteWorkExperience(options: DeleteOptions) {
    try {
      return this.workPlaceRepository.deleteWorkPlace(
        options,
      );
    } catch (error) {
      throw new ClientError({
        error,
        message: LinkedinErrors.CannotFindWorkPlace,
        type: ClientErrorTypes.BadRequest,
      });
    }
  }

  async updateWorkExperience(options: UpdateOptions) {
    try {
      return this.workPlaceRepository
        .updateWorkPlace(options);
    } catch (error) {
      throw new ClientError({
        error,
        message: LinkedinErrors.CannotUpdateWorkPlace,
        type: ClientErrorTypes.BadRequest,
      });
    }
  }
}
