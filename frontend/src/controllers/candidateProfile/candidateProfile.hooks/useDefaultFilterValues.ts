import { useRouter } from 'next/router';
import { TechnologyBaseFragment } from '@/controllers/graphql/generated';
import { FormDataValues } from '@/components/Profile/ProfilesListModule/Filters/Filters';
import { SelectOption } from '@/components/FormElements/Select/Select.typedefs';
import { useQueryBuilder } from '@/controllers/candidateProfile/candidateProfile.hooks/useQueryBuilder';

interface DefaultFilterValuesHook {
  (props: Props): Partial<FormDataValues>
}

interface Props {
  technologiesData?: TechnologyBaseFragment[]
}

export const useDefaultFilterValues: DefaultFilterValuesHook = ({
  technologiesData,
}) => {
  const router = useRouter();
  const {
    whereClause: { technologiesIds },
  } = useQueryBuilder(router.query);

  let technologies: SelectOption[] = [];

  if (technologiesData && technologiesIds) {
    technologies = technologiesIds
      .map(
        (id) => {
          const technology = technologiesData.find((tech) => tech.id === id);

          if (technology) {
            return {
              value: `${technology?.id}`,
              label: technology?.name,
            };
          }

          return null;
        },
      ).filter(Boolean) as SelectOption[];
  }

  return {
    technologies,
  };
};
