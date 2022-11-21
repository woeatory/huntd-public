import { Specialization } from '@/controllers/graphql/generated';
import { SelectOption } from '@/controllers/form/form.constants';

interface GetSpecializationOptions {
  (specializations: Specialization[]): SelectOption[];
}

export const getSpecializationOptions: GetSpecializationOptions = (
  specializations,
) => specializations.map(((specialization) => ({
  value: String(specialization.id),
  label: specialization.name.toUpperCase(),
})));
