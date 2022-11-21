import cn from 'classnames';
import React from 'react';
import icons from '@/ui/icons/icons.module.scss';
import { FCIcon } from '@/ui/icons/typedefs';

export const IconChevronDown: FCIcon = () => (
  // classname "icon" for overrides
  <svg
    className={cn(icons.icon, 'icon-chevron-down')}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 16.5002L4.5 9.00019L5.55 7.9502L12 14.4002L18.45 7.9502L19.5 9.00019L12 16.5002Z"
      fill="currentColor"
    />
  </svg>
);
