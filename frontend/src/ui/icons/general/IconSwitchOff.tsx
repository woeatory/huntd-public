import cn from 'classnames';
import React from 'react';
import icons from '@/ui/icons/icons.module.scss';
import { FCIcon } from '@/ui/icons/typedefs';

export const IconSwitchOff: FCIcon = () => (
  // classname "icon" for overrides
  <svg
    className={cn(icons.icon, 'icon-switch-off')}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 6H6C4.4087 6 2.88258 6.63214 1.75736 7.75736C0.632141 8.88258 0 10.4087 0 12C0 13.5913 0.632141 15.1174 1.75736 16.2426C2.88258 17.3679 4.4087 18 6 18H18C19.5913 18 21.1174 17.3679 22.2426 16.2426C23.3679 15.1174 24 13.5913 24 12C24 10.4087 23.3679 8.88258 22.2426 7.75736C21.1174 6.63214 19.5913 6 18 6ZM6 15.6C5.04522 15.6 4.12955 15.2207 3.45442 14.5456C2.77928 13.8705 2.4 12.9548 2.4 12C2.4 11.0452 2.77928 10.1295 3.45442 9.45442C4.12955 8.77928 5.04522 8.4 6 8.4C6.95478 8.4 7.87045 8.77928 8.54559 9.45442C9.22072 10.1295 9.6 11.0452 9.6 12C9.6 12.9548 9.22072 13.8705 8.54559 14.5456C7.87045 15.2207 6.95478 15.6 6 15.6Z"
      fill="currentColor"
    />
  </svg>
);
