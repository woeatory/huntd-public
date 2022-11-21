import { Repository } from '@/core/Repository';

export class FeatureRepository extends Repository {
  async findAllFeatures() {
    return this.models.Feature.findAll({ raw: true });
  }

  async findFeatureByName(name: string) {
    return this.models.Feature.findOne({
      where: {
        name,
      },
      raw: true,
    });
  }
}
