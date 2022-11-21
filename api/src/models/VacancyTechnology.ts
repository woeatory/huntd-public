import {
  AllowNull, BelongsTo,
  Column, ForeignKey, Index,
  Table,
} from 'sequelize-typescript';
import { ModelBase } from '@/models/ModelBase';
import { Technology } from '@/models/Technology';
import { Vacancy } from '@/models/Vacancy';

@Table({
  tableName: 'vacancy_technologies',
})
export class VacancyTechnology extends ModelBase<VacancyTechnology> {
  @AllowNull(false)
  @Index('vacancy_technologies_vacancy_id')
  @ForeignKey(() => Vacancy)
  @Column({
    field: 'vacancy_id',
  })
  vacancyId: number;

  @BelongsTo(() => Vacancy)
  vacancy: Vacancy;

  @AllowNull(false)
  @Index('vacancy_technologies_technology_id')
  @ForeignKey(() => Technology)
  @Column({
    field: 'technology_id',
  })
  technologyId: number;

  @BelongsTo(() => Technology)
  technology: Technology;
}
