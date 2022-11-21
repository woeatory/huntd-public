import React from 'react';
import cn from 'classnames';
import icons from '@/ui/icons/icons.module.scss';
import { FCIcon } from '@/ui/icons/typedefs';

export const IconLogOut: FCIcon = () => (
  // classname "icon" for overrides
  <svg
    className={cn(icons.icon, 'icon-log-out')}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.1714 7C17.5016 8.55844 18.9295 11.7273 22 11.9351M22 11.9351C20.8032 11.9351 18.1619 12.9481 17.1714 17M22 11.9351H9M7 3H3V21H7"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);
