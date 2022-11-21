import React, { FC } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { VacanciesRoutes } from '@/controllers/router/router.constants';
import styles from './Web3Companies.module.scss';
import { Image } from '../Base/Image/Image';

interface Props {
  company: Company,
}

interface Company {
  companyName: string,
  logoUrl?: string,
  devLogoUrl?: string,
}

export const CompanyCard: FC<Props> = ({ company }) => {
  const { companyName, logoUrl, devLogoUrl } = company;
  const companyNamePart = companyName.toLowerCase().split(' ').join('-');
  const redirectUrl = `${VacanciesRoutes.Company}/${companyNamePart}`;

  return (
    <div className={cn(styles.companyWrapper)}>
      <Link href={redirectUrl}>
        <a className={styles.companyLogoContainer}>
          {(logoUrl && devLogoUrl) && (
            <Image
              className={styles.companyLogo}
              src={process.env.NODE_ENV === 'production' ? logoUrl : devLogoUrl}
              alt={companyName}
              width="48"
              height="48"
            />
          )}

        </a>
      </Link>

      <h3 className={styles.companyTitle}>{companyName}</h3>
    </div>
  );
};
