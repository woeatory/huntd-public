import { Namespaces } from '@/controllers/i18n/i18n.typedefs';

export const ProfileNamespaces = [
  Namespaces.Profile,
  Namespaces.Validations,
  Namespaces.Form,
  Namespaces.Common,
  Namespaces.Dates,
];

export const ChooseProfileNamespaces = [
  Namespaces.Common,
  Namespaces.ChooseProfile,
];

export enum ProfileItemContent {
  Empty = 'Not filled'
}
