import { featuresResolver } from '@/modules/feature/feature.resolvers/features.resolver';
import { featureResolver } from '@/modules/feature/feature.resolvers/feature.resolver';

export const FeatureResolvers = {
  Query: {
    features: featuresResolver,
    feature: featureResolver,
  },
};
