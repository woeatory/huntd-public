import React from 'react';
import cn from 'classnames';
import typography from '@/ui/typography/typography.module.scss';
import styles from '@/components/OurTeam/OurTeam.module.scss';
import data from './OurTeam.content.json';

// TODO: remove hardcoded array and use database instead;
export const OurTeam = () => (
  <div className="grid-container mt-80 medium-mt-40">
    <h1 className={cn(typography.h1, 'mb-40 small-mb-24')}>
      Our team
    </h1>

    <div className="mb-128 medium-mb-64 small-mb-32">
      <div className="grid-x grid-margin-x">
        {data.map((member) => (
          <div key={member.id} className="cell large-3 small-6 mb-56 small-mb-40">
            <h2 className={cn(styles.cardHeader, 'mb-16')}>
              {member.firstName}
              <br />
              {member.lastName}
            </h2>
            <div className="mb-16">
              <img
                className={styles.cardImage}
                src={member.photo}
                alt={member.fullName}
                loading="lazy"
              />
            </div>
            <span className={styles.cardJobTitle}>
              {member.jobTitle}
            </span>
          </div>
        ))}
      </div>
    </div>

  </div>
);
