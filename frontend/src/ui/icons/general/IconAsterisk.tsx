import cn from 'classnames';
import React from 'react';
import icons from '@/ui/icons/icons.module.scss';
import { FCIcon } from '@/ui/icons/typedefs';

export const IconAsterisk: FCIcon = () => (
  // classname "icon" for overrides
  <svg
    className={cn(icons.icon, 'icon-asterisk')}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.239 21H13.761L13.4527 14.4062L19.2308 17.9844L21 15.0156L14.8647 12L21 8.98437L19.2308 6.01563L13.4527 9.59375L13.761 3H10.239L10.5473 9.59375L4.76916 6.01563L3 8.98437L9.13526 12L3 15.0156L4.76916 17.9844L10.5473 14.4062L10.239 21Z"
      fill="currentColor"
    />
  </svg>
);
