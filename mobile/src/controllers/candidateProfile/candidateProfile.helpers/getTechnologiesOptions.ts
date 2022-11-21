import { Technology } from '@/controllers/graphql/generated';
import { SelectOption } from '@/controllers/form/form.constants';

interface GetTechnologiesOptions {
  (technologies: Technology[]): SelectOption[];
}

export const getTechnologiesOptions: GetTechnologiesOptions = (
  technologies,
) => technologies.map(((technology) => ({
  value: String(technology.id),
  label: technology.name,
})));
