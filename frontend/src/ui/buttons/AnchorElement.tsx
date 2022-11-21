import React, { FC, memo } from 'react';
import {
  AnchorElementProps,
  ButtonORAnchorCommonAttributes,
} from '@/ui/buttons/typedefs';

type Props = ButtonORAnchorCommonAttributes & AnchorElementProps;

export const AnchorElement: FC<Props> = memo((props) => {
  const {
    children,
    className,
    ...rest
  } = props;

  return (
    <a
      className={className}
      {...rest}
    >
      {children}
    </a>
  );
});
