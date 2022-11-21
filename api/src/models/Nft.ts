import {
  Table,
  Column,
  BelongsTo,
  ForeignKey,
  Index,
  AllowNull,
} from 'sequelize-typescript';
import { User } from '@/models/User';
import { ModelBase } from '@/models/ModelBase';

@Table({
  tableName: 'nfts',
})
export class Nft extends ModelBase<Nft> {
  @ForeignKey(() => User)
  @Index('nfts_user_id')
  @Column({
    field: 'user_id',
  })
  userId: number;

  @AllowNull(false)
  @Column({
    field: 'opensea_url',
    unique: 'nfts_opensea_url_key',
  })
  openseaUrl: string;

  @BelongsTo(() => User)
  user: User;
}
