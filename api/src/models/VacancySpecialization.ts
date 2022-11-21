import {
  AllowNull, BelongsTo,
  Column, ForeignKey, Index,
  Table,
} from 'sequelize-typescript';
import { ModelBase } from '@/models/ModelBase';
import { Vacancy } from '@/models/Vacancy';
import { Specialization } from '@/models/Specialization';

@Table({
  tableName: 'vacancy_specializations',
})
export class VacancySpecialization extends ModelBase<VacancySpecialization> {
  @AllowNull(false)
  @Index('vacancy_specializations_vacancy_id')
  @ForeignKey(() => Vacancy)
  @Column({
    field: 'vacancy_id',
  })
  vacancyId: number;

  @BelongsTo(() => Vacancy)
  vacancy: Vacancy;

  @AllowNull(false)
  @Index('vacancy_specializations_specialization_id')
  @ForeignKey(() => Specialization)
  @Column({
    field: 'specialization_id',
  })
  specializationId: number;

  @BelongsTo(() => Specialization)
  specialization: Specialization;
}
