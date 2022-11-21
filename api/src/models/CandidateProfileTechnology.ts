import {
  AllowNull, BelongsTo,
  Column, ForeignKey, Index,
  Table,
} from 'sequelize-typescript';
import { ModelBase } from '@/models/ModelBase';
import { CandidateProfile } from '@/models/CandidateProfile';
import { Technology } from '@/models/Technology';

@Table({
  tableName: 'candidate_profile_technologies',
})
export class CandidateProfileTechnology extends ModelBase<
  CandidateProfileTechnology
> {
  @AllowNull(false)
  @Index('candidate_profile_technologies_candidate_profile_id')
  @ForeignKey(() => CandidateProfile)
  @Column({
    field: 'candidate_profile_id',
  })
  candidateProfileId: number;

  @BelongsTo(() => CandidateProfile)
  candidateProfile: CandidateProfile;

  @AllowNull(false)
  @Index('candidate_profile_technologies_technology_id')
  @ForeignKey(() => Technology)
  @Column({
    field: 'technology_id',
  })
  technologyId: number;

  @BelongsTo(() => Technology)
  technology: Technology;
}
