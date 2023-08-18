import { Table, Column, Model, CreatedAt, UpdatedAt, AutoIncrement, PrimaryKey } from "sequelize-typescript";

@Table
export class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id!: number

  @Column
  firstName!: string;

  @Column
  lastName!: string;

  @Column
  email!: string;

  @Column
  password!: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

};