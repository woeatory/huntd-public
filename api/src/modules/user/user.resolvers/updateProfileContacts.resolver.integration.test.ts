import { testFactory } from '@/test/testFactory';
import {
  AuthErrors,
} from '@/auth/auth.constants';
import { retrieveAuthUserData } from '@/test/retrieveAuthUser';
import { UpdateProfileContactsMutationVariables } from '@/graphql/generated';
import { UserEntity } from '@/modules/user/User.entity';

describe('Test resolver: updateProfileContacts', testFactory(() => {
  it('Should throw an error for unauthorized request', async (done) => {
    try {
      await global.client().updateProfileContacts({
        phone: '0991234567',
        firstName: 'Test',
        lastName: 'Random',
      });

      done.fail(`Should throw ${AuthErrors.LoginNotAuthorized} error`);
    } catch (e) {
      expect(e.message)
        .toEqual(expect.stringContaining(AuthErrors.LoginNotAuthorized));

      done();
    }
  });

  it('Should update contacts info', async () => {
    const { headers, user } = await retrieveAuthUserData();

    const contacts: UpdateProfileContactsMutationVariables = {
      firstName: 'Random',
      lastName: 'Test',
      phone: '+38(099)-123-23-23',
    };

    await global.client({ headers }).updateProfileContacts(contacts);

    await user.reload();

    expect(user)
      .toMatchObject({
        firstName: contacts.firstName,
        lastName: contacts.lastName,
        phone: UserEntity.formatPhone(contacts.phone),
      });
  });
}));
