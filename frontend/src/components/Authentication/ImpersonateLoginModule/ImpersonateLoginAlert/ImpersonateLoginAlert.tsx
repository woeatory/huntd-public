import React, { useEffect } from 'react';
import { useAdminUserQuery } from '@/controllers/graphql/generated';
import { Selectors } from '@/lib/selectors';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';
import { Button } from '@/ui/buttons/Button';
import { useLogOutFromUser } from '@/controllers/user/user.hooks/useLogOutFromUser';
import styles from './ImpersonateLoginAlert.module.scss';

export const ImpersonateLoginAlert = () => {
  const { data: adminData } = useAdminUserQuery();

  const [user] = useAuthUser();

  const [logOut, { loading }] = useLogOutFromUser();

  useEffect(() => {
    document.documentElement.classList.toggle(
      Selectors.AdminPanelVisible,
      !!adminData?.adminUser,
    );
  }, [adminData?.adminUser]);

  return adminData?.adminUser
    ? (
      <div className={styles.impersonateLoginAlert}>
        Hi
        <strong>
          {adminData.adminUser.firstName}
        </strong>
        , you are signed in as
        <strong>
          {user?.email}
        </strong>

        <Button
          mode={Button.mode.Secondary}
          size={Button.size.Small}
          className={styles.logOutButton}
          disabled={loading}
          onClick={() => logOut()}
          text='Log Out'
        />
      </div>
    )
    : null;
};
