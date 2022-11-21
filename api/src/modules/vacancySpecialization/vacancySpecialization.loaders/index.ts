import { Models } from '@/models';
import { SpecializationByVacancyIdLoader } from '@/modules/vacancySpecialization/vacancySpecialization.loaders/SpecializationByVacancyId.loader';

export const initVacancySpecializationLoaders = (models: Models) => ({
  specializationByVacancyId: new SpecializationByVacancyIdLoader(models),
});
