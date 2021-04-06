import { Model, Table, Column, DataType, Index } from 'sequelize-typescript';
import CommonModel from './common.model';

@Table({ tableName: 'config', timestamps: false })
export class Config extends CommonModel<Config> {
  @Column({
    primaryKey: true,
    type: DataType.STRING(225),
    comment: '\u914D\u7F6Ecode',
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  code!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(225),
    comment: '\u8BF4\u660E',
  })
  desc?: string;

  @Column({ type: DataType.STRING(225), comment: '\u7C7B\u578B' })
  type!: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: '\u5185\u5BB91' })
  value?: string;
}
