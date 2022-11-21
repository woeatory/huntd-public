import { TFunction } from 'i18next';
import { EnglishLevel } from '@/controllers/graphql/generated';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { SelectOption } from '@/controllers/form/form.constants';

interface GetEnglishLevelsOptions {
  (englishLevels: EnglishLevel[], t: TFunction): SelectOption[];
}

export const getEnglishLevelsOptions: GetEnglishLevelsOptions = (
  englishLevels, t,
) => englishLevels.map(((englishLevel) => ({
  value: String(englishLevel.id),
  label: t(`${Namespaces.Form}:${englishLevel.slug}`),
})));
