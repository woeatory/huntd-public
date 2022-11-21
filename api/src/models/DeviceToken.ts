import {
  AllowNull, BelongsTo,
  Column, DataType, ForeignKey, Index, Table,
} from 'sequelize-typescript';
import { ModelBase } from '@/models/ModelBase';
import { User } from '@/models/User';
import { DeviceTokenPlatform } from '@/modules/deviceToken/deviceToken.typedefs';

@Table({
  tableName: 'device_tokens',
})
export class DeviceToken extends ModelBase<DeviceToken> {
  @ForeignKey(() => User)
  @Index('device_tokens_user_id')
  @AllowNull(false)
  @Column({
    field: 'user_id',
  })
  userId: number;

  @BelongsTo(() => User, {
    foreignKey: 'user_id',
  })
  user: User;

  @AllowNull(false)
  @Column
  token: string;

  @AllowNull(false)
  @Column({
    field: 'device_platform',
    type: DataType.ENUM(...Object.values(DeviceTokenPlatform)),
  })
  devicePlatform: DeviceTokenPlatform;

  @Column({
    field: 'device_name',
  })
  deviceName: string;

  @Column({
    field: 'device_year',
  })
  deviceYear: string;

  @Column({
    field: 'system_version',
  })
  systemVersion: string
}
