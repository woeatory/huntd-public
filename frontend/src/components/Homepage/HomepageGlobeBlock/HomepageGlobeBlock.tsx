import React from 'react';
import cn from 'classnames';
import { IconGlobeImage } from '@/ui/icons/general/GlobeImageIcon';
import styles from './HomepageGlobeBlock.module.scss';

export const HomepageGlobeBlock = () => (
  <div className={cn(styles.container)}>
    <div className={cn(styles.globeIcon)}>
      <IconGlobeImage />
    </div>
  </div>
);
