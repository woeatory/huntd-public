import cn from 'classnames';
import React from 'react';
import icons from '@/ui/icons/icons.module.scss';
import { FCIcon } from '@/ui/icons/typedefs';

export const IconSwitchOn: FCIcon = () => (
  // classname "icon" for overrides
  <svg
    className={cn(icons.icon, 'icon-switch-on')}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 6H6C4.4087 6 2.88258 6.63214 1.75736 7.75736C0.632141 8.88258 0 10.4087 0 12C0 13.5913 0.632141 15.1174 1.75736 16.2426C2.88258 17.3679 4.4087 18 6 18H18C19.5913 18 21.1174 17.3679 22.2426 16.2426C23.3679 15.1174 24 13.5913 24 12C24 10.4087 23.3679 8.88258 22.2426 7.75736C21.1174 6.63214 19.5913 6 18 6ZM18 15.6C17.0452 15.6 16.1295 15.2207 15.4544 14.5456C14.7793 13.8705 14.4 12.9548 14.4 12C14.4 11.0452 14.7793 10.1295 15.4544 9.45442C16.1295 8.77928 17.0452 8.4 18 8.4C18.9548 8.4 19.8705 8.77928 20.5456 9.45442C21.2207 10.1295 21.6 11.0452 21.6 12C21.6 12.9548 21.2207 13.8705 20.5456 14.5456C19.8705 15.2207 18.9548 15.6 18 15.6Z"
      fill="currentColor"
    />
  </svg>
);
