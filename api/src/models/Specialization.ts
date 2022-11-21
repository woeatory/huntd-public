import {
  Column,
  Index,
  Table,
  DeletedAt,
} from 'sequelize-typescript';
import { ModelBase } from '@/models/ModelBase';

@Table({
  tableName: 'specializations',
  paranoid: true,
})
export class Specialization extends ModelBase<Specialization> {
  @Index({
    name: 'index_specializations_on_name',
  })
  @Column
  name: string;

  @DeletedAt
  @Column({
    field: 'deleted_at',
  })
  deletedAt: Date
}
