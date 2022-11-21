import { ValidationRules } from '@mate-academy/core';
import { Op } from 'sequelize';
import { CandidateProfile } from '@/models/CandidateProfile';
import { AuthUseCase } from '@/core';
import { CandidateProfileCityInput } from '@/modules/candidateProfileCity/candidateProfileCity.typedefs';
import { CandidateProfileStatusEnum } from '@/modules/candidateProfile/candidateProfile.typedefs';
import { CandidateProfileEntity } from '@/modules/candidateProfile/CandidateProfile.entity';
import { CandidateProfileRepository } from '@/modules/candidateProfile/candidateProfile.repository';
import { FEATURES } from '@/modules/feature/initFeatures';
import { AdminSettingsRepository } from '@/modules/adminSettings/adminSettings.repository';
import { AdminSettings } from '@/models/AdminSettings';
import { WorkPlaceFull } from '@/modules/workPlace/workPlace.typedefs';

export interface UpdateCandidateProfileUseCaseOptions {
  position?: string;
  salary?: string;
  candidateDescription?: string;
  experienceDescription?: string;
  workExpectations?: string;
  achievements?: string;
  technologiesIds?: number[];
  jobExperienceId?: number;
  employmentLocationsIds?: number[];
  englishLevelId?: number;
  specializationId?: number;
  specializationsIds?: number[];
  cities?: CandidateProfileCityInput[];
  workPlaces?: WorkPlaceFull[];
}
export type UpdateCandidateProfileUseCaseResult = CandidateProfile;

type Options = UpdateCandidateProfileUseCaseOptions;
type Result = UpdateCandidateProfileUseCaseResult;

export class UpdateCandidateProfileUseCase extends AuthUseCase<
  Options, Result
> {
  private readonly adminSettingsRepository = this.makeRepository(
    AdminSettingsRepository,
  )

  protected adminSettings: AdminSettings | null = null;

  private readonly candidateProfileRepository = this.makeRepository(
    CandidateProfileRepository,
  )

  protected get validation(): ValidationRules<Options> {
    return {
      position: ['string'],
      salary: ['positive_decimal'],
      candidateDescription: ['string'],
      experienceDescription: ['string'],
      workExpectations: ['string'],
      achievements: ['string'],
      technologiesIds: [{ list_of: 'positive_integer' }],
      jobExperienceId: ['positive_integer'],
      employmentLocationsIds: [{ list_of: 'positive_integer' }],
      englishLevelId: ['positive_integer'],
      specializationId: ['positive_integer'],
      specializationsIds: [{ list_of: 'positive_integer' }],
      cities: [{ list_of: 'not_empty' }],
      workPlaces: [{ list_of: 'not_empty' }],
    };
  }

  private async createProfile(currentProfile?: CandidateProfile) {
    const newProfile = await this.models.CandidateProfile.create({
      userId: this.authUser.id,
      status: CandidateProfileStatusEnum.Draft,
    });

    await this.candidateProfileRepository.createFulltimeEmploymentType(
      newProfile,
    );

    if (currentProfile) {
      const profileEntity = new CandidateProfileEntity(newProfile);

      await profileEntity.copyProfileDataFrom(currentProfile);
    }

    return newProfile;
  }

  private async resolveProfile() {
    const latestProfile = await this.dataLoaders.latestCandidateProfileByUserId
      .load({ userId: this.authUser.id });

    const adminSettings = await this.adminSettingsRepository.findByUserId(
      this?.adminUser?.id ?? 0,
    );

    this.adminSettings = adminSettings;

    if (!latestProfile) {
      return this.createProfile();
    }

    if (this.adminSettings?.silentProfileUpdate) {
      return latestProfile;
    }

    switch (latestProfile.status) {
      case CandidateProfileStatusEnum.Draft: {
        return latestProfile;
      }

      case CandidateProfileStatusEnum.OnReview: {
        await latestProfile.update({
          status: CandidateProfileStatusEnum.Inactive,
        });

        return this.createProfile(latestProfile);
      }

      default: {
        return this.createProfile(latestProfile);
      }
    }
  }

  private static async updateProfileSlug(profile: CandidateProfile) {
    const candidateProfileEntity = new CandidateProfileEntity(profile);

    await candidateProfileEntity.generateSlug();
  }

  private async updateProfileTechnologies(
    profile: CandidateProfile,
    technologiesIds: number[],
  ) {
    const profileTechnologies = await this.models.CandidateProfileTechnology
      .findAll({
        where: {
          candidateProfileId: profile.id,
        },
      });

    const technologiesIdsMap = technologiesIds.reduce<Record<number, boolean>>(
      (acc, cur) => {
        Object.assign(acc, { [cur]: true });

        return acc;
      },
      {},
    );

    const profileTechnologiesIdsMap = profileTechnologies
      .reduce<Record<number, boolean>>(
        (acc, cur) => {
          Object.assign(acc, { [cur.technologyId]: true });

          return acc;
        },
        {},
      );

    const deleteIds = profileTechnologies
      .filter((el) => !technologiesIdsMap[el.technologyId])
      .map((el) => el.id);

    const createIds = technologiesIds
      .filter((el) => !profileTechnologiesIdsMap[el]);

    await Promise.all([
      this.models.CandidateProfileTechnology.destroy({
        where: {
          id: {
            [Op.in]: deleteIds,
          },
        },
      }),
      this.models.CandidateProfileTechnology.bulkCreate(
        createIds.map((technologyId) => ({
          candidateProfileId: profile.id,
          technologyId,
        })),
      ),
    ]);
  }

  private async updateProfileSpecializations(
    profile: CandidateProfile,
    specializationsIds: number[],
  ) {
    const profileSpecializations = await this
      .models.CandidateProfileSpecialization.findAll({
        where: {
          candidateProfileId: profile.id,
        },
      });

    const specializationsIdsMap = specializationsIds.reduce<
      Set<number>
    >(
      (acc, cur) => {
        acc.add(cur);

        return acc;
      },
      new Set(),
    );

    const profileSpecializationsIdsMap = profileSpecializations
      .reduce<Set<number>>(
        (acc, cur) => {
          acc.add(cur.specializationId);

          return acc;
        },
        new Set(),
      );

    const deleteIds = profileSpecializations
      .filter((el) => !specializationsIdsMap.has(el.specializationId))
      .map((el) => el.id);

    const createIds = specializationsIds
      .filter((el) => !profileSpecializationsIdsMap.has(el));

    await Promise.all([
      this.models.CandidateProfileSpecialization.destroy({
        where: {
          id: {
            [Op.in]: deleteIds,
          },
        },
      }),
      this.models.CandidateProfileSpecialization.bulkCreate(
        createIds.map((specializationId) => ({
          candidateProfileId: profile.id,
          specializationId,
        })),
      ),
    ]);
  }

  private async updateProfileCities(
    profile: CandidateProfile,
    cities: CandidateProfileCityInput[],
  ) {
    const profileCities = await this.models.CandidateProfileCity
      .findAll({
        where: {
          candidateProfileId: profile.id,
        },
      });

    const citiesIdsMap = cities.reduce<Record<string, boolean>>(
      (acc, cur) => {
        Object.assign(acc, { [cur.cityId + cur.type]: true });

        return acc;
      },
      {},
    );

    const profileCitiesIdsMap = profileCities
      .reduce<Record<string, boolean>>(
        (acc, cur) => {
          Object.assign(acc, { [cur.cityId + cur.type]: true });

          return acc;
        },
        {},
      );

    const deleteIds = profileCities
      .filter((el) => !citiesIdsMap[el.cityId + el.type])
      .map((el) => el.id);

    const citiesToCreate = cities
      .filter((el) => !profileCitiesIdsMap[el.cityId + el.type]);

    await Promise.all([
      this.models.CandidateProfileCity.destroy({
        where: {
          id: {
            [Op.in]: deleteIds,
          },
        },
      }),
      this.models.CandidateProfileCity.bulkCreate(
        citiesToCreate.map((city) => ({
          candidateProfileId: profile.id,
          cityId: city.cityId,
          cityName: city.cityName,
          cityTimezone: city.cityTimezone,
          cityCountrySlug: city.cityCountrySlug,
          cityCountryName: city.cityCountryName,
          type: city.type,
        })),
      ),
    ]);
  }

  private async updateProfileEmploymentLocations(
    profile: CandidateProfile,
    employmentLocationsIds: number[],
  ) {
    const profileEmploymentLocations = await this.models
      .CandidateProfileEmploymentLocation.findAll({
        where: {
          candidateProfileId: profile.id,
        },
      });

    const employmentLocationsIdsMap = employmentLocationsIds
      .reduce<Record<number, boolean>>(
        (acc, cur) => {
          Object.assign(acc, { [cur]: true });

          return acc;
        },
        {},
      );

    const profileEmploymentLocationsIdsMap = profileEmploymentLocations
      .reduce<Record<number, boolean>>(
        (acc, cur) => {
          Object.assign(acc, { [cur.employmentLocationId]: true });

          return acc;
        },
        {},
      );

    const deleteIds = profileEmploymentLocations
      .filter((el) => !employmentLocationsIdsMap[el.employmentLocationId])
      .map((el) => el.id);

    const createIds = employmentLocationsIds
      .filter((el) => !profileEmploymentLocationsIdsMap[el]);

    await Promise.all([
      this.models.CandidateProfileEmploymentLocation.destroy({
        where: {
          id: {
            [Op.in]: deleteIds,
          },
        },
      }),
      this.models.CandidateProfileEmploymentLocation.bulkCreate(
        createIds.map((employmentLocationId) => ({
          candidateProfileId: profile.id,
          employmentLocationId,
        })),
      ),
    ]);
  }

  private async updateProfileWorkPlaces(
    profile: CandidateProfile,
    workPlaces: WorkPlaceFull[],
  ) {
    const profileWorkPlaces = await this.models.CandidateProfileWorkPlace
      .findAll({
        where: {
          candidateProfileId: profile.id,
        },
      });

    const workPlacesIdsSet = workPlaces.reduce<
      Set<number>
    >(
      (acc, cur) => {
        acc.add(cur.id);

        return acc;
      },
      new Set(),
    );

    const profileWorkPlacesIdsSet = profileWorkPlaces
      .reduce<Set<number>>(
        (acc, cur) => {
          acc.add(cur.id);

          return acc;
        },
        new Set(),
      );

    const deleteIds = profileWorkPlaces
      .filter((el) => !workPlacesIdsSet.has(el.id))
      .map((el) => el.id);

    const workPlacesToCreate = workPlaces
      .filter((el) => !profileWorkPlacesIdsSet.has(el.id));

    await Promise.all([
      this.models.CandidateProfileWorkPlace.destroy({
        where: {
          id: {
            [Op.in]: deleteIds,
          },
        },
      }),
      this.models.CandidateProfileWorkPlace.bulkCreate(
        workPlacesToCreate.map((workPlace) => ({
          candidateProfileId: profile.id,
          companyName: workPlace.companyName,
          companyUrl: workPlace.companyUrl,
          companySizeFrom: workPlace.companySizeFrom,
          companySizeTo: workPlace.companySizeTo,
          companyIndustry: workPlace.companyIndustry,
          companyCategories: workPlace.companyCategories,
          companySpecialities: workPlace.companySpecialities,
          companyFundingType: workPlace.companyFundingType,
          title: workPlace.title,
          description: workPlace.description,
          startDate: workPlace.startDate,
          endDate: workPlace.endDate,
        })),
      ),
    ]);
  }

  protected async run(options: Options): Promise<Result> {
    const {
      position,
      salary,
      candidateDescription,
      experienceDescription,
      workExpectations,
      achievements,
      technologiesIds,
      jobExperienceId,
      englishLevelId,
      specializationId,
      cities,
      employmentLocationsIds,
      specializationsIds,
      workPlaces,
    } = options;

    const profile = await this.resolveProfile();

    await profile.update({
      position,
      salary,
      candidateDescription,
      experienceDescription,
      workExpectations,
      achievements,
      jobExperienceId,
      englishLevelId,
      specializationId,
    }, {
      silent: !!(this.adminSettings?.silentProfileUpdate),
    });

    if (technologiesIds) {
      await this.updateProfileTechnologies(profile, technologiesIds);
    }

    if (
      this.features.isEnabled(FEATURES.preferableRoles)
      && specializationsIds
    ) {
      await this.updateProfileSpecializations(profile, specializationsIds);
    }

    if (cities) {
      await this.updateProfileCities(profile, cities);
    }

    if (employmentLocationsIds) {
      await this.updateProfileEmploymentLocations(
        profile, employmentLocationsIds,
      );
    }

    if (position) {
      await UpdateCandidateProfileUseCase.updateProfileSlug(profile);
    }

    if (workPlaces) {
      await this.updateProfileWorkPlaces(profile, workPlaces);
    }

    return profile;
  }
}
