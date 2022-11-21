import { testFactory } from '@/test/testFactory';
import { retrieveAuthUserData } from '@/test/retrieveAuthUser';
import { PrimaryProfileEnum } from '@/modules/user/user.typedefs';
import { CandidateProfileStatusEnum } from '@/modules/candidateProfile/candidateProfile.typedefs';
import { RecruiterProfileStatusEnum } from '@/modules/recruiterProfile/recruiterProfile.typedefs';
import { factory } from '@/test/factory';

describe('Test resolver: primaryProfile', testFactory(() => {
  it(`Should return ${PrimaryProfileEnum.NotDefined} for user without profiles`, async () => {
    const { headers } = await retrieveAuthUserData();

    const { data } = await global.client({ headers }).authUser();

    expect(data?.authUser?.primaryProfile)
      .toBe(PrimaryProfileEnum.NotDefined);
  });

  it(`Should return ${PrimaryProfileEnum.NotDefined} for
    ${CandidateProfileStatusEnum.Inactive} candidate profile`, async () => {
    const { headers, user } = await retrieveAuthUserData();

    await factory.candidateProfileInactive.create({}, {
      userId: user.id,
    });

    const { data } = await global.client({ headers }).authUser();

    expect(data?.authUser?.primaryProfile)
      .toBe(PrimaryProfileEnum.NotDefined);
  });

  it(`Should return ${PrimaryProfileEnum.Candidate} for
    any Active status of Candidate profile`, async () => {
    const { headers, user } = await retrieveAuthUserData();

    const statuses = [
      CandidateProfileStatusEnum.Draft,
      CandidateProfileStatusEnum.OnReview,
      CandidateProfileStatusEnum.Rejected,
      CandidateProfileStatusEnum.Active,
    ];

    const candidateProfile = await factory.candidateProfile.create({}, {
      userId: user.id,
    });

    await statuses.reduce(
      (promise, status) => promise.then(
        async () => {
          await candidateProfile.update({ status });

          const { data } = await global.client({ headers }).authUser();

          expect(data?.authUser?.primaryProfile)
            .toBe(PrimaryProfileEnum.Candidate);
        },
      ),
      Promise.resolve(),
    );
  });

  it(`Should return ${PrimaryProfileEnum.NotDefined} for
    ${RecruiterProfileStatusEnum.Inactive} recruiter profile`, async () => {
    const { headers, user } = await retrieveAuthUserData();

    await factory.recruiterProfileInactive.create({}, {
      userId: user.id,
    });

    const { data } = await global.client({ headers }).authUser();

    expect(data?.authUser?.primaryProfile)
      .toBe(PrimaryProfileEnum.NotDefined);
  });

  it(`Should return ${PrimaryProfileEnum.Recruiter} for
    any Active status of Recruiter profile`, async () => {
    const { headers, user } = await retrieveAuthUserData();

    const statuses = [
      RecruiterProfileStatusEnum.Draft,
      RecruiterProfileStatusEnum.OnReview,
      RecruiterProfileStatusEnum.Rejected,
      RecruiterProfileStatusEnum.Active,
    ];

    const recruiterProfile = await factory.recruiterProfile.create({}, {
      userId: user.id,
    });

    await statuses.reduce(
      (promise, status) => promise.then(
        async () => {
          await recruiterProfile.update({ status });

          const { data } = await global.client({ headers }).authUser();

          expect(data?.authUser?.primaryProfile)
            .toBe(PrimaryProfileEnum.Recruiter);
        },
      ),
      Promise.resolve(),
    );
  });

  it(`Should return ${PrimaryProfileEnum.Recruiter} for
    ${CandidateProfileStatusEnum.Inactive} status of Candidate profile
    and any Active status of Recruiter profile`, async () => {
    const { headers, user } = await retrieveAuthUserData();

    const statuses = [
      RecruiterProfileStatusEnum.Draft,
      RecruiterProfileStatusEnum.OnReview,
      RecruiterProfileStatusEnum.Rejected,
      RecruiterProfileStatusEnum.Active,
    ];

    await factory.candidateProfileInactive.create({}, {
      userId: user.id,
    });

    const recruiterProfile = await factory.recruiterProfile.create({}, {
      userId: user.id,
    });

    await statuses.reduce(
      (promise, status) => promise.then(
        async () => {
          await recruiterProfile.update({ status });

          const { data } = await global.client({ headers }).authUser();

          expect(data?.authUser?.primaryProfile)
            .toBe(PrimaryProfileEnum.Recruiter);
        },
      ),
      Promise.resolve(),
    );
  });

  it(`Should return ${PrimaryProfileEnum.Candidate} for combination of
    any Active status of Candidate profile
    and any status of Recruiter profile`, async () => {
    const { headers, user } = await retrieveAuthUserData();

    const recruiterStatuses = [
      RecruiterProfileStatusEnum.Draft,
      RecruiterProfileStatusEnum.OnReview,
      RecruiterProfileStatusEnum.Rejected,
      RecruiterProfileStatusEnum.Active,
      CandidateProfileStatusEnum.Inactive,
    ];

    const candidateStatuses = [
      CandidateProfileStatusEnum.Draft,
      CandidateProfileStatusEnum.OnReview,
      CandidateProfileStatusEnum.Rejected,
      CandidateProfileStatusEnum.Active,
    ];

    const recruiterProfile = await factory.recruiterProfile.create({}, {
      userId: user.id,
    });

    const candidateProfile = await factory.candidateProfile.create({}, {
      userId: user.id,
    });

    await candidateStatuses.reduce(
      (outerPromise, candidateStatus) => outerPromise.then(
        async () => {
          await recruiterStatuses.reduce(
            (innerPromise, recruiterStatus) => innerPromise.then(
              async () => {
                await candidateProfile.update({ status: candidateStatus });
                await recruiterProfile.update({ status: recruiterStatus });

                const { data } = await global.client({ headers }).authUser();

                expect(data?.authUser?.primaryProfile)
                  .toBe(PrimaryProfileEnum.Candidate);
              },
            ),
            Promise.resolve(),
          );
        },
      ),
      Promise.resolve(),
    );
  });
}));
