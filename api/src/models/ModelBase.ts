import {
  AllowNull,
  AutoIncrement, Column, CreatedAt,
  Model,
  PrimaryKey, UpdatedAt,
} from 'sequelize-typescript';

export class ModelBase<T> extends Model<T> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @AllowNull(false)
  @CreatedAt
  @Column({
    field: 'created_at',
  })
  createdAt: Date;

  @AllowNull(false)
  @UpdatedAt
  @Column({
    field: 'updated_at',
  })
  updatedAt: Date;
}
