import { SelectOption } from '@/components/FormElements/Select/Select.typedefs';

interface GetSubscriptionUrl {
  (
    specializations: string[] | null,
    technologies: SelectOption[] | null
  ): string;
}

export const generateSubscriptionTitle: GetSubscriptionUrl = (
  specializations,
  technologies,
) => {
  const titleMap = new Map<string, string>();

  if (specializations) {
    const [primarySpecialization] = specializations;

    titleMap.set('specialization', primarySpecialization);
  } else if (technologies) {
    const [primaryTechnology] = technologies;

    titleMap.set('technology', primaryTechnology.label);
  }

  if (!titleMap.size) {
    return 'My filter';
  }

  const [title] = titleMap.values();

  return title;
};
