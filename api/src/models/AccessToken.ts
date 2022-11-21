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
  tableName: 'access_tokens',
})
export class AccessToken extends ModelBase<AccessToken> {
  @AllowNull(false)
  @Column
  token: string;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Index('access_tokens_user_id')
  @Column({
    field: 'user_id',
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
