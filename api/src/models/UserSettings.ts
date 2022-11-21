import {
  AllowNull, Column, Default, ForeignKey, Index, Table,
} from 'sequelize-typescript';
import { ModelBase } from '@/models/ModelBase';
import { User } from '@/models/User';

@Table({
  tableName: 'user_settings',
})
export class UserSettings extends ModelBase<UserSettings> {
  @AllowNull(false)
  @ForeignKey(() => User)
  @Index('user_settings_user_id')
  @Column({
    field: 'user_id',
  })
  userId: number;

  @AllowNull(false)
  @Default(true)
  @Column({
    field: 'push_notifications_permission',
  })
  pushNotificationsPermission: boolean;
}
