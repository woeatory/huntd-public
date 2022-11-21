import React from 'react';
import cn from 'classnames';
import icons from '@/ui/icons/icons.module.scss';
import { FCIcon } from '@/ui/icons/typedefs';

export const IconHexagon: FCIcon = () => (
  // classname "icon" for overrides
  <svg
    className={cn(icons.icon, 'icon-hexagon')}
    width="106"
    height="120"
    viewBox="0 0 106 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M54.4793 1.98793L78.6001 15.6596L102.5 29.7129C103.41 30.2475 103.971 31.2203 103.98 32.2751L104.2 60L103.98 87.7249C103.971 88.7797 103.41 89.7525 102.5 90.2871L78.6002 104.34L54.4793 118.012C53.5617 118.532 52.4383 118.532 51.5207 118.012L27.4 104.34L3.49972 90.2871C2.59048 89.7525 2.02881 88.7797 2.02042 87.7249L1.80003 60L2.02042 32.2751C2.02881 31.2203 2.59048 30.2475 3.49972 29.7129L27.4 15.6595L51.5207 1.98793C52.4383 1.46782 53.5617 1.46782 54.4793 1.98793Z" stroke="url(#paint0_linear_14006_64041)" strokeWidth="2" />
    <defs>
      <linearGradient id="paint0_linear_14006_64041" x1="53" y1="0" x2="53" y2="120" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFBAAA" stopOpacity="0.8" />
        <stop offset="1" stopColor="#C2EDFF" />
      </linearGradient>
    </defs>
  </svg>
);
