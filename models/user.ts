import { Table, Column, Model, CreatedAt, UpdatedAt, AutoIncrement, PrimaryKey } from 'sequelize-typescript'

@Table
export class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  declare id: number

  @Column
  declare firstName: string

  @Column
  declare lastName: string

  @Column
  declare email: string

  @Column
  declare password: string

  @CreatedAt
  declare createdAt: Date

  @UpdatedAt
  declare updatedAt: Date
}
