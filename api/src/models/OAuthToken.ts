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
  tableName: 'oauth_tokens',
})
export class OAuthToken extends ModelBase<OAuthToken> {
  @Column
  token: string;

  @Index({
    name: 'index_oauth_tokens_on_provider_name',
  })
  @AllowNull(false)
  @Column({
    field: 'provider_name',
    unique: 'composite_provider',
  })
  providerName: string;

  @Index({
    name: 'index_oauth_tokens_on_provider_id',
  })
  @AllowNull(false)
  @Column({
    field: 'provider_id',
    unique: 'composite_provider',
  })
  providerId: string;

  @ForeignKey(() => User)
  @Index('oauth_tokens_user_id')
  @Column({
    field: 'user_id',
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
