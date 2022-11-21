import cn from 'classnames';
import React from 'react';
import icons from '@/ui/icons/icons.module.scss';
import { FCIcon } from '@/ui/icons/typedefs';

export const IconPlayMarketLogo: FCIcon = () => (
  // classname "icon" for overrides
  <svg
    className={cn(icons.icon, 'icon-playmarket-logo')}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="24"
      height="24"
      transform="translate(0.5)"
      fill="none"
    />
    <path
      d="M13.454 11.6157L16.411 8.65871L6.86 3.29071C6.227 2.94871 5.634 2.90071 5.114 3.27471L13.454 11.6157ZM16.915 15.0777L19.989 13.3487C20.589 13.0127 20.918 12.5367 20.918 12.0087C20.918 11.4817 20.589 11.0047 19.99 10.6687L17.207 9.10571L14.074 12.2377L16.915 15.0777ZM4.6 4.00171C4.536 4.19871 4.5 4.41871 4.5 4.65971V19.3647C4.5 19.7457 4.584 20.0737 4.736 20.3347L12.833 12.2367L4.6 4.00171ZM13.454 12.8567L5.402 20.9097C5.556 20.9687 5.722 20.9997 5.897 20.9997C6.209 20.9997 6.534 20.9077 6.865 20.7237L16.12 15.5267L13.454 12.8567Z"
      fill="currentColor"
    />
  </svg>
);
