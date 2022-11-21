import React, { FC } from 'react';
import { CheckIcon } from '@/ui/icons/general/CheckIcon';
import { Colors } from '@/ui/theme/colors';

interface Props {
  checked: boolean;
  color?: Colors;
}

export const Check: FC<Props> = (props) => {
  const { checked, color } = props;

  if (checked) {
    return <CheckIcon color={color} />;
  }

  return null;
};
