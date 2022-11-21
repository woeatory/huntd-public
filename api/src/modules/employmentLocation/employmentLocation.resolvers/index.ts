import { employmentLocationsResolver } from '@/modules/employmentLocation/employmentLocation.resolvers/employmentLocations.resolver';

export const EmploymentLocationResolvers = {
  Query: {
    employmentLocations: employmentLocationsResolver,
  },
};
