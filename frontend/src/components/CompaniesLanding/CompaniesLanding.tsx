import React, { useEffect } from 'react';
import styles from '@/components/CompaniesLanding/CompaniesLanding.module.scss';
import { analytics } from '@/controllers/analytics/analytics.client';
import { GlobeBlock } from '@/components/CompaniesLanding/GlobeBlock';
import { WeWereHereBlock } from './WeWereHereBlock';
import { RealHiringBlock } from './RealHiringBlock';
import { CompareBlock } from './CompareBlock';
import { PartnersBlock } from './PartnersBlock';

export const CompaniesLanding = () => {
  useEffect(() => {
    analytics.sendEvent(
      analytics.events.companiesLanding.VisitCompaniesLanding,
      {},
    );
  }, []);

  return (
    <>
      <div className='grid-container mt-60'>
        <section className={styles.section}>
          <GlobeBlock />
        </section>

        <section className={styles.section}>
          <WeWereHereBlock />
        </section>

        <section className={styles.section}>
          <RealHiringBlock />
        </section>

        <section className={styles.section}>
          <CompareBlock />
        </section>
      </div>
      <div>
        <PartnersBlock />
      </div>
    </>
  );
};
