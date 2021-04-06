import { Column, Model, Table } from 'sequelize-typescript';
import CommonModel from './common.model';

@Table
export class User extends CommonModel<User> {
  @Column
  nickname: string;
}
