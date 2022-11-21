import cn from 'classnames';
import React from 'react';
import icons from '@/ui/icons/icons.module.scss';
import { FCIcon } from '@/ui/icons/typedefs';

export const IconCase: FCIcon = () => (
  // classname "icon" for overrides
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    className={cn(icons.icon, 'icon-case')}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fillRule="evenodd" clipRule="evenodd" d="M18.6667 7.99935V5.33268H13.3334V7.99935H18.6667ZM5.33341 10.666V25.3327H26.6667V10.666H5.33341ZM26.6667 7.99935C28.1467 7.99935 29.3334 9.18602 29.3334 10.666V25.3327C29.3334 26.8127 28.1467 27.9993 26.6667 27.9993H5.33341C3.85341 27.9993 2.66675 26.8127 2.66675 25.3327L2.68008 10.666C2.68008 9.18602 3.85341 7.99935 5.33341 7.99935H10.6667V5.33268C10.6667 3.85268 11.8534 2.66602 13.3334 2.66602H18.6667C20.1467 2.66602 21.3334 3.85268 21.3334 5.33268V7.99935H26.6667Z" fill="currentColor" />
  </svg>
);
