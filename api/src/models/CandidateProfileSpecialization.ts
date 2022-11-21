import {
  AllowNull, BelongsTo,
  Column, ForeignKey, Index,
  Table,
} from 'sequelize-typescript';
import { ModelBase } from '@/models/ModelBase';
import { CandidateProfile } from '@/models/CandidateProfile';
import { Specialization } from '@/models/Specialization';

@Table({
  tableName: 'candidate_profile_specializations',
})
export class CandidateProfileSpecialization extends ModelBase<
  CandidateProfileSpecialization
> {
  @AllowNull(false)
  @Index('candidate_profile_specializations_candidate_profile_id')
  @ForeignKey(() => CandidateProfile)
  @Column({
    field: 'candidate_profile_id',
    unique: 'unique_profile_specialization',
  })
  candidateProfileId: number;

  @BelongsTo(() => CandidateProfile)
  candidateProfile: CandidateProfile;

  @AllowNull(false)
  @Index('candidate_profile_specializations_specialization_id')
  @ForeignKey(() => Specialization)
  @Column({
    field: 'specialization_id',
    unique: 'unique_profile_specialization',
  })
  specializationId: number;

  @BelongsTo(() => Specialization)
  specialization: Specialization;
}
