import { testFactory } from '@/test/testFactory';
import { AuthErrors } from '@/auth/auth.constants';
import { NOT_FOUND } from '@/constants/common';
import { factory } from '@/test/factory';
import { Sdk } from '@/graphql/generated';
import { retrieveAuthUserData } from '@/test/retrieveAuthUser';
import { User } from '@/models/User';

describe(`Test resolver: unsubscribeFromCandidatesSearch`, testFactory(() => {
  let user: User;
  let client: Sdk;

  beforeEach(async () => {
    const authUserData = await retrieveAuthUserData();

    user = authUserData.user;
    client = authUserData.client;
  });

  it(`should throw 'unauthorized' error when called anonymously`, async () => {
    await expect(
      global.client().unsubscribeFromCandidatesSearch({
        id: 1,
        userId: 1,
      }),
    )
      .rejects.toEqual(
        expect.objectContaining({
          message: expect.stringContaining(AuthErrors.LoginNotAuthorized),
        }),
      );
  });

  it(`should throw 'not found' error when there are no such subscription`, async () => {
    const existingSubscription = await factory.usersSearchSubscription.create({
      userId: user.id,
    });

    await expect(
      client.unsubscribeFromCandidatesSearch({
        id: existingSubscription.id + 1,
        userId: existingSubscription.userId,
      }),
    )
      .rejects.toEqual(
        expect.objectContaining({
          message: expect.stringContaining(NOT_FOUND),
        }),
      );
  });

  it(`should throw 'forbidden' error when called with wrong userId`, async () => {
    const existingSubscription = await factory.usersSearchSubscription.create({
      userId: user.id,
    });

    await expect(
      client.unsubscribeFromCandidatesSearch({
        id: existingSubscription.id,
        userId: existingSubscription.userId + 1,
      }),
    )
      .rejects.toEqual(
        expect.objectContaining({
          message: expect.stringContaining(AuthErrors.Forbidden),
        }),
      );
  });

  it(`should delete existing subscription`, async () => {
    const existingSubscription = await factory.usersSearchSubscription.create({
      userId: user.id,
    });

    const { data } = await client.unsubscribeFromCandidatesSearch({
      id: existingSubscription.id,
      userId: user.id,
    });

    expect(data?.unsubscribeFromCandidatesSearch)
      .toBe(true);
  });
}));
