import React, { AnchorHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import cn from 'classnames';
import { Link } from '@/controllers/i18n/i18n.client';
import { Routes } from '@/controllers/router/router.constants';
import { IconLogo } from '@/ui/icons/custom/IconLogo';
import styles from './Logo.module.scss';

type Props = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement
> & { shouldLogoBeActive: boolean };

export const Logo: FC<Props> = (props) => {
  const { className, shouldLogoBeActive, ...rest } = props;

  return (
    <>
      {shouldLogoBeActive ? (
        <Link href={Routes.Home}>
          <a
            title="Huntd"
            aria-label="Huntd"
            className={cn(styles.logo, 'logo', className)}
            {...rest}
          >
            <IconLogo />
          </a>
        </Link>
      ) : (
        <span className={cn(styles.logo, 'logo', className)}>
          <IconLogo />
        </span>
      )}
    </>
  );
};
