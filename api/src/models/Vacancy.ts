import {
  AllowNull,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  DeletedAt,
  ForeignKey,
  HasMany,
  Index,
  Table,
  Default,
  Unique,
} from 'sequelize-typescript';
import { ModelBase } from '@/models/ModelBase';
import { EnglishLevel } from '@/models/EnglishLevel';
import { JobExperience } from '@/models/JobExperience';
import { VacancyCategoryEnum, VacancyStatusEnum, VacancyTypeEnum } from '@/modules/vacancy/vacancy.typedefs';
import { VacancyTechnology } from '@/models/VacancyTechnology';
import { VacancySpecialization } from '@/models/VacancySpecialization';
import { UploadFile } from '@/models/UploadFile';
import { UploadFileMorph } from '@/models/UploadFileMorph';
import { User } from './User';
import { VacanciesSource } from './VacanciesSource';

@Table({
  tableName: 'vacancies',
  paranoid: true,
})
export class Vacancy extends ModelBase<Vacancy> {
  @HasMany(() => VacancyTechnology)
  vacancyTechnologies: VacancyTechnology[];

  @HasMany(() => VacancySpecialization)
  vacancySpecializations: VacancySpecialization[];

  @AllowNull(false)
  @ForeignKey(() => EnglishLevel)
  @Column({
    field: 'english_level_id',
  })
  englishLevelId: number;

  @BelongsTo(() => EnglishLevel)
  englishLevel: EnglishLevel;

  @AllowNull(false)
  @ForeignKey(() => JobExperience)
  @Column({
    field: 'job_experience_id',
  })
  jobExperienceId: number;

  @BelongsTo(() => JobExperience)
  jobExperience: JobExperience;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => VacanciesSource)
  source: VacanciesSource;

  @BelongsToMany(() => UploadFile, {
    through: {
      model: () => UploadFileMorph,
      unique: false,
      scope: {
        relatedType: 'vacancies',
        field: 'logo',
      },
    },
    foreignKey: 'relatedId',
    otherKey: 'uploadFileId',
    constraints: false,
  })
  logos: Array<UploadFile & {uploadFileMorph: UploadFileMorph}>;

  @Index({
    name: 'vacancies_user_id',
  })
  @ForeignKey(() => User)
  @Column({
    field: 'user_id',
  })
  userId: number;

  @Index({
    name: 'vacancies_source_id',
  })
  @ForeignKey(() => VacanciesSource)
  @Column({
    field: 'source_id',
  })
  sourceId: number;

  @Unique
  @Column({
    type: DataType.TEXT,
    field: 'apply_link',
  })
  applyLink: string;

  @Index({
    name: 'index_vacancies_on_status',
  })
  @AllowNull(false)
  @Column({
    type: DataType.ENUM(...Object.values(VacancyStatusEnum)),
  })
  status: VacancyStatusEnum;

  @AllowNull(false)
  @Column({
    field: 'job_type',
    type: DataType.ENUM(...Object.values(VacancyTypeEnum)),
  })
  jobType: VacancyTypeEnum;

  @AllowNull(false)
  @Column({
    field: 'job_category',
    type: DataType.ENUM(...Object.values(VacancyCategoryEnum)),
  })
  jobCategory: VacancyCategoryEnum;

  @Column({
    type: DataType.FLOAT,
    field: 'salary_to',
  })
  salaryTo: number;

  @Column({
    type: DataType.FLOAT,
    field: 'salary_from',
  })
  salaryFrom: number;

  @AllowNull(false)
  @Column({
    field: 'company_name',
  })
  companyName: string;

  @AllowNull(false)
  @Column({
    field: 'job_title',
  })
  jobTitle: string;

  @AllowNull(false)
  @Column({
    type: DataType.TEXT,
    field: 'job_description',
  })
  jobDescription: string;

  @AllowNull(false)
  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
    field: 'is_top',
  })
  isTop: boolean;

  @DeletedAt
  @Column({
    field: 'deleted_at',
  })
  deletedAt: Date
}
