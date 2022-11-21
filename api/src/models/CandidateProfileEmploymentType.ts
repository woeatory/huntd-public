import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  Index,
  Table,
} from 'sequelize-typescript';
import { ModelBase } from '@/models/ModelBase';
import { CandidateProfile } from '@/models/CandidateProfile';
import { EmploymentType } from '@/models/EmploymentType';

@Table({
  tableName: 'candidate_profile_employment_types',
})
export class CandidateProfileEmploymentType extends ModelBase<
  CandidateProfileEmploymentType
> {
  @AllowNull(false)
  @Index('candidate_profile_employment_types_candidate_profile_id')
  @ForeignKey(() => CandidateProfile)
  @Column({
    field: 'candidate_profile_id',
  })
  candidateProfileId: number;

  @BelongsTo(() => CandidateProfile)
  candidateProfile: CandidateProfile;

  @AllowNull(false)
  @Index('candidate_profile_employment_types_employment_type_id')
  @ForeignKey(() => EmploymentType)
  @Column({
    field: 'employment_type_id',
  })
  employmentTypeId: number;

  @BelongsTo(() => EmploymentType)
  employmentType: EmploymentType;
}
