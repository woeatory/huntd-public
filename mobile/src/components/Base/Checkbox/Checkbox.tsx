import React, { FC } from 'react';
import { CheckboxCheckedIcon } from '@/ui/icons/general/CheckboxCheckedIcon';
import { CheckboxIcon } from '@/ui/icons/general/CheckboxIcon';

interface Props {
  checked: boolean;
}

export const Checkbox: FC<Props> = (props) => {
  const { checked } = props;

  if (checked) {
    return <CheckboxCheckedIcon />;
  }

  return <CheckboxIcon />;
};
