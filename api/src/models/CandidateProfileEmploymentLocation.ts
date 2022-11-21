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
import { EmploymentLocation } from '@/models/EmploymentLocation';

@Table({
  tableName: 'candidate_profile_employment_locations',
})
export class CandidateProfileEmploymentLocation extends ModelBase<
  CandidateProfileEmploymentLocation
> {
  @AllowNull(false)
  @Index('candidate_profile_employment_locations_candidate_profile_id')
  @ForeignKey(() => CandidateProfile)
  @Column({
    field: 'candidate_profile_id',
  })
  candidateProfileId: number;

  @BelongsTo(() => CandidateProfile)
  candidateProfile: CandidateProfile;

  @AllowNull(false)
  @Index('candidate_profile_employment_locations_employment_location_id')
  @ForeignKey(() => EmploymentLocation)
  @Column({
    field: 'employment_location_id',
  })
  employmentLocationId: number;

  @BelongsTo(() => EmploymentLocation)
  employmentLocation: EmploymentLocation;
}
