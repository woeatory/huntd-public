import React from 'react';
import cn from 'classnames';
import icons from '@/ui/icons/icons.module.scss';
import { FCIcon } from '@/ui/icons/typedefs';

export const IconClose: FCIcon = () => (
  // classname "icon" for overrides
  <svg
    className={cn(icons.icon, 'icon-close')}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 10.2322L5.81286 4.04505L4.04509 5.81282L10.2323 12L4.04509 18.1872L5.81286 19.955L12 13.7678L18.1872 19.955L19.955 18.1872L13.7678 12L19.955 5.81282L18.1872 4.04505L12 10.2322Z"
      fill="currentColor"
    />
  </svg>
);
