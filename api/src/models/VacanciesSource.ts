import {
  AllowNull,
  BelongsTo,
  Column,
  DeletedAt,
  ForeignKey,
  HasMany,
  Index,
  Table,
  Unique,
} from 'sequelize-typescript';
import { ModelBase } from '@/models/ModelBase';
import { Vacancy } from './Vacancy';
import { User } from './User';

@Table({
  tableName: 'vacancies_sources',
  paranoid: true,
})
export class VacanciesSource extends ModelBase<VacanciesSource> {
  @HasMany(() => Vacancy)
  vacancies: Vacancy[];

  @AllowNull(false)
  @ForeignKey(() => User)
  @Index('vacancies_sources_user_id')
  @Column({
    field: 'user_id',
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @AllowNull(false)
  @Unique
  @Column
  url: string;

  @DeletedAt
  @Column({
    field: 'deleted_at',
  })
  deletedAt: Date
}
