import { Namespaces } from '@/controllers/i18n/i18n.typedefs';

export enum SalaryRange {
  Min = 0,
  Max = 10000,
  Step = 100,
  StepAnnual = 125,
}

export enum TimezoneRange {
  Min = -12,
  Max = 12,
  Step = 1,
}

export const SIGN_UP_BENEFITS = [
  `${Namespaces.Common}:not_authorized_filters_flexible_benefit`,
  `${Namespaces.Common}:not_authorized_filters_full_list_benefit`,
  `${Namespaces.Common}:not_authorized_filters_top_benefit`,
];
