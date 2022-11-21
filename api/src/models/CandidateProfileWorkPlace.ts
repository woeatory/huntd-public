import {
  AllowNull, BelongsTo, Column, DeletedAt,
  ForeignKey, Index, Table,
} from 'sequelize-typescript';
import { ModelBase } from '@/models/ModelBase';
import { CandidateProfile } from '@/models/CandidateProfile';

@Table({
  tableName: 'candidate_profile_work_places',
  paranoid: true,
})
export class CandidateProfileWorkPlace extends ModelBase<
  CandidateProfileWorkPlace
> {
  @AllowNull(false)
  @Index('candidate_profile_work_places_candidate_profile_id')
  @ForeignKey(() => CandidateProfile)
  @Column({
    field: 'candidate_profile_id',
  })
  candidateProfileId: number;

  @BelongsTo(() => CandidateProfile)
  candidateProfile: CandidateProfile;

  @AllowNull(false)
  @Column({
    field: 'company_name',
  })
  companyName: string;

  @Column({
    field: 'company_url',
  })
  companyUrl: string;

  @Column({
    field: 'company_size_from',
  })
  companySizeFrom: number;

  @Column({
    field: 'company_size_to',
  })
  companySizeTo: number;

  @Column({
    field: 'company_industry',
  })
  companyIndustry: string;

  @Column({
    field: 'company_categories',
  })
  companyCategories: string;

  @Column({
    field: 'company_specialities',
  })
  companySpecialities: string;

  @Column({
    field: 'company_funding_type',
  })
  companyFundingType: string;

  @AllowNull(false)
  @Column({
    field: 'title',
  })
  title: string;

  @Column({
    field: 'description',
  })
  description: string;

  @AllowNull(false)
  @Column({
    field: 'start_date',
  })
  startDate: Date;

  @Column({
    field: 'end_date',
  })
  endDate: Date;

  @DeletedAt
  @Column({
    field: 'deleted_at',
  })
  deletedAt: Date;
}
