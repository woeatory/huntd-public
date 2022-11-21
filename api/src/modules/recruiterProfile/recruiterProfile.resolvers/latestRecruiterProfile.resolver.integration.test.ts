import { testFactory } from '@/test/testFactory';
import { retrieveAuthUserData } from '@/test/retrieveAuthUser';
import { factory } from '@/test/factory';

describe('Test resolver: latestRecruiterProfile', testFactory(() => {
  it('Should return null for unauthorized request', async () => {
    const result = await global.client().latestRecruiterProfile();

    expect(result.data?.latestRecruiterProfile)
      .toBeNull();
  });

  it(`Should return null if user doesn't have recruiter profiles`, async () => {
    const { headers } = await retrieveAuthUserData();

    const { data } = await global.client({ headers }).latestRecruiterProfile();

    expect(data?.latestRecruiterProfile)
      .toBeNull();
  });

  it(`Should return existing recruiter profile`, async () => {
    const { headers, user } = await retrieveAuthUserData();

    const profile = await factory.recruiterProfile.create({}, {
      userId: user.id,
    });

    const { data } = await global.client({ headers }).latestRecruiterProfile();

    expect(data?.latestRecruiterProfile?.id)
      .toBe(profile.id);
  });

  it(`Should return latest recruiter profile`, async () => {
    const { headers, user } = await retrieveAuthUserData();

    await factory.recruiterProfile.create({}, {
      userId: user.id,
    });
    await factory.recruiterProfile.create({}, {
      userId: user.id,
    });
    const profile = await factory.recruiterProfile.create({}, {
      userId: user.id,
    });

    const { data } = await global.client({ headers }).latestRecruiterProfile();

    expect(data?.latestRecruiterProfile?.id)
      .toBe(profile.id);
  });
}));
