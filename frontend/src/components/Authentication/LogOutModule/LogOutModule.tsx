import React, { useCallback } from 'react';
import cn from 'classnames';
import buttons from '@/ui/buttons/buttons.module.scss';
import { useLogOut } from '@/controllers/user/user.hooks/useLogOut';
import { IconLogOut } from '@/ui/icons/general/IconLogOut';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import styles from './LogOutModule.module.scss';

export const LogOutModule = () => {
  const [logOutMutation, { loading }] = useLogOut();
  const { t } = useTranslation([Namespaces.Auth]);

  const logOut = useCallback(async () => {
    try {
      await logOutMutation();
    } catch (e) {
      // TODO: add flash message
      // eslint-disable-next-line no-alert
      alert(e.message);
    }
  }, [logOutMutation]);

  return (
    <button
      type="button"
      className={cn(buttons.button, styles.logOutButton)}
      title={t(`${Namespaces.Profile}:log_out_action`)}
      aria-label={t(`${Namespaces.Profile}:log_out_action`)}
      aria-disabled={loading}
      onClick={logOut}
    >
      <IconLogOut />
    </button>
  );
};
