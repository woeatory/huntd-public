import cn from 'classnames';
import React from 'react';
import icons from '@/ui/icons/icons.module.scss';
import { FCIcon } from '@/ui/icons/typedefs';

export const IconArrowLeft: FCIcon = () => (
  // classname "icon" for overrides
  <svg
    className={cn(icons.icon, 'icon-arrow-left')}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.91429 21C9.30476 18.1948 6.66857 12.4909 1 12.1169M1 12.1169C3.20952 12.1169 8.08572 10.2935 9.91429 3M1 12.1169L25 12.1169"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);
