import faker from 'faker';
import { testFactory } from '@/test/testFactory';
import { retrieveAuthUserData } from '@/test/retrieveAuthUser';
import { AuthErrors } from '@/auth/auth.constants';
import { CandidateProfileStatusEnum } from '@/modules/candidateProfile/candidateProfile.typedefs';
import { factory } from '@/test/factory';

const getProfileOptions = () => ({
  position: faker.name.jobTitle(),
  salary: faker.random.number(),
  candidateDescription: faker.lorem.text(),
  experienceDescription: faker.lorem.text(),
  achievements: faker.lorem.text(),
  cities: [],
});

describe('Test resolver: updateCandidateProfile', testFactory(() => {
  it('Should throw an error for unauthorized request', async (done) => {
    try {
      await global.client().updateCandidateProfile();

      done.fail(`Should throw ${AuthErrors.LoginNotAuthorized} error`);
    } catch (e) {
      expect(e.message)
        .toEqual(expect.stringContaining(AuthErrors.LoginNotAuthorized));

      done();
    }
  });

  it(`Should return created profile in response`, async () => {
    const { headers } = await retrieveAuthUserData();

    const { cities, ...options } = getProfileOptions();

    const { data } = await global.client({ headers })
      .updateCandidateProfile({ ...options, cities });

    expect(data?.updateCandidateProfile)
      .toMatchObject({
        ...options,
        status: CandidateProfileStatusEnum.Draft,
      });
  });

  it(`Should create new profile in status ${CandidateProfileStatusEnum.Draft}`, async () => {
    const { headers, user } = await retrieveAuthUserData();

    const { cities, ...options } = getProfileOptions();

    await global.client({ headers })
      .updateCandidateProfile({ ...options, cities });

    const [profile] = await user.$get('candidateProfiles');

    expect(profile)
      .toMatchObject({
        ...options,
        status: CandidateProfileStatusEnum.Draft,
      });
  });

  it(`Should update existing profile if its status is ${CandidateProfileStatusEnum.Draft}`, async () => {
    const { headers, user } = await retrieveAuthUserData();

    const profile = await factory.candidateProfile.create({}, {
      userId: user.id,
    });

    const { cities, ...options } = getProfileOptions();

    await global.client({ headers })
      .updateCandidateProfile({ ...options, cities });

    await profile.reload();

    expect(profile)
      .toMatchObject({
        ...options,
        status: CandidateProfileStatusEnum.Draft,
      });
  });

  it(`Should mark existing profile with status ${CandidateProfileStatusEnum.OnReview} as ${CandidateProfileStatusEnum.Inactive} and create new profile in ${CandidateProfileStatusEnum.Draft}`, async () => {
    const { headers, user } = await retrieveAuthUserData();
    const existingProfile = await factory.candidateProfileOnReview.create({}, {
      userId: user.id,
    });

    const { cities, ...options } = getProfileOptions();

    await global.client({ headers })
      .updateCandidateProfile({ ...options, cities });

    await existingProfile.reload();

    const [profile] = await user.$get('candidateProfiles', {
      order: [
        ['id', 'DESC'],
      ],
    });

    expect(existingProfile.status)
      .toBe(CandidateProfileStatusEnum.Inactive);

    expect(profile)
      .toMatchObject({
        ...options,
        status: CandidateProfileStatusEnum.Draft,
      });
  });

  it(`Should create new profile if current has status ${CandidateProfileStatusEnum.Rejected}`, async () => {
    const { headers, user } = await retrieveAuthUserData();
    const existingProfile = await factory.candidateProfileRejected.create({}, {
      userId: user.id,
    });

    const { cities, ...options } = getProfileOptions();

    await global.client({ headers })
      .updateCandidateProfile({ ...options, cities });

    await existingProfile.reload();

    const [profile] = await user.$get('candidateProfiles', {
      order: [
        ['id', 'DESC'],
      ],
    });

    expect(existingProfile.status)
      .toBe(CandidateProfileStatusEnum.Rejected);

    expect(profile)
      .toMatchObject({
        ...options,
        status: CandidateProfileStatusEnum.Draft,
      });
  });

  it(`Should create new profile if current has status ${CandidateProfileStatusEnum.Active}`, async () => {
    const { headers, user } = await retrieveAuthUserData();
    const existingProfile = await factory.candidateProfileActive.create({}, {
      userId: user.id,
    });

    const { cities, ...options } = getProfileOptions();

    await global.client({ headers })
      .updateCandidateProfile({ ...options, cities });

    await existingProfile.reload();

    const [profile] = await user.$get('candidateProfiles', {
      order: [
        ['id', 'DESC'],
      ],
    });

    expect(existingProfile.status)
      .toBe(CandidateProfileStatusEnum.Active);

    expect(profile)
      .toMatchObject({
        ...options,
        status: CandidateProfileStatusEnum.Draft,
      });
  });

  it(`Should create new profile if current has status ${CandidateProfileStatusEnum.Inactive}`, async () => {
    const { headers, user } = await retrieveAuthUserData();

    const existingProfile = await factory.candidateProfileInactive.create({}, {
      userId: user.id,
    });

    const { cities, ...options } = getProfileOptions();

    await global.client({ headers })
      .updateCandidateProfile({ ...options, cities });

    await existingProfile.reload();

    const [profile] = await user.$get('candidateProfiles', {
      order: [
        ['id', 'DESC'],
      ],
    });

    expect(existingProfile.status)
      .toBe(CandidateProfileStatusEnum.Inactive);

    expect(profile)
      .toMatchObject({
        ...options,
        status: CandidateProfileStatusEnum.Draft,
      });
  });
}));
