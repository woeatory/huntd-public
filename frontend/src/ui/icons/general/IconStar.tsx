import cn from 'classnames';
import React from 'react';
import icons from '@/ui/icons/icons.module.scss';
import { FCIcon } from '@/ui/icons/typedefs';

export const IconStar: FCIcon = () => (
  // classname "icon" for overrides
  <svg
    className={cn(icons.icon, 'icon-star')}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.8152 21.0002C11.2124 18.195 8.60559 12.491 3.0001 12.117C5.18503 12.117 10.007 10.2936 11.8152 3.00001"
      stroke="currentColor"
    />
    <path
      d="M12.1848 3C12.7876 5.80522 15.3944 11.5092 20.9999 11.8832C18.815 11.8832 13.993 13.7066 12.1848 21.0002"
      stroke="currentColor"
    />
  </svg>
);
