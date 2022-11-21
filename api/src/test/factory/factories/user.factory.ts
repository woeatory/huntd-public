import { factoryLib } from '@/test/factory/factoryLib';
import { faker } from '@/test/faker';
import { User } from '@/models/User';
import { makeFactory } from '@/test/factory/makeFactory';
import { UserRoleEnum } from '@/modules/user/user.typedefs';

interface Options {
  password: string
}

factoryLib.define(
  'user',
  User,
  (options: Options) => {
    const {
      password,
    } = options;

    return ({
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password,
    });
  },
);

factoryLib.extend('user', 'adminUser', {
  userRole: UserRoleEnum.Admin,
});

export const user = makeFactory<User, Options>('user');
export const adminUser = makeFactory<User, Options>('adminUser');
