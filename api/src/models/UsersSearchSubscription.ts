import {
  AllowNull, BelongsTo,
  Column, ForeignKey,
  Index, Table,
  Default, DataType,
  DeletedAt,
} from 'sequelize-typescript';
import { User } from '@/models/User';
import { ModelBase } from '@/models/ModelBase';
import { CandidateProfileSearchParams } from '@/modules/candidateProfile/candidateProfile.typedefs';

@Table({
  tableName: 'users_search_subscriptions',
  paranoid: true,
})
export class UsersSearchSubscription extends ModelBase<
  UsersSearchSubscription
> {
  @AllowNull(false)
  @Index('users_search_subscriptions_title')
  @Column
  title: string;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Index('users_search_subscriptions_user_id')
  @Column({
    field: 'user_id',
  })
  userId: number;

  @AllowNull(false)
  @Index('users_search_subscriptions_last_used')
  @Default(() => Date.now())
  @Column({
    field: 'last_used',
  })
  lastUsed: Date;

  @Column({
    field: 'last_notified',
  })
  lastNotified: Date;

  @Column({
    field: 'search_params',
    type: DataType.JSON,
  })
  searchParams: CandidateProfileSearchParams;

  @BelongsTo(() => User)
  user: User;

  @DeletedAt
  @Column({
    field: 'deleted_at',
  })
  deletedAt: Date
}
