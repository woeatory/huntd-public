import {
  AllowNull,
  Column, ForeignKey, HasMany,
  Table, BelongsTo, DeletedAt,
  Unique,
} from 'sequelize-typescript';
import { ModelBase } from '@/models/ModelBase';
import { CandidateProfileTechnology } from '@/models/CandidateProfileTechnology';
import { User } from '@/models/User';

@Table({
  tableName: 'technologies',
  paranoid: true,
})
export class Technology extends ModelBase<Technology> {
  @ForeignKey(() => User)
  @Column({
    field: 'creator_id',
  })
  creatorId: number;

  @BelongsTo(() => User)
  creator: User

  @HasMany(() => CandidateProfileTechnology)
  candidateProfileTechnologies: CandidateProfileTechnology[];

  @Unique
  @AllowNull(false)
  @Column
  name: string;

  @DeletedAt
  @Column({
    field: 'deleted_at',
  })
  deletedAt: Date
}
