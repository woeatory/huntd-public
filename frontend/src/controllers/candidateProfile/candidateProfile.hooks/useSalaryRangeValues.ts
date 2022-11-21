import { useMemo } from 'react';
import { SalaryRange } from '@/components/Profile/ProfilesListModule/Filters';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { SalaryMultipliers, SliderValues } from '@/components/Profile/ProfilesListModule/Filters/SalaryFilterInput';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';

interface RangeTiltesProps {
  (
    sliderValues: SliderValues,
    salaryMultiplier: SalaryMultipliers
  ): RangeTitlesResult
}

interface RangeTitlesResult {
  valueFrom: string;
  valueTo: string;
}

export const useSalaryRangeTitles: RangeTiltesProps = (
  sliderValues, salaryMultiplier,
) => {
  const { t } = useTranslation([Namespaces.Common]);

  const [valueFrom, valueTo] = useMemo(() => [
    sliderValues.salaryFrom,
    sliderValues.salaryTo,
  ].sort((a, b) => a - b)
    .map((value, index, arr) => {
      const currentValue = value * salaryMultiplier;

      if (
        (value === SalaryRange.Max)
        && index === arr.length - 1
      ) {
        return `${t(`${Namespaces.Common}:usd_sign`)}${currentValue}+`;
      }

      if (
        (value === SalaryRange.Max)
        && index === 0
      ) {
        return ``;
      }

      if (index === arr.length - 1) {
        return `${t(`${Namespaces.Common}:usd_sign`)}${currentValue}`;
      }

      return `${t(`${Namespaces.Common}:usd_sign`)}${currentValue} - `;
    }), [sliderValues, t, salaryMultiplier]);

  return {
    valueFrom,
    valueTo,
  };
};
