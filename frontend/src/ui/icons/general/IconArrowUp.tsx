import cn from 'classnames';
import React from 'react';
import icons from '@/ui/icons/icons.module.scss';
import { FCIcon } from '@/ui/icons/typedefs';

export const IconArrowUp: FCIcon = () => (
  // classname "icon" for overrides
  <svg
    className={cn(icons.icon, 'icon-arrow-up')}
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.6017 9.5792C8.97942 11.6449 5.94062 12.7992 3.90092 13.2401L3.33334 10.6414C5.04292 10.2718 7.69051 9.26818 9.94229 7.4943C12.1745 5.73581 13.9378 3.29211 14.1562 1.31746e-06L16.8264 1.17192e-06C16.8264 2.31008 18.8286 8.36341 28 10.651L27.35 13.2305C22.1415 11.9314 18.8297 9.50582 16.8264 6.96312L16.8264 32L14.1533 32L14.1533 7.05141C13.3903 8.01826 12.5166 8.85849 11.6017 9.5792Z"
      fill="currentColor"
    />
  </svg>

);
