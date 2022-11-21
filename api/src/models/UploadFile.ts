import {
  Table,
  Column,
  CreatedAt,
  UpdatedAt,
  AllowNull,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import { ModelBase } from '@/models/ModelBase';
import { UploadFileMorph } from '@/models/UploadFileMorph';

@Table({
  tableName: 'upload_file',
})
export class UploadFile extends ModelBase<UploadFile> {
  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  hash: string;

  @Column
  ext: string;

  @AllowNull(false)
  @Column
  mime: string;

  @AllowNull(false)
  @Column
  size: string;

  @AllowNull(false)
  @Column
  url: string;

  @AllowNull(false)
  @Column
  provider: string;

  @Column({
    type: DataType.VIRTUAL,
  })
  get fileName() {
    return `${this.hash}${this.ext}`;
  }

  @CreatedAt
  @Column({
    field: 'created_at',
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    field: 'updated_at',
  })
  updatedAt: Date;

  @HasMany(() => UploadFileMorph, {
    foreignKey: 'upload_file_id',
    onDelete: 'CASCADE',
  })
  uploadFileMorph: UploadFileMorph;
}
