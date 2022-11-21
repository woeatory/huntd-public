import {
  AllowNull,
  Column,
  DeletedAt,
  Table,
  Unique,
} from 'sequelize-typescript';
import { ModelBase } from '@/models/ModelBase';

@Table({
  tableName: 'english_levels',
  paranoid: true,
})
export class EnglishLevel extends ModelBase<EnglishLevel> {
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
