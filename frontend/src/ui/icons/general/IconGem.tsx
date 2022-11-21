import cn from 'classnames';
import React from 'react';
import icons from '@/ui/icons/icons.module.scss';
import { FCIcon } from '@/ui/icons/typedefs';

export const IconGem: FCIcon = () => (
  // classname "icon" for overrides
  <svg
    className={cn(icons.icon, 'icon-gem')}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M7.81003 7.9L4.84003 10.85L12.03 18.03L14.99 15.08L19.21 10.85L16.25 7.89V7.88H7.80003L7.81003 7.9ZM12 0L1.53003 6V18L12 24L22.47 18V6L12 0ZM21 17L12 22L3 17V7L12 2L21 7.06121V17Z" fill="currentColor" />
  </svg>
);
