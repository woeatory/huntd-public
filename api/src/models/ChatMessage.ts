import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  DeletedAt,
  ForeignKey,
  Index,
  Table,
} from 'sequelize-typescript';
import { User } from '@/models/User';
import { ModelBase } from '@/models/ModelBase';
import { ProfileConnection } from '@/models/ProfileConnection';

@Table({
  tableName: 'chat_messages',
  paranoid: true,
})
export class ChatMessage extends ModelBase<ChatMessage> {
  @AllowNull(false)
  @ForeignKey(() => ProfileConnection)
  @Index('chat_messages_profile_connection_id')
  @Column({
    field: 'profile_connection_id',
  })
  profileConnectionId: number;

  @BelongsTo(() => ProfileConnection)
  profileConnection: ProfileConnection;

  @ForeignKey(() => User)
  @Index('chat_messages_sender_user_id')
  @Column({
    field: 'sender_user_id',
  })
  senderUserId: number;

  @BelongsTo(() => User, {
    foreignKey: 'senderUserId',
  })
  senderUser: User;

  @ForeignKey(() => User)
  @Index('chat_messages_recipient_user_id')
  @Column({
    field: 'recipient_user_id',
  })
  recipientUserId: number;

  @BelongsTo(() => User, {
    foreignKey: 'recipientUserId',
  })
  recipientUser: User;

  @Column({
    type: DataType.TEXT,
  })
  message: string

  @DeletedAt
  @Column({
    field: 'deleted_at',
  })
  deletedAt: Date
}
