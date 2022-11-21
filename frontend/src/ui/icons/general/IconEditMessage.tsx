import React from 'react';
import cn from 'classnames';
import icons from '@/ui/icons/icons.module.scss';
import { FCIcon } from '@/ui/icons/typedefs';

export const IconEditMessage: FCIcon = () => (
  // classname "icon" for overrides
  <svg
    className={cn(icons.icon, 'icon-edit-message')}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 20H21V21.2857H3V20Z"
      fill="currentColor"
    />
    <path
      d="M16.6182 7.45455C17.1273 6.94545 17.1273 6.18182 16.6182 5.67273L14.3273 3.38182C13.8182 2.87273 13.0545 2.87273 12.5455 3.38182L3 12.9273V17H7.07273L16.6182 7.45455ZM13.4364 4.27273L15.7273 6.56364L13.8182 8.47273L11.5273 6.18182L13.4364 4.27273ZM4.27273 15.7273V13.4364L10.6364 7.07273L12.9273 9.36364L6.56364 15.7273H4.27273Z"
      fill="currentColor"
    />
  </svg>

);
