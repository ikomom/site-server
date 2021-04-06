import { Column, DataType, Model, Table } from 'sequelize-typescript';

/**
 * 公共的模型
 */
@Table
export default class CommonModel<T> extends Model<T> {
  @Column({ field: 'created_at', allowNull: true, type: DataType.DATE })
  createdAt?: Date;

  @Column({ field: 'updated_at', allowNull: true, type: DataType.DATE })
  updatedAt?: Date;
}
