import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  DeletedAt,
  ForeignKey,
  HasMany,
  Index,
  Table, Unique,
} from 'sequelize-typescript';
import { User } from '@/models/User';
import { CandidateProfileStatusEnum } from '@/modules/candidateProfile/candidateProfile.typedefs';
import { ProfileConnection } from '@/models/ProfileConnection';
import { ModelBase } from '@/models/ModelBase';
import { CandidateProfileTechnology } from '@/models/CandidateProfileTechnology';
import { Specialization } from '@/models/Specialization';
import { EnglishLevel } from '@/models/EnglishLevel';
import { JobExperience } from '@/models/JobExperience';
import { CandidateProfileEmploymentType } from '@/models/CandidateProfileEmploymentType';
import { CandidateProfileCity } from '@/models/CandidateProfileCity';
import { CandidateProfileEmploymentLocation } from '@/models/CandidateProfileEmploymentLocation';
import { CandidateProfileWorkPlace } from '@/models/CandidateProfileWorkPlace';
import { CandidateProfileSpecialization } from './CandidateProfileSpecialization';

@Table({
  tableName: 'candidate_profiles',
  paranoid: true,
})
export class CandidateProfile extends ModelBase<CandidateProfile> {
  @HasMany(() => ProfileConnection)
  profileConnections: ProfileConnection[];

  @HasMany(() => CandidateProfileTechnology)
  candidateProfileTechnologies: CandidateProfileTechnology[];

  @HasMany(() => CandidateProfileSpecialization)
  candidateProfileSpecializations: CandidateProfileSpecialization[];

  @HasMany(() => CandidateProfileEmploymentType)
  candidateProfileEmploymentTypes: CandidateProfileEmploymentType[];

  @HasMany(() => CandidateProfileEmploymentLocation)
  candidateProfileEmploymentLocations: CandidateProfileEmploymentLocation[];

  @HasMany(() => CandidateProfileCity)
  candidateProfileCities: CandidateProfileCity[];

  @HasMany(() => CandidateProfileWorkPlace)
  candidateProfileWorkPlaces: CandidateProfileWorkPlace[];

  @ForeignKey(() => EnglishLevel)
  @Column({
    field: 'english_level_id',
  })
  englishLevelId: number;

  @BelongsTo(() => EnglishLevel)
  englishLevel: EnglishLevel;

  @ForeignKey(() => JobExperience)
  @Column({
    field: 'job_experience_id',
  })
  jobExperienceId: number;

  @BelongsTo(() => JobExperience)
  jobExperience: JobExperience;

  @Index('candidate_profiles_user_id')
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({
    field: 'user_id',
  })
  userId: number;

  @BelongsTo(() => User)
  user: User

  @Index('candidate_profiles_specialization_id')
  @ForeignKey(() => Specialization)
  @Column({
    field: 'specialization_id',
  })
  specializationId: number;

  @BelongsTo(() => Specialization)
  specialization: Specialization

  @Default(CandidateProfileStatusEnum.Draft)
  @Column({
    type: DataType.ENUM(...Object.values(CandidateProfileStatusEnum)),
  })
  status: CandidateProfileStatusEnum;

  @Column({
    type: DataType.ENUM(...Object.values(CandidateProfileStatusEnum)),
    field: 'deactivation_status',
  })
  deactivationStatus: CandidateProfileStatusEnum;

  @Column({
    field: 'reject_reason',
  })
  rejectReason: string;

  @Column
  position: string;

  @Column({
    type: DataType.FLOAT,
  })
  salary: number;

  @Column({
    type: DataType.TEXT,
    field: 'candidate_description',
  })
  candidateDescription: string;

  @Column({
    type: DataType.TEXT,
    field: 'experience_description',
  })
  experienceDescription: string;

  @Column({
    type: DataType.TEXT,
    field: 'work_expectations',
  })
  workExpectations: string;

  @Column({
    type: DataType.TEXT,
  })
  achievements: string;

  @Unique
  @Column
  slug: string

  @DeletedAt
  @Column({
    field: 'deleted_at',
  })
  deletedAt: Date
}
