import {
  Table,
  Column,
  BelongsTo,
  ForeignKey,
  Model,
} from 'sequelize-typescript';
import { UploadFile } from '@/models/UploadFile';

@Table({
  tableName: 'upload_file_morph',
  timestamps: false,
})
export class UploadFileMorph extends Model<UploadFileMorph> {
  @ForeignKey(() => UploadFile)
  @Column({
    field: 'upload_file_id',
  })
  uploadFileId: number;

  @Column({
    field: 'related_id',
  })
  relatedId: number;

  @Column({
    field: 'related_type',
  })
  relatedType: string;

  @Column
  field: string;

  @BelongsTo(() => UploadFile)
  uploadFile: UploadFile;
}
