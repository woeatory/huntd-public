import { testFactory } from '@/test/testFactory';
import { retrieveAuthUserData } from '@/test/retrieveAuthUser';
import { CandidateProfileStatusEnum } from '@/modules/candidateProfile/candidateProfile.typedefs';
import { AuthErrors } from '@/auth/auth.constants';
import { CandidateProfileErrors } from '@/modules/candidateProfile/candidateProfile.constants';
import { factory } from '@/test/factory/';

describe('Test resolver: sendCandidateProfileToReview', testFactory(() => {
  it('Should throw an error for unauthorized request', async (done) => {
    try {
      await global.client().sendCandidateProfileToReview();

      done.fail(`Should throw ${AuthErrors.LoginNotAuthorized} error`);
    } catch (e) {
      expect(e.message)
        .toEqual(expect.stringContaining(AuthErrors.LoginNotAuthorized));

      done();
    }
  });

  it(`Should update profile and return it in the response`, async () => {
    const { headers, user } = await retrieveAuthUserData();

    const profile = await factory.candidateProfile.create({}, {
      userId: user.id,
    });

    const { data } = await global.client({
      headers,
    }).sendCandidateProfileToReview();

    await profile.reload();

    expect(profile.status)
      .toBe(CandidateProfileStatusEnum.OnReview);

    expect(data?.sendCandidateProfileToReview.status)
      .toBe(CandidateProfileStatusEnum.OnReview);
  });

  it(`Should throw ${CandidateProfileErrors.ProfileNotExists} error for missing profile`, async (done) => {
    const { headers } = await retrieveAuthUserData();

    try {
      await global.client({ headers }).sendCandidateProfileToReview();

      done.fail(`Should throw ${CandidateProfileErrors.ProfileNotExists} error`);
    } catch (e) {
      expect(e.message)
        .toEqual(expect.stringContaining(
          CandidateProfileErrors.ProfileNotExists,
        ));
    }

    done();
  });

  it(`Should throw ${CandidateProfileErrors.ProfileInvalidStatus} error for
    any status of Candidate profile different from ${CandidateProfileStatusEnum.Draft} or ${CandidateProfileStatusEnum.Inactive}`, async (done) => {
    const { headers, user } = await retrieveAuthUserData();

    const statuses = [
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

          try {
            await global.client({ headers }).sendCandidateProfileToReview();

            done.fail(`Should throw ${CandidateProfileErrors.ProfileInvalidStatus} error`);
          } catch (e) {
            expect(e.message)
              .toEqual(expect.stringContaining(
                CandidateProfileErrors.ProfileInvalidStatus,
              ));
          }
        },
      ),
      Promise.resolve(),
    );

    done();
  });
}));
