import cn from 'classnames';
import React from 'react';
import icons from '@/ui/icons/icons.module.scss';
import { FCIcon } from '@/ui/icons/typedefs';

export const IconFiltersMobile: FCIcon = () => (
  // classname "icon" for overrides
  <svg
    className={cn(icons.icon, 'icon-filters-mobile')}
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24 48C30.3652 48 36.4697 45.4714 40.9706 40.9706C45.4714 36.4697 48 30.3652 48 24C48 17.6348 45.4714 11.5303 40.9706 7.02944C36.4697 2.52856 30.3652 0 24 0C17.6348 0 11.5303 2.52856 7.02944 7.02944C2.52856 11.5303 0 17.6348 0 24C0 30.3652 2.52856 36.4697 7.02944 40.9706C11.5303 45.4714 17.6348 48 24 48Z"
      fill="currentColor"
    />
    <path d="M20.4444 36H27.5556V32.6667H20.4444V36ZM8 16V19.3333H40V16H8ZM13.3333 27.6667H34.6667V24.3333H13.3333V27.6667Z" fill="#F35A35" />
  </svg>
);
