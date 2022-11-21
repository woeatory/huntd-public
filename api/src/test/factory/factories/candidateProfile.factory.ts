import { factoryLib } from '@/test/factory/factoryLib';
import { faker } from '@/test/faker';
import { CandidateProfile } from '@/models/CandidateProfile';
import { CandidateProfileStatusEnum } from '@/modules/candidateProfile/candidateProfile.typedefs';
import { makeFactory } from '@/test/factory/makeFactory';

interface Options {
  userId: number
}

factoryLib.define(
  'candidateProfile',
  CandidateProfile,
  (options: Options) => {
    const {
      userId,
    } = options;

    return ({
      userId,
      position: faker.name.jobTitle(),
      salary: faker.random.number(),
      candidateDescription: faker.lorem.text(),
      experienceDescription: faker.lorem.text(),
      status: CandidateProfileStatusEnum.Draft,
    });
  },
);

factoryLib.extend('candidateProfile', 'candidateProfileActive', {
  status: CandidateProfileStatusEnum.Active,
});

factoryLib.extend('candidateProfile', 'candidateProfileInactive', {
  status: CandidateProfileStatusEnum.Inactive,
});

factoryLib.extend('candidateProfile', 'candidateProfileRejected', {
  status: CandidateProfileStatusEnum.Rejected,
});

factoryLib.extend('candidateProfile', 'candidateProfileOnReview', {
  status: CandidateProfileStatusEnum.OnReview,
});

export const candidateProfile = makeFactory<CandidateProfile, Options>('candidateProfile');
export const candidateProfileActive = makeFactory<CandidateProfile, Options>('candidateProfileActive');
export const candidateProfileInactive = makeFactory<CandidateProfile, Options>('candidateProfileInactive');
export const candidateProfileRejected = makeFactory<CandidateProfile, Options>('candidateProfileRejected');
export const candidateProfileOnReview = makeFactory<CandidateProfile, Options>('candidateProfileOnReview');
