import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  Index,
  Table,
  DataType,
} from 'sequelize-typescript';
import { User } from '@/models/User';
import { ModelBase } from '@/models/ModelBase';
import { MessageTypeEnum } from '@/modules/userMessagesTemplate/userMessagesTemplate.typedefs';

@Table({
  tableName: 'user_messages_templates',
})
export class UserMessagesTemplate extends ModelBase<UserMessagesTemplate> {
  @AllowNull(false)
  @ForeignKey(() => User)
  @Index('user_messages_templates_user_id')
  @Column({
    field: 'user_id',
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @AllowNull(false)
  @Column({
    field: 'message_type',
    type: DataType.ENUM(...Object.values(MessageTypeEnum)),
  })
  messageType: MessageTypeEnum;

  @AllowNull(false)
  @Column({
    field: 'message_title',
  })
  messageTitle: string;

  @AllowNull(false)
  @Column({
    type: DataType.TEXT,
    field: 'message_body',
  })
  messageBody: string;
}
