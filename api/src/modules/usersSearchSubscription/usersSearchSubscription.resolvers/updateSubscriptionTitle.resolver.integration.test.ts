import faker from 'faker';
import { testFactory } from '@/test/testFactory';
import { AuthErrors } from '@/auth/auth.constants';
import { NOT_FOUND } from '@/constants/common';
import { factory } from '@/test/factory';
import { Sdk } from '@/graphql/generated';
import { retrieveAuthUserData } from '@/test/retrieveAuthUser';
import { User } from '@/models/User';

describe(`Test resolver: updateSubscriptionTitle`, testFactory(() => {
  let user: User;
  let client: Sdk;

  beforeEach(async () => {
    const authUserData = await retrieveAuthUserData();

    user = authUserData.user;
    client = authUserData.client;
  });

  it(`should throw 'unauthorized' error when called anonymously`, async () => {
    await expect(
      global.client().updateSubscriptionTitle({
        id: 1,
        userId: 1,
        values: {
          title: faker.lorem.word(),
        },
      }),
    )
      .rejects.toEqual(
        expect.objectContaining({
          message: expect.stringContaining(AuthErrors.LoginNotAuthorized),
        }),
      );
  });

  it(`should throw 'forbidden' error when called with wrong userId`, async () => {
    const existingSubscription = await factory.usersSearchSubscription.create({
      userId: user.id,
    });

    await expect(
      client.updateSubscriptionTitle({
        id: existingSubscription.id,
        userId: existingSubscription.userId + 1,
        values: {
          title: faker.lorem.word(),
        },
      }),
    )
      .rejects.toEqual(
        expect.objectContaining({
          message: expect.stringContaining(AuthErrors.Forbidden),
        }),
      );
  });

  it(`should return 'not found' error when there is no such subscription`, async () => {
    const existingSubscription = await factory.usersSearchSubscription.create({
      userId: user.id,
    });

    await expect(
      client.updateSubscriptionTitle({
        id: existingSubscription.id + 1,
        userId: existingSubscription.userId,
        values: {
          title: faker.lorem.word(),
        },
      }),
    )
      .rejects.toEqual(
        expect.objectContaining({
          message: expect.stringContaining(NOT_FOUND),
        }),
      );
  });

  it(`should return existing subscription with updated title`, async () => {
    const existingSubscription = await factory.usersSearchSubscription.create({
      userId: user.id,
    });

    const newTitle = faker.lorem.words(3);

    const { data } = await client.updateSubscriptionTitle({
      id: existingSubscription.id,
      userId: user.id,
      values: {
        title: newTitle,
      },
    });

    expect(data?.updateSubscriptionTitle.title)
      .toBe(newTitle);
  });
}));
