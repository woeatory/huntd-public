import React from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { Logo } from '@/components/Base/Logo';
import { Link } from '@/controllers/i18n/i18n.client';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { TermsAndConditionsRoutes, Routes } from '@/controllers/router/router.constants';
import { SocialNetworks } from '@/components/Base/SocialLink/SocialLink.constants';
import { SocialLink } from '@/components/Base/SocialLink/SocialLink';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';
import styles from './Footer.module.scss';
import { getShouldNavLinksBeVisible } from '../Header/getShouldNavLinksBeVisible';
import { SEOSection } from './SEOSection';

export const Footer = () => {
  const { t } = useTranslation([Namespaces.Common]);
  const { pathname } = useRouter();

  const [user] = useAuthUser();

  const shouldLogoBeActive = getShouldNavLinksBeVisible(user, pathname);

  return (
    <footer className={styles.footer}>
      <div className="grid-container">
        <SEOSection />
        <div className="grid-x grid-margin-x">
          <div className="cell large-3 medium-4 medium-mb-32">
            <Logo
              className={styles.footerLogo}
              shouldLogoBeActive={shouldLogoBeActive}
            />
            <div className={styles.footerSocials}>
              {SocialNetworks.map((el) => (
                <SocialLink
                  key={el.title}
                  link={el.link}
                  title={el.title}
                >
                  <el.Icon />
                </SocialLink>
              ))}
            </div>
          </div>
          <div className="cell large-3 medium-4 small-mb-32">
            <div className={styles.footerList}>
              <Link href={TermsAndConditionsRoutes.Terms}>
                <a
                  className={cn(styles.footerLink, styles.footerListItem)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t(`${Namespaces.Common}:terms_of_use`)}
                </a>
              </Link>
              <Link href={TermsAndConditionsRoutes.Cookies}>
                <a
                  className={cn(styles.footerLink, styles.footerListItem)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t(`${Namespaces.Common}:cookies_policy`)}
                </a>
              </Link>
              <Link href={TermsAndConditionsRoutes.Privacy}>
                <a
                  className={cn(styles.footerLink, styles.footerListItem)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t(`${Namespaces.Common}:privacy_policy`)}
                </a>
              </Link>
            </div>
          </div>
          <div className="cell large-3 medium-4 small-mb-32">
            <div className={styles.footerList}>
              <Link href={Routes.AboutUs}>
                <a className={cn(styles.footerLink, styles.footerListItem)}>
                  {t(`${Namespaces.Common}:about_us`)}
                </a>
              </Link>
              <Link href={Routes.FAQ}>
                <a className={cn(styles.footerLink, styles.footerListItem)}>
                  {t(`${Namespaces.Common}:faqs`)}
                </a>
              </Link>
              <Link href={Routes.Pricing}>
                <a className={cn(styles.footerLink, styles.footerListItem)}>
                  {t(`${Namespaces.Common}:pricing`)}
                </a>
              </Link>
            </div>
          </div>

          <div className={cn('cell large-3', styles.copyright)}>
            <div className={styles.footerList}>
              <p className={styles.footerListItem}>
                {t(`${Namespaces.Common}:copyright`, {
                  year: new Date().getFullYear(),
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
