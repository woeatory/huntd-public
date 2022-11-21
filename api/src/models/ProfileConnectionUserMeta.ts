import {
  AllowNull, BelongsTo,
  Column, DeletedAt, ForeignKey, Index,
  Table,
} from 'sequelize-typescript';
import { ModelBase } from '@/models/ModelBase';
import { ProfileConnection } from '@/models/ProfileConnection';
import { User } from '@/models/User';

@Table({
  tableName: 'profile_connections_users_meta',
  paranoid: true,
})
export class ProfileConnectionUserMeta extends ModelBase<
  ProfileConnectionUserMeta
  > {
  @AllowNull(false)
  @Index('profile_connections_users_meta_profile_connection_id')
  @ForeignKey(() => ProfileConnection)
  @Column({
    field: 'profile_connection_id',
  })
  profileConnectionId: number;

  @BelongsTo(() => ProfileConnection)
  profileConnection: ProfileConnection;

  @AllowNull(false)
  @Index('profile_connections_users_meta_user_id')
  @ForeignKey(() => User)
  @Column({
    field: 'user_id',
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({
    field: 'last_action_time',
  })
  lastActionTime: Date

  @Column({
    field: 'archived_at',
  })
  archivedAt: Date

  @DeletedAt
  @Column({
    field: 'deleted_at',
  })
  deletedAt: Date
}
