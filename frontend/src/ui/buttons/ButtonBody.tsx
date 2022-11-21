import React, { FC, memo } from 'react';
import cn from 'classnames';
import styles from '@/ui/buttons/ButtonBody.module.scss';
import { FCIcon } from '@/ui/icons/typedefs';

interface Props {
  hasOnlyIcon: boolean;
  LeftIcon?: FCIcon;
  RightIcon?: FCIcon;
  text?: string;
}

export const ButtonBody: FC<Props> = memo((props) => {
  const {
    text, hasOnlyIcon,
    LeftIcon, RightIcon,
  } = props;

  return (
    <>
      {LeftIcon && (
        <LeftIcon
          className={cn({ [styles.iconLeft]: !hasOnlyIcon })}
        />
      )}

      {text && (
        <span>
          {text}
        </span>
      )}

      {RightIcon && (
        <RightIcon
          className={cn({ [styles.iconRight]: !hasOnlyIcon })}
        />
      )}
    </>
  );
});
