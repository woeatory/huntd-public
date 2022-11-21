import sinon from 'sinon';
import { NotificationsGateway } from '@/test/__mocks__/@mate-academy/notifications-gateway';
import { testFactory } from '@/test/testFactory';
import { RecruiterProfileStatusEnum } from '@/modules/recruiterProfile/recruiterProfile.typedefs';
import { AuthErrors } from '@/auth/auth.constants';
import { factory } from '@/test/factory';
import { RecruiterProfileStatus, Sdk } from '@/graphql/generated';
import { CandidateProfileStatusEnum } from '@/modules/candidateProfile/candidateProfile.typedefs';
import { retrieveServiceAuthData } from '@/test/retrieveServiceAuthData';
import { retrieveAuthUserData } from '@/test/retrieveAuthUser';
import { User } from '@/models/User';

describe(`Test resolver: updateRecruiterProfile`, testFactory(() => {
  let client: Sdk;
  let user: User;
  const sandbox = sinon.createSandbox();

  beforeEach(async () => {
    const serviceAuthData = await retrieveServiceAuthData();
    const authUserData = await retrieveAuthUserData();

    client = serviceAuthData.client;
    user = authUserData.user;
  });

  afterEach(() => {
    sandbox.restore();
  });

  it(`should throw 'unauthorized' error when called anonymously`, async () => {
    await expect(
      global.client().reviewRecruiterProfile({
        id: 1,
        status: RecruiterProfileStatus.Rejected,
      }),
    )
      .rejects.toEqual(
        expect.objectContaining({
          message: expect.stringContaining(AuthErrors.LoginNotAuthorized),
        }),
      );
  });

  it(`should change requiter's profile status from ${RecruiterProfileStatusEnum.Active} to ${RecruiterProfileStatusEnum.Rejected} when rejected`, async () => {
    const profile = await factory.recruiterProfileActive.create({}, {
      userId: user.id,
    });

    const { data } = await client.reviewRecruiterProfile({
      id: profile.id,
      status: RecruiterProfileStatus.Rejected,
      rejectReason: 'Some serious reason',
    });

    await profile.reload();

    expect(profile.status)
      .toBe(CandidateProfileStatusEnum.Rejected);

    expect(data?.reviewRecruiterProfile.status)
      .toBe(CandidateProfileStatusEnum.Rejected);
  });

  it(`should change requiter's profile status from ${RecruiterProfileStatusEnum.Rejected} to ${RecruiterProfileStatusEnum.Active} when approved`, async () => {
    const profile = await factory.recruiterProfileRejected.create({}, {
      userId: user.id,
    });

    const { data } = await client.reviewRecruiterProfile({
      id: profile.id,
      status: RecruiterProfileStatus.Active,
    });

    await profile.reload();

    expect(profile.status)
      .toBe(CandidateProfileStatusEnum.Active);

    expect(data?.reviewRecruiterProfile.status)
      .toBe(CandidateProfileStatusEnum.Active);
  });

  it(`should throw an error when recruiter's profile is not found`, async () => {
    await expect(
      client.reviewRecruiterProfile({
        id: 10000,
        status: RecruiterProfileStatus.Active,
      }),
    )
      .rejects.toEqual(
        expect.objectContaining({
          message: expect.stringContaining('Recruiter Profile not found'),
        }),
      );
  });

  it(`should send an email when recruiter's profile is rejected`, async () => {
    sandbox.spy(NotificationsGateway.prototype, 'notify');
    const profile = await factory.recruiterProfileActive.create({}, {
      userId: user.id,
    });

    await client.reviewRecruiterProfile({
      id: profile.id,
      status: RecruiterProfileStatus.Rejected,
      rejectReason: 'Some serious reason',
    });

    await profile.reload();

    expect(NotificationsGateway.prototype.notify)
      .toHaveBeenCalledWith(
        sinon.match({
          notification_type: 'PROFILE_REJECTED',
          channel: 'EMAIL',
          user_id: user?.id,
          message_data: {
            destination: user?.email,
            reject_reason: profile.rejectReason || '',
          },
        }),
      );
  });

  it(`should send an email when recruiter's profile is approved`, async () => {
    sandbox.spy(NotificationsGateway.prototype, 'notify');
    const profile = await factory.recruiterProfileRejected.create({}, {
      userId: user.id,
    });

    await client.reviewRecruiterProfile({
      id: profile.id,
      status: RecruiterProfileStatus.Active,
    });

    await profile.reload();

    expect(NotificationsGateway.prototype.notify)
      .toHaveBeenCalledWith(
        sinon.match({
          notification_type: 'PROFILE_APPROVED',
          channel: 'EMAIL',
          user_id: user?.id,
          message_data: {
            destination: user?.email,
          },
        }),
      );
  });
}));
