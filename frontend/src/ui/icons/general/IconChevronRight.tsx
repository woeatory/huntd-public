import cn from 'classnames';
import React from 'react';
import icons from '@/ui/icons/icons.module.scss';
import { FCIcon } from '@/ui/icons/typedefs';

export const IconChevronRight: FCIcon = () => (
  // classname "icon" for overrides
  <svg
    className={cn(icons.icon, 'icon-chevron-right')}
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.9996 16L11.9996 26L10.5996 24.6L19.1996 16L10.5996 7.4L11.9996 6L21.9996 16Z"
      fill="currentColor"
    />
  </svg>
);
