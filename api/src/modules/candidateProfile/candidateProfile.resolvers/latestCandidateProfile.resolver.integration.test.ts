import { testFactory } from '@/test/testFactory';
import { retrieveAuthUserData } from '@/test/retrieveAuthUser';
import { factory } from '@/test/factory/';

describe('Test resolver: latestCandidateProfile', testFactory(() => {
  it('Should return null for unauthorized request', async () => {
    const result = await global.client().latestCandidateProfile();

    expect(result.data?.latestCandidateProfile)
      .toBeNull();
  });

  it(`Should return null if user doesn't have candidate profiles`, async () => {
    const { headers } = await retrieveAuthUserData();

    const { data } = await global.client({ headers }).latestCandidateProfile();

    expect(data?.latestCandidateProfile)
      .toBeNull();
  });

  it(`Should return existing candidate profile`, async () => {
    const { headers, user } = await retrieveAuthUserData();

    const profile = await factory.candidateProfile.create({}, {
      userId: user.id,
    });

    const { data } = await global.client({ headers }).latestCandidateProfile();

    expect(data?.latestCandidateProfile?.id)
      .toBe(profile.id);
  });

  it(`Should return latest candidate profile`, async () => {
    const { headers, user } = await retrieveAuthUserData();

    await factory.candidateProfile.create({}, { userId: user.id });
    await factory.candidateProfile.create({}, { userId: user.id });

    const profile = await factory.candidateProfile.create({}, {
      userId: user.id,
    });

    const { data } = await global.client({ headers }).latestCandidateProfile();

    expect(data?.latestCandidateProfile?.id)
      .toBe(profile.id);
  });
}));
