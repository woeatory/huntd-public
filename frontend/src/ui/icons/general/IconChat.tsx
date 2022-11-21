import cn from 'classnames';
import React from 'react';
import icons from '@/ui/icons/icons.module.scss';
import { FCIcon } from '@/ui/icons/typedefs';

export const IconChat: FCIcon = () => (
  // classname "icon" for overrides
  <svg
    width="16"
    height="16"
    className={cn(icons.icon, 'icon-chat')}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M13.3333 1.33331H2.66659C1.93325 1.33331 1.33325 1.93331 1.33325 2.66665V14.6666L3.99992 12H13.3333C14.0666 12 14.6666 11.4 14.6666 10.6666V2.66665C14.6666 1.93331 14.0666 1.33331 13.3333 1.33331ZM13.3333 10.6666H3.99992L2.66659 12V2.66665H13.3333V10.6666Z" fill="currentColor" />
  </svg>
);
