import { Feature } from '@/models/Feature';
import { FeatureStatusEnum } from '@/modules/feature/feature.typedefs';

export const FEATURES = {
  candidatesPagination: 'candidates_pagination',
  preferableRoles: 'preferable_roles',
  companyInfo: 'workplace_company_info',
  jobsPagination: 'jobs_pagination',
};

type FeaturesList = typeof FEATURES;

export interface FeaturesTool extends FeaturesList {
  isEnabled(name: string): boolean;
}

export const initFeatures = async (): Promise<FeaturesTool> => {
  const features = await Feature.findAll({ raw: true });

  const featuresMap = features.reduce<Record<string, boolean>>(
    (acc, feature) => ({
      ...acc,
      [feature.name]: feature.status === FeatureStatusEnum.Enabled,
    }),
    {},
  );

  return {
    isEnabled(name: string) {
      return featuresMap[name] || false;
    },
    ...FEATURES,
  };
};
