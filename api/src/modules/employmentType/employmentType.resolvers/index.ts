import { employmentTypesResolver } from '@/modules/employmentType/employmentType.resolvers/employmentTypes.resolver';

export const EmploymentTypeResolvers = {
  Query: {
    employmentTypes: employmentTypesResolver,
  },
};
