import { ClientError } from '@mate-academy/core';
import { Op, WhereOptions } from 'sequelize';
import { CandidateProfile } from '@/models/CandidateProfile';
import { Service } from '@/core/Service';
import { CandidateProfileRepository } from '@/modules/candidateProfile/candidateProfile.repository';
import { CandidateProfileSearchParams, CandidateProfileStatusEnum, PublicProfilesWhere } from '@/modules/candidateProfile/candidateProfile.typedefs';
import { CandidateProfileErrors, SalaryRange, TimezoneRange } from '@/modules/candidateProfile/candidateProfile.constants';
import { CandidateProfileEntity } from '@/modules/candidateProfile/CandidateProfile.entity';
import { ProfileConnectionInitiatorEnum } from '@/modules/profileConnection/profileConnection.typedefs';
import { EnglishLevelRepository } from '@/modules/englishLevel/englishLevel.repository';
import { JobExperienceRepository } from '@/modules/jobExperience/jobExperience.repository';
import { CityTypes } from '@/modules/candidateProfileCity/candidateProfileCity.typedefs';
import { FEATURES } from '../feature/initFeatures';

export class CandidateProfileService extends Service {
  private readonly candidateProfileRepository = this.makeRepository(
    CandidateProfileRepository,
  )

  private readonly englishLevelRepository = this.makeRepository(
    EnglishLevelRepository,
  )

  private readonly experienceRepository = this.makeRepository(
    JobExperienceRepository,
  )

  async reportOfferStatus(options: {
    updateInitiator: ProfileConnectionInitiatorEnum,
    initiatorEmail: string,
    candidateProfileId: number,
    status: string,
    profileConnectionId: number,
  }) {
    const {
      updateInitiator,
      initiatorEmail,
      candidateProfileId,
      status,
      profileConnectionId,
    } = options;

    // TODO: add repository method for finding candidate profile
    const candidateProfile = await this.models.CandidateProfile.findByPk(
      candidateProfileId, {
        include: [
          {
            model: this.models.CandidateProfileSpecialization,
            include: [
              {
                attributes: ['name'],
                model: this.models.Specialization,
              },
            ],
          },
          { model: this.models.Specialization },
          { model: this.models.EnglishLevel },
          { model: this.models.User },
        ],
      },
    );

    const candidateSpecialization = (
      candidateProfile?.candidateProfileSpecializations?.map(
        (el) => el?.specialization?.name
      )
    );

    this.gateways.analytics.sendEvent({
      event: this.gateways.analytics.events.profileConnection
        .ReportOfferStatus,
      userEmail: initiatorEmail,
      data: {
        status,
        profileType: updateInitiator,
        profileConnectionId,
        candidateSpecialization,
        candidateEnglishLevel: candidateProfile?.englishLevel?.slug,
        candidateSalary: candidateProfile?.salary,
      },
    });
  }

  async sendProfileToReview(options: {
    userId: number
    firstName: string,
    lastName: string,
  }) {
    const profile = await this.candidateProfileRepository
      .getLatestCandidateProfile({ userId: options.userId });

    const latestActiveProfile = await this.candidateProfileRepository
      .findLatestActiveCandidateProfile({ userId: options.userId });

    const profileEntity = new CandidateProfileEntity(profile);

    if (
      ![CandidateProfileStatusEnum.Draft, CandidateProfileStatusEnum.Inactive]
        .includes(profile.status)
    ) {
      throw new ClientError({
        message: CandidateProfileErrors.ProfileInvalidStatus,
      });
    }

    if (!options.firstName && !options.lastName) {
      throw new ClientError({
        message: CandidateProfileErrors.CandidateProfileContactsNotFilled,
      });
    }

    if (latestActiveProfile && profile) {
      if (await profileEntity.areKeyFieldsEqual(latestActiveProfile)) {
        await this.candidateProfileRepository
          .deactivateCandidateProfilesByUserId({
            userId: options.userId,
            deactivationStatus: profile.status,
          });

        return this.candidateProfileRepository.updateProfile(
          profile.id, {
            status: CandidateProfileStatusEnum.Active,
          },
        );
      }
    }

    if (profile?.status === CandidateProfileStatusEnum.Inactive) {
      if (profileEntity.isLastProfileActive()) {
        return this.candidateProfileRepository.updateProfile(
          profile.id, {
            status: CandidateProfileStatusEnum.Active,
          },
        );
      }
    }

    return this.candidateProfileRepository.updateProfile(profile.id, {
      status: CandidateProfileStatusEnum.OnReview,
    });
  }

  async getCitiesClause(options: {
    cities: string[],
    countries: string[],
    timezoneReverseMode: boolean,
    timezoneFrom?: number,
    timezoneTo?: number,
  }) {
    const {
      cities, countries, timezoneReverseMode, timezoneTo, timezoneFrom,
    } = options;

    let citiesClause: WhereOptions | null = null;

    if (countries.length > 0) {
      citiesClause = {
        cityCountryName: {
          [Op.in]: [...countries],
        },
      };
    }

    if (cities.length > 0) {
      citiesClause = countries.length > 0
        ? {
          [Op.or]: [
            { cityName: { [Op.in]: [...cities] } },
            { cityCountryName: { [Op.in]: [...countries] } },
          ],
        }
        : { cityName: { [Op.in]: [...cities] } };
    }

    const timezoneFromValue = timezoneFrom || timezoneFrom === 0
      ? Number(timezoneFrom)
      : null;
    const timezoneToValue = timezoneTo || timezoneTo === 0
      ? Number(timezoneTo)
      : null;

    const timezoneMin = (
      !Number.isNaN(timezoneFromValue) && (
        timezoneFromValue !== null && timezoneFromValue >= TimezoneRange.Min
      ))
      ? timezoneFromValue * 60
      : null;

    const timezoneMax = (
      !Number.isNaN(timezoneToValue) && (
        timezoneToValue !== null && timezoneToValue <= TimezoneRange.Max
      ))
      ? timezoneToValue * 60
      : null;

    if (timezoneMin || timezoneMin === 0) {
      citiesClause = {
        type: CityTypes.Candidate,
        cityTimezone: {
          [Op.gte]: timezoneMin,
        },
      };
    }

    const betweenOperator = timezoneReverseMode ? Op.notBetween : Op.between;

    if (timezoneMax || timezoneMax === 0) {
      citiesClause = {
        type: CityTypes.Candidate,
        cityTimezone: timezoneMin || timezoneMin === 0
          ? {
            [betweenOperator]: [
              Number(timezoneMin),
              Number(timezoneMax),
            ].sort((a, b) => a - b),
          }
          : {
            [Op.lte]: timezoneMax,
          },
      };
    }

    return citiesClause;
  }

  getAscParams = (ids: number[]) => ({
    [Op.in]: ids,
  });

  getParamsByNames(names?: string[]) {
    return names
      ? {
        [Op.in]: [...names],
      } : null;
  }

  getParamsByIds(ids?: number[]) {
    return ids
      ? {
        [Op.in]: [...ids],
      } : null;
  }

  getSalaryClause(min?: number, max?: number) {
    let clause = null;

    const salaryFrom = (min && min > SalaryRange.Min)
      ? min
      : 0;

    const salaryTo = (max && max < SalaryRange.Max)
      ? max
      : 0;

    if (salaryFrom) {
      clause = {
        [Op.gte]: salaryFrom,
      };
    }

    if (salaryTo) {
      clause = salaryFrom
        ? {
          [Op.between]: [
            salaryFrom,
            salaryTo,
          ].sort((a, b) => a - b),
        } : {
          [Op.lte]: salaryTo,
        };
    }

    return clause;
  }

  async getPublicProfilesWhereClause(
    where: CandidateProfileSearchParams,
    candidateProfile?: CandidateProfile | null,
  ) {
    const citiesWhereClause = await this.getCitiesClause({
      cities: where?.cities ?? [],
      countries: where?.countries ?? [],
      timezoneReverseMode: where?.timezoneReverseMode,
      timezoneFrom: where?.timezoneFrom,
      timezoneTo: where?.timezoneTo,
    });

    const salaryWhereClause = this.getSalaryClause(
      where?.salaryFrom, where?.salaryTo,
    );

    const specializationWhereClause = this.getParamsByNames(
      where?.specializations,
    );

    const technologiesWhereClause = this.getParamsByIds(
      where?.technologiesIds,
    );

    let englishWhereClause = null;

    if (where?.englishLevelIds) {
      const ascendingLevels = await this.englishLevelRepository
        .findAscendingEnglishLevels(Math.min(...where.englishLevelIds));

      englishWhereClause = this.getAscParams(
        ascendingLevels.map((lvl) => lvl.id),
      );
    }

    let experienceWhereClause = null;

    if (where?.experienceIds) {
      const ascendingExperiences = await this.experienceRepository
        .findAscendingJobExperiences(Math.min(...where.experienceIds));

      experienceWhereClause = this.getAscParams(
        ascendingExperiences.map((exp) => exp.id),
      );
    }

    const employmentTypesWhereClause = this.getParamsByIds(
      where?.employmentTypesIds,
    );

    const whereObj: PublicProfilesWhere = {};
    let having = '';

    if (citiesWhereClause) {
      whereObj.candidateProfileCities = {
        ...citiesWhereClause,
      };
    }

    if (specializationWhereClause) {
      if (this.features.isEnabled(FEATURES.preferableRoles)) {
        whereObj['$candidateProfileSpecializations.specialization.name$'] = specializationWhereClause;
      } else {
        whereObj['$specialization.name$'] = specializationWhereClause;
      }
    }

    if (technologiesWhereClause) {
      whereObj['$candidateProfileTechnologies.technology_id$'] = technologiesWhereClause;
      having += `count(distinct "candidateProfileTechnologies"."id") = ${where?.technologiesIds?.length}`;
    }

    if (salaryWhereClause) {
      whereObj.salary = salaryWhereClause;
    }

    if (englishWhereClause) {
      whereObj.englishLevelId = englishWhereClause;
    }

    if (experienceWhereClause) {
      whereObj.jobExperienceId = experienceWhereClause;
    }

    if (candidateProfile && candidateProfile.jobExperienceId) {
      whereObj.jobExperienceId = {
        [Op.gte]: candidateProfile.jobExperienceId,
      };
    }

    if (employmentTypesWhereClause) {
      whereObj['$candidateProfileEmploymentTypes.employment_type_id$'] = employmentTypesWhereClause;
    }

    return { whereObj, having };
  }
}
