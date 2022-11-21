import React, { FC, memo } from 'react';
import {
  ButtonElementProps,
  ButtonORAnchorCommonAttributes,
} from '@/ui/buttons/typedefs';

type Props = ButtonORAnchorCommonAttributes & ButtonElementProps & {
  className: string;
  isLoading?: boolean;
}

export const ButtonElement: FC<Props> = memo((props) => {
  const {
    children,
    type,
    disabled,
    isLoading,
    className,
    ...rest
  } = props;

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={className}
      {...rest}
    >
      {children}
    </button>
  );
});
