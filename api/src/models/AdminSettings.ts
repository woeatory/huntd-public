import {
  AllowNull, Column, Default,
  ForeignKey, Index, Table,
  BelongsTo,
} from 'sequelize-typescript';
import { ModelBase } from '@/models/ModelBase';
import { User } from '@/models/User';

@Table({
  tableName: 'admin_settings',
})
export class AdminSettings extends ModelBase<AdminSettings> {
  @AllowNull(false)
  @ForeignKey(() => User)
  @Index('admin_settings_user_id')
  @Column({
    field: 'user_id',
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @AllowNull(false)
  @Default(false)
  @Column({
    field: 'contacts_visibility_permission',
  })
  contactsVisibilityPermission: boolean;

  @AllowNull(false)
  @Default(false)
  @Column({
    field: 'silent_profile_update',
  })
  silentProfileUpdate: boolean;
}
