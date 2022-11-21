import React from 'react';
import { ProfileLinkModule } from '@/components/Profile/HeaderUserBlock/ProfileLinkModule';
import styles from './HeaderUserBlock.module.scss';
import { MobileMenu } from './MobileMenu';

export const HeaderUserBlock = () => (
  <>
    <div className={styles.userBlockWrapper}>
      <ProfileLinkModule />
    </div>

    <MobileMenu />
  </>
);
