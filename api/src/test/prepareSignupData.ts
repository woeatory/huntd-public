import faker from 'faker';
import { SignUpMutationVariables } from '@/graphql/generated';

export const prepareSignUpData = (): SignUpMutationVariables => {
  const password = faker.internet.password();

  return ({
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    password,
    repeatPassword: password,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    fvType: faker.random.word(),
    fvSource: faker.random.word(),
    fvMedium: faker.random.word(),
    fvCampaign: faker.random.word(),
    fvContent: faker.random.word(),
    fvTerm: faker.random.word(),
    lvType: faker.random.word(),
    lvSource: faker.random.word(),
    lvMedium: faker.random.word(),
    lvCampaign: faker.random.word(),
    lvContent: faker.random.word(),
    lvTerm: faker.random.word(),
    gClientid: faker.random.word(),
    gIp: faker.random.word(),
    gAgent: faker.random.word(),
    gclid: faker.random.word(),
  });
};
