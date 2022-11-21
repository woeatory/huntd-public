import faker from 'faker';
import { testFactory } from '@/test/testFactory';
import { AuthErrors } from '@/auth/auth.constants';
import { Sdk } from '@/graphql/generated';
import { retrieveAuthUserData } from '@/test/retrieveAuthUser';

const getSubscriptionOptions = () => ({
  title: faker.lorem.words(2),
  searchParams: {
    technologiesIds: Array.from(faker.lorem.word())
      .map(() => faker.random.number(100)),
    salaryFrom: faker.random.number(1000),
    salaryTo: faker.random.number(1000),
    specializations: [
      faker.lorem.word().toUpperCase(),
      faker.lorem.word().toUpperCase(),
    ],
    cities: [faker.address.city(), faker.address.city()],
    employmentTypesIds: [faker.random.number(), faker.random.number()],
    englishLevelIds: [faker.random.number(), faker.random.number()],
    experienceIds: [faker.random.number(), faker.random.number()],
  },
});

describe(`Test resolver: subscribeToCandidatesSearch`, testFactory(() => {
  let client: Sdk;

  beforeEach(async () => {
    const authUserData = await retrieveAuthUserData();

    client = authUserData.client;
  });

  it(`should throw 'unauthorized' error when called anonymously`, async () => {
    await expect(
      global.client().subscribeToCandidatesSearch({
        title: 'title',
        searchParams: {
          salaryFrom: 1000,
        },
      }),
    )
      .rejects.toEqual(
        expect.objectContaining({
          message: expect.stringContaining(AuthErrors.LoginNotAuthorized),
        }),
      );
  });

  it(`should return created subscription in response`, async () => {
    const options = getSubscriptionOptions();

    const { data } = await client.subscribeToCandidatesSearch(options);

    expect(data?.subscribeToCandidatesSearch)
      .toMatchObject(options);
  });
}));
