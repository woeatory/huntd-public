import React, { useCallback } from 'react';
import { FancySelectorItem } from '@/components/Base/FancySelectorItem';
import { Link } from '@/controllers/i18n/i18n.client';
import { VacanciesRoutes } from '@/controllers/router/router.constants';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { analytics } from '@/controllers/analytics/analytics.client';
import { VacancySourceType } from '@/controllers/graphql/generated';
import { IconGreenhouse } from '@/ui/icons/general/IconGreenhouse';
import { IconLever } from '@/ui/icons/general/IconLever';

export const ATSSelectorModule = () => {
  const { t } = useTranslation([Namespaces.Ats]);

  const sendATSChosenEvent = useCallback(
    (sourceType: VacancySourceType) => {
      analytics.sendEvent(
        analytics.events.vacancies.ATSTypeChosen,
        { sourceType },
      );

      analytics.setUserProperties({
        preferredAts: sourceType,
      });
    }, [],
  );

  return (
    <div className="grid-container">
      <div className="grid-x grid-margin-x">
        <div className="cell large-6 large-offset-3">
          <Link href={VacanciesRoutes.GreenhouseSetup} passHref>
            <FancySelectorItem
              overhead={t(`${Namespaces.Ats}:ats_picker_overhead`)}
              content={t(`${Namespaces.Ats}:greenhouse_title`)}
              className="mb-32"
              onClick={() => sendATSChosenEvent(VacancySourceType.Greenhouse)}
              renderIcon={() => <IconGreenhouse />}
            />
          </Link>

          <Link href={VacanciesRoutes.LeverSetup} passHref>
            <FancySelectorItem
              overhead={t(`${Namespaces.Ats}:ats_picker_overhead`)}
              content={t(`${Namespaces.Ats}:lever_title`)}
              onClick={() => sendATSChosenEvent(VacancySourceType.Lever)}
              renderIcon={() => <IconLever />}
            />
          </Link>
        </div>
      </div>
    </div>

  );
};
