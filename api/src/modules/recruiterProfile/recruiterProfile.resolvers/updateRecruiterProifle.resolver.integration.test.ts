import faker from 'faker';
import { testFactory } from '@/test/testFactory';
import { retrieveAuthUserData } from '@/test/retrieveAuthUser';
import { RecruiterProfileStatusEnum } from '@/modules/recruiterProfile/recruiterProfile.typedefs';
import { AuthErrors } from '@/auth/auth.constants';
import { factory } from '@/test/factory';

const getProfileOptions = () => ({
  position: faker.name.jobTitle(),
  companyName: faker.company.companyName(),
});

describe('Test resolver: updateRecruiterProfile', testFactory(() => {
  it('Should throw an error for unauthorized request', async (done) => {
    try {
      await global.client().updateRecruiterProfile();

      done.fail(`Should throw ${AuthErrors.LoginNotAuthorized} error`);
    } catch (e) {
      expect(e.message)
        .toEqual(expect.stringContaining(AuthErrors.LoginNotAuthorized));

      done();
    }
  });

  it(`Should return created profile in response`, async () => {
    const { headers } = await retrieveAuthUserData();

    const options = getProfileOptions();

    const { data } = await global.client({ headers })
      .updateRecruiterProfile(options);

    expect(data?.updateRecruiterProfile)
      .toMatchObject({
        ...options,
        status: RecruiterProfileStatusEnum.Draft,
      });
  });

  it(`Should create new profile in status ${RecruiterProfileStatusEnum.Draft}`, async () => {
    const { headers, user } = await retrieveAuthUserData();

    const options = getProfileOptions();

    await global.client({ headers }).updateRecruiterProfile(options);

    const [profile] = await user.$get('recruiterProfiles');

    expect(profile)
      .toMatchObject({
        ...options,
        status: RecruiterProfileStatusEnum.Draft,
      });
  });

  it(`Should update existing profile if its status is ${RecruiterProfileStatusEnum.Draft}`, async () => {
    const { headers, user } = await retrieveAuthUserData();
    const profile = await factory.recruiterProfile.create({}, {
      userId: user.id,
    });

    const options = getProfileOptions();

    await global.client({ headers }).updateRecruiterProfile(options);

    await profile.reload();

    expect(profile)
      .toMatchObject({
        ...options,
        status: RecruiterProfileStatusEnum.Draft,
      });
  });

  it(`Should mark existing profile with status ${RecruiterProfileStatusEnum.OnReview} as ${RecruiterProfileStatusEnum.Inactive} and create new profile in ${RecruiterProfileStatusEnum.Draft}`, async () => {
    const { headers, user } = await retrieveAuthUserData();
    const existingProfile = await factory.recruiterProfileOnReview.create({}, {
      userId: user.id,
    });

    const options = getProfileOptions();

    await global.client({ headers }).updateRecruiterProfile(options);

    await existingProfile.reload();

    const [profile] = await user.$get('recruiterProfiles', {
      order: [
        ['id', 'DESC'],
      ],
    });

    expect(existingProfile.status)
      .toBe(RecruiterProfileStatusEnum.Inactive);

    expect(profile)
      .toMatchObject({
        ...options,
        status: RecruiterProfileStatusEnum.Draft,
      });
  });

  it(`Should create new profile if current has status ${RecruiterProfileStatusEnum.Rejected}`, async () => {
    const { headers, user } = await retrieveAuthUserData();
    const existingProfile = await factory.recruiterProfileRejected.create({}, {
      userId: user.id,
    });

    const options = getProfileOptions();

    await global.client({ headers }).updateRecruiterProfile(options);

    await existingProfile.reload();

    const [profile] = await user.$get('recruiterProfiles', {
      order: [
        ['id', 'DESC'],
      ],
    });

    expect(existingProfile.status)
      .toBe(RecruiterProfileStatusEnum.Rejected);

    expect(profile)
      .toMatchObject({
        ...options,
        status: RecruiterProfileStatusEnum.Draft,
      });
  });

  it(`Should create new profile if current has status ${RecruiterProfileStatusEnum.Active}`, async () => {
    const { headers, user } = await retrieveAuthUserData();
    const existingProfile = await factory.recruiterProfileActive.create({}, {
      userId: user.id,
    });

    const options = getProfileOptions();

    await global.client({ headers }).updateRecruiterProfile(options);

    await existingProfile.reload();

    const [profile] = await user.$get('recruiterProfiles', {
      order: [
        ['id', 'DESC'],
      ],
    });

    expect(existingProfile.status)
      .toBe(RecruiterProfileStatusEnum.Active);

    expect(profile)
      .toMatchObject({
        ...options,
        status: RecruiterProfileStatusEnum.Draft,
      });
  });

  it(`Should create new profile if current has status ${RecruiterProfileStatusEnum.Inactive}`, async () => {
    const { headers, user } = await retrieveAuthUserData();
    const existingProfile = await factory.recruiterProfileInactive.create({}, {
      userId: user.id,
    });

    const options = getProfileOptions();

    await global.client({ headers }).updateRecruiterProfile(options);

    await existingProfile.reload();

    const [profile] = await user.$get('recruiterProfiles', {
      order: [
        ['id', 'DESC'],
      ],
    });

    expect(existingProfile.status)
      .toBe(RecruiterProfileStatusEnum.Inactive);

    expect(profile)
      .toMatchObject({
        ...options,
        status: RecruiterProfileStatusEnum.Draft,
      });
  });
}));
