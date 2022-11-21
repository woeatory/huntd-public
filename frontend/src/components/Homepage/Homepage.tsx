import React from 'react';
import cn from 'classnames';
import { HowItWorks } from '@/components/Homepage/HowItWorks';
import { HotJobs } from '@/components/Homepage/HotJobs';
import { NewHeroBlock } from '@/components/Homepage/NewHeroBlock/NewHeroBlock';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';
import styles from './HomePage.module.scss';
import { Reviews } from './Reviews/Reviews';
import { MobileAppHero } from './MobileAppHero/MobileAppHero';
import { Web3Transition } from './Web3Transition/Web3Transition';
import { ChooseNFT } from './ChooseNFT';

export const Homepage = () => {
  const [user] = useAuthUser();

  const isUserLoggedIn = !!user;

  return (
    <div className="grid-container mt-60">
      {
        isUserLoggedIn
          ? (
            <div className={cn(styles.section)}>
              <MobileAppHero />
            </div>
          )
          : <NewHeroBlock />
      }

      <div className={styles.section}>
        <HowItWorks />
      </div>

      <div className={styles.section}>
        <ChooseNFT />
      </div>

      <div className={cn(styles.section)}>
        <HotJobs />
      </div>

      <div className={cn(styles.section)}>
        <Web3Transition />
      </div>

      <div className={styles.section}>
        <Reviews />
      </div>
    </div>
  );
};
