import { specializationsResolver } from '@/modules/specialization/specialization.resolvers/specializations.resolver';

export const SpecializationResolvers = {
  Query: {
    specializations: specializationsResolver,
  },
};
