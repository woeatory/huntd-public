import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  Index,
  Table,
} from 'sequelize-typescript';
import { User } from '@/models/User';
import { ModelBase } from '@/models/ModelBase';

@Table({
  tableName: 'service_access_tokens',
})
export class ServiceAccessToken extends ModelBase<ServiceAccessToken> {
  @AllowNull(false)
  @Index('service_access_tokens_token')
  @Column
  token: string;

  @ForeignKey(() => User)
  @Column({
    field: 'user_id',
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
