import {
  AllowNull,
  Column,
  DeletedAt,
  Table,
  Unique,
} from 'sequelize-typescript';
import { ModelBase } from '@/models/ModelBase';

@Table({
  tableName: 'job_experiences',
  paranoid: true,
})
export class JobExperience extends ModelBase<JobExperience> {
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
