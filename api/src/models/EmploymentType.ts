import {
  AllowNull,
  Column,
  DeletedAt,
  Table,
  Unique,
} from 'sequelize-typescript';
import { ModelBase } from '@/models/ModelBase';

@Table({
  tableName: 'employment_types',
  paranoid: true,
})
export class EmploymentType extends ModelBase<EmploymentType> {
  @AllowNull(false)
  @Unique
  @Column
  slug: string;

  @Column
  order: number;

  @DeletedAt
  @Column({
    field: 'deleted_at',
  })
  deletedAt: Date
}
