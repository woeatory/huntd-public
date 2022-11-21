import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import styles from '@/components/Base/Sidebar/Sidebar.module.scss';
import { Selectors } from '@/lib/selectors';

interface Props extends DetailedHTMLProps<
HTMLAttributes<HTMLDivElement>,
HTMLDivElement
> {
  isOpened: boolean
  closeSideBar?: () => void
  wrapperStyles?: string,
  sidebarStyles?: string,
}

export const Sidebar: FC<Props> = (props) => {
  const {
    isOpened, children,
    closeSideBar, wrapperStyles,
    sidebarStyles,
  } = props;

  return (
    <div className={cn(styles.sidebarWrapper, wrapperStyles, {
      [styles.overlay]: isOpened,
      [Selectors.Active]: isOpened,
    })}
    >
      <aside className={cn(styles.sidebar, sidebarStyles, {
        [styles.overlay]: isOpened,
        [Selectors.Active]: isOpened,
      })}
      >
        {children}
      </aside>
      <div
        className={styles.gradient}
        onClick={closeSideBar}
        aria-hidden
      />
    </div>
  );
};
