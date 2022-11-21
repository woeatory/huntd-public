import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';

export const useCandidateProfileWorkPlaceDuration = () => {
  const { t } = useTranslation([Namespaces.Profile, Namespaces.Dates]);

  return (startDate: string, endDate?: string | null) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();

    const startMonth = start.getMonth();
    const startYear = start.getFullYear();
    const endMonth = end.getMonth();
    const endYear = end.getFullYear();

    const yearsDuration = endYear - startYear;
    const monthsDuration = endMonth - startMonth + 1;
    const totalMonths = yearsDuration * 12 + monthsDuration;

    const yearsToDisplay = totalMonths >= 12
      ? Math.floor(totalMonths / 12)
      : 0;
    const monthsToDisplay = totalMonths - yearsToDisplay * 12;

    const monthsString = monthsToDisplay !== 0
      ? `${t(`${Namespaces.Profile}:month`, { count: monthsToDisplay })}`
      : '';

    const yearsString = yearsToDisplay !== 0
      ? `${t(`${Namespaces.Profile}:year`, { count: yearsToDisplay })} `
      : '';

    const duration = yearsString + monthsString;

    const startDateToDisplay = `${t(`${Namespaces.Dates}:month_code_${startMonth}`).slice(0, 3)} ${startYear}`;

    const endDateTiDisplay = endDate
      ? `${t(`${Namespaces.Dates}:month_code_${endMonth}`).slice(0, 3)} ${endYear}`
      : t(`${Namespaces.Profile}:current_time`);

    return {
      duration,
      workPlaceDate: `${startDateToDisplay} - ${endDateTiDisplay}`,
    };
  };
};
