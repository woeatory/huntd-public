import React from 'react';
import { FAQ } from '@/components/GeneralContent/FAQ/FAQ';
import { PricingModule } from '@/components/GeneralContent/PricingModule/PricingModule';
import styles from './GeneralContent.module.scss';

export const GeneralContent = () => (
  <>
    <div className="grid-container">
      <div className={styles.section}>
        <PricingModule />
      </div>
    </div>
    <div className={styles.faqSection}>
      <div className="grid-container">
        <div className={styles.section} id="faq">
          <FAQ />
        </div>
      </div>
    </div>
  </>
);
