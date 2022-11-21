import React, { FC } from 'react';
import styles from './HoverMenu.module.scss';

export const HoverMenu: FC = (props) => (
  <ul className={styles.hoverMenuActionsContainer}>
    {props.children}
  </ul>
);
