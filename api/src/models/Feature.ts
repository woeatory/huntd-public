import {
  Table,
  AllowNull,
  Column,
  DataType,
} from 'sequelize-typescript';
import { FeatureStatusEnum } from '@/modules/feature/feature.typedefs';
import { ModelBase } from '@/models/ModelBase';

@Table({
  tableName: 'features',
})
export class Feature extends ModelBase<Feature> {
  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  description: string;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(...Object.values(FeatureStatusEnum)),
  })
  status: FeatureStatusEnum;
}
