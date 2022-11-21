import { factoryLib } from '@/test/factory/factoryLib';
import { faker } from '@/test/faker';
import { RecruiterProfile } from '@/models/RecruiterProfile';
import { RecruiterProfileStatusEnum } from '@/modules/recruiterProfile/recruiterProfile.typedefs';
import { makeFactory } from '@/test/factory/makeFactory';

interface Options {
  userId: number
}

factoryLib.define(
  'recruiterProfile',
  RecruiterProfile,
  (options: Options) => {
    const {
      userId,
    } = options;

    return ({
      userId,
      position: faker.name.jobTitle(),
      companyName: faker.company.companyName(),
      status: RecruiterProfileStatusEnum.Draft,
    });
  },
);

factoryLib.extend('recruiterProfile', 'recruiterProfileActive', {
  status: RecruiterProfileStatusEnum.Active,
});

factoryLib.extend('recruiterProfile', 'recruiterProfileInactive', {
  status: RecruiterProfileStatusEnum.Inactive,
});

factoryLib.extend('recruiterProfile', 'recruiterProfileRejected', {
  status: RecruiterProfileStatusEnum.Rejected,
});

factoryLib.extend('recruiterProfile', 'recruiterProfileOnReview', {
  status: RecruiterProfileStatusEnum.OnReview,
});

export const recruiterProfile = makeFactory<RecruiterProfile, Options>('recruiterProfile');
export const recruiterProfileActive = makeFactory<RecruiterProfile, Options>('recruiterProfileActive');
export const recruiterProfileInactive = makeFactory<RecruiterProfile, Options>('recruiterProfileInactive');
export const recruiterProfileRejected = makeFactory<RecruiterProfile, Options>('recruiterProfileRejected');
export const recruiterProfileOnReview = makeFactory<RecruiterProfile, Options>('recruiterProfileOnReview');
