import crypto from 'crypto';
import slugify from 'slugify';
import { ClientError } from '@mate-academy/core';
import { CandidateProfile } from '@/models/CandidateProfile';
import { CandidateProfileTechnology } from '@/models/CandidateProfileTechnology';
import { CandidateProfileEmploymentLocation } from '@/models/CandidateProfileEmploymentLocation';
import { CandidateProfileCity } from '@/models/CandidateProfileCity';
import { CandidateProfileWorkPlace } from '@/models/CandidateProfileWorkPlace';
import { CandidateProfileStatusEnum } from '@/modules/candidateProfile/candidateProfile.typedefs';
import { CandidateProfileSpecialization } from '@/models/CandidateProfileSpecialization';

export class CandidateProfileEntity {
  constructor(private candidateProfile: CandidateProfile) {}

  async resolveSlug() {
    if (this.candidateProfile.slug) {
      return this.candidateProfile.slug;
    }

    if (!this.candidateProfile.position) {
      return null;
    }

    return this.generateSlug();
  }

  async generateSlug(counter = 0): Promise<string | null> {
    const slug = slugify(this.candidateProfile.position, {
      lower: true,
      remove: /[*+~.,/()'"!:@]/g,
    });

    const hash = crypto
      .createHash('md5')
      .update(`${slug}-${this.candidateProfile.id}`)
      .digest('hex')
      .slice(5, 10);

    const slugWithHash = `${slug}-${hash}`;

    try {
      await this.candidateProfile.update({
        slug: slugWithHash,
      }, {
        silent: true,
      });

      return this.candidateProfile.slug;
    } catch (error) {
      if (counter >= 5) {
        throw new ClientError({
          message: `Failed to generate candidate profile slug, ${error.message}`,
          fields: {
            slug: slugWithHash,
            id: this.candidateProfile.id,
          },
        });
      }

      return this.generateSlug(counter + 1);
    }
  }

  async areKeyFieldsEqual(
    pastProfile: CandidateProfile,
  ) {
    const currentProfile = this.candidateProfile;

    const sortedWorkPlaces = [...currentProfile.candidateProfileWorkPlaces]
      .sort((a, b) => a.id - b.id);

    let areWorkPlacesEqual;

    if (!pastProfile?.candidateProfileWorkPlaces?.length
      || !currentProfile.candidateProfileWorkPlaces?.length) {
      areWorkPlacesEqual = false;
    } else if (
      pastProfile?.candidateProfileWorkPlaces?.length
      !== currentProfile.candidateProfileWorkPlaces?.length
    ) {
      areWorkPlacesEqual = false;
    } else {
      const past = pastProfile.candidateProfileWorkPlaces.map(
        (el) => ({
          companyName: el.companyName,
          title: el.title,
          description: el.description,
        }),
      );
      const current = sortedWorkPlaces.map(
        (el) => ({
          companyName: el.companyName,
          title: el.title,
          description: el.description,
        }),
      );

      areWorkPlacesEqual = (JSON.stringify(current) === JSON.stringify(past));
    }

    return (
      [
        [pastProfile.position, currentProfile.position],
        [pastProfile.workExpectations, currentProfile.workExpectations],
        [pastProfile.experienceDescription,
          currentProfile.experienceDescription],
        [pastProfile.achievements, currentProfile.achievements],
      ]
        .every(([prevValue, currentValue]) => prevValue === currentValue)
      && areWorkPlacesEqual
    );
  }

  isLastProfileActive() {
    return this.candidateProfile
      .deactivationStatus === CandidateProfileStatusEnum.Active;
  }

  async copyBaseFieldsFrom(profile: CandidateProfile) {
    await this.candidateProfile.update({
      englishLevelId: profile.englishLevelId,
      jobExperienceId: profile.jobExperienceId,
      specializationId: profile.specializationId,
      position: profile.position,
      salary: profile.salary,
      candidateDescription: profile.candidateDescription,
      experienceDescription: profile.experienceDescription,
      workExpectations: profile.workExpectations,
      achievements: profile.achievements,
    });
  }

  async copyTechnologiesFrom(profile: CandidateProfile) {
    const profileTechnologies = await profile.$get('candidateProfileTechnologies');

    await CandidateProfileTechnology.bulkCreate(
      profileTechnologies.map((profileTechnology) => ({
        candidateProfileId: this.candidateProfile.id,
        technologyId: profileTechnology.technologyId,
      })),
    );
  }

  async copySpecializationsFrom(profile: CandidateProfile) {
    const profileSpecializations = await profile.$get('candidateProfileSpecializations');

    await CandidateProfileSpecialization.bulkCreate(
      profileSpecializations.map((profileSpecialization) => ({
        candidateProfileId: this.candidateProfile.id,
        specializationId: profileSpecialization.specializationId,
      })),
    );
  }

  async copyEmploymentLocationsFrom(profile: CandidateProfile) {
    const profileEmploymentLocations = await profile.$get('candidateProfileEmploymentLocations');

    await CandidateProfileEmploymentLocation.bulkCreate(
      profileEmploymentLocations.map((profileEmploymentLocation) => ({
        candidateProfileId: this.candidateProfile.id,
        employmentLocationId: profileEmploymentLocation.employmentLocationId,
      })),
    );
  }

  async copyCitiesFrom(profile: CandidateProfile) {
    const profileCities = await profile.$get('candidateProfileCities');

    await CandidateProfileCity.bulkCreate(
      profileCities.map((profileCity) => ({
        candidateProfileId: this.candidateProfile.id,
        cityId: profileCity.cityId,
        cityName: profileCity.cityName,
        cityCountrySlug: profileCity.cityCountrySlug,
        cityCountryName: profileCity.cityCountryName,
        cityTimezone: profileCity.cityTimezone,
        type: profileCity.type,
      })),
    );
  }

  async copyWorkPlacesFrom(profile: CandidateProfile) {
    const profileWorkPlaces = await profile.$get('candidateProfileWorkPlaces');

    await CandidateProfileWorkPlace.bulkCreate(
      profileWorkPlaces.map((workPlace) => ({
        candidateProfileId: this.candidateProfile.id,
        companyName: workPlace.companyName,
        title: workPlace.title,
        description: workPlace.description,
        startDate: workPlace.startDate,
        endDate: workPlace.endDate,
      })),
    );
  }

  async copyProfileDataFrom(profile: CandidateProfile) {
    await this.copyBaseFieldsFrom(profile);
    await this.copySpecializationsFrom(profile);
    await this.copyTechnologiesFrom(profile);
    await this.copyEmploymentLocationsFrom(profile);
    await this.copyCitiesFrom(profile);
    await this.copyWorkPlacesFrom(profile);
  }
}
