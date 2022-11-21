import {
  Column, DataType, Index, Table,
} from 'sequelize-typescript';
import { ModelBase } from '@/models/ModelBase';

@Table({
  tableName: 'translates',
})
export class Translate extends ModelBase<Translate> {
  @Index('translates_code_language')
  @Column
  code: string;

  @Index('translates_namespace_language')
  @Column
  namespace: string;

  @Column({
    type: DataType.TEXT,
  })
  value: string;

  @Index('translates_code_language')
  @Index('translates_namespace_language')
  @Column
  language: string;
}
