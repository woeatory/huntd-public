import React, {
  FC, useCallback, useState,
} from 'react';
import cn from 'classnames';
import { Sidebar } from '@/components/Base/Sidebar/Sidebar';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { Selectors } from '@/lib/selectors';
import { AdminSettings } from '@/components/AdminSettingsModule/AdminSettings/AdminSettings';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';
import { useFeature } from '@/controllers/features/features.hooks/useFeature';
import { Features } from '@/controllers/features/features.constants';
import { useAdminUserQuery } from '@/controllers/graphql/generated';
import styles from './AdminSettingsModule.module.scss';

export const AdminSettingsModule: FC = () => {
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);

  const { t } = useTranslation([
    Namespaces.Common,
  ]);

  const adminSettingsFeature = useFeature(Features.AdminSettings);

  const [user] = useAuthUser();

  const { data: adminData } = useAdminUserQuery();

  const closeSidebar = useCallback(() => {
    setIsSidebarOpened(false);
  }, [setIsSidebarOpened]);

  return adminSettingsFeature.isEnabled() && (
    user?.isAdminUser || adminData?.adminUser
  ) ? (
    <div className={styles.wrapper}>
      <button
        className={cn(styles.burgerButton, {
          [Selectors.Active]: isSidebarOpened,
        })}
        onClick={() => setIsSidebarOpened(!isSidebarOpened)}
        title={t(`${Namespaces.Common}:burger_menu`)}
      >
        <span className={styles.line} />
        <span className={styles.line} />
      </button>

      <Sidebar
        isOpened={isSidebarOpened}
        closeSideBar={closeSidebar}
        sidebarStyles={styles.sidebar}
      >
        <AdminSettings
          isOpened={isSidebarOpened}
          closeSidebar={setIsSidebarOpened}
        />
      </Sidebar>
    </div>
    ) : null;
};
