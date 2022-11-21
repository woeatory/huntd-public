import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  DeletedAt,
  ForeignKey, HasMany,
  Index, Default,
  Table,
} from 'sequelize-typescript';
import { CandidateProfile } from '@/models/CandidateProfile';
import { RecruiterProfile } from '@/models/RecruiterProfile';
import { ProfileConnectionInitiatorEnum, ProfileConnectionStatusEnum, OfferStatusEnum } from '@/modules/profileConnection/profileConnection.typedefs';
import { User } from '@/models/User';
import { ModelBase } from '@/models/ModelBase';
import { ChatMessage } from '@/models/ChatMessage';
import { ProfileConnectionUserMeta } from '@/models/ProfileConnectionUserMeta';

@Table({
  tableName: 'profile_connections',
  paranoid: true,
})
export class ProfileConnection extends ModelBase<ProfileConnection> {
  @HasMany(() => ChatMessage)
  chatMessages: ChatMessage[];

  @HasMany(() => ProfileConnectionUserMeta)
  profileConnectionUsersMeta: ProfileConnectionUserMeta[];

  @AllowNull(false)
  @ForeignKey(() => User)
  @Index('profile_connections_candidate_user_id')
  @Column({
    field: 'candidate_user_id',
  })
  candidateUserId: number;

  @BelongsTo(() => User, {
    foreignKey: 'candidate_user_id',
  })
  candidateUser: User;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Index('profile_connections_recruiter_user_id')
  @Column({
    field: 'recruiter_user_id',
  })
  recruiterUserId: number;

  @BelongsTo(() => User, {
    foreignKey: 'recruiter_user_id',
  })
  recruiterUser: User;

  @AllowNull(false)
  @ForeignKey(() => CandidateProfile)
  @Index('profile_connections_candidate_profile_id')
  @Column({
    field: 'candidate_profile_id',
  })
  candidateProfileId: number;

  @BelongsTo(() => CandidateProfile)
  candidateProfile: CandidateProfile;

  @AllowNull(false)
  @ForeignKey(() => RecruiterProfile)
  @Index('profile_connections_recruiter_profile_id')
  @Column({
    field: 'recruiter_profile_id',
  })
  recruiterProfileId: number;

  @BelongsTo(() => RecruiterProfile)
  recruiterProfile: RecruiterProfile;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(...Object.values(ProfileConnectionInitiatorEnum)),
  })
  initiator: ProfileConnectionInitiatorEnum

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(...Object.values(ProfileConnectionStatusEnum)),
  })
  status: ProfileConnectionStatusEnum

  @Column({
    type: DataType.ENUM(...Object.values(OfferStatusEnum)),
    field: 'candidate_reported_status',
  })
  candidateReportedStatus: OfferStatusEnum

  @Column({
    field: 'candidate_reported_at',
  })
  candidateReportedAt: Date

  @AllowNull(false)
  @Default(false)
  @Column({
    field: 'is_payment_requested',
  })
  isPaymentRequested: boolean

  @Column({
    field: 'paid_at',
  })
  paidAt: Date

  @Column({
    type: DataType.ENUM(...Object.values(OfferStatusEnum)),
    field: 'recruiter_reported_status',
  })
  recruiterReportedStatus: OfferStatusEnum

  @Column({
    field: 'recruiter_reported_at',
  })
  recruiterReportedAt: Date

  @DeletedAt
  @Column({
    field: 'deleted_at',
  })
  deletedAt: Date
}
