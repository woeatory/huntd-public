import { testFactory } from '@/test/testFactory';
import { AuthErrors } from '@/auth/auth.constants';
import { NOT_FOUND } from '@/constants/common';
import { factory } from '@/test/factory';
import { Sdk } from '@/graphql/generated';
import { retrieveServiceAuthData } from '@/test/retrieveServiceAuthData';
import { retrieveAuthUserData } from '@/test/retrieveAuthUser';
import { User } from '@/models/User';

describe(`Test resolver: updateSubscriptionsLastNotified`, testFactory(() => {
  let user: User;
  let client: Sdk;

  beforeEach(async () => {
    const serviceAuthData = await retrieveServiceAuthData();
    const authUserData = await retrieveAuthUserData();

    user = authUserData.user;
    client = serviceAuthData.client;
  });

  it(`should throw 'unauthorized' error when called anonymously`, async () => {
    await expect(
      global.client().updateSubscriptionLastNotified({
        subscriptionsIds: [1, 2, 3],
      }),
    )
      .rejects.toEqual(
        expect.objectContaining({
          message: expect.stringContaining(AuthErrors.LoginNotAuthorized),
        }),
      );
  });

  it(`should return 'not found' error when there is no such subscription`, async () => {
    const existingSubscription = await factory.usersSearchSubscription
      .create({
        userId: user.id,
      });

    const subscriptionsIds = [existingSubscription.id + 100];

    await expect(
      client.updateSubscriptionLastNotified({
        subscriptionsIds,
      }),
    )
      .rejects.toEqual(
        expect.objectContaining({
          message: expect.stringContaining(NOT_FOUND),
        }),
      );
  });

  it(`should update 'lastNotified' field for all subscriptions ids`, async () => {
    let existingSubscriptions = await factory.usersSearchSubscription
      .createMany(2, {
        userId: user.id,
      });

    const subscriptionsIds = existingSubscriptions.map(
      (sub) => sub.id,
    );

    const initialLastNotified = existingSubscriptions.map(
      (sub) => sub.lastNotified,
    );

    await client.updateSubscriptionLastNotified({
      subscriptionsIds,
    });

    existingSubscriptions = await Promise.all(existingSubscriptions.map(
      async (sub) => sub.reload(),
    ));

    const updatedLastNotified = existingSubscriptions.map(
      (sub) => sub.lastNotified,
    );

    expect(initialLastNotified)
      .not.toEqual(updatedLastNotified);
  });
}));
