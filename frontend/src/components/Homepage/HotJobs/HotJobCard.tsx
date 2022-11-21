import React, { FC } from 'react';
import cn from 'classnames';
import { Vacancy } from '@/controllers/graphql/generated';
import { Button } from '@/ui/buttons/Button';
import { Image } from '@/components/Base/Image/Image';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { UseVacancyMetaItems } from '@/controllers/vacancy/vacancy.hooks/useVacancyMetaItems';
import typography from '@/ui/typography/typography.module.scss';
import styles from '@/components/Homepage/HotJobs/HotJobCard.module.scss';
import { IconFire } from '@/ui/icons/general/FireIcon';

interface Props {
  vacancy: Vacancy
  handleDetailsClick: (vacancy: Vacancy) => void
}

export const HotJobCard: FC<Props> = (props) => {
  const { vacancy, handleDetailsClick } = props;

  const details = UseVacancyMetaItems(vacancy);

  const { t } = useTranslation([
    Namespaces.Home,
    Namespaces.Common,
  ]);

  return (
    <div
      className={cn(styles.jobCard, 'cell medium-6 large-3')}
      key={vacancy.id}
    >
      <div className={cn(styles.jobHeader, 'mb-24')}>
        {vacancy.companyLogo?.url
          ? (
            <div className={cn(styles.logo, 'mr-16')}>
              <Image
                src={vacancy.companyLogo.url}
                alt="company logo"
                height={48}
                width={48}
              />
            </div>
          )
          : (
            <div className={cn(styles.logo, 'mr-16')} />
          )}

        <div className={styles.companyInfo}>
          <div
            className={cn(
              styles.companyNameContainer,
              typography.smallText,
              'c-gray',
            )}
          >
            <h4 className={styles.jobCompany}>
              {vacancy.companyName}
            </h4>
            <span className={styles.topLabel}>
              <IconFire />
            </span>
          </div>

          <h3 className={typography.text}>
            {vacancy.jobTitle}
          </h3>
        </div>
      </div>

      <div className='mb-16'>
        <ul
          className={cn(
            styles.requirementsList,
            typography.smallText,
            'c-gray mb-8',
          )}
        >
          {details.map((item) => (
            <li
              key={item}
              className={styles.requirementItem}
            >
              {item}
            </li>
          ))}
        </ul>

        <span className={cn('c-citrus mb-16', typography.smallCaption)}>
          {vacancy.salaryFrom && (
            `${t(`${Namespaces.Common}:usd_sign`)} ${vacancy.salaryFrom}`
          )}
          {vacancy.salaryFrom && vacancy.salaryTo && (
            <span> - </span>
          )}
          {vacancy.salaryTo && (
            `${t(`${Namespaces.Common}:usd_sign`)} ${vacancy.salaryTo}`
          )}
        </span>
      </div>

      <Button
        mode={Button.mode.Primary}
        size={Button.size.SmallWide}
        className={cn('wide', styles.detailsButton)}
        type="button"
        onClick={() => handleDetailsClick(vacancy)}
        text={t(`${Namespaces.Home}:appy_to_hot_job`)}
      />
    </div>
  );
};
