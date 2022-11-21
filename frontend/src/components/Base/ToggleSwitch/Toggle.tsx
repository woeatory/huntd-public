import React, { FC } from 'react';
import cn from 'classnames';
import styles from './Toggle.module.scss';

interface Props {
  className?: string;
  toggle: boolean;
  handleToggleChange: () => void;
}

export const Toggle: FC<Props> = ({
  className,
  handleToggleChange,
  toggle,
}) => (
  <label className={cn(styles.switch, className)}>
    <input
      className={styles.input}
      defaultChecked={toggle}
      onClick={handleToggleChange}
      type="checkbox"
    />
    <span className={styles.slider} />
  </label>
);
