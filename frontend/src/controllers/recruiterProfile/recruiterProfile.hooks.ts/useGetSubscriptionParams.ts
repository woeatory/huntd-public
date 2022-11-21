import { useCallback } from 'react';
import {
  UsersSearchSubscription,
} from '@/controllers/graphql/generated';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';

export const useGetSubscriptionParams = () => {
  const { t } = useTranslation([
    Namespaces.Profile,
    Namespaces.Form,
    Namespaces.Common,
  ]);

  const getSubscriptionParams = useCallback(
    (subscription: UsersSearchSubscription) => {
      const {
        searchParams: {
          cities, countries, salaryTo, salaryFrom,
        },
        stringifiedSearchParams: {
          technologies, employmentTypes,
          jobExperiences, englishLevels,
        },
      } = subscription;

      const subscriptionFieldsMap: string[] = [];

      if (technologies) {
        const technologiesNames = technologies
          .map((tech) => tech.name);

        subscriptionFieldsMap.push(technologiesNames.join(', '));
      }

      if (salaryTo || salaryFrom) {
        let salaryString = '';

        if (salaryFrom) {
          salaryString += `${t(`${Namespaces.Common}:usd_sign`)}${salaryFrom}`;
        }

        if (salaryTo) {
          if (salaryString) {
            salaryString += ` - ${t(`${Namespaces.Common}:usd_sign`)}${salaryTo}`;
          } else {
            salaryString += `${t(`${Namespaces.Profile}:subscription_salary_up_to`)}
              ${t(`${Namespaces.Common}:usd_sign`)}${salaryTo}`;
          }
        } else {
          salaryString += '+';
        }

        subscriptionFieldsMap.push(salaryString);
      }

      if (jobExperiences) {
        const experiencesNames = jobExperiences
          .map((jobExp) => t<string>(`${Namespaces.Form}:${jobExp.slug}`).trim());

        subscriptionFieldsMap.push(experiencesNames.join(', '));
      }

      if (cities) {
        subscriptionFieldsMap.push(cities.join(', '));
      }

      if (countries) {
        subscriptionFieldsMap.push(countries.join(', '));
      }

      if (employmentTypes) {
        const typesNames = employmentTypes
          .map((type) => type.slug);

        subscriptionFieldsMap.push(typesNames.join(', '));
      }

      if (englishLevels) {
        const levelsNames = englishLevels
          .map((level) => t<string>(`${Namespaces.Form}:${level.slug}`));

        subscriptionFieldsMap.push(levelsNames.join(', '));
      }

      return subscriptionFieldsMap;
    }, [t],
  );

  return {
    getSubscriptionParams,
  };
};
