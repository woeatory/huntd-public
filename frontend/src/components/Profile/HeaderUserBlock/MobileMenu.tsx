import React, {
  FC, useState, useEffect,
} from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { useBodyScrollLock } from '@/controllers/modal/modal.hooks/useBodyScrollLock';
import { Sidebar } from '@/components/Base/Sidebar/Sidebar';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { Selectors } from '@/lib/selectors';
import styles from './Menu.module.scss';
import { MenuLinks } from './MenuLinks';

export const MobileMenu: FC = () => {
  const router = useRouter();
  const [, setIsScrollLocked] = useBodyScrollLock(false);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setIsOpened(false);
      setIsScrollLocked(false);
    });
  }, [router.events, setIsScrollLocked]);

  useEffect(() => {
    setIsScrollLocked(isOpened);

    return () => {
      setIsScrollLocked(false);
    };
  }, [setIsScrollLocked, isOpened]);

  const { t } = useTranslation([
    Namespaces.Common,
  ]);

  return (
    <>
      <button
        className={cn(styles.burgerButton, {
          [Selectors.Active]: isOpened,
        })}
        onClick={() => setIsOpened(!isOpened)}
        title={t(`${Namespaces.Common}:burger_menu`)}
      >
        <span className={styles.line} />
        <span className={styles.line} />
      </button>

      <Sidebar
        isOpened={isOpened}
        wrapperStyles={styles.menu}
        sidebarStyles={styles.sidebar}
      >
        <MenuLinks />
      </Sidebar>
    </>
  );
};
