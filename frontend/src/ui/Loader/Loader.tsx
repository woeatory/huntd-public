import React, { FC, DetailedHTMLProps, HTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './Loader.module.scss';

interface Props extends DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>, HTMLDivElement
> {
  active: boolean
}

export const Loader: FC<Props> = (props) => {
  const { active, className, ...rest } = props;

  return (
    <div
      aria-hidden="true"
      className={cn(styles.loaderPlaceholder, 'loader', className, {
        'is-active': active,
      })}
      {...rest}
    >
      <div className={styles.loaderSpinner} />
    </div>
  );
};
