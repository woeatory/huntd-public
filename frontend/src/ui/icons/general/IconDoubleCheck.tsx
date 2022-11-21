import React from 'react';
import cn from 'classnames';
import icons from '@/ui/icons/icons.module.scss';
import { FCIcon } from '@/ui/icons/typedefs';

export const IconDoubleCheck: FCIcon = () => (
  // classname "icon" for overrides
  <svg
    className={cn(icons.icon, 'icon-double-check')}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.5957 9.1612L4.7577 11.5745L9.83504 5.77186L8.83104 4.89453L4.57504 9.75853L2.4037 8.1012L1.5957 9.1612ZM14.5017 5.77186L13.4977 4.89453L9.2517 9.7472L8.7497 9.34586L7.91637 10.3872L9.41437 11.5859L14.5017 5.77186Z"
      fill="currentColor"
    />
  </svg>
);
