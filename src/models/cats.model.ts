import { Column, Table } from 'sequelize-typescript';
import CommonModel from './common.model';

@Table
export class Cats extends CommonModel<Cats> {
  @Column
  name?: string;

  @Column
  age?: number;

  @Column
  breed?: string;

  @Column
  color?: string;

  @Column
  master?: string;
}
