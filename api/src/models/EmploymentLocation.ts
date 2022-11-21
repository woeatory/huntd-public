import {
  AllowNull,
  Column,
  DeletedAt,
  Table,
  Unique,
} from 'sequelize-typescript';
import { ModelBase } from '@/models/ModelBase';

@Table({
  tableName: 'employment_locations',
  paranoid: true,
})
export class EmploymentLocation extends ModelBase<EmploymentLocation> {
  @AllowNull(false)
  @Unique
  @Column
  slug: string;

  @DeletedAt
  @Column({
    field: 'deleted_at',
  })
  deletedAt: Date
}
