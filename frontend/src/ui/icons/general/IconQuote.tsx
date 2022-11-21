import cn from 'classnames';
import React from 'react';
import icons from '@/ui/icons/icons.module.scss';
import { FCIcon } from '@/ui/icons/typedefs';

export const IconQuote: FCIcon = () => (
  // classname "icon" for overrides
  <svg
    className={cn(icons.icon, 'icon-quote')}
    width="36"
    height="48"
    viewBox="0 0 36 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.52941 2.91667L2 2L11.4118 23.0833L2 46L9.52941 44.7778L18 23.0833L9.52941 2.91667Z" stroke="url(#paint0_linear_13932_64076)" strokeWidth="2" />
    <path d="M25.5294 2.91667L18 2L27.4118 23.0833L18 46L25.5294 44.7778L34 23.0833L25.5294 2.91667Z" stroke="url(#paint1_linear_13932_64076)" strokeWidth="2" />
    <defs>
      <linearGradient id="paint0_linear_13932_64076" x1="10" y1="2" x2="10" y2="46" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFBAAA" stopOpacity="0.8" />
        <stop offset="1" stopColor="#C2EDFF" />
      </linearGradient>
      <linearGradient id="paint1_linear_13932_64076" x1="26" y1="2" x2="26" y2="46" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFBAAA" stopOpacity="0.8" />
        <stop offset="1" stopColor="#C2EDFF" />
      </linearGradient>
    </defs>
  </svg>

);
