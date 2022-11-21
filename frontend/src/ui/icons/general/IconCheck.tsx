import React from 'react';
import cn from 'classnames';
import icons from '@/ui/icons/icons.module.scss';
import { FCIcon } from '@/ui/icons/typedefs';

export const IconCheck: FCIcon = () => (
  // classname "icon" for overrides
  <svg
    className={cn(icons.icon, 'icon-check')}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.71429 18L4 12.3349L5.81714 10.5714L9.71429 14.3954L18.1817 6L20 7.80229L9.71429 18Z"
      fill="currentColor"
    />
  </svg>
);
