import React from 'react';
import cn from 'classnames';
import icons from '@/ui/icons/icons.module.scss';
import { FCIcon } from '@/ui/icons/typedefs';

export const IconEdit: FCIcon = () => (
  // classname "icon" for overrides
  <svg
    className={cn(icons.icon, 'icon-edit')}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20 21V3H21.2857V21H20Z" fill="currentColor" />
    <path d="M7.45455 7.38182C6.94545 6.87273 6.18182 6.87273 5.67273 7.38182L3.38182 9.67273C2.87273 10.1818 2.87273 10.9455 3.38182 11.4545L12.9273 21H17V16.9273L7.45455 7.38182ZM4.27273 10.5636L6.56364 8.27273L8.47273 10.1818L6.18182 12.4727L4.27273 10.5636ZM15.7273 19.7273H13.4364L7.07273 13.3636L9.36364 11.0727L15.7273 17.4364V19.7273Z" fill="currentColor" />
  </svg>
);
