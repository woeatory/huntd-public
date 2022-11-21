import {
  AllowNull,
  BeforeCreate,
  Column,
  DataType,
  Default,
  HasMany,
  HasOne,
  Index,
  NotEmpty,
  Table,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { ClientError } from '@mate-academy/core';
import { AuthErrors } from '@/auth/auth.constants';
import { AccessToken } from '@/models/AccessToken';
import { UserEntity } from '@/modules/user/User.entity';
import { CandidateProfile } from '@/models/CandidateProfile';
import { RecruiterProfile } from '@/models/RecruiterProfile';
import { ServiceAccessToken } from '@/models/ServiceAccessToken';
import { ProfileConnection } from '@/models/ProfileConnection';
import { ModelBase } from '@/models/ModelBase';
import { ProfileConnectionUserMeta } from '@/models/ProfileConnectionUserMeta';
import { AdminSettings } from '@/models/AdminSettings';
import { UserRoleEnum } from '@/modules/user/user.typedefs';
import { UsersSearchSubscription } from '@/models/UsersSearchSubscription';
import { VacanciesSource } from '@/models/VacanciesSource';
import { Nft } from '@/models/Nft';
import { UserErrors } from '@/modules/user/user.constants';

@Table({
  tableName: 'users',
})
export class User extends ModelBase<User> {
  @HasMany(() => ProfileConnection, {
    foreignKey: 'candidate_user_id',
    as: 'candidateProfileConnections',
  })
  candidateProfileConnections: ProfileConnection[];

  @HasOne(() => VacanciesSource, {
    foreignKey: 'user_id',
    as: 'vacanciesSource',
  })
  vacanciesSource: VacanciesSource

  @HasMany(() => ProfileConnection, {
    foreignKey: 'recruiter_user_id',
    as: 'recruiterProfileConnections',
  })
  recruiterProfileConnections: ProfileConnection[]

  @HasMany(() => CandidateProfile)
  candidateProfiles: CandidateProfile[];

  @HasMany(() => UsersSearchSubscription)
  searchSubscriptions: UsersSearchSubscription[];

  @HasMany(() => RecruiterProfile)
  recruiterProfiles: RecruiterProfile[];

  @HasMany(() => AccessToken, {
    onDelete: 'CASCADE',
  })
  accessTokens: AccessToken[];

  @HasMany(() => Nft)
  nfts: Nft[];

  @HasOne(() => AdminSettings, {
    onDelete: 'CASCADE',
  })
  adminSettings: AdminSettings[];

  @HasMany(() => ProfileConnectionUserMeta)
  profileConnectionsUserMeta: ProfileConnectionUserMeta[];

  @HasOne(() => ServiceAccessToken, {
    onDelete: 'CASCADE',
  })
  serviceAccessToken: ServiceAccessToken;

  @Index({
    name: 'index_users_on_email',
    type: 'UNIQUE',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
      isUnique(value: string, next: (arg?: ClientError) => void) {
        User.findOne({
          where: { email: UserEntity.formatEmail(value) },
          attributes: ['id'],
        }).done((user) => {
          if (user) {
            return next(new ClientError({
              message: AuthErrors.RegisterEmailAlreadyTaken,
            }));
          }

          return next();
        });
      },
    },
  })
  set email(val: string) {
    this.setDataValue('email', UserEntity.formatEmail(val));
  }

  @Column({
    field: 'last_action_time',
  })
  lastActionTime: Date;

  @NotEmpty
  @AllowNull(false)
  @Default(() => uuidv4())
  @Column
  password: string;

  @Index({
    name: 'index_users_on_reset_password_token',
    type: 'UNIQUE',
  })
  @Column({
    field: 'reset_password_token',
  })
  resetPasswordToken: string;

  @Default(false)
  @Column
  confirmed: boolean;

  @Column({
    field: 'confirm_email_token',
  })
  confirmEmailToken: string;

  @Default(false)
  @Column
  blocked: boolean;

  @Default(false)
  @Column
  inactive: boolean;

  @Column
  get phone(): string {
    return this.getDataValue('phone');
  }

  set phone(val: string) {
    this.setDataValue('phone', UserEntity.formatPhone(val));
  }

  @Column({
    field: 'first_name',
  })
  firstName: string;

  @Index({
    name: 'users_eth_wallet_address_key',
    type: 'UNIQUE',
  })
  @Column({
    field: 'eth_wallet_address',
    validate: {
      notEmpty: true,
      isUnique(value: string, next: (arg?: ClientError) => void) {
        User.findOne({
          where: { ethWalletAddress: value },
          attributes: ['id'],
        }).done((user) => {
          if (user) {
            return next(new ClientError({
              message: UserErrors.EthWalletAlreadyTaken,
            }));
          }

          return next();
        });
      },
    },
  })
  ethWalletAddress: string;

  @Column({
    field: 'last_name',
  })
  lastName: string;

  @Column
  username: string;

  @Column({
    type: DataType.VIRTUAL,
  })
  get computedName(): string {
    if (this.lastName && this.firstName) {
      return `${this.firstName} ${this.lastName}`;
    }

    return this.firstName || this.username || this.email || 'unknown_name';
  }

  @Column({
    type: DataType.VIRTUAL,
  })
  get isAdminUser(): boolean {
    const userEntity = new UserEntity(this);

    return userEntity.isAdmin();
  }

  @Column({
    field: 'user_role',
    type: DataType.ENUM(...Object.values(UserRoleEnum)),
  })
  userRole: UserRoleEnum

  @Column({
    field: 'fv_type',
  })
  fvType: string;

  @Column({
    field: 'fv_source',
  })
  fvSource: string;

  @Column({
    field: 'fv_medium',
  })
  fvMedium: string;

  @Column({
    field: 'fv_campaign',
  })
  fvCampaign: string;

  @Column({
    field: 'fv_content',
  })
  fvContent: string;

  @Column({
    field: 'fv_term',
  })
  fvTerm: string;

  @Column({
    field: 'lv_type',
  })
  lvType: string;

  @Column({
    field: 'lv_source',
  })
  lvSource: string;

  @Column({
    field: 'lv_medium',
  })
  lvMedium: string;

  @Column({
    field: 'lv_campaign',
  })
  lvCampaign: string;

  @Column({
    field: 'lv_content',
  })
  lvContent: string;

  @Column({
    field: 'lv_term',
  })
  lvTerm: string;

  @Column({
    field: 'g_clientid',
  })
  gClientid: string;

  @Column({
    field: 'g_ip',
  })
  gIp: string;

  @Column({
    field: 'g_agent',
  })
  gAgent: string;

  @Column
  gclid: string;

  @Column({
    field: 'linkedin_url',
  })
  linkedinUrl: string;

  @Column({
    field: 'behance_url',
  })
  behanceUrl: string;

  @Column({
    field: 'github_url',
  })
  githubUrl: string;

  @BeforeCreate
  static async generatePasswordHash(instance: User): Promise<void> {
    const userEntity = new UserEntity(instance);

    Object.assign(instance, {
      password: await userEntity.generatePasswordHash(),
    });
  }
}
